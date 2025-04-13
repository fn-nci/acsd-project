/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useState } from 'react';  //to handle selecting location
import Highcharts from 'highcharts';  //import highcharts library
import HighchartsReact from 'highcharts-react-official';  //highcharts for react
import rainfallData from '../data/rainfall.json';  //importing data from json file I created using figures from weatherspark

const RainfallChart = () => {
  //getting the locations and months from the json info
  const locations = rainfallData.data.locations;
  const months = rainfallData.data.months;

  // default location set to dublin
  const [selectedLocation, setSelectedLocation] = useState("Dublin");

  //function to handle dropdown change
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);   //update selectedLocation state when user selects an option
  };

  //chart options
  const chartOptions = {
    chart: {
      type: 'column',   // bar chart
      backgroundColor: 'aliceblue', // chart background color to match card
    },
    title: {
      text: `Average Monthly Rainfall in ${selectedLocation}`,  // change chart title depending on which location is selected
    },
    xAxis: {
      categories: months,  //months along the X-axis
    },
    yAxis: {
      min: 0,  //start at 0
      title: {
        text: 'Rainfall (mm)',   //title for Y-axis
      },
    },
    series: [
      {
        name: selectedLocation,  // name based on selected location
        data: locations[selectedLocation],  //rainfall data for selected location
        color: '#00cc99', //bar colour for rainfall, it's called carribbean green, how lovely
      },
    ],
  };

  return (
    <div className="chart-container">   {/*overall container for chart */}
      <div className="chart-header">  {/*title and dropdown */}
        <h3>Monthly Rainfall</h3>
        {/*dropdown menu to select location - calls handleLocationChange when user selects a new option */}
        <select onChange={handleLocationChange} value={selectedLocation} className="dropdown-button">
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

export default RainfallChart;
