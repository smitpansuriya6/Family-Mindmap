# ConfMap Clone

A modern web application that visualizes YAML and JSON files as interactive mind maps, inspired by the original ConfMap tool.

![ConfMap Clone Screenshot](https://via.placeholder.com/800x400/3498db/ffffff?text=ConfMap+Clone)

## 🚀 Features

- **File Upload**: Drag & drop or click to upload JSON, YAML, and YML files
- **Interactive Mind Maps**: Visualize hierarchical data as connected nodes
- **Real-time Search**: Search and highlight nodes in your mind map
- **Multiple Layouts**: Switch between horizontal, vertical, and radial layouts
- **Export Functionality**: Export your mind maps as JSON or PNG
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Flow** for interactive mind map visualization
- **Axios** for API communication
- **Lucide React** for modern icons
- **Dagre** for automatic graph layout

### Backend
- **Node.js** with Express.js
- **Multer** for file upload handling
- **YAML** parser for YAML file support
- **Helmet** for security headers
- **CORS** for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd confmap-clone
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend server on `http://localhost:3000`

### Alternative Setup (Manual)

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

5. **In a new terminal, start the frontend**
   ```bash
   cd client
   npm run dev
   ```

## 🎯 Usage

1. **Upload a File**
   - Click the "Upload File" button or drag & drop a JSON/YAML file
   - Supported formats: `.json`, `.yaml`, `.yml`

2. **Explore the Mind Map**
   - Pan around the canvas by clicking and dragging
   - Zoom in/out using the mouse wheel or controls
   - Click on nodes to select them

3. **Search Nodes**
   - Use the search bar to find specific nodes
   - Matching nodes will be highlighted in yellow

4. **Change Layout**
   - Use the layout dropdown to switch between:
     - **Horizontal**: Left-to-right tree layout
     - **Vertical**: Top-to-bottom tree layout
     - **Radial**: Coming soon

5. **Export**
   - Click "Export as PNG" to download your mind map
   - Export functionality preserves the current view

## 📁 Project Structure

```
confmap-clone/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── FileUpload.jsx
│   │   │   ├── SearchPanel.jsx
│   │   │   └── Toolbar.jsx
│   │   ├── utils/          # Utility functions
│   │   │   └── layoutUtils.js
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   └── package.json       # Backend dependencies
├── My_Family_Tree.json    # Sample data file
├── package.json           # Root package.json
└── README.md              # This file
```

## 🔧 API Endpoints

### POST `/api/upload`
Upload a file and convert it to mind map data.

**Request:**
- Content-Type: `multipart/form-data`
- Body: File upload (JSON/YAML)

**Response:**
```json
{
  "success": true,
  "filename": "example.json",
  "data": {
    "nodes": [...],
    "edges": [...]
  },
  "originalData": {...}
}
```

### POST `/api/parse`
Parse JSON/YAML content directly.

**Request:**
```json
{
  "content": "...",
  "type": "json" | "yaml"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "nodes": [...],
    "edges": [...]
  },
  "originalData": {...}
}
```

## 🎨 Customization

### Styling
- Modify CSS files in `client/src/components/` for component-specific styles
- Update `client/src/App.css` for global application styles
- Customize React Flow appearance in the main App component

### Node Types
- Extend node types in the React Flow configuration
- Add custom node components for different data types
- Modify the `convertToTree` function in `server/index.js` for custom node generation

### Layout Algorithms
- Add new layout options in `client/src/utils/layoutUtils.js`
- Implement custom positioning algorithms
- Integrate with other graph layout libraries

## 🚦 Development

### Available Scripts

**Root level:**
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build the frontend for production
- `npm run start` - Start the production server
- `npm run install:all` - Install all dependencies

**Frontend (client/):**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend (server/):**
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server

### Environment Variables

Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
```

## 🔒 Security

- File upload size limited to 10MB
- Only JSON, YAML, and YML files accepted
- Helmet.js for security headers
- Input validation and sanitization
- CORS configured for frontend origin

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original ConfMap tool
- Built with React Flow for mind map visualization
- Uses Dagre for automatic graph layout
- Icons provided by Lucide React

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `server/index.js` or `client/vite.config.js`

2. **File upload fails**
   - Check file size (max 10MB)
   - Ensure file format is JSON, YAML, or YML
   - Verify backend server is running

3. **Layout issues**
   - Clear browser cache
   - Check console for JavaScript errors
   - Ensure all dependencies are installed

### Performance Tips

- Use smaller files for better performance
- Close browser developer tools when not needed
- Use Chrome or Firefox for best React Flow performance

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Include browser version, Node.js version, and error messages

---

**Made with ❤️ for the developer community**
