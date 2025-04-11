import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather for a location
 * @param {string} city - City name
 * @param {string} country - Country code (e.g., 'IE' for Ireland)
 * @returns {Promise} - Weather data
 */
export const getCurrentWeather = async (city, country = 'IE') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: `${city},${country}`,
        appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
        units: 'metric' // Use metric units (Celsius)
      }
    });
    
    return {
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      city: response.data.name,
      country: response.data.sys.country
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};

/**
 * Get weather icon URL
 * @param {string} iconCode - Weather icon code from API
 * @returns {string} - URL to the weather icon
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}; 