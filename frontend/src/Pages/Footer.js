import './Footer.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import twitter from "../images/twitter.png";
import face from "../images/Facebook.png";
import insta from "../images/insta.png"
import axios from "axios";

function Footer() {

 
  return (
    <>
     <footer id="footer" className="footer-1">
      <div className="widget no-box">
        <h5 className="widget-title">Contact Us<span></span></h5>
        <p><a href="mailto:info@domain.com" title="glorythemes">info@domain.com</a></p>
        <ul className="social-footer2">
          <li><a href="https://www.facebook.com/" target="_blank" title="Facebook"><img alt="Facebook" width="30" height="30" src={face} /></a></li>
          <li><a href="https://twitter.com" target="_blank" title="Twitter"><img alt="Twitter" width="30" height="30" src={twitter} /></a></li>
          <li><a title="instagram" target="_blank" href="https://www.instagram.com/"><img alt="instagram" width="30" height="30" src={insta} /></a></li>
        </ul>
      </div>
      <p className="copyright">&copy; Trip Trail {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
    </>
  );
}

export default Footer;