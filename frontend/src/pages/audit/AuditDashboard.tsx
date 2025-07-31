import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Send, Eye, ArrowLeft, Filter, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuditChatbot from "@/components/audit/AuditChatbot";
import DocumentResults from "@/components/audit/DocumentResults";

const AuditDashboard = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [topic, setTopic] = useState("");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    if (query.trim()) {
      setShowResults(true);
    }
  };

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
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-xl font-semibold">Audit Assistant</h1>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/audit/documents')}
              className="hover:bg-primary/10 hover:border-primary/50"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Documents
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gradient-card border-border/50 sticky top-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Filters</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={semester} onValueChange={setSemester}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1-2024">Q1 2024</SelectItem>
                        <SelectItem value="q2-2024">Q2 2024</SelectItem>
                        <SelectItem value="q3-2024">Q3 2024</SelectItem>
                        <SelectItem value="q4-2023">Q4 2023</SelectItem>
                        <SelectItem value="q3-2023">Q3 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select value={topic} onValueChange={setTopic}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="risk-assessment">Risk Assessment</SelectItem>
                        <SelectItem value="financial-review">Financial Review</SelectItem>
                        <SelectItem value="operational-audit">Operational Audit</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {(department || semester || topic) && (
                  <div className="space-y-2">
                    <Label>Active Filters</Label>
                    <div className="flex flex-wrap gap-2">
                      {department && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {department}
                        </Badge>
                      )}
                      {semester && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {semester}
                        </Badge>
                      )}
                      {topic && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {topic}
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setDepartment("");
                        setSemester("");
                        setTopic("");
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Query Input */}
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Ask Your Question</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="query">Query</Label>
                    <Input
                      id="query"
                      placeholder="Ask about compliance issues, risk assessments, or any audit-related questions..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="min-h-[100px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSubmit}
                    disabled={!query.trim()}
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Analyze Query
                  </Button>
                </div>
              </div>
            </Card>

            {/* Chatbot Component */}
            <AuditChatbot 
              query={query}
              filters={{ department, semester, topic }}
              showResults={showResults}
              onResultsToggle={setShowResults}
            />

            {/* Results */}
            {showResults && query && (
              <DocumentResults 
                query={query}
                filters={{ department, semester, topic }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;