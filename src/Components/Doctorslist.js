import React, { useState } from 'react';
import './Doctorslist.css'; // Make sure the CSS file is named SearchBar.css

const SearchBar = () => {
  const [specialty, setSpecialty] = useState('');
  const [address, setAddress] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    // Implement your search logic here
    console.log('Searching for:', specialty, address);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Spécialité"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="location-icon">📍</span>
          <input
            type="text"
            placeholder="Adresse"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
