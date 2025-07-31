import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, ArrowLeft, MessageSquare, Upload, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvestmentChat from "@/components/investment/InvestmentChat";
import InvestmentDocuments from "@/components/investment/InvestmentDocuments";
import InvestmentData from "@/components/investment/InvestmentData";

const InvestmentLayout = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <h1 className="text-xl font-semibold">Investment Assistant</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <Card className="p-1 bg-gradient-card border-border/50">
            <TabsList className="grid w-full grid-cols-3 bg-transparent">
              <TabsTrigger 
                value="chat" 
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Upload className="w-4 h-4" />
                <span>Documents</span>
              </TabsTrigger>
              <TabsTrigger 
                value="data" 
                className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Database className="w-4 h-4" />
                <span>Data</span>
              </TabsTrigger>
            </TabsList>
          </Card>

          {/* Tab Content */}
          <TabsContent value="chat" className="mt-0">
            <InvestmentChat />
          </TabsContent>

          <TabsContent value="documents" className="mt-0">
            <InvestmentDocuments />
          </TabsContent>

          <TabsContent value="data" className="mt-0">
            <InvestmentData />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestmentLayout;