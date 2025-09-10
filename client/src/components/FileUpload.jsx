import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, FileText } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({ onDataLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file) => {
    const allowedTypes = ['.json', '.yaml', '.yml'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(fileExtension)) {
      setError('Please upload a JSON, YAML, or YML file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      });

      if (response.data.success) {
        onDataLoaded(response.data.data, response.data.filename);
        setError(''); // Clear any previous errors
      } else {
        setError(response.data.error || 'Failed to process file');
      }
    } catch (err) {
      console.error('Upload error:', err);
      if (err.code === 'ECONNABORTED') {
        setError('Upload timeout - file may be too large');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.request) {
        setError('Cannot connect to server. Make sure the backend is running on port 5000.');
      } else {
        setError('Failed to upload file. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-upload-container">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.yaml,.yml"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      <div
        className={`file-upload-area ${isDragging ? 'dragging' : ''} ${isLoading ? 'loading' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {isLoading ? (
          <div className="upload-loading">
            <div className="spinner"></div>
            <span>Processing file...</span>
          </div>
        ) : (
          <div className="upload-content">
            <Upload size={24} />
            <span className="upload-text">Upload File</span>
            <span className="upload-hint">JSON, YAML, YML</span>
          </div>
        )}
      </div>

      {error && (
        <div className="upload-error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
