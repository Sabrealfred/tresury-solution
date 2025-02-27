import type { Database as DatabaseDefinition } from '@/types/supabase';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = DatabaseDefinition;

// Tipos adicionales para las tablas de permisos
export interface UserPermissionRow {
  id: string;
  user_id: string;
  organization_id: string;
  permission_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserOrganizationRow {
  id: string;
  user_id: string;
  organization_id: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationRow {
  id: string;
  name: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Tipo original para referencia
export type DatabaseOriginal = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_number: string
          balance: number | null
          created_at: string
          currency: string | null
          id: string
          is_active: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_number: string
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_number?: string
          balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bill_payments: {
        Row: {
          account_number: string | null
          amount: number
          created_at: string | null
          currency: string | null
          due_date: string | null
          id: string
          is_recurring: boolean | null
          payment_date: string | null
          provider_name: string
          service_type: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_number?: string | null
          amount: number
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          is_recurring?: boolean | null
          payment_date?: string | null
          provider_name: string
          service_type: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_number?: string | null
          amount?: number
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          is_recurring?: boolean | null
          payment_date?: string | null
          provider_name?: string
          service_type?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_rules: {
        Row: {
          actions: Json
          conditions: Json
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          module_name: string
          parameters: Json
          priority: number | null
          rule_code: string
          rule_name: string
          updated_at: string | null
        }
        Insert: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          module_name: string
          parameters?: Json
          priority?: number | null
          rule_code: string
          rule_name: string
          updated_at?: string | null
        }
        Update: {
          actions?: Json
          conditions?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          module_name?: string
          parameters?: Json
          priority?: number | null
          rule_code?: string
          rule_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      cards: {
        Row: {
          card_number: string | null
          card_status: string | null
          card_type: string
          created_at: string
          cvv: string | null
          expiry_date: string | null
          id: string
          is_virtual: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          card_number?: string | null
          card_status?: string | null
          card_type: string
          created_at?: string
          cvv?: string | null
          expiry_date?: string | null
          id?: string
          is_virtual?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          card_number?: string | null
          card_status?: string | null
          card_type?: string
          created_at?: string
          cvv?: string | null
          expiry_date?: string | null
          id?: string
          is_virtual?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      check_deposits: {
        Row: {
          account_number: string | null
          amount: number
          back_image_url: string | null
          bank_name: string | null
          check_number: string | null
          created_at: string | null
          currency: string | null
          deposit_date: string | null
          front_image_url: string | null
          id: string
          notes: string | null
          review_date: string | null
          routing_number: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_number?: string | null
          amount: number
          back_image_url?: string | null
          bank_name?: string | null
          check_number?: string | null
          created_at?: string | null
          currency?: string | null
          deposit_date?: string | null
          front_image_url?: string | null
          id?: string
          notes?: string | null
          review_date?: string | null
          routing_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_number?: string | null
          amount?: number
          back_image_url?: string | null
          bank_name?: string | null
          check_number?: string | null
          created_at?: string | null
          currency?: string | null
          deposit_date?: string | null
          front_image_url?: string | null
          id?: string
          notes?: string | null
          review_date?: string | null
          routing_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      currencies: {
        Row: {
          code: string
          created_at: string | null
          exchange_rate: number
          id: string
          name: string
          symbol: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          exchange_rate?: number
          id?: string
          name: string
          symbol: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          exchange_rate?: number
          id?: string
          name?: string
          symbol?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      developer_keys: {
        Row: {
          api_key: string
          created_at: string | null
          environment: string
          id: string
          is_active: boolean | null
          last_used: string | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          environment: string
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          environment?: string
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      financial_products: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          interest_rate: number | null
          max_amount: number | null
          min_amount: number | null
          name: string
          status: string | null
          terms: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          interest_rate?: number | null
          max_amount?: number | null
          min_amount?: number | null
          name: string
          status?: string | null
          terms?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          interest_rate?: number | null
          max_amount?: number | null
          min_amount?: number | null
          name?: string
          status?: string | null
          terms?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      implementation_progress: {
        Row: {
          created_at: string | null
          id: string
          module_id: string | null
          notes: string | null
          phase: string
          progress_percentage: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          module_id?: string | null
          notes?: string | null
          phase: string
          progress_percentage?: number | null
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          module_id?: string | null
          notes?: string | null
          phase?: string
          progress_percentage?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "implementation_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "system_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_documents: {
        Row: {
          created_at: string
          document_status: string | null
          document_type: string
          document_url: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_status?: string | null
          document_type: string
          document_url?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_status?: string | null
          document_type?: string
          document_url?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string
          id: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description: string
          id?: string
          title: string
          type?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string
          id?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      profile_types: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          kyc_status: string | null
          last_name: string | null
          phone_number: string | null
          profile_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          kyc_status?: string | null
          last_name?: string | null
          phone_number?: string | null
          profile_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          kyc_status?: string | null
          last_name?: string | null
          phone_number?: string | null
          profile_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_profile_type_fkey"
            columns: ["profile_type"]
            isOneToOne: false
            referencedRelation: "profile_types"
            referencedColumns: ["code"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          permissions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scheduled_savings: {
        Row: {
          amount_per_frequency: number
          created_at: string | null
          currency: string | null
          current_amount: number | null
          destination_wallet_id: string | null
          end_date: string | null
          frequency: string
          id: string
          name: string
          source_wallet_id: string | null
          start_date: string | null
          status: string | null
          target_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount_per_frequency: number
          created_at?: string | null
          currency?: string | null
          current_amount?: number | null
          destination_wallet_id?: string | null
          end_date?: string | null
          frequency: string
          id?: string
          name: string
          source_wallet_id?: string | null
          start_date?: string | null
          status?: string | null
          target_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount_per_frequency?: number
          created_at?: string | null
          currency?: string | null
          current_amount?: number | null
          destination_wallet_id?: string | null
          end_date?: string | null
          frequency?: string
          id?: string
          name?: string
          source_wallet_id?: string | null
          start_date?: string | null
          status?: string | null
          target_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string
          id: string
          resolution: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description: string
          id?: string
          resolution?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string
          id?: string
          resolution?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_modules: {
        Row: {
          category: string
          created_at: string | null
          dependencies: Json | null
          description: string | null
          id: string
          is_active: boolean | null
          module_code: string
          name: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          dependencies?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          module_code: string
          name: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          dependencies?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          module_code?: string
          name?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      time_deposits: {
        Row: {
          amount: number
          auto_renew: boolean | null
          created_at: string | null
          currency: string | null
          id: string
          interest_rate: number
          maturity_date: string | null
          start_date: string | null
          status: string | null
          term_months: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          auto_renew?: boolean | null
          created_at?: string | null
          currency?: string | null
          id?: string
          interest_rate: number
          maturity_date?: string | null
          start_date?: string | null
          status?: string | null
          term_months: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          auto_renew?: boolean | null
          created_at?: string | null
          currency?: string | null
          id?: string
          interest_rate?: number
          maturity_date?: string | null
          start_date?: string | null
          status?: string | null
          term_months?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          id: string
          profile_id: string | null
          status: string
          transaction_type: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          id?: string
          profile_id?: string | null
          status?: string
          transaction_type: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          id?: string
          profile_id?: string | null
          status?: string
          transaction_type?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transfer_types: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          requirements: Json | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          requirements?: Json | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          requirements?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transfers: {
        Row: {
          amount: number
          created_at: string | null
          destination_currency: string
          destination_details: Json
          destination_type: string
          exchange_rate: number
          id: string
          is_recurring: boolean | null
          recipient_bank_info: Json | null
          scheduled_date: string | null
          source_currency: string
          source_wallet_id: string
          status: string | null
          transfer_method: string
          transfer_type_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          destination_currency: string
          destination_details: Json
          destination_type: string
          exchange_rate: number
          id?: string
          is_recurring?: boolean | null
          recipient_bank_info?: Json | null
          scheduled_date?: string | null
          source_currency: string
          source_wallet_id: string
          status?: string | null
          transfer_method?: string
          transfer_type_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          destination_currency?: string
          destination_details?: Json
          destination_type?: string
          exchange_rate?: number
          id?: string
          is_recurring?: boolean | null
          recipient_bank_info?: Json | null
          scheduled_date?: string | null
          source_currency?: string
          source_wallet_id?: string
          status?: string | null
          transfer_method?: string
          transfer_type_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transfers_transfer_type_id_fkey"
            columns: ["transfer_type_id"]
            isOneToOne: false
            referencedRelation: "transfer_types"
            referencedColumns: ["id"]
          },
        ]
      }
      treasury_balances: {
        Row: {
          amount: number
          balance_date: string | null
          created_at: string | null
          currency: string
          division: string | null
          entity_id: string | null
          id: string
          region: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          balance_date?: string | null
          created_at?: string | null
          currency: string
          division?: string | null
          entity_id?: string | null
          id?: string
          region?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          balance_date?: string | null
          created_at?: string | null
          currency?: string
          division?: string | null
          entity_id?: string | null
          id?: string
          region?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treasury_balances_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      treasury_forecasts: {
        Row: {
          amount: number
          confidence_level: number | null
          created_at: string | null
          currency: string
          entity_id: string | null
          forecast_date: string | null
          forecast_type: string
          id: string
          metadata: Json | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          confidence_level?: number | null
          created_at?: string | null
          currency: string
          entity_id?: string | null
          forecast_date?: string | null
          forecast_type: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          confidence_level?: number | null
          created_at?: string | null
          currency?: string
          entity_id?: string | null
          forecast_date?: string | null
          forecast_type?: string
          id?: string
          metadata?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treasury_forecasts_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      treasury_reconciliation_rules: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          pattern: string
          priority: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          pattern: string
          priority?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          pattern?: string
          priority?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      treasury_tags: {
        Row: {
          color: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          rule_pattern: string | null
          updated_at: string | null
        }
        Insert: {
          color: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rule_pattern?: string | null
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rule_pattern?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      treasury_transactions: {
        Row: {
          amount: number
          bai_code: string | null
          bank_name: string
          created_at: string | null
          currency: string
          description: string | null
          entity_id: string | null
          id: string
          metadata: Json | null
          status: string | null
          tags: Json | null
          transaction_date: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          bai_code?: string | null
          bank_name: string
          created_at?: string | null
          currency: string
          description?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          tags?: Json | null
          transaction_date?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          bai_code?: string | null
          bank_name?: string
          created_at?: string | null
          currency?: string
          description?: string | null
          entity_id?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          tags?: Json | null
          transaction_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treasury_transactions_entity_id_fkey"
            columns: ["entity_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_organizations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          organization_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          organization_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          organization_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_organizations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profile_types: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          profile_type_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          profile_type_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          profile_type_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profile_types_profile_type_id_fkey"
            columns: ["profile_type_id"]
            isOneToOne: false
            referencedRelation: "profile_types"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance: number
          created_at: string | null
          currency_code: string
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          balance?: number
          created_at?: string | null
          currency_code?: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          balance?: number
          created_at?: string | null
          currency_code?: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: "savings" | "checking" | "investment" | "credit"
      business_type: "personal" | "business" | "commercial" | "private_banking"
      kyc_status: "pending" | "approved" | "rejected"
      profile_type:
        | "personal"
        | "business"
        | "commercial"
        | "private_banking"
        | "developer"
      ticket_status: "open" | "in_progress" | "closed" | "escalated"
      transaction_status: "pending" | "approved" | "rejected" | "completed"
      transaction_type: "deposit" | "withdrawal" | "transfer" | "payment"
      user_role: "admin" | "user" | "auditor" | "operator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
