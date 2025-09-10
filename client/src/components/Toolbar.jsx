import React from 'react';
import { Download, Layout, MoreHorizontal, Loader } from 'lucide-react';
import './Toolbar.css';

const Toolbar = ({ layout, setLayout, onExport, fileName, isExporting }) => {
  const layoutOptions = [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
    { value: 'radial', label: 'Radial' }
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <label className="toolbar-label">Layout:</label>
        <select 
          value={layout} 
          onChange={(e) => setLayout(e.target.value)}
          className="layout-select"
        >
          {layoutOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={onExport}
        className={`export-btn ${isExporting ? 'exporting' : ''}`}
        disabled={!fileName || isExporting}
        title="Export as PNG"
      >
        {isExporting ? (
          <>
            <Loader size={16} className="spinner" />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <Download size={16} />
            <span>Export as PNG</span>
          </>
        )}
      </button>

      <div className="toolbar-divider"></div>

      <button className="fullscreen-btn" title="Fullscreen">
        <Layout size={16} />
      </button>
    </div>
  );
};

export default Toolbar;
