import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Phone, Globe, UtensilsCrossed } from 'lucide-react'; // https://lucide.dev/guide/packages/lucide-react
//importing swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/SearchRestaurants.scss';

function SearchRestaurants(props) {
    const API_KEY="f0a01cf0c1c041c39129c5bce3664588";
    const [restaurants, setRestaurants] = useState([]); // stores the list of restaurants
    const [loading, setLoading] = useState (false);
    const [error, setError] = useState ("");

    const categories = "catering.restaurant"; // extacting restaurants by the category
    const radius = 5000; // search in meters

    const fetchRestaurants = async function () {
        const { latitude, longitude } = props; // Getting lat and lon from props

        if (!latitude || !longitude) return;
        setLoading(true);
        setError(""); // Reset error before the request

        try{
            const result = await axios.get("https://api.geoapify.com/v2/places", {
                params: {
                    categories: categories,
                    filter: `circle:${longitude},${latitude},${radius}`,
                    limit: 12,
                    apiKey: API_KEY,
                },

            });// {
            const data = result.data;
            if (data.features && data.features.length > 0) {
                setRestaurants(data.features);
            } else {
                setRestaurants([]); //No restaurants
                setError("No restaurnts found in this area");
            }
        } catch (err) {
            setError("Failed to fetch restaurants.");
        } finally {
            setLoading(false);
        }
    };

    //fetch restaurats as soon as latitude and longitude coordinates are available
    useEffect(() => {
        if (props.latitude && props.longitude) {
            fetchRestaurants();
        } 
    }, [props.latitude, props.longitude]); // trigger the effect when lat and lon are updated

    //rendering the restaurant cards using Swiper (responsive carousel) - https://swiperjs.com/react
    return(
        <div className="restaurant-container">
            <h2>Nearby Restaurants</h2>
            {loading && <p>Loading restaurants...</p>}
            {error && <p className="error">{error}</p>}

            <Swiper
                spaceBetween={15}
                slidesPerView={1}
                pagination={{ clickable: true}}
                navigation
                breakpoints={{
                    640: {slidesPerView: 1},
                    768: {slidesPerView: 2},
                    1024: {slidesPerView: 3},
                }}
                modules={[Navigation,Pagination]} // enabling the arrows and dots 
                className="restaurant-swiper"
            >
                {restaurants.map((place,index) => (
                    <SwiperSlide key={index}>
                        <div className="restaurant-card">
                            <h3>{place.properties.name}</h3>
                            <p><MapPin size={18} color="#1B5E20" /> Address: {place.properties.address_line2}</p>
                            <p><Phone size={18} color="#1B5E20"/> Phone: {place.properties.contact?.phone|| "Not Available"}</p>
                            <p><UtensilsCrossed size={18} color="#1B5E20"/> Cuisine: {place.properties.catering?.cuisine || "Not Available"}</p>
                            <p><Globe size={18} color="#1B5E20"/> Website: {place.properties.website ? (
                                <a href={place.properties.website} target="_blank">Website</a>
                            ) : "Not available"}</p>
                            <p>Opening Hours: {place.properties.opening_hours || "Not Available"}</p>
                        </div>
                    </SwiperSlide>

                ))}

            </Swiper>
        </div>
    
    );

}



export default SearchRestaurants;