import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.scss';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Discover Ireland's Magic</h1>
        <p>From ancient castles to stunning landscapes, experience the warmth of Irish hospitality and the rich tapestry of Celtic culture</p>
        <Link to="/destinations" className="cta-button">
          Start Your Journey
        </Link>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <h3>Scenic Landscapes</h3>
          <p>From the dramatic Cliffs of Moher to the serene lakes of Killarney, discover Ireland's breathtaking natural wonders</p>
        </div>
        <div className="feature-card">
          <h3>Rich Culture</h3>
          <p>Immerse yourself in centuries of history, traditional music, dance, and the legendary Irish storytelling</p>
        </div>
        <div className="feature-card">
          <h3>Local Experiences</h3>
          <p>Connect with authentic Irish experiences, from pub culture to traditional crafts and local festivals</p>
        </div>
      </section>

      <section className="cta-section text-center mt-3">
        <h2>Ready to Explore?</h2>
        <p className="mb-2">Join us on an unforgettable journey through the Emerald Isle</p>
        <Link to="/destinations" className="button">
          View All Destinations
        </Link>
      </section>
    </div>
  );
};

export default Home; 