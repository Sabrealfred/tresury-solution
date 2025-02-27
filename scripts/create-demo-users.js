// Script para crear usuarios de demostración en Supabase
import { createClient } from '@supabase/supabase-js';

// Usar las mismas credenciales que la aplicación
const SUPABASE_URL = "https://lhmdjdukkwoxznovlonp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxobWRqZHVra3dveHpub3Zsb25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMjQzMzAsImV4cCI6MjA1NTkwMDMzMH0.x9na5iDFKggFtlFKfpmj0uvFfPk-bDbXdhl_xrVv1Ko";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function createDemoUsers() {
  console.log('Iniciando configuración de usuarios de demostración...');
  
  const demoUsers = [
    { email: 'admin1@demo.com', password: 'admin123', role: 'admin' },
    { email: 'user1@demo.com', password: 'user123', role: 'user' },
    { email: 'business@demo.com', password: 'business123', role: 'business' }
  ];

  for (const user of demoUsers) {
    console.log(`Procesando usuario: ${user.email}`);
    
    // 1. Intentar iniciar sesión con el usuario para ver si existe
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    // Si el usuario no existe o la contraseña es incorrecta
    if (signInError) {
      console.log(`Usuario ${user.email} no existe o contraseña incorrecta. Intentando crear...`);
      
      // 2. Crear el usuario
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (signUpError) {
        console.error(`Error al crear usuario ${user.email}:`, signUpError.message);
        continue;
      }

      console.log(`Usuario ${user.email} creado exitosamente con ID: ${signUpData.user.id}`);
      
      // 3. Asignar rol al usuario recién creado
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: signUpData.user.id,
          role: user.role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (roleError) {
        console.error(`Error al asignar rol a ${user.email}:`, roleError.message);
      } else {
        console.log(`Rol '${user.role}' asignado a ${user.email}`);
      }
    } else {
      // El usuario existe, verificar si tiene el rol correcto
      const userId = signInData.user.id;
      console.log(`Usuario ${user.email} existe con ID: ${userId}`);
      
      // Verificar si el usuario ya tiene un rol asignado
      const { data: existingRole, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (roleCheckError) {
        console.error(`Error al verificar rol para ${user.email}:`, roleCheckError.message);
      } else if (!existingRole) {
        // Si no tiene rol, asignarle uno
        const { error: roleInsertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: user.role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (roleInsertError) {
          console.error(`Error al asignar rol a ${user.email}:`, roleInsertError.message);
        } else {
          console.log(`Rol '${user.role}' asignado a ${user.email}`);
        }
      } else if (existingRole.role !== user.role) {
        // Si tiene un rol diferente, actualizarlo
        const { error: roleUpdateError } = await supabase
          .from('user_roles')
          .update({ 
            role: user.role,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);

        if (roleUpdateError) {
          console.error(`Error al actualizar rol para ${user.email}:`, roleUpdateError.message);
        } else {
          console.log(`Rol actualizado de '${existingRole.role}' a '${user.role}' para ${user.email}`);
        }
      } else {
        console.log(`Usuario ${user.email} ya tiene el rol correcto: ${existingRole.role}`);
      }
    }
    
    // Crear un perfil para el usuario si no existe
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', signInData?.user?.id || signUpData?.user?.id)
      .maybeSingle();
      
    if (profileError && profileError.code !== 'PGRST116') {
      console.error(`Error al verificar perfil para ${user.email}:`, profileError.message);
    } else if (!profileData) {
      // Crear perfil
      const userId = signInData?.user?.id || signUpData?.user?.id;
      const { error: createProfileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          first_name: user.role === 'admin' ? 'Admin' : (user.role === 'user' ? 'User' : 'Business'),
          last_name: 'Demo',
          profile_type: user.role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (createProfileError) {
        console.error(`Error al crear perfil para ${user.email}:`, createProfileError.message);
      } else {
        console.log(`Perfil creado para ${user.email}`);
      }
    } else {
      console.log(`Perfil ya existe para ${user.email}`);
    }
    
    // Crear una wallet para el usuario si no existe
    const { data: walletData, error: walletError } = await supabase
      .from('wallets')
      .select('id')
      .eq('user_id', signInData?.user?.id || signUpData?.user?.id)
      .maybeSingle();
      
    if (walletError && walletError.code !== 'PGRST116') {
      console.error(`Error al verificar wallet para ${user.email}:`, walletError.message);
    } else if (!walletData) {
      // Crear wallet
      const userId = signInData?.user?.id || signUpData?.user?.id;
      const { error: createWalletError } = await supabase
        .from('wallets')
        .insert({
          user_id: userId,
          balance: 10000, // Saldo inicial
          currency_code: 'USD',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (createWalletError) {
        console.error(`Error al crear wallet para ${user.email}:`, createWalletError.message);
      } else {
        console.log(`Wallet creada para ${user.email} con saldo inicial de $10,000`);
      }
    } else {
      console.log(`Wallet ya existe para ${user.email}`);
    }
    
    console.log(`Procesamiento de ${user.email} completado.\n`);
  }

  console.log('¡Configuración de usuarios de demostración completada!');
}

// Ejecutar la función principal
createDemoUsers()
  .catch(error => {
    console.error('Error en la configuración de usuarios de demostración:', error);
  })
  .finally(() => {
    console.log('Script finalizado.');
  });
