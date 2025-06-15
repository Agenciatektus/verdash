import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl verdash-gradient flex items-center justify-center shadow-lg">
              <Activity className="w-10 h-10 text-white" />
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-grotesk font-bold mb-6 verdash-glow-text">
              Verdash
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              Transforme seus dados em insights poderosos com nossa plataforma de dashboards inteligentes
            </p>
            
            {/* CTA Button */}
            <Link to="/login">
              <Button 
                size="lg" 
                className="verdash-btn-primary text-lg px-8 py-6"
              >
                Começar Agora
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 