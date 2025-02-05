import React from 'react';
import '../styles/TemperatureCard.css';

function TemperatureCard({ place, type }) {
  return (
    <div className={`temperature-card ${type}`}>
      <h4>{place.name}</h4>
      <div className="temperature">
        {place.temperature}°C
      </div>
      <div className="details">
        <p>Location: {place.location}</p>
        <p>Time: {place.time}</p>
      </div>
    </div>
  );
}

export default TemperatureCard; 