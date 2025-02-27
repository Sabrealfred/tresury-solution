import { supabase } from "@/integrations/supabase/client";
import type { Organization, UserOrganization, UserPermission } from "@/types/permissions";
import { PERMISSIONS, PERMISSION_GROUPS } from "@/types/permissions";

// Servicio de permisos
export const permissionsService = {
  // Obtener las organizaciones del usuario actual
  async getUserOrganizations(): Promise<UserOrganization[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('user_organizations')
      .select(`
        *,
        organization:organizations (*)
      `)
      .eq('user_id', user.id)
      .eq('is_active', true);

    if (error) {
      console.error('Error al obtener organizaciones del usuario:', error);
      return [];
    }

    return data || [];
  },

  // Obtener la organización activa del usuario
  async getActiveOrganization(): Promise<Organization | null> {
    // Primero intentamos obtener desde localStorage
    const activeOrgStr = localStorage.getItem('activeOrganization');
    if (activeOrgStr) {
      try {
        return JSON.parse(activeOrgStr);
      } catch (e) {
        console.error('Error al parsear organización activa:', e);
      }
    }

    // Si no hay en localStorage, obtenemos la primera organización del usuario
    const userOrgs = await this.getUserOrganizations();
    if (userOrgs.length > 0 && userOrgs[0].organization) {
      // Guardar en localStorage para futuras referencias
      localStorage.setItem('activeOrganization', JSON.stringify(userOrgs[0].organization));
      return userOrgs[0].organization;
    }

    return null;
  },

  // Establecer la organización activa
  setActiveOrganization(organization: Organization): void {
    localStorage.setItem('activeOrganization', JSON.stringify(organization));
  },

  // Obtener el rol del usuario en la organización activa
  async getUserRoleInActiveOrganization(): Promise<string | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const activeOrg = await this.getActiveOrganization();
    if (!activeOrg) return null;

    const { data, error } = await supabase
      .from('user_organizations')
      .select('role')
      .eq('user_id', user.id)
      .eq('organization_id', activeOrg.id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error al obtener rol del usuario:', error);
      return null;
    }

    return data?.role || null;
  },

  // Verificar si el usuario tiene un permiso específico
  async hasPermission(permissionName: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const activeOrg = await this.getActiveOrganization();
    if (!activeOrg) return false;

    // Verificar si el usuario es propietario (los propietarios tienen todos los permisos)
    const { data: roleData } = await supabase
      .from('user_organizations')
      .select('role')
      .eq('user_id', user.id)
      .eq('organization_id', activeOrg.id)
      .eq('is_active', true)
      .single();

    if (roleData?.role === 'owner') {
      return true;
    }

    // Verificar permiso específico
    const { data, error } = await supabase
      .from('user_permissions')
      .select('id')
      .eq('user_id', user.id)
      .eq('organization_id', activeOrg.id)
      .eq('permission_name', permissionName)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error al verificar permiso:', error);
      return false;
    }

    return !!data;
  },

  // Obtener todos los permisos del usuario en la organización activa
  async getUserPermissions(): Promise<string[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const activeOrg = await this.getActiveOrganization();
    if (!activeOrg) return [];

    // Verificar si el usuario es propietario
    const { data: roleData } = await supabase
      .from('user_organizations')
      .select('role')
      .eq('user_id', user.id)
      .eq('organization_id', activeOrg.id)
      .eq('is_active', true)
      .single();

    if (roleData?.role === 'owner') {
      return ['all_permissions']; // Los propietarios tienen todos los permisos
    }

    // Obtener permisos específicos
    const { data, error } = await supabase
      .from('user_permissions')
      .select('permission_name')
      .eq('user_id', user.id)
      .eq('organization_id', activeOrg.id);

    if (error) {
      console.error('Error al obtener permisos del usuario:', error);
      return [];
    }

    return data?.map(p => p.permission_name) || [];
  },

  // Añadir un permiso a un usuario
  async addPermission(userId: string, permissionName: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const activeOrg = await this.getActiveOrganization();
    if (!activeOrg) return false;

    // Verificar si el usuario actual es propietario o administrador
    const canManagePermissions = await this.hasPermission('manage_permissions');
    if (!canManagePermissions) {
      console.error('El usuario no tiene permisos para gestionar permisos');
      return false;
    }

    const { error } = await supabase
      .from('user_permissions')
      .upsert({
        user_id: userId,
        organization_id: activeOrg.id,
        permission_name: permissionName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error al añadir permiso:', error);
      return false;
    }

    return true;
  },

  // Eliminar un permiso de un usuario
  async removePermission(userId: string, permissionName: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const activeOrg = await this.getActiveOrganization();
    if (!activeOrg) return false;

    // Verificar si el usuario actual es propietario o administrador
    const canManagePermissions = await this.hasPermission('manage_permissions');
    if (!canManagePermissions) {
      console.error('El usuario no tiene permisos para gestionar permisos');
      return false;
    }

    const { error } = await supabase
      .from('user_permissions')
      .delete()
      .eq('user_id', userId)
      .eq('organization_id', activeOrg.id)
      .eq('permission_name', permissionName);

    if (error) {
      console.error('Error al eliminar permiso:', error);
      return false;
    }

    return true;
  },

  // Añadir un usuario a la organización actual
  async addUserToOrganization(
    userId: string, 
    role: 'admin' | 'employee' | 'viewer' = 'employee'
  ): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const activeOrg = await this.getActiveOrganization();
    if (!activeOrg) return false;

    // Verificar si el usuario actual es propietario
    const { data: roleData } = await supabase
      .from('user_organizations')
      .select('role')
      .eq('user_id', user.id)
      .eq('organization_id', activeOrg.id)
      .eq('is_active', true)
      .single();

    if (roleData?.role !== 'owner') {
      console.error('Solo los propietarios pueden añadir usuarios a la organización');
      return false;
    }

    const { error } = await supabase
      .from('user_organizations')
      .upsert({
        user_id: userId,
        organization_id: activeOrg.id,
        role,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error al añadir usuario a la organización:', error);
      return false;
    }

    return true;
  },

  // Eliminar un usuario de la organización actual
  async removeUserFromOrganization(userId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const activeOrg = await this.getActiveOrganization();
    if (!activeOrg) return false;

    // Verificar si el usuario actual es propietario
    const { data: roleData } = await supabase
      .from('user_organizations')
      .select('role')
      .eq('user_id', user.id)
      .eq('organization_id', activeOrg.id)
      .eq('is_active', true)
      .single();

    if (roleData?.role !== 'owner') {
      console.error('Solo los propietarios pueden eliminar usuarios de la organización');
      return false;
    }

    // No permitir eliminar al propietario
    const { data: targetRoleData } = await supabase
      .from('user_organizations')
      .select('role')
      .eq('user_id', userId)
      .eq('organization_id', activeOrg.id)
      .single();

    if (targetRoleData?.role === 'owner') {
      console.error('No se puede eliminar al propietario de la organización');
      return false;
    }

    const { error } = await supabase
      .from('user_organizations')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('organization_id', activeOrg.id);

    if (error) {
      console.error('Error al eliminar usuario de la organización:', error);
      return false;
    }

    return true;
  },

  // Obtener todos los usuarios de la organización actual
  async getOrganizationUsers(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const activeOrg = await this.getActiveOrganization();
    if (!activeOrg) return [];

    const { data, error } = await supabase
      .from('user_organizations')
      .select(`
        *,
        user:user_id (
          id,
          email,
          profiles:profiles (
            first_name,
            last_name,
            profile_type
          )
        )
      `)
      .eq('organization_id', activeOrg.id)
      .eq('is_active', true);

    if (error) {
      console.error('Error al obtener usuarios de la organización:', error);
      return [];
    }

    return data || [];
  }
};

// Hook para usar el servicio de permisos en componentes
export function usePermissions() {
  return permissionsService;
}
