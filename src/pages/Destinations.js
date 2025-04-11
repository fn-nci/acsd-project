import React, { useState, useEffect } from 'react';
import irishDestinations from '../data/destinations';
import Weather from '../components/Weather';
import '../styles/Destinations.scss';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the destinations from our static data
    setDestinations(irishDestinations);
    setLoading(false);
  }, []);

  if (loading) return <div className="loading">Loading destinations...</div>;

  return (
    <div className="destinations-container">
      <div className="page-header">
        <h2>Discover Ireland</h2>
        <div className="country-info">
          <p>
            From ancient castles to stunning landscapes, experience the warmth of Irish hospitality 
            and the rich tapestry of Celtic culture. Each destination tells a unique story, 
            waiting to be discovered.
          </p>
        </div>
      </div>

      <div className="destinations-grid">
        {destinations.map((destination) => (
          <div key={destination.id} className="destination-card">
            <div className="destination-image">
              <img src={destination.photo} alt={destination.name} />
            </div>
            <div className="destination-content">
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <div className="destination-details">
                <span>Location: {destination.location}</span>
                <span>Rating: {destination.rating}/5</span>
              </div>
            </div>
            <Weather city={destination.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations; 