import React from 'react';
import { UserPermissionsManager } from '@/components/organization/UserPermissionsManager';
import { usePermissions } from '@/services/permissionsService';
import { PERMISSIONS } from '@/types/permissions';
import { useEffect, useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function OrganizationPermissionsPage() {
  const permissionsService = usePermissions();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [canManagePermissions, setCanManagePermissions] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [activeOrganization, setActiveOrganization] = useState<any>(null);

  useEffect(() => {
    const checkPermissions = async () => {
      setLoading(true);
      try {
        // Verificar si el usuario puede gestionar permisos
        const hasPermission = await permissionsService.hasPermission(PERMISSIONS.MANAGE_PERMISSIONS);
        setCanManagePermissions(hasPermission);
        
        // Verificar si el usuario es propietario
        const role = await permissionsService.getUserRoleInActiveOrganization();
        setIsOwner(role === 'owner');
        
        // Obtener la organización activa
        const org = await permissionsService.getActiveOrganization();
        setActiveOrganization(org);
      } catch (error) {
        console.error('Error al verificar permisos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkPermissions();
  }, []);

  // Renderizar mensaje de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  // Renderizar mensaje de acceso denegado
  if (!canManagePermissions && !isOwner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Acceso Denegado</h1>
        <p className="text-muted-foreground mb-6">
          No tienes permisos para gestionar los permisos de usuario en esta organización.
          Contacta con el administrador o propietario de la organización para solicitar acceso.
        </p>
        <Button onClick={() => navigate('/commercial/dashboard')}>
          Volver al Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Permisos</h1>
          <p className="text-muted-foreground">
            Administra los permisos de los usuarios en tu organización
          </p>
        </div>
        
        {activeOrganization && (
          <div className="flex items-center space-x-2 bg-secondary/50 px-4 py-2 rounded-lg">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">{activeOrganization.name}</div>
              <div className="text-xs text-muted-foreground">
                {activeOrganization.type === 'commercial' ? 'Organización Comercial' : 
                 activeOrganization.type === 'business' ? 'Organización Empresarial' : 
                 'Organización Personal'}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6">
          <UserPermissionsManager organizationId={activeOrganization?.id} />
        </div>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Información sobre Permisos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Roles de Usuario</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Propietario:</span>
                <span className="text-muted-foreground">Tiene acceso completo a todas las funcionalidades y puede gestionar todos los aspectos de la organización.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Administrador:</span>
                <span className="text-muted-foreground">Puede gestionar la mayoría de los aspectos de la organización, pero no puede eliminar la organización ni cambiar al propietario.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Empleado:</span>
                <span className="text-muted-foreground">Tiene acceso a funcionalidades específicas según los permisos asignados.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Visualizador:</span>
                <span className="text-muted-foreground">Solo puede ver información, sin capacidad de realizar cambios.</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Grupos de Permisos</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Administrador:</span>
                <span className="text-muted-foreground">Permisos para gestionar usuarios, permisos, tesorería y operaciones.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Finanzas:</span>
                <span className="text-muted-foreground">Permisos para gestionar tesorería, flujo de caja y operaciones FX.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Operaciones:</span>
                <span className="text-muted-foreground">Permisos para gestionar nómina, facturas y gastos.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Inversiones:</span>
                <span className="text-muted-foreground">Permisos para gestionar fondos, portafolios y trading.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-semibold min-w-[100px]">Solo Lectura:</span>
                <span className="text-muted-foreground">Permisos para ver información sin capacidad de realizar cambios.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
