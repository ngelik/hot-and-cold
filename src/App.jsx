import React, { useState, useEffect } from 'react';
import { getGlobalTemperatures } from './utils';
import TemperatureCard from './components/TemperatureCard';
import './styles/App.css';

function App() {
  const [activeRegion, setActiveRegion] = useState('All Regions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [temperatures, setTemperatures] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTemperatures();
  }, []);

  const fetchTemperatures = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getGlobalTemperatures();
      if (result) {
        setTemperatures(result);
      } else {
        setError('Unable to fetch temperature data. Please try again later.');
      }
    } catch (err) {
      setError('Unable to fetch temperature data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleString();
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="logo">GlobalWeather</div>
          <nav className="nav">
            <ul className="nav-list">
              <li 
                className={`nav-item ${activeRegion === 'All Regions' ? 'active' : ''}`}
                onClick={() => setActiveRegion('All Regions')}
              >
                All Regions
              </li>
              <li 
                className={`nav-item ${activeRegion === 'Asia' ? 'active' : ''}`}
                onClick={() => setActiveRegion('Asia')}
              >
                Asia
              </li>
              <li 
                className={`nav-item ${activeRegion === 'Europe' ? 'active' : ''}`}
                onClick={() => setActiveRegion('Europe')}
              >
                Europe
              </li>
              <li 
                className={`nav-item ${activeRegion === 'North America' ? 'active' : ''}`}
                onClick={() => setActiveRegion('North America')}
              >
                North America
              </li>
              <li 
                className={`nav-item ${activeRegion === 'South America' ? 'active' : ''}`}
                onClick={() => setActiveRegion('South America')}
              >
                South America
              </li>
              <li 
                className={`nav-item ${activeRegion === 'Africa' ? 'active' : ''}`}
                onClick={() => setActiveRegion('Africa')}
              >
                Africa
              </li>
              <li 
                className={`nav-item ${activeRegion === 'Oceania' ? 'active' : ''}`}
                onClick={() => setActiveRegion('Oceania')}
              >
                Oceania
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container">
        <div className="filters">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search for a city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="filter-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Filter by country</option>
            {/* Add country options dynamically */}
          </select>
        </div>

        <div className="city-grid">
          {/* Example city card - replace with your actual data mapping */}
          <div className="city-card">
            <h3 className="city-name">Tokyo</h3>
            <p className="city-info">Japan</p>
            <div className="temperature">23°C</div>
            <p className="city-info">Last updated: 12:00 PM</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App; 