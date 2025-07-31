import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FileText, Database, TrendingUp, Calendar, Hash, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface DocumentResultsProps {
  query: string;
  filters: {
    department: string;
    semester: string;
    topic: string;
  };
}

const DocumentResults = ({ query, filters }: DocumentResultsProps) => {
  // Mock retrieved documents data
  const mockDocuments = [
    {
      id: 1,
      title: "Q1 2024 Compliance Assessment Report",
      content: `# Compliance Assessment Summary

## Executive Overview
This quarterly compliance assessment evaluates our adherence to SOX requirements and internal controls for Q1 2024.

## Key Findings
- **Overall Compliance Rate**: 94.2%
- **Critical Issues**: 0
- **Minor Issues**: 3
- **Recommendations**: 5

## Department Analysis
The Finance department showed excellent compliance with only minor documentation timing issues identified.

### Internal Controls
All major internal controls are functioning effectively with quarterly testing completed successfully.

### Risk Assessment
Current risk level remains at **LOW** with strong mitigation strategies in place.`,
      metadata: {
        source: "Internal Audit Team",
        date: "2024-03-15",
        relevanceScore: 0.94,
        chunkIndex: "1-3",
        department: "Finance",
        documentType: "Compliance Report",
        confidenceLevel: "High"
      }
    },
    {
      id: 2,
      title: "Risk Management Framework Documentation",
      content: `# Risk Management Framework

## Overview
This document outlines our comprehensive risk management approach for operational and compliance risks.

## Risk Categories
1. **Operational Risk**: Process and system failures
2. **Compliance Risk**: Regulatory and policy violations  
3. **Financial Risk**: Market and credit exposures
4. **Technology Risk**: Cybersecurity and system reliability

## Current Risk Profile
- **Overall Risk Score**: 2.3/5 (Low-Medium)
- **Trend**: Decreasing (-15% vs Q4 2023)
- **Mitigation Coverage**: 78% of identified risks

### Key Controls
Implementation of automated monitoring systems has significantly improved our risk detection capabilities.`,
      metadata: {
        source: "Risk Management Office",
        date: "2024-02-28",
        relevanceScore: 0.87,
        chunkIndex: "4-6",
        department: "Risk Management",
        documentType: "Framework Document",
        confidenceLevel: "High"
      }
    },
    {
      id: 3,
      title: "Internal Controls Testing Results",
      content: `# Internal Controls Testing - Q1 2024

## Testing Scope
Comprehensive testing of key internal controls across all business units.

## Results Summary
- **Controls Tested**: 147
- **Effective Controls**: 142 (96.6%)
- **Deficiencies Identified**: 5 (Minor)
- **Management Actions**: 5 (In Progress)

## Key Areas
### Financial Reporting Controls
All financial reporting controls tested effectively with no significant deficiencies.

### IT General Controls
Strong performance in IT controls with automated testing providing continuous monitoring.

### Operational Controls
Minor improvements needed in approval workflows for the Operations department.`,
      metadata: {
        source: "Internal Audit",
        date: "2024-03-10", 
        relevanceScore: 0.82,
        chunkIndex: "7-9",
        department: "Internal Audit",
        documentType: "Testing Report",
        confidenceLevel: "Medium"
      }
    }
  ];

  const renderMetadata = (metadata: any) => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Database className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Source:</span>
            <span className="font-medium">{metadata.source}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{new Date(metadata.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hash className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Chunk:</span>
            <span className="font-medium">{metadata.chunkIndex}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">Relevance:</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {(metadata.relevanceScore * 100).toFixed(0)}%
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Department:</span>
            <Badge variant="outline" className="bg-secondary/20">
              {metadata.department}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Confidence:</span>
            <Badge 
              variant="secondary" 
              className={`${
                metadata.confidenceLevel === 'High' 
                  ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                  : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
              }`}
            >
              {metadata.confidenceLevel}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-gradient-card border-border/50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Retrieved Documents</h3>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {mockDocuments.length} results
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Documents found matching your query and filters
          </p>
        </div>

        <Separator />

        {/* Tool Execution Summary */}
        <Card className="bg-muted/20 border-border/30">
          <div className="p-4 space-y-3">
            <h4 className="font-medium text-sm flex items-center">
              <Database className="w-4 h-4 mr-2 text-primary" />
              Tool Execution Summary
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground">Filters Applied:</span>
                <div className="space-y-1">
                  {filters.department && (
                    <div className="text-xs">• Department: {filters.department}</div>
                  )}
                  {filters.semester && (
                    <div className="text-xs">• Period: {filters.semester}</div>
                  )}
                  {filters.topic && (
                    <div className="text-xs">• Topic: {filters.topic}</div>
                  )}
                  {!filters.department && !filters.semester && !filters.topic && (
                    <div className="text-xs text-muted-foreground">No filters applied</div>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Search Method:</span>
                <div className="text-xs">Semantic similarity search</div>
                <div className="text-xs">Vector embedding analysis</div>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground">Processing Time:</span>
                <div className="text-xs">1.2 seconds</div>
                <div className="text-xs">Documents scanned: 247</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Retrieved Documents */}
        <div className="space-y-4">
          {mockDocuments.map((doc, index) => (
            <Card key={doc.id} className="border-border/30 bg-muted/10">
              <div className="p-5 space-y-4">
                {/* Document Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-foreground">{doc.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                        Rank #{index + 1}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                        Relevance: {(doc.metadata.relevanceScore * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open
                  </Button>
                </div>

                {/* Document Content */}
                <div className="bg-background/50 rounded-lg p-4 border border-border/30">
                  <div className="prose prose-sm max-w-none text-foreground">
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => <h1 className="text-base font-bold text-foreground mb-2">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-sm font-semibold text-foreground mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-medium text-foreground mb-1">{children}</h3>,
                        p: ({ children }) => <p className="text-sm text-foreground mb-2">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 text-sm">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 text-sm">{children}</ol>,
                        li: ({ children }) => <li className="text-foreground">{children}</li>,
                      }}
                    >
                      {doc.content}
                    </ReactMarkdown>
                  </div>
                </div>

                {/* Metadata */}
                <div className="border-t border-border/30 pt-4">
                  <h5 className="font-medium text-sm mb-3 text-muted-foreground">Document Metadata</h5>
                  {renderMetadata(doc.metadata)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DocumentResults;