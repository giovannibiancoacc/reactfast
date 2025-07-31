import React from 'react';
import { ToolCall } from '../types/api';

interface AgentHistoryProps {
  history: ToolCall[];
}

const AgentHistory = ({ history }: AgentHistoryProps) => {
  if (!history || history.length === 0) {
    return (
      <div className="agent-history">
        <h3>Agent History</h3>
        <p>No actions performed yet.</p>
      </div>
    );
  }

  return (
    <div className="agent-history">
      <h3>Agent History ({history.length} actions)</h3>
      <div className="history-list">
        {history.map((step, index) => (
          <div key={index} className="history-item">
            <div className="step-header">
              <span className="step-number">#{index + 1}</span>
              <span className="tool-name">{step.tool_name}</span>
            </div>
            <div className="step-content">
              <div className="input-section">
                <h4>Input:</h4>
                <pre>{JSON.stringify(step.input, null, 2)}</pre>
              </div>
              <div className="output-section">
                <h4>Output:</h4>
                <pre>{step.output}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentHistory;
