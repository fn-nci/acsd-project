/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useState, useEffect } from 'react';
import '../styles/IrishWeather.scss'; // importing styles

// Importing weather charts
import HighTemperatureChart from '../components/HighTemperatureChart'
import LowTemperatureChart from '../components/LowTemperatureChart';
import RainfallChart from '../components/RainfallChart';
import ClearerSkiesChart from '../components/ClearerSkiesChart';

//irish weather function
const IrishWeather = () => {
  //state to store city entered by user
  const [city, setCity] = useState('');
  //to store current weather data from openweathermap API
  const [weatherData, setWeatherData] = useState(null);
  //to store weather forecast info
  const [forecastData, setForecastData] = useState(null);
  //to store any errors that occur while fetching data
  const [error, setError] = useState(null);
  
  // my openweathermap API key
  const apiKey = 'a4ea663baaab42d461611341e3c22c69'; 

  //function to update city when input field changes
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherData = async (cityName) => {
    try {
      // API call to get latitude and longitude from city name entered by user
      const geocodeResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      //convert response to JSON format
      const geocodeData = await geocodeResponse.json();
      
      //if city is not found, in other words if status code is not 200, throw an error
      if (geocodeData.cod !== 200) {
        throw new Error('City not found');
      }
      
      //destructure latitude and longitude from response data
      const { lat, lon } = geocodeData.coord;

      // API call to get current weather data using latitude and longitude from above
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      //convert response to JSON format
      const weatherData = await weatherResponse.json();

      // API call to get 5-day forecast data for same lat and lon
      const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      //convert response to JSON format
      const forecastData = await forecastResponse.json();

      //set fetched weather and forecast data 
      setWeatherData(weatherData); //save weather data in state
      setForecastData(forecastData); //save forecast data in state
      setError(null); //clear previous error messages if any
    } catch (err) {
      //if there's an error
      setError(err.message);  //set error msg
      setWeatherData(null); //clear previous weather data
      setForecastData(null); //clear previous forecast data
    }
  };

  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();   //to stop page from refreshing
    if (city.trim()) {   //to check it's not just white space
      getWeatherData(city.trim());  //remove any white space and fetch weather data for entered city
    }
  };

  //convert unix timestamp to local time in HH:mm format using 'en-IE' for ireland
  const convertTime = (timestamp) => {
    const date = new Date(timestamp * 1000); //milliseconds
    return date.toLocaleString('en-IE', { hour: '2-digit', minute: '2-digit' });
  };

  //format current date (day, month, year)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); //milliseconds
    const day = date.getDate();
    const month = date.getMonth() + 1; //starts at index zero so add 1
    const year = date.getFullYear(); 
    return `${day}/${month}/${year}`; //formatted date
  };


  //get weather based on current location (lat/lon)
  const getWeatherByCoords = async (lat, lon) => {
    try {
      //call to OpenWeatherMap API using latitude and longitude (I'm sure there's a clever way to combine this with the getWeatherData 
      //function but I'm not there yet )
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      //convert response to JSON format
      const weatherData = await weatherResponse.json();
      //API call for the forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      //convert response to JSON format
      const forecastData = await forecastResponse.json();

      //set fetched weather and forecast data
      setWeatherData(weatherData);  //save weather data in state
      setForecastData(forecastData);  //save forecast data in state
      setCity(weatherData.name); // set city name from response
      setError(null);  //clear previous error messages if any
    } catch (err) {
      //if there's an error
      setError('Could not retrieve weather information for your location.');
      setWeatherData(null);  //clear previous data
      setForecastData(null);
    }
  };

  // detect user location and call getWeatherByCoords (ref https://www.w3schools.com/jsref/met_geo_getcurrentposition.asp)
  const handleDetectLocation = () => {
    //check to see if browser supports geolocation
    if (navigator.geolocation) {
      //try to get the current location
      navigator.geolocation.getCurrentPosition(
        //browser will look for user permission unless already granted, if successful, use lat and lon in getWeatherByCoords
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError("Unable to detect your location. Please enter a city instead.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };


  return ( 
    <div className="weather-page-body">
      {/* adding header to create unified feel for website */}
     <div className="weather-page-header">
      <h2>Irish Weather</h2>
      <div className="weather-info">
        <p>
          We have lots of it. Come see your yourself.
        </p>
      </div>  
      </div> 

        
      {/* Text before the search box */}
      <div className="intro-text">
        {/* Intro paragraph about weather above search box */}
        <p>
          Ireland is famous for its weather, and rightfully so. Ask any Irish person and 
          they will tell you to expect four seasons in one day. So to help you keep ahead of
          the weather gods, get up-to-date weather information here for any city in Ireland. 
          Just type in the city name and we'll provide you with the current weather,
          including temperature, weather conditions, sunrise, sunset, and a 24-hour
          forecast. Plus we've included some handy charts to show you month by month what to
          expect in terms of average temperature highs and lows, year-round rainfall averages by month and the chances of clear skies. 
        </p>
      </div>

      <form className="weather-form" onSubmit={handleSubmit}>
        {/*input field for city name */}
        <input
          type="text"
          value={city}  //input linked to state
          onChange={handleCityChange}  //updates the state 
          placeholder="Enter city name"  //placeholder instead of label to indicate what to type in field
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleDetectLocation}>Get My Location</button>
      </form>

      {/*show red error msg if there's an error*/}
      {error && <div className="weather-error">{error}</div>}

      {weatherData && ( //check if weather data exists first
        <div><br/>
         {/*title with city name that user entered */}
          <h3 className="current-weather-title">Current weather in {city}</h3>

          {/*current weather box className for styling */}
          <div className="current-weather-box">     
            <p>Temperature: {weatherData?.main?.temp}°C</p>
            {/*extract description from weather data */}
            <p>Weather: {weatherData?.weather?.[0]?.description}</p>

            {/*sunrise/sunset */}
            {/*convert sunrise time using convertTime function from above and display */}
            <p>Sunrise: {convertTime(weatherData.sys.sunrise)}</p>
            {/*convert sunset time using convertTime function from above and display */}
            <p>Sunset: {convertTime(weatherData.sys.sunset)}</p>
          </div>

          {/*display 24-hour forecast */}
          {forecastData && (  //check if forecast data exists
            <div>
              <h3 className="forecast-title">Forecast for the next 24 hours</h3>
              <div className="forecast-grid">
              {/*use map to iterate through forecast data, just taking first 8 entries (3 hour intervals for the next 24 hours) */}
                {forecastData.list.slice(0, 8).map((forecast, index) => {
                  const date = new Date(forecast.dt * 1000);  //multiply forecast.dt (seconds) *1000 (milliseconds)  
                  const day = date.toLocaleString('en-IE', { weekday: 'long' }); //get day of week
                  const time = date.toLocaleString('en-IE', { hour: '2-digit', minute: '2-digit' });  //convert time to HH:mm
                  return (
                    <div key={index} className="forecast-item">
                      {/*show day and time for each 3 hourly forecast */}
                      <h4>{day} {time}</h4>
                      {/*show relevant weather description from index 0 of array using optional chaining so it won't crash if something is undefined */}
                      <p>{forecast.weather[0]?.description}</p>
                      {/*show relevant forecasted temperature using optional chaining to safeguard against errors */}
                      <p>{forecast.main?.temp}°C</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/*chart section */}
      <div className="charts-section">
        {/*high temperature chart */}
        <div className="chart-card">
          <HighTemperatureChart />
        </div>

        {/*low temperature chart */}
        <div className="chart-card">
          <LowTemperatureChart />
        </div>

        {/*rainfall chart */}
        <div className="chart-card">
          <RainfallChart />
        </div>

         {/*clearer skies chart */}
         <div className="chart-card">
          <ClearerSkiesChart />
        </div>

        {/*div for data source link to weatherspark */}
        <div className="data-source">
          <span>Data sourced from:</span>
          <a href="https://weatherspark.com/countries/IE" target="_blank" rel="noopener noreferrer">WeatherSpark</a>
        </div>
      </div>
    </div>  
  );
};

export default IrishWeather;
