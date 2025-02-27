export interface Organization {
  id: string;
  name: string;
  type: string; // Cambiado para aceptar cualquier string
  status: string; // Cambiado para aceptar cualquier string
  created_at: string;
  updated_at: string;
}

export interface UserOrganization {
  id: string;
  user_id: string;
  organization_id: string;
  role: string; // Cambiado para aceptar cualquier string
  is_active: boolean;
  created_at: string;
  updated_at: string;
  organization?: Organization;
}

export interface UserPermission {
  id: string;
  user_id: string;
  organization_id: string;
  permission_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user' | 'business' | 'commercial' | 'private' | 'developer';
  created_at: string;
  updated_at: string;
}

// Lista de permisos disponibles en el sistema
export const PERMISSIONS = {
  // Permisos generales
  VIEW_DASHBOARD: 'view_dashboard',
  
  // Permisos de tesorería
  VIEW_TREASURY: 'view_treasury',
  MANAGE_TREASURY: 'manage_treasury',
  VIEW_CASH_FLOW: 'view_cash_flow',
  MANAGE_CASH_FLOW: 'manage_cash_flow',
  VIEW_FX: 'view_fx',
  EXECUTE_FX: 'execute_fx',
  
  // Permisos de operaciones
  VIEW_OPERATIONS: 'view_operations',
  MANAGE_OPERATIONS: 'manage_operations',
  VIEW_PAYROLL: 'view_payroll',
  MANAGE_PAYROLL: 'manage_payroll',
  VIEW_INVOICES: 'view_invoices',
  MANAGE_INVOICES: 'manage_invoices',
  VIEW_EXPENSES: 'view_expenses',
  MANAGE_EXPENSES: 'manage_expenses',
  
  // Permisos de gestión de fondos
  VIEW_FUND: 'view_fund',
  MANAGE_FUND: 'manage_fund',
  VIEW_PORTFOLIOS: 'view_portfolios',
  MANAGE_PORTFOLIOS: 'manage_portfolios',
  VIEW_TRADING: 'view_trading',
  EXECUTE_TRADING: 'execute_trading',
  VIEW_REPORTS: 'view_reports',
  GENERATE_REPORTS: 'generate_reports',
  
  // Permisos de administración
  MANAGE_USERS: 'manage_users',
  MANAGE_PERMISSIONS: 'manage_permissions',
  VIEW_ORGANIZATION: 'view_organization',
  MANAGE_ORGANIZATION: 'manage_organization'
};

// Grupos de permisos predefinidos
export const PERMISSION_GROUPS = {
  // Grupo para propietarios (todos los permisos)
  OWNER: Object.values(PERMISSIONS),
  
  // Grupo para administradores
  ADMIN: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_TREASURY,
    PERMISSIONS.MANAGE_TREASURY,
    PERMISSIONS.VIEW_OPERATIONS,
    PERMISSIONS.MANAGE_OPERATIONS,
    PERMISSIONS.VIEW_FUND,
    PERMISSIONS.MANAGE_FUND,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_PERMISSIONS,
    PERMISSIONS.VIEW_ORGANIZATION,
    PERMISSIONS.MANAGE_ORGANIZATION
  ],
  
  // Grupo para finanzas
  FINANCE: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_TREASURY,
    PERMISSIONS.MANAGE_TREASURY,
    PERMISSIONS.VIEW_CASH_FLOW,
    PERMISSIONS.MANAGE_CASH_FLOW,
    PERMISSIONS.VIEW_FX,
    PERMISSIONS.EXECUTE_FX,
    PERMISSIONS.VIEW_FUND,
    PERMISSIONS.VIEW_PORTFOLIOS,
    PERMISSIONS.VIEW_REPORTS
  ],
  
  // Grupo para operaciones
  OPERATIONS: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_OPERATIONS,
    PERMISSIONS.MANAGE_OPERATIONS,
    PERMISSIONS.VIEW_PAYROLL,
    PERMISSIONS.MANAGE_PAYROLL,
    PERMISSIONS.VIEW_INVOICES,
    PERMISSIONS.MANAGE_INVOICES,
    PERMISSIONS.VIEW_EXPENSES,
    PERMISSIONS.MANAGE_EXPENSES
  ],
  
  // Grupo para inversiones
  INVESTMENTS: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_FUND,
    PERMISSIONS.MANAGE_FUND,
    PERMISSIONS.VIEW_PORTFOLIOS,
    PERMISSIONS.MANAGE_PORTFOLIOS,
    PERMISSIONS.VIEW_TRADING,
    PERMISSIONS.EXECUTE_TRADING,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.GENERATE_REPORTS
  ],
  
  // Grupo para visualización (solo lectura)
  VIEWER: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_TREASURY,
    PERMISSIONS.VIEW_CASH_FLOW,
    PERMISSIONS.VIEW_OPERATIONS,
    PERMISSIONS.VIEW_PAYROLL,
    PERMISSIONS.VIEW_INVOICES,
    PERMISSIONS.VIEW_EXPENSES,
    PERMISSIONS.VIEW_FUND,
    PERMISSIONS.VIEW_PORTFOLIOS,
    PERMISSIONS.VIEW_TRADING,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_ORGANIZATION
  ]
};
