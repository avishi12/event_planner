import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to <span>Happy Events</span></h1>
          <p>
            Making your special moments unforgettable with perfect planning,
            creativity, and passion.
          </p>
          <button className="hero-btn">Plan Your Event</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Special Events</h2>

        <div className="service-cards">
          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac"
              alt="Wedding Event"
            />
            <h3>Wedding Planning</h3>
            <p>Elegant, romantic, and stress-free weddings.</p>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
              alt="Birthday Party"
            />
            <h3>Birthday Parties</h3>
            <p>Fun, colorful, and memorable birthday celebrations.</p>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865"
              alt="Corporate Event"
            />
            <h3>Corporate Events</h3>
            <p>Professional and impressive business events.</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta">
        <h2>Let’s Create Something Beautiful Together</h2>
         <button
      className="cta-btn"
      onClick={() => navigate("/contact")}
    >
      Contact Us
    </button>
      </section>

    </div>
  );
};

export default Home;
