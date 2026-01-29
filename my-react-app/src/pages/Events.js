import React, { useState } from "react";
import "./Events.css";

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [eventType, setEventType] = useState("");
  const openForm = (type) => {
  setEventType(type);
  setShowForm(true);
};
  const handleSubmit = (e) => {
  e.preventDefault(); // stop page reload

  // simulate saving data
  setTimeout(() => {
    alert("✅ Your event details have been submitted successfully!");
    setShowForm(false); // close modal
  }, 500);
};

const closeForm = () => {
  setShowForm(false);
};

  return (
    <div className="events">

      {/* Hero Section */}
      <section className="events-hero">
        <h1>Our <span>Events</span></h1>
        <p>We plan events that create lasting memories</p>
      </section>

      {/* Events Cards */}
      <section className="events-content">
        <h2>What We Organize</h2>

        <div className="event-cards">

          {/* Wedding */}
          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac"
              alt="Wedding Event"
            />
            <h3>Wedding Events</h3>
            <p>Elegant weddings with perfect planning and decoration.</p>
            <button className="book-btn" onClick={() => openForm("Wedding")}>
              Book Now
            </button>
          </div>

          {/* Birthday */}
          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
              alt="Birthday Party"
            />
            <h3>Birthday Parties</h3>
            <p>Fun-filled birthday celebrations for all ages.</p>
            <button className="book-btn" onClick={() => openForm("Birthday")}>
              Book Now
            </button>
          </div>

          {/* Corporate */}
          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865"
              alt="Corporate Event"
            />
            <h3>Corporate Events</h3>
            <p>Professional meetings, conferences, and company events.</p>
            <button className="book-btn" onClick={() => openForm("Corporate")}>
              Book Now
            </button>
          </div>

          {/* Engagement */}
          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1"
              alt="Engagement Ceremony"
            />
            <h3>Engagement Ceremonies</h3>
            <p>Stylish and romantic engagement celebrations.</p>
            <button className="book-btn" onClick={() => openForm("Engagement")}>
              Book Now
            </button>
          </div>

          {/* Anniversary */}
          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
              alt="Anniversary Celebration"
            />
            <h3>Anniversary Celebrations</h3>
            <p>Celebrate love and milestones beautifully.</p>
            <button className="book-btn" onClick={() => openForm("Anniversary")}>
              Book Now
            </button>
          </div>

          {/* Private Party */}
          <div className="event-card">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865"
              alt="Private Party"
            />
            <h3>Private Parties</h3>
            <p>Exclusive private events planned with style.</p>
            <button className="book-btn" onClick={() => openForm("Private Party")}>
              Book Now
            </button>
          </div>

        </div>
      </section>

      {/* Booking Form Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Book {eventType} Event</h2>

           <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Customer Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="date" required />
              <input type="text" placeholder="Event Location" />
              <textarea
                placeholder="Special Requirements"
                rows="4"
              ></textarea>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
