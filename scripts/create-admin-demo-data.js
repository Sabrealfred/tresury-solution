import { supabase } from '../src/integrations/supabase/client.js';
import { v4 as uuidv4 } from 'uuid';

// Configuración de usuarios de prueba para el panel de administración
const ADMIN_USERS = [
  {
    email: 'admin@example.com',
    password: 'password123',
    firstName: 'Admin',
    lastName: 'Principal',
    profileType: 'admin'
  },
  {
    email: 'admin-users@example.com',
    password: 'password123',
    firstName: 'Gestor',
    lastName: 'Usuarios',
    profileType: 'admin'
  },
  {
    email: 'admin-accounts@example.com',
    password: 'password123',
    firstName: 'Gestor',
    lastName: 'Cuentas',
    profileType: 'admin'
  },
  {
    email: 'admin-transactions@example.com',
    password: 'password123',
    firstName: 'Gestor',
    lastName: 'Transacciones',
    profileType: 'admin'
  },
  {
    email: 'admin-products@example.com',
    password: 'password123',
    firstName: 'Gestor',
    lastName: 'Productos',
    profileType: 'admin'
  }
];

// Configuración de perfiles de usuario para demostración
const USER_PROFILES = [
  {
    firstName: 'Juan',
    lastName: 'Pérez',
    profileType: 'personal',
    kycStatus: 'approved'
  },
  {
    firstName: 'María',
    lastName: 'González',
    profileType: 'personal',
    kycStatus: 'pending'
  },
  {
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    profileType: 'business',
    kycStatus: 'approved'
  },
  {
    firstName: 'Ana',
    lastName: 'Martínez',
    profileType: 'commercial',
    kycStatus: 'approved'
  },
  {
    firstName: 'Luis',
    lastName: 'Sánchez',
    profileType: 'private_banking',
    kycStatus: 'approved'
  },
  {
    firstName: 'Elena',
    lastName: 'López',
    profileType: 'developer',
    kycStatus: 'approved'
  },
  {
    firstName: 'Javier',
    lastName: 'Fernández',
    profileType: 'personal',
    kycStatus: 'rejected'
  }
];

// Configuración de cuentas para demostración
const generateAccounts = (userId) => {
  const accounts = [];
  
  // Cuenta corriente
  accounts.push({
    account_number: `CURR-${Math.floor(Math.random() * 1000000)}`,
    balance: Math.random() * 10000,
    currency: 'USD',
    is_active: true,
    user_id: userId
  });
  
  // Cuenta de ahorros
  accounts.push({
    account_number: `SAV-${Math.floor(Math.random() * 1000000)}`,
    balance: Math.random() * 5000,
    currency: 'USD',
    is_active: true,
    user_id: userId
  });
  
  // Cuenta en euros (para algunos usuarios)
  if (Math.random() > 0.5) {
    accounts.push({
      account_number: `EUR-${Math.floor(Math.random() * 1000000)}`,
      balance: Math.random() * 8000,
      currency: 'EUR',
      is_active: true,
      user_id: userId
    });
  }
  
  // Cuenta inactiva (para algunos usuarios)
  if (Math.random() > 0.7) {
    accounts.push({
      account_number: `INACT-${Math.floor(Math.random() * 1000000)}`,
      balance: Math.random() * 100,
      currency: 'USD',
      is_active: false,
      user_id: userId
    });
  }
  
  return accounts;
};

// Configuración de transacciones para demostración
const generateTransactions = (userId, accountNumber) => {
  const transactions = [];
  const transactionTypes = ['deposit', 'withdrawal', 'transfer', 'payment'];
  const statuses = ['completed', 'pending', 'rejected'];
  
  // Generar entre 5 y 15 transacciones por cuenta
  const numTransactions = 5 + Math.floor(Math.random() * 10);
  
  for (let i = 0; i < numTransactions; i++) {
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = Math.random() * 1000;
    
    // Fecha aleatoria en los últimos 30 días
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    transactions.push({
      amount,
      currency: 'USD',
      status,
      transaction_type: type,
      user_id: userId,
      created_at: date.toISOString(),
      updated_at: date.toISOString()
    });
  }
  
  return transactions;
};

