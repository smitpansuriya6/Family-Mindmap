import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import FileUpload from './components/FileUpload';
import Toolbar from './components/Toolbar';
import SearchPanel from './components/SearchPanel';
import WelcomeScreen from './components/WelcomeScreen';
import { getLayoutedElements } from './utils/layoutUtils';
import { exportToPNG } from './utils/exportUtils';
import './App.css';

const initialNodes = [];
const initialEdges = [];

function AppContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [fileName, setFileName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [layout, setLayout] = useState('horizontal');
  const [originalData, setOriginalData] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const reactFlowWrapper = useRef(null);
  const { getViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleDataLoaded = (data, filename) => {
    const layoutDirection = layout === 'horizontal' ? 'LR' : layout === 'vertical' ? 'TB' : 'radial';
    const layoutedElements = getLayoutedElements(data.nodes, data.edges, layoutDirection);
    
    setNodes(layoutedElements.nodes);
    setEdges(layoutedElements.edges);
    setFileName(filename);
    setOriginalData(data);
  };

  useEffect(() => {
    if (originalData && originalData.nodes.length > 0 && originalData.edges.length > 0) {
      const layoutDirection = layout === 'horizontal' ? 'LR' : layout === 'vertical' ? 'TB' : 'radial';
      const layoutedElements = getLayoutedElements(originalData.nodes, originalData.edges, layoutDirection);
      setNodes(layoutedElements.nodes);
      setEdges(layoutedElements.edges);
    }
  }, [layout, originalData, setNodes, setEdges]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Highlight matching nodes
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: {
          ...node.style,
          backgroundColor: node.data.label.toLowerCase().includes(term.toLowerCase())
            ? '#ffeb3b'
            : node.style?.backgroundColor || '#ffffff',
        },
      }))
    );
  };

  const handleExport = async () => {
    if (!reactFlowWrapper.current || nodes.length === 0) {
      alert('No mind map to export. Please upload a file first.');
      return;
    }

    setIsExporting(true);

    try {
      await exportToPNG(reactFlowWrapper.current, fileName || 'mindmap');
      console.log('PNG export completed successfully');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="logo">📊</span>
            ConfMap Clone
          </h1>
          <p className="app-subtitle">Visualize your YAML and JSON files as an interactive Mind Map</p>
        </div>
        
        <div className="header-controls">
          <FileUpload onDataLoaded={handleDataLoaded} />
          <SearchPanel onSearch={handleSearch} searchTerm={searchTerm} />
          <Toolbar 
            layout={layout} 
            setLayout={setLayout}
            onExport={handleExport}
            fileName={fileName}
            isExporting={isExporting}
          />
        </div>
      </header>

      <div className="app-content">
        {nodes.length > 0 ? (
          <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              className="react-flow"
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        ) : (
          <WelcomeScreen onLoadDemo={handleDataLoaded} />
        )}
      </div>

      {fileName && (
        <div className="status-bar">
          <span>📄 {fileName}</span>
          <span>🔍 {nodes.length} nodes</span>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}

export default App;
