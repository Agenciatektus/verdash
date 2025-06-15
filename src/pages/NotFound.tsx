
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      
      <Card className="w-full max-w-md verdash-card border-border/50 shadow-2xl relative z-10">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl verdash-gradient flex items-center justify-center shadow-lg">
            <Activity className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Página não encontrada</h2>
            <p className="text-muted-foreground">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full verdash-gradient"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir para Dashboard
            </Button>
          </div>

          <div className="pt-4 text-xs text-muted-foreground">
            Se você acredita que isso é um erro, entre em contato com o suporte.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
