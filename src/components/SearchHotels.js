import { useEffect, useState } from "react";
import axios from "axios";
import { Hotel as HotelIcon, MapPin, Mail } from 'lucide-react'; // https://lucide.dev/guide/packages/lucide-react
import '../styles/SearchHotels.scss';
import Rating from "./Rating"; //importing star ratings component


function SearchHotels(props) {
    const API_KEY="f0a01cf0c1c041c39129c5bce3664588";
    const [hotels, setHotels] = useState([]); // list of hotels
    const [loading, setLoading] = useState (false); 
    const [error, setError] = useState ("");
    const [count,setCount] = useState(0); // pagination counter
    const [buttonDisabled, setButtonDisabled] = useState(false); //Disables the button when max reached
    const maxItems = 50;
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false); // trying to avoid double loading
    const [isReady, setIsReady] = useState (false); // overall const for longitude and latitude to track if they are set

    const categories = "accommodation"; // extacting hotels based on category
    const radius = 5000; // search in meters

    const fetchHotels = async function () {
        const { latitude, longitude } = props; // Getting lat and lon from props

        if (!latitude || !longitude) return; // exists if coordinates are not available
        setLoading(true);
        setError(""); // Reset error before the request


        try{
            const result = await axios.get("https://api.geoapify.com/v2/places", { // api call
                params: {
                    categories: categories,
                    filter: `circle:${longitude},${latitude},${radius}`,
                    limit: 12,
                    offset: count * 12, // added to paginate
                    apiKey: API_KEY,
                },

            });// {
            const data = result.data;
            if (data.features && data.features.length > 0) {
                //setHotels(data.features);
                setHotels(prev => [...prev, ...data.features]); //append new results to the current list

                if ((hotels.length + result.data.features.length) >= maxItems) {
                    setButtonDisabled(true); // disables the button when max reached
                }

            } else {
                //setHotels([]); //No hotels
                setButtonDisabled(true);
                setError("No hotels found in this area");
            }
        } catch (err) {
            setError("Failed to fetch hotels.");
        } finally {
            setLoading(false);
        }
    };

    //first useEffect to track if longitute nad latitude are both set
    useEffect(() => {
        if (props.latitude && props.longitude) {
            setIsReady(true);
        } 
    }, [props.latitude, props.longitude]);

    //second useEffect to get the hotels when lat and lon are ready
    useEffect(() => {
        if(!isReady) return;
        //only loading the first batch of the hotels - 12, when count is 0
        if (!hasLoadedOnce && count ===0) {
            fetchHotels();
            setHasLoadedOnce(true);
        } else if (count > 0) { // if the cont is more than 0 (triggered by the button "Load More")
            fetchHotels();
        }
    }, [isReady, count]);
    
    //increaments pagination count to get the next batch of the hotels
    function handleClick(e) {
        e.preventDefault();
        setCount(prev => prev + 1);
    
    }

    //rendering the hotel cards, handling error and loading states
    return(
        <div>
            {loading && <p>Loading hotels...</p>}
            {error && <p>{error}</p>}

            <ul className="hotel-grid">
                {hotels.map((place, index) => (
                    <li key={index} className="hotel-card">
                        <p>
                            <span className="icon-circle">
                            <HotelIcon size={24} />
                            </span>
                            <strong>{place.properties.name}</strong>
                        </p>
                        <p><MapPin size={18}/>{place.properties.address_line2 || "Address not available"}</p>
                        <p><Mail size={18}/>{place.properties.postcode}</p>
                        {/*Adding the ratings*/}
                        <Rating />
                    </li>
                ))}
            </ul>
            {/*Load More button added*/}
            <button onClick={handleClick} disabled={buttonDisabled} className="load-more-button">Load more hotels</button>
            {buttonDisabled ? <p>You reached the end of your search - no more hotels can be found in this area</p> : null}
        </div>
    
    );

}



export default SearchHotels;