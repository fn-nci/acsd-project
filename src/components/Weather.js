import React, { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherIconUrl } from '../services/weatherService';
import '../styles/Weather.scss';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getCurrentWeather(city);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to load weather data');
        console.error('Weather fetch error:', err);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather data every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);

  // Don't display anything if loading, error, or no weather data
  if (loading || error || !weather) {
    return null;
  }

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h3>Current Weather</h3>
        <span className="weather-location">{weather.city}</span>
      </div>
      
      <div className="weather-main">
        <img 
          src={getWeatherIconUrl(weather.icon)} 
          alt={weather.description}
          className="weather-icon"
        />
        <div className="weather-temp">
          <span className="temp-value">{weather.temperature}°C</span>
          <span className="temp-feels-like">
            Feels like {weather.feelsLike}°C
          </span>
        </div>
      </div>

      <div className="weather-info">
        <div className="weather-description">
          {weather.description}
        </div>
        <div className="weather-details">
          <div className="weather-detail">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
          <div className="weather-detail">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{weather.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather; 