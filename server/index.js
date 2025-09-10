const express = require('express');
const cors = require('cors');
const multer = require('multer');
const YAML = require('yaml');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// File upload configuration
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.json', '.yaml', '.yml'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only JSON, YAML, and YML files are allowed'), false);
    }
  }
});

// Utility function to convert data to tree structure
function convertToTree(data, parentId = null, path = '') {
  const nodes = [];
  const edges = [];
  let nodeId = 1;

  function processNode(obj, parent = null, key = '', currentPath = '') {
    const id = nodeId++;
    const fullPath = currentPath ? `${currentPath}.${key}` : key;
    
    let nodeData = {
      id: id.toString(),
      data: { label: key || 'root' },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type: 'default'
    };

    // Determine node properties based on value type
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        nodeData.data.label = `${key || 'array'} [${obj.length}]`;
        nodeData.style = { 
          backgroundColor: '#e3f2fd', 
          border: '2px solid #2196f3',
          borderRadius: '8px',
          padding: '8px 12px'
        };
      } else {
        nodeData.data.label = key || 'root';
        nodeData.style = { 
          backgroundColor: '#f3e5f5', 
          border: '2px solid #9c27b0',
          borderRadius: '8px',
          padding: '8px 12px'
        };
      }
    } else {
      // Truncate long values
      const value = obj !== null && obj !== undefined ? obj.toString() : 'null';
      const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
      nodeData.data.label = `${key}: ${displayValue}`;
      nodeData.style = { 
        backgroundColor: '#fff3e0', 
        border: '2px solid #ff9800',
        borderRadius: '8px',
        padding: '8px 12px'
      };
    }

    nodes.push(nodeData);

    if (parent !== null) {
      edges.push({
        id: `e${parent}-${id}`,
        source: parent.toString(),
        target: id.toString(),
        type: 'smoothstep',
        style: { stroke: '#666', strokeWidth: 2 },
        markerEnd: {
          type: 'arrowclosed',
          color: '#666',
        }
      });
    }

    // Process children
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          processNode(item, id, `[${index}]`, fullPath);
        });
      } else {
        Object.entries(obj).forEach(([childKey, childValue]) => {
          processNode(childValue, id, childKey, fullPath);
        });
      }
    }

    return id;
  }

  processNode(data);
  return { nodes, edges };
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'ConfMap Clone API Server' });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileContent = req.file.buffer.toString('utf8');
    const filename = req.file.originalname;
    const ext = path.extname(filename).toLowerCase();
    
    let parsedData;
    
    try {
      if (ext === '.json') {
        parsedData = JSON.parse(fileContent);
      } else if (ext === '.yaml' || ext === '.yml') {
        parsedData = YAML.parse(fileContent);
      } else {
        return res.status(400).json({ error: 'Unsupported file type' });
      }
    } catch (parseError) {
      return res.status(400).json({ 
        error: 'Failed to parse file', 
        details: parseError.message 
      });
    }

    const treeData = convertToTree(parsedData);
    
    res.json({
      success: true,
      filename: filename,
      data: treeData,
      originalData: parsedData
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
});

app.post('/api/parse', (req, res) => {
  try {
    const { content, type } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'No content provided' });
    }

    let parsedData;
    
    try {
      if (type === 'json') {
        parsedData = JSON.parse(content);
      } else if (type === 'yaml') {
        parsedData = YAML.parse(content);
      } else {
        return res.status(400).json({ error: 'Unsupported content type' });
      }
    } catch (parseError) {
      return res.status(400).json({ 
        error: 'Failed to parse content', 
        details: parseError.message 
      });
    }

    const treeData = convertToTree(parsedData);
    
    res.json({
      success: true,
      data: treeData,
      originalData: parsedData
    });
    
  } catch (error) {
    console.error('Parse error:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
