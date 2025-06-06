/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useState } from 'react';  //to handle selecting location
import Highcharts from 'highcharts';  //import highcharts library
import HighchartsReact from 'highcharts-react-official'; //highcharts for react
import temperatureData from '../data/temperature.json'; //importing the data from json file that I made using data on weatherspark

const LowTemperatureChart = () => {
  //getting the locations and months from the json info
  const locations = temperatureData.data.locations;
  const months = temperatureData.data.months;
  
  //default location set to dublin
  const [selectedLocation, setSelectedLocation] = useState("Dublin");

  //chart options
  const chartOptions = {
    chart: {
      type: 'column', // bar chart
      backgroundColor: 'aliceblue', //chart background color to match card
    },
    title: {
      text: `Average Low Temperatures in ${selectedLocation}`,  // change chart title depending on which location is selected
    },
    xAxis: {
      categories: months,  //months along the X-axis
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)',  //title for Y-axis
      },
    },
    series: [
      {
        name: selectedLocation,  // name based on selected location
        data: locations[selectedLocation].lows, // low temp data from selected location
        color: "#007bff" //bar colour, blue for cold temperature, same blue as search button
      },
    ],
  };

  //function to handle dropdown change
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="chart-container">  {/*overall container for chart */}
      <div className="chart-header">   {/*title and dropdown */}
        <h3>Low Temperatures</h3>
        {/*dropdown menu to select location - calls handleLocationChange when user selects a new option */}
        <select onChange={handleLocationChange} value={selectedLocation}className="dropdown-button">
          {/*dropdown options for Dublin, Shannon, Sligo */}
          <option value="Dublin">Dublin</option>
          <option value="Shannon">Shannon</option>
          <option value="Sligo">Sligo</option>
        </select>
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />  {/* displaying chart with selected location and chart options */}
    </div>
  );
};

export default LowTemperatureChart;
