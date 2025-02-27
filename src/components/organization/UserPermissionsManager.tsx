import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePermissions } from "@/services/permissionsService";
import type { UserOrganization } from "@/types/permissions";
import { supabase } from "@/integrations/supabase/client";
import { PERMISSIONS, PERMISSION_GROUPS } from "@/types/permissions";
import { Loader2, UserPlus, UserMinus, Shield, Settings } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface UserPermissionsManagerProps {
  organizationId?: string;
}

export function UserPermissionsManager({ organizationId }: UserPermissionsManagerProps) {
  const permissionsService = usePermissions();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [isOwner, setIsOwner] = useState(false);
  const [canManagePermissions, setCanManagePermissions] = useState(false);

  // Cargar usuarios de la organización
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const orgUsers = await permissionsService.getOrganizationUsers();
        setUsers(orgUsers);
        
        // Verificar si el usuario actual puede gestionar permisos
        const hasPermission = await permissionsService.hasPermission(PERMISSIONS.MANAGE_PERMISSIONS);
        setCanManagePermissions(hasPermission);
        
        // Verificar si el usuario actual es propietario
        const role = await permissionsService.getUserRoleInActiveOrganization();
        setIsOwner(role === 'owner');
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios de la organización",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  // Cargar permisos del usuario seleccionado
  useEffect(() => {
    const loadUserPermissions = async () => {
      if (!selectedUser) {
        setUserPermissions([]);
        return;
      }
      
      setLoading(true);
      try {
        // Verificar si el usuario seleccionado es propietario
        const userOrg = users.find(u => u.user_id === selectedUser);
        if (userOrg?.role === 'owner') {
          setUserPermissions(['all_permissions']);
          return;
        }
        
        // Obtener permisos específicos
        const { data, error } = await supabase
          .from('user_permissions')
          .select('permission_name')
          .eq('user_id', selectedUser)
          .eq('organization_id', organizationId || (await permissionsService.getActiveOrganization())?.id);
          
        if (error) {
          throw error;
        }
        
        setUserPermissions(data.map(p => p.permission_name));
      } catch (error) {
        console.error('Error al cargar permisos:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los permisos del usuario",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadUserPermissions();
  }, [selectedUser, users]);

  // Manejar cambio de permiso
  const handlePermissionChange = async (permission: string, checked: boolean) => {
    if (!selectedUser || !canManagePermissions) return;
    
    try {
      if (checked) {
        await permissionsService.addPermission(selectedUser, permission);
        setUserPermissions(prev => [...prev, permission]);
      } else {
        await permissionsService.removePermission(selectedUser, permission);
        setUserPermissions(prev => prev.filter(p => p !== permission));
      }
      
      toast({
        title: "Éxito",
        description: `Permiso ${checked ? 'añadido' : 'eliminado'} correctamente`,
      });
    } catch (error) {
      console.error('Error al modificar permiso:', error);
      toast({
        title: "Error",
        description: `No se pudo ${checked ? 'añadir' : 'eliminar'} el permiso`,
        variant: "destructive",
      });
    }
  };

  // Aplicar grupo de permisos
  const applyPermissionGroup = async (groupName: string) => {
    if (!selectedUser || !canManagePermissions) return;
    
    try {
      setLoading(true);
      
      // Obtener permisos del grupo
      const groupPermissions = PERMISSION_GROUPS[groupName as keyof typeof PERMISSION_GROUPS] || [];
      
      // Eliminar permisos actuales
      await supabase
        .from('user_permissions')
        .delete()
        .eq('user_id', selectedUser)
        .eq('organization_id', organizationId || (await permissionsService.getActiveOrganization())?.id);
      
      // Añadir nuevos permisos
      for (const permission of groupPermissions) {
        await permissionsService.addPermission(selectedUser, permission);
      }
      
      // Actualizar estado
      setUserPermissions(groupPermissions);
      
      toast({
        title: "Éxito",
        description: `Grupo de permisos '${groupName}' aplicado correctamente`,
      });
    } catch (error) {
      console.error('Error al aplicar grupo de permisos:', error);
      toast({
        title: "Error",
        description: "No se pudo aplicar el grupo de permisos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Renderizar lista de usuarios
  const renderUserList = () => {
    if (loading && users.length === 0) {
      return (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    if (users.length === 0) {
      return (
        <div className="text-center p-4 text-muted-foreground">
          No hay usuarios en esta organización
        </div>
      );
    }
    
    return (
      <div className="space-y-2">
        {users.map((userOrg) => {
          const user = userOrg.user;
          const profile = user.profiles;
          const isUserOwner = userOrg.role === 'owner';
          
          return (
            <div
              key={user.id}
              className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
                selectedUser === user.id ? 'bg-primary/10' : 'hover:bg-secondary/50'
              }`}
              onClick={() => setSelectedUser(user.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  {isUserOwner ? (
                    <Shield className="h-5 w-5 text-primary" />
                  ) : (
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="font-medium">
                    {profile?.first_name} {profile?.last_name}
                  </div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-secondary">
                {isUserOwner ? 'Propietario' : userOrg.role}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Renderizar permisos
  const renderPermissions = () => {
    if (!selectedUser) {
      return (
        <div className="text-center p-4 text-muted-foreground">
          Selecciona un usuario para ver sus permisos
        </div>
      );
    }
    
    const selectedUserData = users.find(u => u.user_id === selectedUser);
    const isSelectedUserOwner = selectedUserData?.role === 'owner';
    
    if (isSelectedUserOwner) {
      return (
        <div className="text-center p-4">
          <Shield className="h-12 w-12 mx-auto mb-2 text-primary" />
          <div className="text-lg font-medium">Usuario Propietario</div>
          <div className="text-muted-foreground">
            Los propietarios tienen todos los permisos disponibles
          </div>
        </div>
      );
    }
    
    if (loading) {
      return (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    return (
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="treasury">Tesorería</TabsTrigger>
          <TabsTrigger value="operations">Operaciones</TabsTrigger>
          <TabsTrigger value="fund">Fondos</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_dashboard"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_DASHBOARD)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_DASHBOARD, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_dashboard">Ver Dashboard</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver el dashboard principal
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="treasury" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_treasury"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_TREASURY)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_TREASURY, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_treasury">Ver Tesorería</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver el módulo de tesorería
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manage_treasury"
                  checked={userPermissions.includes(PERMISSIONS.MANAGE_TREASURY)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.MANAGE_TREASURY, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="manage_treasury">Gestionar Tesorería</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario gestionar operaciones de tesorería
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_cash_flow"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_CASH_FLOW)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_CASH_FLOW, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_cash_flow">Ver Flujo de Caja</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver informes de flujo de caja
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_fx"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_FX)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_FX, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_fx">Ver Operaciones FX</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver operaciones de divisas
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="execute_fx"
                  checked={userPermissions.includes(PERMISSIONS.EXECUTE_FX)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.EXECUTE_FX, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="execute_fx">Ejecutar Operaciones FX</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ejecutar operaciones de divisas
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="operations" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_operations"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_OPERATIONS)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_OPERATIONS, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_operations">Ver Operaciones</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver el módulo de operaciones
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_payroll"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_PAYROLL)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_PAYROLL, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_payroll">Ver Nómina</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver información de nómina
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manage_payroll"
                  checked={userPermissions.includes(PERMISSIONS.MANAGE_PAYROLL)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.MANAGE_PAYROLL, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="manage_payroll">Gestionar Nómina</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario gestionar la nómina
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_invoices"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_INVOICES)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_INVOICES, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_invoices">Ver Facturas</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver facturas
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="fund" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_fund"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_FUND)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_FUND, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_fund">Ver Gestión de Fondos</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver el módulo de gestión de fondos
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manage_fund"
                  checked={userPermissions.includes(PERMISSIONS.MANAGE_FUND)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.MANAGE_FUND, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="manage_fund">Gestionar Fondos</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario gestionar fondos
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_portfolios"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_PORTFOLIOS)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_PORTFOLIOS, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_portfolios">Ver Portafolios</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver portafolios de inversión
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_trading"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_TRADING)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_TRADING, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_trading">Ver Trading</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver la plataforma de trading
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="execute_trading"
                  checked={userPermissions.includes(PERMISSIONS.EXECUTE_TRADING)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.EXECUTE_TRADING, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="execute_trading">Ejecutar Operaciones</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ejecutar operaciones de trading
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="admin" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manage_users"
                  checked={userPermissions.includes(PERMISSIONS.MANAGE_USERS)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.MANAGE_USERS, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="manage_users">Gestionar Usuarios</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario gestionar otros usuarios
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manage_permissions"
                  checked={userPermissions.includes(PERMISSIONS.MANAGE_PERMISSIONS)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.MANAGE_PERMISSIONS, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="manage_permissions">Gestionar Permisos</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario gestionar permisos de otros usuarios
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="view_organization"
                  checked={userPermissions.includes(PERMISSIONS.VIEW_ORGANIZATION)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.VIEW_ORGANIZATION, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="view_organization">Ver Organización</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario ver información de la organización
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manage_organization"
                  checked={userPermissions.includes(PERMISSIONS.MANAGE_ORGANIZATION)}
                  onCheckedChange={(checked) => 
                    handlePermissionChange(PERMISSIONS.MANAGE_ORGANIZATION, checked as boolean)
                  }
                  disabled={!canManagePermissions}
                />
                <Label htmlFor="manage_organization">Gestionar Organización</Label>
              </div>
              <div className="text-xs text-muted-foreground pl-6">
                Permite al usuario gestionar la organización
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  // Renderizar grupos de permisos
  const renderPermissionGroups = () => {
    if (!selectedUser || !canManagePermissions) return null;
    
    const selectedUserData = users.find(u => u.user_id === selectedUser);
    const isSelectedUserOwner = selectedUserData?.role === 'owner';
    
    if (isSelectedUserOwner) return null;
    
    return (
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2">Aplicar grupo de permisos</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPermissionGroup('ADMIN')}
            disabled={loading}
          >
            Administrador
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPermissionGroup('FINANCE')}
            disabled={loading}
          >
            Finanzas
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPermissionGroup('OPERATIONS')}
            disabled={loading}
          >
            Operaciones
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPermissionGroup('INVESTMENTS')}
            disabled={loading}
          >
            Inversiones
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPermissionGroup('VIEWER')}
            disabled={loading}
          >
            Solo Lectura
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>
            Usuarios en la organización
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderUserList()}
        </CardContent>
        {isOwner && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Añadir Usuario
            </Button>
            <Button variant="outline" size="sm" disabled={!selectedUser}>
              <UserMinus className="h-4 w-4 mr-2" />
              Eliminar Usuario
            </Button>
          </CardFooter>
        )}
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Permisos</CardTitle>
          <CardDescription>
            Gestionar permisos de usuario
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderPermissions()}
          {renderPermissionGroups()}
        </CardContent>
      </Card>
    </div>
  );
}
