import React from 'react';
import "./contactUs.css"
import Footer from './Footer';
import Header from './Header';

const ContactUsPage = () => {
  return (
    <>
    <Header /><div className='background'>
    <div className="contact-container">
    <h1 className="title-contact">Contact us</h1>
    

    <form>
      <div className="form-group">
        <label htmlFor="name" className="label">Name:</label>
        <input type="text" id="name" name="name" className="input" />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="label">Email:</label>
        <input type="email" id="email" name="email" className="input" />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="label">Message:</label>
        <textarea id="message" name="message" rows="5" className="textarea" />
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  </div>
  </div>
 <Footer />
  </>
  );
};

export default ContactUsPage;