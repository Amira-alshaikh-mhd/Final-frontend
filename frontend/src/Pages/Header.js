import './Header.css';
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

function Header() {

  return (
  <>

<div className="home-nav">
          <img src={logo} alt="logo" className="logo"></img>
          <div className="header-link">
            <Link to="/" className="link-item">
              Home
            </Link>
            <Link to="/contact/" className="link-item">
              Contact us
            </Link>
            <Link to="/signin" className="link-item">
              Sign in
            </Link>
          </div>
        </div>
        <hr className='head-hr'></hr>

</>
  );
}

export default Header;