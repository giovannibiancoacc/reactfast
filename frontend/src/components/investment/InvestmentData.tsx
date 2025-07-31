import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Database, FileText, Search, Table as TableIcon, Play, Copy, Eye, ExternalLink } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const InvestmentData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [showQueryResults, setShowQueryResults] = useState(false);

  // Mock database schema
  const databaseTables = [
    {
      name: "stock_prices",
      description: "Historical stock price data",
      rowCount: 2500000,
      columns: [
        { name: "symbol", type: "VARCHAR(10)", description: "Stock ticker symbol" },
        { name: "date", type: "DATE", description: "Trading date" },
        { name: "open", type: "DECIMAL(10,2)", description: "Opening price" },
        { name: "high", type: "DECIMAL(10,2)", description: "Highest price" },
        { name: "low", type: "DECIMAL(10,2)", description: "Lowest price" },
        { name: "close", type: "DECIMAL(10,2)", description: "Closing price" },
        { name: "volume", type: "BIGINT", description: "Trading volume" }
      ],
      sampleData: [
        { symbol: "AAPL", date: "2024-03-15", open: 171.50, high: 173.20, low: 170.80, close: 172.75, volume: 45000000 },
        { symbol: "TSLA", date: "2024-03-15", open: 198.20, high: 199.80, low: 196.50, close: 198.50, volume: 38000000 },
        { symbol: "MSFT", date: "2024-03-15", open: 415.30, high: 418.90, low: 414.20, close: 417.60, volume: 28000000 }
      ]
    },
    {
      name: "companies",
      description: "Company information and metadata",
      rowCount: 8500,
      columns: [
        { name: "symbol", type: "VARCHAR(10)", description: "Stock ticker symbol" },
        { name: "company_name", type: "VARCHAR(255)", description: "Full company name" },
        { name: "sector", type: "VARCHAR(100)", description: "Business sector" },
        { name: "industry", type: "VARCHAR(100)", description: "Industry classification" },
        { name: "market_cap", type: "BIGINT", description: "Market capitalization in USD" },
        { name: "employees", type: "INTEGER", description: "Number of employees" }
      ],
      sampleData: [
        { symbol: "AAPL", company_name: "Apple Inc.", sector: "Technology", industry: "Consumer Electronics", market_cap: 2800000000000, employees: 164000 },
        { symbol: "TSLA", company_name: "Tesla, Inc.", sector: "Consumer Discretionary", industry: "Automobiles", market_cap: 650000000000, employees: 140000 },
        { symbol: "MSFT", company_name: "Microsoft Corporation", sector: "Technology", industry: "Software", market_cap: 3100000000000, employees: 221000 }
      ]
    },
    {
      name: "financial_metrics",
      description: "Key financial ratios and metrics",
      rowCount: 450000,
      columns: [
        { name: "symbol", type: "VARCHAR(10)", description: "Stock ticker symbol" },
        { name: "quarter", type: "VARCHAR(10)", description: "Reporting quarter" },
        { name: "revenue", type: "BIGINT", description: "Quarterly revenue in USD" },
        { name: "net_income", type: "BIGINT", description: "Net income in USD" },
        { name: "eps", type: "DECIMAL(8,2)", description: "Earnings per share" },
        { name: "pe_ratio", type: "DECIMAL(8,2)", description: "Price to earnings ratio" },
        { name: "debt_to_equity", type: "DECIMAL(8,4)", description: "Debt to equity ratio" }
      ],
      sampleData: [
        { symbol: "AAPL", quarter: "Q1 2024", revenue: 119580000000, net_income: 33916000000, eps: 2.18, pe_ratio: 28.5, debt_to_equity: 1.7245 },
        { symbol: "TSLA", quarter: "Q1 2024", revenue: 21301000000, net_income: 1129000000, eps: 0.34, pe_ratio: 40.2, debt_to_equity: 0.1234 },
        { symbol: "MSFT", quarter: "Q1 2024", revenue: 61858000000, net_income: 21939000000, eps: 2.93, pe_ratio: 31.8, debt_to_equity: 0.4567 }
      ]
    },
    {
      name: "portfolio_holdings",
      description: "Current portfolio positions",
      rowCount: 150,
      columns: [
        { name: "symbol", type: "VARCHAR(10)", description: "Stock ticker symbol" },
        { name: "shares", type: "INTEGER", description: "Number of shares held" },
        { name: "avg_cost", type: "DECIMAL(10,2)", description: "Average cost per share" },
        { name: "current_price", type: "DECIMAL(10,2)", description: "Current market price" },
        { name: "purchase_date", type: "DATE", description: "Date of purchase" },
        { name: "sector", type: "VARCHAR(100)", description: "Sector allocation" }
      ],
      sampleData: [
        { symbol: "AAPL", shares: 100, avg_cost: 165.50, current_price: 172.75, purchase_date: "2024-01-15", sector: "Technology" },
        { symbol: "TSLA", shares: 50, avg_cost: 185.20, current_price: 198.50, purchase_date: "2024-02-10", sector: "Consumer Discretionary" },
        { symbol: "MSFT", shares: 75, avg_cost: 405.80, current_price: 417.60, purchase_date: "2024-01-20", sector: "Technology" }
      ]
    }
  ];

  // Mock documents (same as audit but for investment context)
  const investmentDocuments = [
    {
      id: 1,
      title: "Tesla Q1 2024 Earnings Report",
      tags: ["Earnings", "Tesla", "Q1 2024", "Financial"],
      uploadDate: "2024-03-15",
      type: "Financial Report"
    },
    {
      id: 2,
      title: "Market Outlook Q2 2024",
      tags: ["Market Analysis", "Outlook", "2024", "Strategy"],
      uploadDate: "2024-03-10",
      type: "Research Report"
    },
    {
      id: 3,
      title: "Portfolio Risk Assessment",
      tags: ["Risk", "Portfolio", "Assessment", "Analysis"],
      uploadDate: "2024-03-08",
      type: "Risk Report"
    },
    {
      id: 4,
      title: "Sector Rotation Analysis",
      tags: ["Sector", "Rotation", "Strategy", "Market"],
      uploadDate: "2024-03-05",
      type: "Strategy Report"
    }
  ];

  const filteredTables = databaseTables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDocuments = investmentDocuments.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const executeQuery = () => {
    // Mock SQL execution
    if (sqlQuery.toLowerCase().includes('stock_prices')) {
      setQueryResults([
        { symbol: "AAPL", avg_price: 172.45, total_volume: 425000000, trading_days: 20 },
        { symbol: "TSLA", avg_price: 195.80, total_volume: 380000000, trading_days: 20 },
        { symbol: "MSFT", avg_price: 416.25, total_volume: 280000000, trading_days: 20 }
      ]);
    } else if (sqlQuery.toLowerCase().includes('portfolio')) {
      setQueryResults([
        { sector: "Technology", total_value: 25000, positions: 3, avg_return: 8.5 },
        { sector: "Consumer Discretionary", total_value: 12000, positions: 2, avg_return: 12.3 },
        { sector: "Healthcare", total_value: 8000, positions: 1, avg_return: 5.2 }
      ]);
    } else {
      setQueryResults([
        { metric: "Total Portfolio Value", value: "$45,000", change: "+12.3%" },
        { metric: "Best Performer", value: "TSLA", change: "+15.8%" },
        { metric: "Worst Performer", value: "AAPL", change: "-2.1%" }
      ]);
    }
    setShowQueryResults(true);
  };

  return (
    <div className="space-y-6">
      {/* Data Overview */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Data Sources</h3>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tables and documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        <Tabs defaultValue="database" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="database" className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Database Tables</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="database" className="space-y-4">
            <div className="grid gap-4">
              {filteredTables.map((table) => (
                <Card key={table.name} className="p-4 bg-background/50 border-border/30 hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <TableIcon className="w-4 h-4 text-primary" />
                        <h4 className="font-medium">{table.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {table.rowCount.toLocaleString()} rows
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{table.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {table.columns.slice(0, 3).map((col) => (
                          <Badge key={col.name} variant="secondary" className="text-xs bg-muted/20">
                            {col.name}
                          </Badge>
                        ))}
                        {table.columns.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-muted/20">
                            +{table.columns.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTable(table)}
                      className="hover:bg-primary/10 hover:border-primary/50"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Schema
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="grid gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="p-4 bg-background/50 border-border/30 hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <h4 className="font-medium">{doc.title}</h4>
                        <Badge variant="outline" className="text-xs bg-secondary/20">
                          {doc.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-muted/20">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-muted/20">
                            +{doc.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="hover:bg-primary/10 hover:border-primary/50">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View PDF
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* SQL Query Interface */}
      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-lg">SQL Query Interface</h3>
          </div>
          
          <div className="space-y-3">
            <textarea
              placeholder="SELECT * FROM stock_prices WHERE symbol = 'AAPL' ORDER BY date DESC LIMIT 10;"
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full h-32 p-3 bg-background border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            
            <div className="flex items-center space-x-2">
              <Button 
                onClick={executeQuery}
                disabled={!sqlQuery.trim()}
                className="bg-accent hover:bg-accent/90 hover:shadow-glow transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2" />
                Execute Query
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigator.clipboard.writeText(sqlQuery)}
                className="hover:bg-primary/10"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>

          {showQueryResults && queryResults.length > 0 && (
            <Card className="bg-background/50 border-border/30">
              <div className="p-4 space-y-3">
                <h4 className="font-medium text-sm">Query Results</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-border/30 rounded-lg">
                    <thead className="bg-muted/30">
                      <tr>
                        {queryResults[0] && Object.keys(queryResults[0]).map(key => (
                          <th key={key} className="p-3 text-left border-b border-border/30 font-medium">
                            {key.replace(/_/g, ' ').toUpperCase()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResults.map((row, i) => (
                        <tr key={i} className="hover:bg-muted/20">
                          {Object.values(row).map((value: any, j) => (
                            <td key={j} className="p-3 border-b border-border/20">
                              {typeof value === 'number' ? 
                                (value > 1000 ? value.toLocaleString() : value.toFixed(2)) : 
                                value
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Card>

      {/* Table Schema Modal */}
      <Dialog open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <TableIcon className="w-5 h-5 text-primary" />
              <span>Table: {selectedTable?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          {selectedTable && (
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">{selectedTable.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Rows:</span>
                    <span className="ml-2 font-medium">{selectedTable.rowCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Columns:</span>
                    <span className="ml-2 font-medium">{selectedTable.columns.length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Schema</h4>
                <div className="overflow-hidden rounded-lg border border-border/30">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="font-semibold">Column</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTable.columns.map((col: any) => (
                        <TableRow key={col.name}>
                          <TableCell className="font-mono text-sm">{col.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono text-xs">
                              {col.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {col.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Sample Data</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-border/30 rounded-lg">
                    <thead className="bg-muted/30">
                      <tr>
                        {selectedTable.columns.map((col: any) => (
                          <th key={col.name} className="p-2 text-left border-b border-border/30 font-medium">
                            {col.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTable.sampleData.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-muted/20">
                          {selectedTable.columns.map((col: any) => (
                            <td key={col.name} className="p-2 border-b border-border/20 font-mono text-xs">
                              {typeof row[col.name] === 'number' ? 
                                (row[col.name] > 1000 ? row[col.name].toLocaleString() : row[col.name]) : 
                                row[col.name]
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvestmentData;