
import { useState } from "react";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserMenu } from "./user-menu";
import { AppFooter } from "./app-footer";
import { ProfileSelector } from "../profile/ProfileSelector";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState({
    company: true,
    legal: true,
    support: true,
  });

  const handleLogout = async () => {
    try {
      // Verificar si es un usuario de demostración
      const demoUser = localStorage.getItem("demoUser");
      if (demoUser) {
        // Eliminar la información del usuario de demostración
        localStorage.removeItem("demoUser");
        toast.success("Sesión de demostración cerrada exitosamente");
        navigate("/auth");
        return;
      }
      
      // Cerrar sesión normal con Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Sesión cerrada exitosamente");
      navigate("/auth");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleFooterSection = (section: keyof typeof isFooterMenuOpen) => {
    setIsFooterMenuOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background transition-colors duration-300`}>
      <div className="flex-1 flex">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-0 z-40 md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}>
          <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
          <div className="relative z-50 h-full flex flex-col">
            <SidebarNav 
              className="flex-1" 
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
            <div className="p-4 border-t md:hidden">
              <ProfileSelector />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="p-4 flex items-center justify-end border-b gap-4">
            <div className="hidden md:block">
              <ProfileSelector />
            </div>
            <UserMenu onLogout={handleLogout} />
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>

      <AppFooter 
        footerSections={isFooterMenuOpen}
        onToggleSection={toggleFooterSection}
      />
    </div>
  );
}
