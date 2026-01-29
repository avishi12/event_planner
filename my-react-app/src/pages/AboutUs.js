
import React from "react";
import "./AboutUs.css";



const AboutUs = () => {
  return (
    <div className="about">

      {/* Hero Section */}
      <section className="about-hero">
        <h1>About <span>Happy Events</span></h1>
        <p>Turning your dreams into unforgettable celebrations</p>
      </section>

      {/* About Content */}
      <section className="about-content">

        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Happy Events is a passionate event planning team dedicated to
            creating memorable experiences. From intimate celebrations to
            grand events, we handle every detail with creativity, care,
            and professionalism.
          </p>

          <p>
            Our mission is simple: to bring joy, elegance, and perfection
            to every event we plan. With years of experience and a strong
            commitment to excellence, we ensure your special day is truly
            stress-free and unforgettable.
          </p>

          <button className="about-btn">Learn More</button>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Event Planning Team"
          />
        </div>

      </section>

      {/* Values Section */}
      <section className="values">
        <h2>Why Choose Us</h2>

        <div className="value-cards">
          <div className="value-card">
            <h3>🎯 Professional Planning</h3>
            <p>Well-organized events handled by experienced planners.</p>
          </div>

          <div className="value-card">
            <h3>🎨 Creative Ideas</h3>
            <p>Unique themes and designs tailored to your vision.</p>
          </div>

          <div className="value-card">
            <h3>💛 Customer Happiness</h3>
            <p>Your satisfaction is our top priority.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
