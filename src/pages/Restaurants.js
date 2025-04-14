import { useState } from 'react';
import Geolocation from '../components/Geolocation';
import SearchRestaurants from '../components/SearchRestaurants';
import '../styles/Restaurants.scss';

function Restaurants() {
    const [ latitude, setLatitude ] = useState(null); // stores latitude
    const [ longitude, setLongitude ] = useState (null); // stores longitute

    //callback funtion to handle the coordinates that are fetched through Geolocation.js
    const handleLocationFetched = (lat, lon) => {
        console.log (`Latitude: ${lat}, Longitude: ${lon}`);
        setLatitude(lat);
        setLongitude(lon);
    };

    return (
        <div className="main-restaurant-container">
            <div className="main-restaurant-page-header">
                <h2>Find Restaurants Nearby</h2>
                    <div className="main-restaurant-page-info">
                        <p>
                            Look for nearby restaurants based on your location
                        </p>
                    </div>
            </div>

            {/* Pass a callback to Geolocation to send lat and lon back when available*/}
            <Geolocation onLocationFetched = {handleLocationFetched}/>
           {latitude && longitude && (
                <SearchRestaurants latitude={latitude} longitude={longitude}/> // passing the props
            )}
        </div>
    );

}

export default Restaurants; 