import dagre from 'dagre';

const nodeWidth = 200;
const nodeHeight = 50;

// Helper function to create radial layout
const createRadialLayout = (nodes, edges) => {
  // Find root node (node with no incoming edges or the first node)
  const incomingEdges = new Set(edges.map(edge => edge.target));
  const rootNodes = nodes.filter(node => !incomingEdges.has(node.id));
  const rootNode = rootNodes.length > 0 ? rootNodes[0] : nodes[0];
  
  if (!rootNode) return { nodes, edges };

  // Build tree structure
  const adjacencyList = {};
  nodes.forEach(node => {
    adjacencyList[node.id] = [];
  });
  
  edges.forEach(edge => {
    if (adjacencyList[edge.source]) {
      adjacencyList[edge.source].push(edge.target);
    }
  });

  // Calculate positions using radial algorithm
  const positioned = new Map();
  const levels = new Map();
  const centerX = 400;
  const centerY = 300;
  
  // Position root at center
  positioned.set(rootNode.id, { x: centerX, y: centerY });
  levels.set(rootNode.id, 0);
  
  // Queue for BFS traversal
  const queue = [{ nodeId: rootNode.id, level: 0, angleStart: 0, angleEnd: 2 * Math.PI }];
  
  while (queue.length > 0) {
    const { nodeId, level, angleStart, angleEnd } = queue.shift();
    const children = adjacencyList[nodeId] || [];
    
    if (children.length > 0) {
      const radius = (level + 1) * 150; // Increased distance from center
      const angleStep = (angleEnd - angleStart) / children.length;
      
      children.forEach((childId, index) => {
        if (!positioned.has(childId)) {
          const angle = angleStart + (index + 0.5) * angleStep;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          positioned.set(childId, { x, y });
          levels.set(childId, level + 1);
          
          // Add children to queue with their angle range
          const childAngleStart = angleStart + index * angleStep;
          const childAngleEnd = angleStart + (index + 1) * angleStep;
          queue.push({
            nodeId: childId,
            level: level + 1,
            angleStart: childAngleStart,
            angleEnd: childAngleEnd
          });
        }
      });
    }
  }
  
  // Apply positions to nodes
  const layoutedNodes = nodes.map(node => {
    const position = positioned.get(node.id) || { x: centerX, y: centerY };
    const level = levels.get(node.id) || 0;
    
    return {
      ...node,
      position: {
        x: position.x - nodeWidth / 2,
        y: position.y - nodeHeight / 2,
      },
      sourcePosition: 'bottom',
      targetPosition: 'top',
      data: {
        ...node.data,
        level: level,
        layout: 'radial'
      },
      style: {
        ...node.style,
        borderRadius: level === 0 ? '50%' : '8px',
        width: level === 0 ? '140px' : '120px',
        height: level === 0 ? '140px' : '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: level === 0 ? '700' : '500',
        border: 'none',
        background: level === 0 ? 'linear-gradient(135deg, #3498db, #2980b9)' : 
                   level === 1 ? 'linear-gradient(135deg, #e74c3c, #c0392b)' :
                   level === 2 ? 'linear-gradient(135deg, #f39c12, #e67e22)' :
                   'linear-gradient(135deg, #27ae60, #229954)',
        color: 'white',
      }
    };
  });

  return { nodes: layoutedNodes, edges };
};

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  // Handle radial layout separately
  if (direction === 'radial') {
    return createRadialLayout(nodes, edges);
  }

  // Use dagre for hierarchical layouts
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: 50,
    ranksep: 100,
    marginx: 20,
    marginy: 20
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    return {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
      style: {
        ...node.style,
        border: 'none',
        background: '#3498db',
        color: 'white',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '12px',
        fontWeight: '500',
      }
    };
  });

  return { nodes: layoutedNodes, edges };
};
