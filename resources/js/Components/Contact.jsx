import React from "react";
import "./Contact.css";
 
const Contact = () => {
  return (
    <section className="contact-section">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Have questions or want to work with us? We’d love to hear from you.
      </p>
 
      <div className="contact-container">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
 
        <div className="contact-map">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3940.65517484376!2d77.96039499999999!3d9.003841999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMDAnMTMuOCJOIDc3wrA1NyczNy40IkU!5e0!3m2!1sen!2sin!4v1754904169524!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
 
export default Contact;