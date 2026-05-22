import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  DollarSign,
  FileText,
  BarChart,
  Users,
  Globe,
  Shield,
  ShieldCheck,
  CreditCard,
  Briefcase,
  LayoutDashboard
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

      {/* Commercial Banking Navigation - Just a link to the commercial dashboard */}
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
                Portal Comercial
              </span>
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
