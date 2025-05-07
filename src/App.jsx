import React, { useState, useEffect } from 'react';
import { REGIONS, getTemperaturesWithCache } from './utils';
import './styles/App.css';

function App() {
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTemperatureClass = (temp) => {
    if (temp >= 40) return 'temp-40-plus';
    if (temp >= 35) return 'temp-35-40';
    if (temp >= 30) return 'temp-30-35';
    if (temp >= 25) return 'temp-25-30';
    if (temp >= 20) return 'temp-20-25';
    if (temp >= 15) return 'temp-15-20';
    if (temp >= 10) return 'temp-10-15';
    if (temp >= 5) return 'temp-5-10';
    if (temp >= 0) return 'temp-0-5';
    return 'temp-below-0';
  };

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        const data = await getTemperaturesWithCache();
        setCities(data);
      } catch (error) {
        console.error('Error loading cities:', error);
        setError('Failed to load temperature data');
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>🌡️ Global Temperature Extremes</h1>
        <p>Monitoring the hottest and coldest places on Earth by region</p>
      </header>

      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="regions-grid">
          {Object.values(REGIONS).map((region) => (
            <section key={region} className="region-section">
              <h2 className="region-title">{region.replace(/_/g, ' ').toLowerCase()}</h2>
              <div className="extremes-grid">
                <div className={`city-card hot ${getTemperatureClass(cities[region]?.hottest.temperature)}`}>
                  <div className="extreme-label">🔥 Hottest</div>
                  <h3 className="city-name">{cities[region]?.hottest.name}</h3>
                  <p className="city-info">{cities[region]?.hottest.country}</p>
                  <div className="temperature">{Math.round(cities[region]?.hottest.temperature)}°C</div>
                </div>
                <div className={`city-card cold ${getTemperatureClass(cities[region]?.coldest.temperature)}`}>
                  <div className="extreme-label">❄️ Coldest</div>
                  <h3 className="city-name">{cities[region]?.coldest.name}</h3>
                  <p className="city-info">{cities[region]?.coldest.country}</p>
                  <div className="temperature">{Math.round(cities[region]?.coldest.temperature)}°C</div>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default App; 