import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Wallet,
  CreditCard,
  LineChart,
  Receipt,
  FileText,
  History,
  DollarSign,
  BriefcaseBusiness,
  BarChart,
  Building,
  Settings,
  Home,
  ShoppingBag,
  Code,
  Shield,
  Users,
  Package,
  HelpCircle,
  Cog
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UnifiedNavigationProps {
  isCollapsed: boolean;
}

export function UnifiedNavigation({ isCollapsed }: UnifiedNavigationProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Get current user profile type
  const { data: profileType } = useQuery({
    queryKey: ['current-profile-type'],
    queryFn: async () => {
      // Check for demo user first
      const demoUserStr = localStorage.getItem("demoUser");
      if (demoUserStr) {
        try {
          const demoUser = JSON.parse(demoUserStr);
          return demoUser.role;
        } catch (e) {
          console.error("Error parsing demo user:", e);
        }
      }

      // If not a demo user, get from Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return "user"; // Default to user

      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_type')
        .eq('id', user.id)
        .single();

      return profile?.profile_type || "user";
    },
  });

  // Get current organization type
  const { data: orgType } = useQuery({
    queryKey: ['current-organization-type'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return "personal";

      const { data: userOrgs } = await supabase
        .from('user_organizations')
        .select(`
          organization:organizations (
            id,
            type
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      return userOrgs?.organization?.type || "personal";
    },
  });

  // Determine which navigation items to show based on profile and organization type
  const showAdminItems = profileType === "admin";
  const showPersonalItems = !orgType || orgType === "personal";
  const showBusinessItems = orgType === "business";
  const showCommercialItems = orgType === "commercial";
  const showPrivateItems = orgType === "private_banking";
  const showDeveloperItems = profileType === "developer";

  return (
    <nav className="space-y-4">
      {/* Admin users are redirected to the admin panel */}
      {showAdminItems && (
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h2 className={`text-xs font-semibold ${isCollapsed ? 'sr-only' : ''}`}>
              Administración
            </h2>
          </div>
          <Link to="/admin/dashboard">
            <Button variant="secondary" className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Shield className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Ir al Panel Admin
              </span>
            </Button>
          </Link>
        </div>
      )}

      {/* Personal Banking Navigation */}
      {showPersonalItems && (
        <div className="space-y-1">
          {!showAdminItems && (
            <div className="px-3 py-2">
              <h2 className={`text-xs font-semibold ${isCollapsed ? 'sr-only' : ''}`}>
                Personal
              </h2>
            </div>
          )}
          <Link to="/personal">
            <Button variant={isActive('/personal') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Home className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Dashboard
              </span>
            </Button>
          </Link>
          <Link to="/wallet">
            <Button variant={isActive('/wallet') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Wallet className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Mi Wallet
              </span>
            </Button>
          </Link>
          <Link to="/cards">
            <Button variant={isActive('/cards') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <CreditCard className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Tarjetas
              </span>
            </Button>
          </Link>
          <Link to="/investments">
            <Button variant={isActive('/investments') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <LineChart className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Inversiones
              </span>
            </Button>
          </Link>
          <Link to="/transfer">
            <Button variant={isActive('/transfer') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Building2 className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Transferencias
              </span>
            </Button>
          </Link>
          <Link to="/bills">
            <Button variant={isActive('/bills') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Receipt className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Pago de Servicios
              </span>
            </Button>
          </Link>
          <Link to="/deposits">
            <Button variant={isActive('/deposits') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <DollarSign className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Depósitos
              </span>
            </Button>
          </Link>
          <Link to="/history">
            <Button variant={isActive('/history') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <History className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Historial
              </span>
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant={isActive('/marketplace') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <ShoppingBag className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Marketplace
              </span>
            </Button>
          </Link>
        </div>
      )}

      {/* Business Banking Navigation */}
      {showBusinessItems && (
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h2 className={`text-xs font-semibold ${isCollapsed ? 'sr-only' : ''}`}>
              Negocio
            </h2>
          </div>
          <Link to="/business/dashboard">
            <Button variant={isActive('/business/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Building className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Dashboard
              </span>
            </Button>
          </Link>
          
          {/* Accounts & Transactions */}
          <Link to="/business/accounts">
            <Button variant={isActive('/business/accounts') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Wallet className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Cuentas
              </span>
            </Button>
          </Link>
          <Link to="/business/transactions">
            <Button variant={isActive('/business/transactions') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <History className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Transacciones
              </span>
            </Button>
          </Link>
          
          {/* Payments & Transfers */}
          <Link to="/business/transfers">
            <Button variant={isActive('/business/transfers') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Building2 className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Transferencias
              </span>
            </Button>
          </Link>
          <Link to="/business/payments">
            <Button variant={isActive('/business/payments') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Receipt className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Pagos
              </span>
            </Button>
          </Link>
          <Link to="/business/invoices">
            <Button variant={isActive('/business/invoices') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <FileText className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Facturación
              </span>
            </Button>
          </Link>
          
          {/* Financial Management */}
          <Link to="/business/cash-flow">
            <Button variant={isActive('/business/cash-flow') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <LineChart className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Flujo de Caja
              </span>
            </Button>
          </Link>
          <Link to="/business/loans">
            <Button variant={isActive('/business/loans') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <DollarSign className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Préstamos
              </span>
            </Button>
          </Link>
          <Link to="/business/investments">
            <Button variant={isActive('/business/investments') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <BarChart className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Inversiones
              </span>
            </Button>
          </Link>
          
          {/* Business Services */}
          <Link to="/business/payroll">
            <Button variant={isActive('/business/payroll') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Users className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Nómina
              </span>
            </Button>
          </Link>
          <Link to="/business/taxes">
            <Button variant={isActive('/business/taxes') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <FileText className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Impuestos
              </span>
            </Button>
          </Link>
          <Link to="/business/reports">
            <Button variant={isActive('/business/reports') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <FileText className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Informes
              </span>
            </Button>
          </Link>
        </div>
      )}

      {/* Commercial Banking Navigation */}
      {showCommercialItems && (
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h2 className={`text-xs font-semibold ${isCollapsed ? 'sr-only' : ''}`}>
              Comercial
            </h2>
          </div>
          <Link to="/commercial/dashboard">
            <Button variant={isActive('/commercial/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Building2 className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Dashboard
              </span>
            </Button>
          </Link>

          {/* Treasury Section */}
          <Link to="/commercial/treasury">
            <Button variant={isActive('/commercial/treasury') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <DollarSign className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Treasury Management
              </span>
            </Button>
          </Link>
          <Link to="/commercial/treasury/cash-flow">
            <Button variant={isActive('/commercial/treasury/cash-flow') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <LineChart className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Cash Flow
              </span>
            </Button>
          </Link>
          <Link to="/commercial/treasury/fx">
            <Button variant={isActive('/commercial/treasury/fx') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <BarChart className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                FX Operations
              </span>
            </Button>
          </Link>

          {/* Operations Section */}
          <Link to="/commercial/operations">
            <Button variant={isActive('/commercial/operations') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Building2 className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Operations
              </span>
            </Button>
          </Link>
          <Link to="/commercial/payroll">
            <Button variant={isActive('/commercial/payroll') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <Receipt className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Payroll
              </span>
            </Button>
          </Link>
          <Link to="/commercial/invoices">
            <Button variant={isActive('/commercial/invoices') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <FileText className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Invoicing
              </span>
            </Button>
          </Link>
          <Link to="/commercial/trade-finance">
            <Button variant={isActive('/commercial/trade-finance') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <BriefcaseBusiness className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Trade Finance
              </span>
            </Button>
          </Link>

          {/* Fund Management Section */}
          <Link to="/commercial/fund-management">
            <Button variant={isActive('/commercial/fund-management') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Wallet className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Fund Management
              </span>
            </Button>
          </Link>
          <Link to="/commercial/fund-management/portfolios">
            <Button variant={isActive('/commercial/fund-management/portfolios') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <LineChart className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Portfolios
              </span>
            </Button>
          </Link>
          <Link to="/commercial/fund-management/trade">
            <Button variant={isActive('/commercial/fund-management/trade') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <BarChart className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Trading
              </span>
            </Button>
          </Link>
          <Link to="/commercial/fund-management/reports">
            <Button variant={isActive('/commercial/fund-management/reports') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <FileText className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Reports
              </span>
            </Button>
          </Link>

          {/* Organization Management Section */}
          <Link to="/commercial/organization/permissions">
            <Button variant={isActive('/commercial/organization/permissions') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Users className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Organization
              </span>
            </Button>
          </Link>
          <Link to="/commercial/organization/permissions">
            <Button variant={isActive('/commercial/organization/permissions') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
              <Shield className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Permissions
              </span>
            </Button>
          </Link>
        </div>
      )}

      {/* Private Banking Navigation */}
      {showPrivateItems && (
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h2 className={`text-xs font-semibold ${isCollapsed ? 'sr-only' : ''}`}>
              Banca Privada
            </h2>
          </div>
          <Link to="/private/dashboard">
            <Button variant={isActive('/private/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Settings className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Dashboard
              </span>
            </Button>
          </Link>
          {/* Add more private banking navigation items here */}
        </div>
      )}

      {/* Developer Portal Navigation */}
      {showDeveloperItems && (
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h2 className={`text-xs font-semibold ${isCollapsed ? 'sr-only' : ''}`}>
              Desarrollador
            </h2>
          </div>
          <Link to="/developer/dashboard">
            <Button variant={isActive('/developer/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Code className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Dashboard
              </span>
            </Button>
          </Link>
          {/* Add more developer navigation items here */}
        </div>
      )}
    </nav>
  );
}
