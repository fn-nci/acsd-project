import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Geoloction.scss';
import { Compass, MapPin, Globe } from 'lucide-react'; // https://lucide.dev/guide/packages/lucide-react

function Geolocation(props) { // added props
    const myApiKey = "f0a01cf0c1c041c39129c5bce3664588";
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [error, setError] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        getCoords();
    }, []); // runs the effect only once after the initial render

    const getCoords = async function () {
        navigator.geolocation.getCurrentPosition(async function (pos) {
            setLatitude(pos.coords.latitude);
            setLongitude(pos.coords.longitude);

            // pass the coordinations to the parent component via props
            props.onLocationFetched(pos.coords.latitude, pos.coords.longitude);

            try {
                const incomingData = await axios.get("https://api.geoapify.com/v1/geocode/reverse", { params: { lat: pos.coords.latitude, lon: pos.coords.longitude, apiKey: myApiKey } });
                setCity(incomingData.data.features[0].properties.city);
                setCountry(incomingData.data.features[0].properties.country);
                setError("");
            } catch (error) {
                setError("Could not retrieve location. Check your API key or try again later!");
            }
        }, function (err) {
            setError("User denied geo access");
        });

        if (!("geolocation" in navigator)) {
            setError("Geolocation is not supported!");
        }
    }

    if (error) {
        return (
            <div>
                <h4>{error}</h4>
            </div>
        );
    } else {
        return (
            <div className="geo-container">
                <div className="geo-box">
                    <span className="geo-icon">< Compass size={20} /></span>
                    <p><strong>Latitude:</strong></p>
                    <p>{latitude}</p>
                </div> 
                <div className="geo-box">
                    <span className="geo-icon">< MapPin size={20} /></span>
                    <p><strong>Longitude:</strong></p>
                    <p>{longitude}</p>
                </div> 
                <div className="geo-box">
                    <span className="geo-icon">< Globe size={20} /></span>
                    <p><strong>Location:</strong></p>
                    <p>{city}, {country}</p>
                </div> 
            </div>
        );
    }
}

export default Geolocation;