// Productos financieros para demostración
const FINANCIAL_PRODUCTS = [
  {
    name: 'Cuenta Corriente Básica',
    type: 'checking',
    description: 'Cuenta corriente sin comisiones para operaciones básicas',
    interest_rate: 0.0,
    min_amount: 0,
    max_amount: null,
    status: 'active'
  },
  {
    name: 'Cuenta de Ahorros Premium',
    type: 'savings',
    description: 'Cuenta de ahorros con alta rentabilidad',
    interest_rate: 2.5,
    min_amount: 1000,
    max_amount: null,
    status: 'active'
  },
  {
    name: 'Depósito a Plazo 12 Meses',
    type: 'time_deposit',
    description: 'Depósito a plazo fijo con interés garantizado',
    interest_rate: 3.2,
    min_amount: 5000,
    max_amount: 100000,
    status: 'active'
  },
  {
    name: 'Fondo de Inversión Conservador',
    type: 'investment',
    description: 'Fondo de inversión con perfil de riesgo bajo',
    interest_rate: 4.0,
    min_amount: 10000,
    max_amount: null,
    status: 'active'
  },
  {
    name: 'Fondo de Inversión Agresivo',
    type: 'investment',
    description: 'Fondo de inversión con perfil de riesgo alto',
    interest_rate: 8.5,
    min_amount: 25000,
    max_amount: null,
    status: 'active'
  },
  {
    name: 'Tarjeta de Crédito Oro',
    type: 'credit',
    description: 'Tarjeta de crédito con beneficios exclusivos',
    interest_rate: 18.9,
    min_amount: 0,
    max_amount: 10000,
    status: 'active'
  },
  {
    name: 'Préstamo Personal',
    type: 'loan',
    description: 'Préstamo personal con tasa competitiva',
    interest_rate: 9.5,
    min_amount: 1000,
    max_amount: 50000,
    status: 'active'
  },
  {
    name: 'Hipoteca Vivienda',
    type: 'mortgage',
    description: 'Préstamo hipotecario para compra de vivienda',
    interest_rate: 4.2,
    min_amount: 50000,
    max_amount: 500000,
    status: 'active'
  },
  {
    name: 'Cuenta Empresarial',
    type: 'business',
    description: 'Cuenta para empresas con servicios especializados',
    interest_rate: 0.5,
    min_amount: 5000,
    max_amount: null,
    status: 'active'
  },
  {
    name: 'Producto Descontinuado',
    type: 'savings',
    description: 'Producto que ya no está disponible',
    interest_rate: 1.0,
    min_amount: 100,
    max_amount: 10000,
    status: 'inactive'
  }
];

// Función para crear un usuario admin
async function createAdminUser(userData) {
  try {
    // Crear usuario en Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      console.error(`Error al crear usuario admin ${userData.email}:`, authError);
      return null;
    }

    console.log(`Usuario admin creado: ${userData.email} (${authUser.user.id})`);

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
    console.error(`Error inesperado al crear usuario admin ${userData.email}:`, error);
    return null;
  }
}

// Función para crear un usuario regular con perfil
async function createRegularUser(profileData) {
  try {
    const email = `${profileData.firstName.toLowerCase()}.${profileData.lastName.toLowerCase()}@example.com`;
    
    // Crear usuario en Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password: 'password123',
    });

    if (authError) {
      console.error(`Error al crear usuario ${email}:`, authError);
      return null;
    }

    console.log(`Usuario regular creado: ${email} (${authUser.user.id})`);

    // Actualizar perfil
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        profile_type: profileData.profileType,
        kyc_status: profileData.kycStatus
      })
      .eq('id', authUser.user.id);

    if (profileError) {
      console.error(`Error al actualizar perfil para ${email}:`, profileError);
    }

    return authUser.user;
  } catch (error) {
    console.error(`Error inesperado al crear usuario regular:`, error);
    return null;
  }
}

// Función para crear cuentas para un usuario
async function createAccountsForUser(userId) {
  try {
    const accounts = generateAccounts(userId);
    
    for (const account of accounts) {
      const { error } = await supabase
        .from('accounts')
        .insert({
          ...account,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (error) {
        console.error(`Error al crear cuenta para usuario ${userId}:`, error);
      } else {
        console.log(`Cuenta ${account.account_number} creada para usuario ${userId}`);
        
        // Crear transacciones para esta cuenta
        await createTransactionsForUser(userId, account.account_number);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error inesperado al crear cuentas para usuario ${userId}:`, error);
    return false;
  }
}

// Función para crear transacciones para un usuario
async function createTransactionsForUser(userId, accountNumber) {
  try {
    const transactions = generateTransactions(userId, accountNumber);
    
    for (const transaction of transactions) {
      const { error } = await supabase
        .from('transactions')
        .insert(transaction);
        
      if (error) {
        console.error(`Error al crear transacción para usuario ${userId}:`, error);
      }
    }
    
    console.log(`${transactions.length} transacciones creadas para usuario ${userId}`);
    return true;
  } catch (error) {
    console.error(`Error inesperado al crear transacciones para usuario ${userId}:`, error);
    return false;
  }
}

// Función para crear productos financieros
async function createFinancialProducts() {
  try {
    for (const product of FINANCIAL_PRODUCTS) {
      const { error } = await supabase
        .from('financial_products')
        .insert({
          ...product,
          id: uuidv4(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (error) {
        console.error(`Error al crear producto financiero ${product.name}:`, error);
      } else {
        console.log(`Producto financiero creado: ${product.name}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error inesperado al crear productos financieros:`, error);
    return false;
  }
}

// Función principal
async function main() {
  console.log('Iniciando creación de datos de demostración para el panel de administración...');

  // 1. Crear usuarios admin
  console.log('\n=== Creando usuarios admin ===');
  for (const userData of ADMIN_USERS) {
    await createAdminUser(userData);
  }

  // 2. Crear usuarios regulares con perfiles
  console.log('\n=== Creando usuarios regulares con perfiles ===');
  const regularUsers = [];
  for (const profileData of USER_PROFILES) {
    const user = await createRegularUser(profileData);
    if (user) {
      regularUsers.push(user);
    }
  }

  // 3. Crear cuentas para usuarios regulares
  console.log('\n=== Creando cuentas para usuarios ===');
  for (const user of regularUsers) {
    await createAccountsForUser(user.id);
  }

  // 4. Crear productos financieros
  console.log('\n=== Creando productos financieros ===');
  await createFinancialProducts();

  console.log('\nProceso completado. Datos de demostración creados exitosamente.');
}

// Ejecutar script
main().catch(error => {
  console.error('Error en el script principal:', error);
});
