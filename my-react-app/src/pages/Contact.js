


import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">

      {/* Header Section */}
      <section className="contact-hero">
        <h1>Contact <span>Happy Events</span></h1>
        <p>We’d love to hear from you. Let’s plan something amazing!</p>
      </section>

      {/* Contact Content */}
      <section className="contact-content">

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Reach out to us for event planning, pricing, or custom packages.
            Our team is always ready to help.
          </p>

          <div className="info-item">
            <strong>📍 Address:</strong>
            <span>Galle Road, Sri Lanka</span>
          </div>

          <div className="info-item">
            <strong>📞 Phone:</strong>
            <span>+94 77 123 4567</span>
          </div>

          <div className="info-item">
            <strong>📧 Email:</strong>
            <span>happyevents@gmail.com</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>

          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Event Type" />
            <textarea placeholder="Your Message" rows="5"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

      </section>

    </div>
  );
};

export default Contact;
