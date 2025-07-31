import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import accentureLogo from "@/assets/acclogo2.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center space-y-12">
        {/* Logo Section */}
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={accentureLogo} 
                alt="Accenture" 
                className="w-64 h-45 drop-shadow-lg opacity-90"
              />
              <div className="absolute -inset-8 bg-gradient-primary opacity-10 rounded-full blur-2xl" />
              <div className="absolute -inset-12 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Assistant Demo
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your specialized AI assistant for audit analysis or investment research
            </p>
          </div>
        </div>

        {/* Use Case Selection */}
        <div className="grid md:grid-cols-2 gap-8 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          {/* Audit Card */}
          <Card className="relative group p-8 bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">Audit Assistant</h3>
                <p className="text-muted-foreground">
                  Analyze audit documents with advanced filtering by department, semester, and topic. 
                  Get instant insights from your compliance data.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Smart document filtering
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Compliance analysis
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Risk assessment tools
                </div>
              </div>

              <Button 
                onClick={() => navigate('/audit')}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
              >
                Enter Audit Mode
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          {/* Investment Card */}
          <Card className="relative group p-8 bg-gradient-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                  <TrendingUp className="w-12 h-12 text-accent" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">Investment Assistant</h3>
                <p className="text-muted-foreground">
                  Research investments with comprehensive data analysis, SQL querying, 
                  and document intelligence for informed decision-making.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 mr-2 text-accent" />
                  SQL database analysis
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 mr-2 text-accent" />
                  Document processing
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 mr-2 text-accent" />
                  Investment insights
                </div>
              </div>

              <Button 
                onClick={() => navigate('/investment')}
                className="w-full bg-accent hover:bg-accent/90 hover:shadow-glow transition-all duration-300 group"
              >
                Enter Investment Mode
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
          Accenture Ai Assistants Demos - Audit Demo - Investment Demo
        </div>
      </div>
    </div>
  );
};

export default Landing;