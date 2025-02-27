import { supabase } from '../src/integrations/supabase/client.js';
import { v4 as uuidv4 } from 'uuid';
import { PERMISSIONS, PERMISSION_GROUPS } from '../src/types/permissions.js';

// Configuración de usuarios comerciales
const COMMERCIAL_USERS = [
  {
    email: 'commercial-owner@example.com',
    password: 'password123',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    role: 'owner',
    profileType: 'commercial',
    permissions: PERMISSION_GROUPS.OWNER
  },
  {
    email: 'commercial-admin@example.com',
    password: 'password123',
    firstName: 'Ana',
    lastName: 'Martínez',
    role: 'admin',
    profileType: 'commercial',
    permissions: PERMISSION_GROUPS.ADMIN
  },
  {
    email: 'commercial-finance@example.com',
    password: 'password123',
    firstName: 'Luis',
    lastName: 'Sánchez',
    role: 'employee',
    profileType: 'commercial',
    permissions: PERMISSION_GROUPS.FINANCE
  },
  {
    email: 'commercial-operations@example.com',
    password: 'password123',
    firstName: 'María',
    lastName: 'González',
    role: 'employee',
    profileType: 'commercial',
    permissions: PERMISSION_GROUPS.OPERATIONS
  },
  {
    email: 'commercial-investments@example.com',
    password: 'password123',
    firstName: 'Javier',
    lastName: 'López',
    role: 'employee',
    profileType: 'commercial',
    permissions: PERMISSION_GROUPS.INVESTMENTS
  },
  {
    email: 'commercial-viewer@example.com',
    password: 'password123',
    firstName: 'Elena',
    lastName: 'Pérez',
    role: 'viewer',
    profileType: 'commercial',
    permissions: PERMISSION_GROUPS.VIEWER
  }
];

// Función para crear un usuario
async function createUser(userData) {
  try {
    // Crear usuario en Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      console.error(`Error al crear usuario ${userData.email}:`, authError);
      return null;
    }

    console.log(`Usuario creado: ${userData.email} (${authUser.user.id})`);

    // Actualizar perfil
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: userData.firstName,
        last_name: userData.lastName,
        profile_type: userData.profileType
      })
      .eq('id', authUser.user.id);

    if (profileError) {
      console.error(`Error al actualizar perfil para ${userData.email}:`, profileError);
    }

    return authUser.user;
  } catch (error) {
    console.error(`Error inesperado al crear usuario ${userData.email}:`, error);
    return null;
  }
}

// Función para crear una organización
async function createOrganization(name, type) {
  try {
    const { data, error } = await supabase
      .from('organizations')
      .insert({
        name,
        type,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error(`Error al crear organización ${name}:`, error);
      return null;
    }

    console.log(`Organización creada: ${name} (${data.id})`);
    return data;
  } catch (error) {
    console.error(`Error inesperado al crear organización ${name}:`, error);
    return null;
  }
}

// Función para asignar un usuario a una organización
async function assignUserToOrganization(userId, organizationId, role) {
  try {
    const { error } = await supabase
      .from('user_organizations')
      .insert({
        user_id: userId,
        organization_id: organizationId,
        role,
        is_active: true
      });

    if (error) {
      console.error(`Error al asignar usuario ${userId} a organización ${organizationId}:`, error);
      return false;
    }

    console.log(`Usuario ${userId} asignado a organización ${organizationId} con rol ${role}`);
    return true;
  } catch (error) {
    console.error(`Error inesperado al asignar usuario ${userId} a organización ${organizationId}:`, error);
    return false;
  }
}

// Función para asignar permisos a un usuario
async function assignPermissionsToUser(userId, organizationId, permissions) {
  try {
    // Crear array de objetos de permisos
    const permissionObjects = permissions.map(permission => ({
      id: uuidv4(),
      user_id: userId,
      organization_id: organizationId,
      permission_name: permission
    }));

    // Insertar permisos
    const { error } = await supabase
      .from('user_permissions')
      .insert(permissionObjects);

    if (error) {
      console.error(`Error al asignar permisos a usuario ${userId}:`, error);
      return false;
    }

    console.log(`${permissions.length} permisos asignados a usuario ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error inesperado al asignar permisos a usuario ${userId}:`, error);
    return false;
  }
}

// Función principal
async function main() {
  console.log('Iniciando creación de usuarios comerciales...');

  // Crear organización comercial
  const organization = await createOrganization('Empresa Comercial Demo', 'commercial');
  if (!organization) {
    console.error('No se pudo crear la organización comercial. Abortando.');
    return;
  }

  // Crear usuarios y asignarlos a la organización
  for (const userData of COMMERCIAL_USERS) {
    // Crear usuario
    const user = await createUser(userData);
    if (!user) continue;

    // Asignar a organización
    const assigned = await assignUserToOrganization(user.id, organization.id, userData.role);
    if (!assigned) continue;

    // Si no es propietario, asignar permisos específicos
    if (userData.role !== 'owner') {
      await assignPermissionsToUser(user.id, organization.id, userData.permissions);
    }
  }

  console.log('Proceso completado.');
}

// Ejecutar script
main().catch(error => {
  console.error('Error en el script principal:', error);
});
