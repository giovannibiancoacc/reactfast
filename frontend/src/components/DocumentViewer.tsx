import React, { useState } from 'react';
import { DocumentResult } from '../types/api';

interface DocumentViewerProps {
  documents: DocumentResult[];
}

const DocumentViewer = ({ documents }: DocumentViewerProps) => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  if (!documents || documents.length === 0) {
    return (
      <div className="document-viewer">
        <h3>Retrieved Documents</h3>
        <p>No documents retrieved.</p>
      </div>
    );
  }

  return (
    <div className="document-viewer">
      <h3>Retrieved Documents ({documents.length})</h3>
      <div className="documents-list">
        {documents.map((doc, index) => (
          <div key={index} className="document-item">
            <div className="document-header">
              <h4 
                className="document-title"
                onClick={() => setSelectedDoc(selectedDoc === index ? null : index)}
                style={{ cursor: 'pointer' }}
              >
                Document #{index + 1}
                <span className="toggle-icon">
                  {selectedDoc === index ? ' ▼' : ' ►'}
                </span>
              </h4>
            </div>
            
            {selectedDoc === index && (
              <div className="document-content">
                <div className="metadata-section">
                  <h5>Metadata:</h5>
                  <pre>{JSON.stringify(doc.metadata, null, 2)}</pre>
                </div>
                <div className="content-section">
                  <h5>Content:</h5>
                  <div className="content-text">{doc.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentViewer;
