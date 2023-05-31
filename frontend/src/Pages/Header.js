import './Header.css';
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";


function Header() {

  // const [cookies, setCookies] = useCookies("access_token");

  const token = sessionStorage.getItem("token");


  const removeCookies = () =>{
    // setCookies("access_token", "")
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("role")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("name")
    window.location.reload(false)
  }

  return (
  <>

<div className="home-nav">
<Link to="/" className="link-item">
          <img src={logo} alt="logo" className="logo"></img>
          </Link>
          <div className="header-link">
            <Link to="/" className="link-item">
              Home
            </Link>
            <Link to="/contact" className="link-item">
              Contact us
            </Link>


            {token ? (
              // <button onClick={removeCookies}>Log out</button>
              <Link  onClick={removeCookies} className="link-item">
              Logout
            </Link>
            ) : (
              <Link to="/signin" className="link-item">
                Signin
              </Link>
            )}


          </div>
        </div>
        <hr className='head-hr'></hr>

</>
  );
}

export default Header;