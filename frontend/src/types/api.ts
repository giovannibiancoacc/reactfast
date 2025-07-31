export interface QueryInput {
  query: string;
}

export interface ToolCall {
  tool_name: string;
  input: Record<string, any>;
  output: string;
}

export interface DocumentResult {
  content: string;
  metadata: Record<string, any>;
}

export interface QueryResponse {
  final_answer: string;
  history: ToolCall[];
  documents: DocumentResult[];
}
