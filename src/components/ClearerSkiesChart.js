/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useState } from 'react';  //to handle selecting location
import Highcharts from 'highcharts';  //import highcharts library
import HighchartsReact from 'highcharts-react-official'; //highcharts for react
import clearerskiesData from '../data/clearerskies.json'; // importing data from json file i made using data from weatherspark

const ClearerSkiesChart = () => {
  //getting the locations and months from the json info
  const locations = clearerskiesData.data.locations;
  const months = clearerskiesData.data.months;

  // default location set to dublin
  const [selectedLocation, setSelectedLocation] = useState("Dublin");

  //chart options
  const chartOptions = {
    chart: {
      type: 'line',  // line chart
      backgroundColor: 'aliceblue', //chart background color to match card

    },
    title: {
      text: `Percentage of Clearer Skies in ${selectedLocation}`,  // change chart title depending on which location is selected
    },
    xAxis: {
      categories: months,  //months along the X-axis
    },
    yAxis: {
      title: {
        text: 'Percentage (%)',  //title for Y-axis
      },
      max: 100, // maximum value on  Y-axis is 100%
    },
    series: [
      {
        name: selectedLocation,  // name based on selected location
        data: locations[selectedLocation], // % clear skies data from selected location
        color: "rgba(238, 14, 70, 0.51)", // pinky purple colour for the line
        lineWidth: 3, //line width
      },
    ],
  };
  //function to handle dropdown change
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="chart-container">  {/*overall container for chart */}
      <div className="chart-header">    {/*title and dropdown */}
        <h3>Clearer Skies</h3>
        {/*dropdown menu to select location - calls handleLocationChange when user selects a new option */}
        <select className="dropdown-button" onChange={handleLocationChange} value={selectedLocation}>
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

export default ClearerSkiesChart;
