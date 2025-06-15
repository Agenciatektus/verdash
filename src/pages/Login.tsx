import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState("admin@verdash.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/app/dashboard";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      <Card className="w-full max-w-md verdash-card border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl verdash-gradient flex items-center justify-center shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">Verdash</CardTitle>
            <CardDescription className="text-muted-foreground">
              Entre na sua conta para acessar seus dashboards
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-background/50 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full verdash-gradient hover:opacity-90 transition-opacity"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="link" className="text-sm text-muted-foreground">
              Esqueceu sua senha?
            </Button>
          </div>

          <div className="mt-4 p-4 bg-muted/20 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo:</strong> Use as credenciais pré-preenchidas para testar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
