import React, { useState, useEffect } from 'react';
import { REGIONS, getTemperaturesWithCache } from './utils';
import './styles/App.css';

const regionEmojis = {
  [REGIONS.ASIA]: '🏯',
  [REGIONS.EUROPE]: '🏰',
  [REGIONS.AFRICA]: '🏜️',
  [REGIONS.NORTH_AMERICA]: '🏞️',
  [REGIONS.SOUTH_AMERICA]: '🦜',
  [REGIONS.OCEANIA]: '🏝️',
};

function App() {
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityFact, setCityFact] = useState('');
  const [factLoading, setFactLoading] = useState(false);
  const [cityImageUrl, setCityImageUrl] = useState('');

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

  const fetchCityFact = async (cityName, countryName) => {
    setFactLoading(true);
    setCityFact('');
    setCityImageUrl('');
    try {
      let apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName)}`;
      let response = await fetch(apiUrl, { headers: { 'Api-User-Agent': 'GlobalTemperatureExtremes/1.0 (https://example.com; cool-tool@example.com)' } });
      let data;

      if (response.ok) {
        data = await response.json();
        if (data.type === 'standard' && data.extract) {
          setCityFact(data.extract);
          if (data.thumbnail && data.thumbnail.source) {
            setCityImageUrl(data.thumbnail.source);
          }
          setFactLoading(false);
          return;
        }
      }

      console.warn(`Initial Wikipedia fetch for "${cityName}" did not yield a direct summary or extract. Trying with country: "${cityName}, ${countryName}".`);
      apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityName + ", " + countryName)}`;
      response = await fetch(apiUrl, { headers: { 'Api-User-Agent': 'GlobalTemperatureExtremes/1.0 (https://example.com; cool-tool@example.com)' } });

      if (response.ok) {
        data = await response.json();
        if (data.extract) {
          setCityFact(data.extract);
        } else if (data.description) {
          setCityFact(data.description);
        } else {
          setCityFact(`Could not find a specific quick fact for ${cityName}, ${countryName} on Wikipedia.`);
        }
        if (data.thumbnail && data.thumbnail.source) {
          setCityImageUrl(data.thumbnail.source);
        } else {
          console.log(`No thumbnail found for ${cityName}, ${countryName} in second attempt.`);
        }
      } else {
        console.error(`Wikipedia API error for ${cityName}, ${countryName} (second attempt): ${response.status} - ${response.statusText}`);
        setCityFact(`Failed to fetch quick fact for ${cityName} from Wikipedia after multiple attempts.`);
      }
    } catch (err) {
      console.error("Error fetching city fact from Wikipedia:", err);
      setCityFact('Could not retrieve a fun fact at this time due to a network or parsing error.');
    } finally {
      setFactLoading(false);
    }
  };

  const handleCityCardClick = async (cityData) => {
    if (cityData && cityData.name !== 'N/A' && cityData.name !== 'Data unavailable') {
      setSelectedCity(cityData);
      setIsModalOpen(true);
      await fetchCityFact(cityData.name, cityData.country);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
    setCityFact('');
    setCityImageUrl('');
    setFactLoading(false);
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
      </header>

      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="regions-grid">
          {Object.values(REGIONS).map((region) => (
            <section key={region} className="region-section">
              <h2 className="region-title">
                {regionEmojis[region] && <span className="region-emoji">{regionEmojis[region]}</span>}
                {region.replace(/_/g, ' ').toLowerCase()}
              </h2>
              <div className="extremes-grid">
                <div 
                  className={`city-card hot ${getTemperatureClass(cities[region]?.hottest.temperature)}`}
                  onClick={() => handleCityCardClick(cities[region]?.hottest)}
                  style={{ cursor: (cities[region]?.hottest && cities[region]?.hottest.name !== 'N/A' && cities[region]?.hottest.name !== 'Data unavailable') ? 'pointer' : 'default' }}
                >
                  <div className="extreme-label">🔥 Hottest</div>
                  <h3 className="city-name">{cities[region]?.hottest.name}</h3>
                  <p className="city-info">{cities[region]?.hottest.country}</p>
                  <div className="temperature">{Math.round(cities[region]?.hottest.temperature)}°C</div>
                </div>
                <div 
                  className={`city-card cold ${getTemperatureClass(cities[region]?.coldest.temperature)}`}
                  onClick={() => handleCityCardClick(cities[region]?.coldest)}
                  style={{ cursor: (cities[region]?.coldest && cities[region]?.coldest.name !== 'N/A' && cities[region]?.coldest.name !== 'Data unavailable') ? 'pointer' : 'default' }}
                >
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
      {isModalOpen && selectedCity && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>&times;</button>
            <h2>{selectedCity.name}, {selectedCity.country}</h2>
            <p><strong>Temperature:</strong> {selectedCity.temperature !== undefined && selectedCity.temperature !== null ? Math.round(selectedCity.temperature) : 'N/A'}°C</p>
            {factLoading ? (
              <p><i>Loading interesting fact...</i></p>
            ) : (
              <p className="quick-fact-text"><strong>Quick Fact:</strong> {cityFact || 'No fact available.'}</p>
            )}
            <div className="city-preview-placeholder">
              {cityImageUrl ? (
                <img src={cityImageUrl} alt={`Preview of ${selectedCity.name}`} className="city-preview-image" />
              ) : (
                <p>{factLoading ? 'Loading image...' : 'No preview image available.'}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 