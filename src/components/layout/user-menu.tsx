
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, CircleUser, ChevronDown, ShieldCheck, User, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserMenuProps {
  onLogout: () => Promise<void>;
}

interface UserInfo {
  name: string;
  email: string;
  role: string;
  isDemo?: boolean;
}

export function UserMenu({ onLogout }: UserMenuProps) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "Usuario",
    email: "usuario@ejemplo.com",
    role: "user"
  });

  useEffect(() => {
    const getUserInfo = async () => {
      // Verificar si hay un usuario de demostración
      const demoUserStr = localStorage.getItem("demoUser");
      if (demoUserStr) {
        try {
          const demoUser = JSON.parse(demoUserStr);
          let name = "Usuario";
          let icon = User;
          
          if (demoUser.role === "admin") {
            name = "Administrador";
          } else if (demoUser.role === "business") {
            name = "Negocio";
          }
          
          setUserInfo({
            name: name,
            email: demoUser.email,
            role: demoUser.role,
            isDemo: true
          });
          return;
        } catch (e) {
          console.error("Error parsing demo user:", e);
        }
      }

      // Si no hay usuario de demostración, obtener información del usuario real
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Obtener perfil del usuario
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, profile_type')
            .eq('id', user.id)
            .single();

          setUserInfo({
            name: profile ? `${profile.first_name} ${profile.last_name}` : "Usuario",
            email: user.email || "sin correo",
            role: profile?.profile_type || "user"
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    getUserInfo();
  }, []);

  const getRoleIcon = () => {
    switch (userInfo.role) {
      case "admin":
        return <ShieldCheck className="h-4 w-4 text-primary" />;
      case "business":
        return <Building className="h-4 w-4 text-primary" />;
      default:
        return <User className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-1">
              {getRoleIcon()}
              <h2 className="text-xl font-semibold text-left">{userInfo.name}</h2>
              {userInfo.isDemo && (
                <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">
                  Demo
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-left">{userInfo.email}</p>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            <CircleUser className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
