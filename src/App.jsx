import React, { useState, useEffect } from 'react';
import { REGIONS, fetchMajorCities, fetchCityTemperature } from './utils';
import TemperatureCard from './components/TemperatureCard';
import './styles/App.css';

function App() {
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTemperatureClass = (temp) => {
    if (temp >= 35) return 'temp-hot';
    if (temp >= 25) return 'temp-warm';
    if (temp >= 15) return 'temp-mild';
    if (temp >= 5) return 'temp-cool';
    return 'temp-cold';
  };

  useEffect(() => {
    const loadCities = async () => {
      try {
        const allCities = await fetchMajorCities();
        const citiesWithTemp = await Promise.all(
          allCities.map(async (city) => {
            const tempData = await fetchCityTemperature(city);
            return tempData;
          })
        );
        
        // Group cities by region
        const groupedCities = citiesWithTemp.reduce((acc, city) => {
          if (!acc[city.region]) {
            acc[city.region] = [];
          }
          acc[city.region].push(city);
          return acc;
        }, {});
        
        setCities(groupedCities);
      } catch (error) {
        console.error('Error loading cities:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  const getCurrentTime = () => {
    return new Date().toLocaleString();
  };

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
        <p className="last-updated">Last updated: {getCurrentTime()}</p>
      </header>

      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="regions-grid">
          {Object.values(REGIONS).map((region) => (
            <section key={region} className="region-section">
              <h2 className="region-title">{region.replace('_', ' ')}</h2>
              <div className="city-grid">
                {cities[region]?.map((city, index) => (
                  <div 
                    key={`${city.name}-${index}`} 
                    className={`city-card ${getTemperatureClass(city.temperature)}`}
                  >
                    <h3 className="city-name">{city.name}</h3>
                    <p className="city-info">{city.country}</p>
                    <div className="temperature">{Math.round(city.temperature)}°C</div>
                    <p className="city-info">Lat: {city.lat}, Lon: {city.lon}</p>
                    <p className="city-info">Updated: {city.time}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default App; 