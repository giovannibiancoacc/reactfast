import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Search, FileText, Calendar, Tag, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for documents
const mockDocuments = [
  {
    id: 1,
    title: "Q1 2024 Financial Compliance Report",
    department: "Finance",
    semester: "Q1 2024",
    topic: "Compliance",
    uploadDate: "2024-03-15",
    tags: ["SOX Compliance", "Financial Controls", "Quarterly Review"]
  },
  {
    id: 2,
    title: "IT Security Audit Assessment",
    department: "IT",
    semester: "Q1 2024", 
    topic: "Cybersecurity",
    uploadDate: "2024-02-28",
    tags: ["Security", "Penetration Testing", "Risk Assessment"]
  },
  {
    id: 3,
    title: "HR Policy Compliance Review",
    department: "HR",
    semester: "Q4 2023",
    topic: "Compliance",
    uploadDate: "2024-01-10",
    tags: ["Policy Review", "Employee Relations", "Compliance"]
  },
  {
    id: 4,
    title: "Operations Risk Assessment",
    department: "Operations",
    semester: "Q1 2024",
    topic: "Risk Assessment",
    uploadDate: "2024-03-01",
    tags: ["Operational Risk", "Process Review", "Internal Controls"]
  },
  {
    id: 5,
    title: "Legal Compliance Framework",
    department: "Legal",
    semester: "Q1 2024",
    topic: "Compliance",
    uploadDate: "2024-02-15",
    tags: ["Legal Framework", "Regulatory Compliance", "Policy"]
  }
];

const DocumentsView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<typeof mockDocuments[0] | null>(null);

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openPDF = (title: string) => {
    // In a real app, this would open the PDF from the pfc folder
    const pdfUrl = `/pfc/${title.replace(/\s+/g, '_')}.pdf`;
    window.open(pdfUrl, '_blank');
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
                onClick={() => navigate('/audit')}
                className="hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Audit
              </Button>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-xl font-semibold">Document Library</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Search Bar */}
          <Card className="p-6 bg-gradient-card border-border/50">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Search Documents</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, department, topic, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </Card>

          {/* Documents Table */}
          <Card className="bg-gradient-card border-border/50">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Available Documents</h3>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {filteredDocuments.length} documents
                </Badge>
              </div>

              <div className="overflow-hidden rounded-lg border border-border/50">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="font-semibold">Title</TableHead>
                      <TableHead className="font-semibold">Department</TableHead>
                      <TableHead className="font-semibold">Period</TableHead>
                      <TableHead className="font-semibold">Topic</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Tags</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow 
                        key={doc.id} 
                        className="hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => setSelectedDocument(doc)}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="font-medium hover:text-primary transition-colors">
                              {doc.title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-secondary/20">
                            {doc.department}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{doc.semester}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                            {doc.topic}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {doc.tags.slice(0, 2).map((tag, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs bg-muted/20"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {doc.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs bg-muted/20">
                                +{doc.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              openPDF(doc.title);
                            }}
                            className="text-primary hover:bg-primary/10"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No documents found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Document Detail Modal */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Document Details</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedDocument && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">{selectedDocument.title}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Department:</span>
                    <Badge variant="outline" className="ml-2 bg-secondary/20">
                      {selectedDocument.department}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Period:</span>
                    <span className="ml-2">{selectedDocument.semester}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Topic:</span>
                    <Badge variant="secondary" className="ml-2 bg-accent/10 text-accent border-accent/20">
                      {selectedDocument.topic}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Upload Date:</span>
                    <span className="ml-2">{new Date(selectedDocument.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-primary" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-muted/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => openPDF(selectedDocument.title)}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open PDF
                </Button>
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsView;