
import { useState } from 'react';
import Geolocation from '../components/Geolocation';
import '../styles/Hotels.scss';
import SearchHotels from '../components/SearchHotels';
import ColumnVis from '../components/ColumnVis'; // addig the chart

function Hotels() {
    const [ latitude, setLatitude ] = useState(null); // stores latitude
    const [ longitude, setLongitude ] = useState (null); // stores longitute

    //callback funtion to handle the coordinates that are fetched through Geolocation.js
    const handleLocationFetched = (lat, lon) => {
        console.log (`Latitude: ${lat}, Longitude: ${lon}`);
        setLatitude(lat);
        setLongitude(lon);
    };

    return (
        <div className="hotel-container">
            <div className="hotel-page-header">
                <h2>Find Nearby Hotels</h2>
                    <div className="hotels-info">
                        <p>
                            Look for nearby hotels based on your location
                        </p>
                    </div>
            </div>

            {/* Pass a callback to Geolocation to send lat and lon back when available */}
            <Geolocation onLocationFetched = {handleLocationFetched}/>
           {latitude && longitude && (
                <SearchHotels latitude={latitude} longitude={longitude}/>
            )}
            <hr /><br />
            <ColumnVis />
        </div>
    );

}

export default Hotels; 