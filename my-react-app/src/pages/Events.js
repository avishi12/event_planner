import React from "react";
import "./Events.css";

const Events = () => {
  return (
    <div className="events">

      {/* Hero Section */}
      <section className="events-hero">
        <h1>Our <span>Events</span></h1>
        <p>We plan events that create lasting memories</p>
      </section>

      {/* Events Section */}
      <section className="events-content">
        <h2>What We Organize</h2>

        <div className="event-cards">

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac"
              alt="Wedding Event"
            />
            <h3>Wedding Events</h3>
            <p>
              Beautifully planned weddings with elegant decorations,
              perfect coordination, and unforgettable moments.
            </p>
          </div>

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
              alt="Birthday Party"
            />
            <h3>Birthday Parties</h3>
            <p>
              Fun-filled birthday celebrations designed with colorful
              themes and joyful experiences for all ages.
            </p>
          </div>

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865"
              alt="Corporate Event"
            />
            <h3>Corporate Events</h3>
            <p>
              Professional corporate meetings, conferences, and
              team-building events executed flawlessly.
            </p>
          </div>

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1"
              alt="Engagement Event"
            />
            <h3>Engagement Ceremonies</h3>
            <p>
              Stylish engagement events crafted with elegance,
              creativity, and personal touches.
            </p>
          </div>

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
              alt="Anniversary Event"
            />
            <h3>Anniversary Celebrations</h3>
            <p>
              Celebrate love and milestones with beautifully
              organized anniversary events.
            </p>
          </div>

          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865"
              alt="Private Party"
            />
            <h3>Private Parties</h3>
            <p>
              Exclusive private parties planned with creativity,
              style, and seamless execution.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Events;
