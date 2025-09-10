# How to Use ConfMap Clone

## Quick Start Guide

### 1. Access the Application
- Open your web browser
- Navigate to: `http://localhost:3000`
- Make sure both servers are running (frontend on port 3000, backend on port 5000)

### 2. Upload a File
**Option A: Drag & Drop**
- Simply drag a JSON, YAML, or YML file from your computer
- Drop it onto the blue "Upload File" button

**Option B: Click to Browse**
- Click the blue "Upload File" button
- Select a JSON, YAML, or YML file from your computer

**Sample Files Available:**
- `sample-family.json` - Family tree structure
- `sample-project.yaml` - Project configuration example

### 3. Explore Your Mind Map
- **Pan**: Click and drag on empty space to move around
- **Zoom**: Use mouse wheel to zoom in/out
- **Select Nodes**: Click on any node to select it
- **Use Controls**: Use the control panel in the bottom-right corner

### 4. Search Functionality
- Type in the search box to find specific nodes
- Matching nodes will be highlighted in yellow
- Clear the search box to remove highlighting

### 5. Change Layout
- Use the "Layout" dropdown to switch between:
  - **Horizontal**: Left-to-right tree layout
  - **Vertical**: Top-to-bottom tree layout

### 6. Export Your Mind Map
- Click "Export as PNG" to download your visualization
- The exported file will include the current view and layout

## Troubleshooting

### "Cannot connect to server" Error
1. Make sure the backend server is running on port 5000
2. Check the terminal output for any errors
3. Restart the development servers: `npm run dev`

### File Upload Issues
1. Ensure your file is in JSON, YAML, or YML format
2. Check that file size is under 10MB
3. Verify the file contains valid JSON/YAML syntax

### Layout Problems
1. Try refreshing the browser page
2. Clear browser cache if needed
3. Check browser console for any JavaScript errors

## Tips for Best Results

1. **File Structure**: Well-structured JSON/YAML files create better mind maps
2. **File Size**: Smaller files (under 1MB) load faster and perform better
3. **Browser**: Use Chrome or Firefox for optimal React Flow performance
4. **Screen Size**: Larger screens provide better visualization experience

## Sample Data Structures

### JSON Example:
```json
{
  "root": {
    "branch1": {
      "leaf1": "value1",
      "leaf2": "value2"
    },
    "branch2": ["item1", "item2", "item3"]
  }
}
```

### YAML Example:
```yaml
root:
  branch1:
    leaf1: value1
    leaf2: value2
  branch2:
    - item1
    - item2
    - item3
```

Both examples will create similar mind map structures with nodes and connections showing the hierarchical relationships.
