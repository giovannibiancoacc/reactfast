import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, User, Eye, EyeOff, Loader2, Zap, Settings } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface AuditChatbotProps {
  query: string;
  filters: {
    department: string;
    semester: string;
    topic: string;
  };
  showResults: boolean;
  onResultsToggle: (show: boolean) => void;
}

const AuditChatbot = ({ query, filters, showResults, onResultsToggle }: AuditChatbotProps) => {
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  useEffect(() => {
    if (query && showResults) {
      setIsThinking(true);
      setResponse(null);
      
      // Simulate API call with delay
      setTimeout(() => {
        setIsThinking(false);
        setResponse(getMockResponse(query, filters));
      }, 2000);
    }
  }, [query, filters, showResults]);

  const getMockResponse = (query: string, filters: any) => {
    // Mock response based on query content
    if (query.toLowerCase().includes('compliance')) {
      return `Based on your query about compliance, I've analyzed the relevant documents with the following filters applied:

**Key Findings:**
- **Compliance Status**: 94% compliant across all reviewed departments
- **Critical Issues**: 3 minor violations identified in Q1 2024
- **Risk Level**: Low to Medium

**Summary:**
The compliance review indicates strong adherence to SOX requirements with minor procedural gaps in the ${filters.department || 'Finance'} department. The issues are primarily related to documentation timing rather than substantive compliance failures.

**Recommendations:**
1. Implement automated documentation workflows
2. Enhanced quarterly review processes
3. Staff training on new compliance procedures

**Documents Retrieved:** 8 relevant documents found matching your criteria.`;
    }

    if (query.toLowerCase().includes('risk')) {
      return `I've completed a comprehensive risk assessment analysis based on your query and filters:

**Risk Assessment Overview:**
- **Overall Risk Score**: 2.3/5 (Low-Medium)
- **High Priority Items**: 2 identified
- **Mitigation Status**: 78% of risks have active mitigation plans

**Key Risk Areas:**
1. **Operational Risk**: Process inefficiencies in ${filters.department || 'Operations'}
2. **Technology Risk**: Legacy system dependencies
3. **Compliance Risk**: Regulatory changes impact assessment

**Trending Indicators:**
- Risk scores have decreased by 15% compared to previous quarter
- Mitigation effectiveness has improved by 22%

**Documents Retrieved:** 12 relevant risk assessment documents found.`;
    }

    return `I've analyzed your query "${query}" using the specified filters and found relevant insights:

**Analysis Results:**
- **Query Scope**: ${filters.department || 'All departments'} ${filters.semester ? `for ${filters.semester}` : ''}
- **Focus Area**: ${filters.topic || 'General audit review'}
- **Confidence Level**: High (92%)

**Key Insights:**
- Data analysis shows positive trends in the specified areas
- Identified 5 actionable recommendations for improvement
- Strong correlation with industry best practices

**Summary:**
The analysis reveals well-controlled processes with opportunities for optimization. The ${filters.department || 'selected'} department shows strong performance indicators with minor areas for enhancement.

**Documents Retrieved:** 6 relevant documents found matching your search criteria.`;
  };

  if (!showResults || !query) {
    return null;
  }

  return (
    <Card className="bg-gradient-card border-border/50 overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">AI Assistant Response</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onResultsToggle(!showResults)}
            className="hover:bg-primary/10"
          >
            {showResults ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showResults ? 'Hide' : 'Show'} Details
          </Button>
        </div>

        <Separator />

        {/* User Query */}
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="bg-secondary/30 rounded-lg p-3">
              <p className="text-sm">{query}</p>
            </div>
            {(filters.department || filters.semester || filters.topic) && (
              <div className="flex flex-wrap gap-2">
                {filters.department && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                    Dept: {filters.department}
                  </Badge>
                )}
                {filters.semester && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                    Period: {filters.semester}
                  </Badge>
                )}
                {filters.topic && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                    Topic: {filters.topic}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* AI Response */}
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            {isThinking ? (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">Analyzing your query...</p>
                    <p className="text-xs text-muted-foreground">Processing documents and applying filters</p>
                  </div>
                </div>
              </div>
            ) : response ? (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="prose prose-sm max-w-none text-foreground">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-lg font-bold text-foreground mb-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-base font-semibold text-foreground mb-2">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-sm font-medium text-foreground mb-1">{children}</h3>,
                      p: ({ children }) => <p className="text-sm text-foreground mb-2">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-1 text-sm">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 text-sm">{children}</ol>,
                      li: ({ children }) => <li className="text-foreground">{children}</li>,
                    }}
                  >
                    {response}
                  </ReactMarkdown>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>Analysis complete</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Settings className="w-3 h-3" />
                        <span>Tools: Retriever, Filter, Analyzer</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      View Detailed Results
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AuditChatbot;