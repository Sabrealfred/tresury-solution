
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, User, Building, ShieldCheck } from "lucide-react";
import { UserRoleData } from "@/types/auth";
import { DEMO_LOGIN_ENABLED } from "@/lib/authGuard";

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDemoLoading, setIsDemoLoading] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await checkUserRole(session.user.id);
    }
  };

  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      if (data?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verificar si es un usuario de demostración
      if (
        DEMO_LOGIN_ENABLED &&
        ((email === "admin1@demo.com" && password === "admin123") ||
        (email === "user1@demo.com" && password === "user123") ||
        (email === "business@demo.com" && password === "business123"))
      ) {
        // Inicio de sesión de demostración
        handleDemoLogin(email);
        return;
      }

      // Inicio de sesión normal con Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await checkUserRole(data.user.id);
        toast.success("Inicio de sesión exitoso");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    if (!DEMO_LOGIN_ENABLED) return;
    setIsDemoLoading(demoEmail);
    
    // Simular un retraso para la autenticación
    setTimeout(() => {
      let role = "user";
      
      if (demoEmail === "admin1@demo.com") {
        role = "admin";
        navigate("/admin/dashboard");
      } else if (demoEmail === "business@demo.com") {
        role = "business";
        navigate("/business/dashboard");
      } else {
        navigate("/");
      }
      
      // Guardar información del usuario de demostración en localStorage
      localStorage.setItem("demoUser", JSON.stringify({
        email: demoEmail,
        role: role,
        isDemo: true
      }));
      
      toast.success("Inicio de sesión de demostración exitoso");
      setIsDemoLoading(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>

        {DEMO_LOGIN_ENABLED && (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Cuentas de demostración
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button 
              variant="outline" 
              className="flex justify-between items-center"
              onClick={() => handleDemoLogin("admin1@demo.com")}
              disabled={!!isDemoLoading}
            >
              <div className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                <span>Admin</span>
              </div>
              {isDemoLoading === "admin1@demo.com" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="text-xs text-muted-foreground">admin1@demo.com</span>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="flex justify-between items-center"
              onClick={() => handleDemoLogin("user1@demo.com")}
              disabled={!!isDemoLoading}
            >
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-primary" />
                <span>Usuario</span>
              </div>
              {isDemoLoading === "user1@demo.com" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="text-xs text-muted-foreground">user1@demo.com</span>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              className="flex justify-between items-center"
              onClick={() => handleDemoLogin("business@demo.com")}
              disabled={!!isDemoLoading}
            >
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-primary" />
                <span>Negocio</span>
              </div>
              {isDemoLoading === "business@demo.com" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="text-xs text-muted-foreground">business@demo.com</span>
              )}
            </Button>
          </div>
        </div>
        )}
      </Card>
    </div>
  );
}
