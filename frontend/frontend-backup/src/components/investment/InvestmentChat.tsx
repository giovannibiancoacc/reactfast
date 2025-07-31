import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, User, Send, Code, FileText, Loader2, TrendingUp, Database, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const InvestmentChat = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<Set<number>>(new Set());

  const handleSend = () => {
    if (!query.trim()) return;

    const userMessage = { type: 'user', content: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getMockInvestmentResponse(query);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);

    setQuery("");
  };

  const toggleMessageExpansion = (messageIndex: number) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageIndex)) {
        newSet.delete(messageIndex);
      } else {
        newSet.add(messageIndex);
      }
      return newSet;
    });
  };

  const getMockInvestmentResponse = (query: string) => {
    const baseResponse = {
      type: 'ai',
      timestamp: new Date(),
      hasSQL: true,
      hasDocuments: true,
    };

    if (query.toLowerCase().includes('tesla') || query.toLowerCase().includes('stock')) {
      return {
        ...baseResponse,
        content: `Based on your query about Tesla stock performance, I've analyzed the available data and documents:

**Investment Analysis Summary:**
- Current stock price shows strong momentum with 12% YTD growth
- Technical indicators suggest bullish trend continuation
- Fundamental analysis reveals solid EV market positioning

**Key Insights:**
1. **Revenue Growth**: 15% quarterly growth in automotive segment
2. **Market Position**: Leading EV manufacturer with expanding market share
3. **Risk Factors**: Regulatory changes and competition intensity

**Recommendation:** Hold with positive outlook for Q3-Q4 performance.`,
        sqlQuery: `-- Analysis of Tesla stock performance
SELECT 
    date,
    close_price,
    volume,
    LAG(close_price) OVER (ORDER BY date) as prev_close,
    (close_price - LAG(close_price) OVER (ORDER BY date)) / LAG(close_price) OVER (ORDER BY date) * 100 as daily_return
FROM stock_prices 
WHERE symbol = 'TSLA' 
    AND date >= DATE('now', '-90 days')
ORDER BY date DESC
LIMIT 20;`,
        sqlResults: [
          { date: '2024-03-15', close_price: 198.50, volume: 45000000, prev_close: 195.20, daily_return: 1.69 },
          { date: '2024-03-14', close_price: 195.20, volume: 38000000, prev_close: 192.80, daily_return: 1.24 },
          { date: '2024-03-13', close_price: 192.80, volume: 42000000, prev_close: 189.30, daily_return: 1.85 },
          { date: '2024-03-12', close_price: 189.30, volume: 36000000, prev_close: 186.90, daily_return: 1.28 },
          { date: '2024-03-11', close_price: 186.90, volume: 41000000, prev_close: 184.50, daily_return: 1.30 }
        ],
        documents: [
          {
            title: "Tesla Q1 2024 Financial Report",
            content: "# Tesla Q1 2024 Financial Performance\n\n## Revenue Overview\nTesla reported $23.3B in total revenue for Q1 2024, representing a 15% increase compared to Q1 2023...",
            relevance: 0.94
          },
          {
            title: "EV Market Analysis Report",
            content: "# Electric Vehicle Market Trends\n\n## Market Share Analysis\nTesla maintains its leadership position with 18.7% global EV market share...",
            relevance: 0.87
          }
        ]
      };
    }

    return {
      ...baseResponse,
      content: `I've analyzed your investment query and found relevant insights:

**Market Analysis:**
- Current market conditions favor growth stocks with strong fundamentals
- Sector rotation shows increased interest in technology and clean energy
- Volatility metrics suggest moderate risk environment

**Portfolio Recommendations:**
1. **Diversification**: Consider spreading investments across sectors
2. **Risk Management**: Implement stop-loss strategies for volatile positions
3. **Long-term View**: Focus on companies with sustainable competitive advantages

**Data-Driven Insights:**
The analysis combines real-time market data with fundamental research documents.`,
      sqlQuery: `-- Portfolio performance analysis
SELECT 
    sector,
    AVG(daily_return) as avg_return,
    STDDEV(daily_return) as volatility,
    COUNT(*) as num_positions
FROM portfolio_holdings ph
JOIN stock_prices sp ON ph.symbol = sp.symbol
WHERE sp.date >= DATE('now', '-30 days')
GROUP BY sector
ORDER BY avg_return DESC;`,
      sqlResults: [
        { sector: 'Technology', avg_return: 1.2, volatility: 2.8, num_positions: 12 },
        { sector: 'Clean Energy', avg_return: 0.9, volatility: 3.2, num_positions: 8 },
        { sector: 'Healthcare', avg_return: 0.7, volatility: 1.9, num_positions: 10 },
        { sector: 'Financial', avg_return: 0.5, volatility: 2.1, num_positions: 15 }
      ],
      documents: [
        {
          title: "Market Outlook Q2 2024",
          content: "# Market Analysis Summary\n\n## Economic Indicators\nGDP growth remains steady at 2.1% with inflation trending downward...",
          relevance: 0.91
        }
      ]
    };
  };

  return (
    <div className="space-y-6">
      {/* Chat Interface */}
      <Card className="bg-gradient-card border-border/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-lg">Investment Analysis Chat</h3>
          </div>

          {/* Messages */}
          <div className="min-h-[400px] max-h-[600px] overflow-y-auto space-y-4 border border-border/30 rounded-lg p-4 bg-background/30">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Ready to help with investment analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Ask about stocks, market trends, portfolio analysis, or any investment-related questions
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className="space-y-4">
                {message.type === 'user' ? (
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="prose prose-sm max-w-none text-foreground">
                          <ReactMarkdown>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                        
                        {/* Toggle Button for SQL and Documents */}
                        {(message.hasSQL || message.hasDocuments) && (
                          <div className="mt-4 pt-4 border-t border-border/20">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleMessageExpansion(index)}
                              className="flex items-center space-x-2 text-xs text-muted-foreground hover:text-foreground"
                            >
                              {expandedMessages.has(index) ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  <span>Hide Analysis Details</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4" />
                                  <span>Show Analysis Details</span>
                                  <span className="text-xs text-muted-foreground ml-1">
                                    ({message.hasSQL ? 'SQL' : ''}{message.hasSQL && message.hasDocuments ? ' • ' : ''}{message.hasDocuments ? `${message.documents?.length || 0} docs` : ''})
                                  </span>
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SQL and Documents Tabs - Now Toggleable */}
                    {(message.hasSQL || message.hasDocuments) && expandedMessages.has(index) && (
                      <div className="ml-11">
                        <Card className="bg-muted/20 border-border/30">
                          <Tabs defaultValue={message.hasSQL ? "sql" : "documents"} className="p-4">
                            <TabsList className="grid w-full grid-cols-2">
                              {message.hasSQL && (
                                <TabsTrigger value="sql" className="flex items-center space-x-2">
                                  <Code className="w-4 h-4" />
                                  <span>SQL Analysis</span>
                                </TabsTrigger>
                              )}
                              {message.hasDocuments && (
                                <TabsTrigger value="documents" className="flex items-center space-x-2">
                                  <FileText className="w-4 h-4" />
                                  <span>Documents ({message.documents?.length || 0})</span>
                                </TabsTrigger>
                              )}
                            </TabsList>

                            {message.hasSQL && (
                              <TabsContent value="sql" className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-sm mb-2 flex items-center">
                                    <Database className="w-4 h-4 mr-2 text-primary" />
                                    SQL Query
                                  </h4>
                                  <SyntaxHighlighter
                                    language="sql"
                                    style={oneDark}
                                    customStyle={{ fontSize: '0.75rem', borderRadius: '0.5rem' }}
                                  >
                                    {message.sqlQuery}
                                  </SyntaxHighlighter>
                                </div>

                                <div>
                                  <h4 className="font-medium text-sm mb-2">Query Results</h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-xs border border-border/30 rounded-lg">
                                      <thead className="bg-muted/30">
                                        <tr>
                                          {message.sqlResults && message.sqlResults[0] && 
                                            Object.keys(message.sqlResults[0]).map(key => (
                                              <th key={key} className="p-2 text-left border-b border-border/30 font-medium">
                                                {key.replace(/_/g, ' ').toUpperCase()}
                                              </th>
                                            ))
                                          }
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {message.sqlResults?.map((row: any, i: number) => (
                                          <tr key={i} className="hover:bg-muted/20">
                                            {Object.values(row).map((value: any, j: number) => (
                                              <td key={j} className="p-2 border-b border-border/20">
                                                {typeof value === 'number' ? value.toFixed(2) : value}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </TabsContent>
                            )}

                            {message.hasDocuments && (
                              <TabsContent value="documents" className="space-y-4">
                                {message.documents?.map((doc: any, i: number) => (
                                  <Card key={i} className="p-4 bg-background/50 border-border/30">
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <h5 className="font-medium text-sm">{doc.title}</h5>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                                          {(doc.relevance * 100).toFixed(0)}% match
                                        </Badge>
                                      </div>
                                       <div className="prose prose-xs max-w-none text-muted-foreground">
                                         <ReactMarkdown>
                                           {doc.content.substring(0, 200) + "..."}
                                         </ReactMarkdown>
                                       </div>
                                    </div>
                                  </Card>
                                ))}
                              </TabsContent>
                            )}
                          </Tabs>
                        </Card>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-primary">Analyzing investment data...</p>
                      <p className="text-xs text-muted-foreground">Running SQL queries and searching documents</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about investment opportunities, market analysis, or portfolio insights..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              disabled={!query.trim() || isLoading}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InvestmentChat;