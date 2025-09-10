import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import './SearchPanel.css';

const SearchPanel = ({ onSearch, searchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-panel">
      <div className="search-input-container">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search nodes..."
          value={localSearchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {localSearchTerm && (
          <button onClick={clearSearch} className="clear-search-btn">
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
