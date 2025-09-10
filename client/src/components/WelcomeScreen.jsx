import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onLoadDemo }) => {
  const handleDemoClick = () => {
    // Create a simple demo data structure
    const demoData = {
      nodes: [
        { id: '1', data: { label: 'Company' }, position: { x: 0, y: 0 }, style: { backgroundColor: '#f3e5f5', border: '2px solid #9c27b0', borderRadius: '8px', padding: '8px 12px' } },
        { id: '2', data: { label: 'Departments' }, position: { x: 200, y: 0 }, style: { backgroundColor: '#f3e5f5', border: '2px solid #9c27b0', borderRadius: '8px', padding: '8px 12px' } },
        { id: '3', data: { label: 'Engineering' }, position: { x: 400, y: -100 }, style: { backgroundColor: '#e3f2fd', border: '2px solid #2196f3', borderRadius: '8px', padding: '8px 12px' } },
        { id: '4', data: { label: 'Marketing' }, position: { x: 400, y: 0 }, style: { backgroundColor: '#e3f2fd', border: '2px solid #2196f3', borderRadius: '8px', padding: '8px 12px' } },
        { id: '5', data: { label: 'Sales' }, position: { x: 400, y: 100 }, style: { backgroundColor: '#e3f2fd', border: '2px solid #2196f3', borderRadius: '8px', padding: '8px 12px' } },
        { id: '6', data: { label: 'Frontend Team' }, position: { x: 600, y: -150 }, style: { backgroundColor: '#fff3e0', border: '2px solid #ff9800', borderRadius: '8px', padding: '8px 12px' } },
        { id: '7', data: { label: 'Backend Team' }, position: { x: 600, y: -50 }, style: { backgroundColor: '#fff3e0', border: '2px solid #ff9800', borderRadius: '8px', padding: '8px 12px' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', style: { stroke: '#666', strokeWidth: 2 } },
        { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', style: { stroke: '#666', strokeWidth: 2 } },
        { id: 'e2-4', source: '2', target: '4', type: 'smoothstep', style: { stroke: '#666', strokeWidth: 2 } },
        { id: 'e2-5', source: '2', target: '5', type: 'smoothstep', style: { stroke: '#666', strokeWidth: 2 } },
        { id: 'e3-6', source: '3', target: '6', type: 'smoothstep', style: { stroke: '#666', strokeWidth: 2 } },
        { id: 'e3-7', source: '3', target: '7', type: 'smoothstep', style: { stroke: '#666', strokeWidth: 2 } },
      ]
    };
    
    if (onLoadDemo) {
      onLoadDemo(demoData, 'Demo Company Structure');
    }
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-icon">📊</div>
        <h2>Welcome to ConfMap Clone</h2>
        <p>Upload a JSON or YAML file to visualize it as an interactive mind map</p>
        
        <button className="demo-button" onClick={handleDemoClick}>
          🚀 Try Demo
        </button>
        
        <div className="welcome-features">
          <div className="feature">
            <span className="feature-icon">📁</span>
            <span>Upload Files</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔍</span>
            <span>Search Nodes</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🎨</span>
            <span>Multiple Layouts</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💾</span>
            <span>Export Options</span>
          </div>
        </div>
        <div className="sample-files">
          <p><strong>Try these sample files:</strong></p>
          <ul>
            <li>📄 sample-family.json</li>
            <li>📄 sample-project.yaml</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
