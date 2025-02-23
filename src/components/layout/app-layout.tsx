
import { useState } from "react";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DarkModeToggle } from "./dark-mode-toggle";
import { UserMenu } from "./user-menu";
import { AppFooter } from "./app-footer";

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
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-pink-50 via-white to-blue-50'}`}>
      <div className="flex-1 flex">
        {/* Sidebar Toggle and Dark Mode Buttons */}
        <div className="fixed top-4 left-4 z-50 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        </div>

        {/* Sidebar with overlay for mobile */}
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-0 z-40 md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}>
          <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
          <SidebarNav className="relative z-50" />
        </div>

        <div className="flex-1">
          <div className="p-4 flex justify-end">
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
