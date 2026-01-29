import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Footer Top */}
      <div className="footer-top">
        <div className="footer-about">
          <h2>Happy <span>Events</span></h2>
          <p>
            Creating unforgettable moments with passion, creativity, and
            excellence. Let’s make your special day extraordinary!
          </p>
        </div>

        

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📍 Galle Road, Sri Lanka</p>
          <p>📞 +94 77 123 4567</p>
          <p>📧 happyevents@gmail.com</p>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Happy Events. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;
