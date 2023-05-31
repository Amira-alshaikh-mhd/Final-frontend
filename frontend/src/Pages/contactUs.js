import React from 'react';
import "./contactUs.css"
import Footer from './Footer';
import Header from './Header';
import  { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactUsPage = () => {




  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();


    emailjs.sendForm('service_3u00ymy', 'template_ix8dfvr', form.current, 'dM0ctvZt4BmwcjsM1')
      .then((result) => {
          console.log(result.text);
        window.location.reload(true)

      
      }, (error) => {
          console.log(error.text);
      });
  };








  return (
    <>
    <Header /><div className='background'>
    <div className="contact-container">
    <h1 className="title-contact">Contact us</h1>
    

    <form ref={form} onSubmit={sendEmail}>
      <div className="form-group">
        <label htmlFor="name" className="label">Name:</label>
        <input type="text" id="name" name="User_name" className="input" />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="label">Email:</label>
        <input type="email" id="email" name="User_email" className="input" />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="label">Message:</label>
        <textarea id="message" name="message" rows="5" className="textarea" />
      </div>

      <button type="submit" className="submit-button">Send</button>
    </form>
  </div>
  </div>
 <Footer />
  </>
  );
};

export default ContactUsPage;