
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  profile_type?: string;
  created_at: string;
  updated_at: string;
}

// Importamos los tipos de permisos
import type { Organization, UserOrganization, UserPermission, UserRole } from './permissions';

// Exportamos para que estén disponibles al importar desde database.ts
export type { Organization, UserOrganization, UserPermission, UserRole };

export interface Transaction {
  id: string;
  user_id: string;
  transaction_type: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  currency_code: string;
  created_at: string;
  updated_at: string;
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
  exchange_rate: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  description: string;
  type: string;
  amount?: number;
  created_at: string;
}
