import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Link, CheckCircle, XCircle, Loader2, Search, ExternalLink } from "lucide-react";

const InvestmentDocuments = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock uploaded documents
  const [documents] = useState([
    {
      id: 1,
      name: "Tesla_Q1_2024_Earnings.pdf",
      type: "PDF",
      size: "2.3 MB",
      uploadDate: "2024-03-15",
      status: "processed",
      tags: ["Earnings", "Tesla", "Q1 2024"]
    },
    {
      id: 2,
      name: "Market_Analysis_Report.pdf",
      type: "PDF", 
      size: "1.8 MB",
      uploadDate: "2024-03-10",
      status: "processed",
      tags: ["Market Analysis", "Research", "2024"]
    },
    {
      id: 3,
      name: "Portfolio_Strategy_2024.pdf",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: "2024-03-08",
      status: "processing",
      tags: ["Strategy", "Portfolio", "Investment"]
    },
    {
      id: 4,
      name: "SEC_Filing_AAPL.pdf",
      type: "PDF",
      size: "5.2 MB",
      uploadDate: "2024-03-05",
      status: "processed",
      tags: ["SEC Filing", "Apple", "Regulatory"]
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setIsUploading(true);
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUrlInput("");
            return 100;
          }
          return prev + 15;
        });
      }, 150);
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* File Upload */}
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Upload Documents</h3>
            </div>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                dragActive 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your files here, or{" "}
                <label className="text-primary hover:text-primary/80 cursor-pointer">
                  browse files
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  />
                </label>
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOC, DOCX, TXT (max 10MB)
              </p>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </Card>

        {/* URL Upload */}
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Link className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-lg">Add from URL</h3>
            </div>
            
            <div className="space-y-3">
              <Input
                placeholder="https://example.com/document.pdf"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUrlSubmit();
                  }
                }}
              />
              <Button 
                onClick={handleUrlSubmit}
                disabled={!urlInput.trim() || isUploading}
                className="w-full bg-accent hover:bg-accent/90 hover:shadow-glow transition-all duration-300"
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Link className="w-4 h-4 mr-2" />
                )}
                Add Document
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <p className="mb-1">Supported sources:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>SEC filings and financial reports</li>
                <li>Research papers and analyst reports</li>
                <li>Company investor relations pages</li>
                <li>Public financial databases</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Document Library */}
      <Card className="bg-gradient-card border-border/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Document Library</h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {documents.length} documents
              </Badge>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="p-4 bg-background/50 border-border/30 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{doc.name}</h4>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span>{doc.type} • {doc.size}</span>
                        <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-muted/20">
                          {tag}
                        </Badge>
                      ))}
                      {doc.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-muted/20">
                          +{doc.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {doc.status === 'processed' ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : doc.status === 'processing' ? (
                        <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                      
                      <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No documents found</h3>
              <p className="text-sm text-muted-foreground">
                Upload your first document or adjust your search terms
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default InvestmentDocuments;