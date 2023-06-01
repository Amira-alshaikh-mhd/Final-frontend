import React, { useState } from 'react';
import axios from 'axios';
import '../Pages/signin.css'
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import signInImage from '../images/logo.png'
import { Link } from "react-router-dom";
import {useCookies} from "react-cookie";




const SignInPage = () => {
    const navigate = useNavigate();

// const [_, setCookies] = useCookies(["access_token"])


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a payload object with email and password
    const payload = {
      email,
      password,
    };

    try {
      
      const response = await axios.post('https://trip-trail.onrender.com/user/login', payload);
      // setCookies("access_token", response.data.token)

      if (response.data.role === "superadmin" || response.data.role === "admin") {
        sessionStorage.setItem('id', response.data.user);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('role', response.data.role);

        navigate("/Dashboard", { replace: true });
    } else if (response.data.role === "user") {
        sessionStorage.setItem('id', response.data.user);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('name', response.data.name);
        // sessionStorage.setItem('email', response.data.email);
        // sessionStorage.setItem('phone', response.data.phone);
        navigate("/", { replace: true });
    } else {

        toast.error(response.data.message, { position: toast.POSITION.TOP_RIGHT });
    }




      if (response.status === 200) {
        const  token  = response.data;
        console.log(token, 'dssd');
        navigate("/", { replace: true });
        
        // Handle successful login, e.g., store the token in local storage or state
      } else {
        const { message } = response.data;
        setError(message);
      }
      console.log(response.data.user)

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Internal server error');
      }
    }













    try {
      const response = await axios.post('https://trip-trail.onrender.com/host/login', payload);


      // setCookies("access_token", response.data.token)
      
        sessionStorage.setItem('id', response.data.host);
        sessionStorage.setItem('token', response.data.token);
      

        // navigate("/bookings", { replace: true });


      if (response.status === 200) {
        const  token  = response.data;
        console.log(token, 'dssd')
        navigate("/", { replace: true });
        
        // Handle successful login, e.g., store the token in local storage or state
      } else {
        const { message } = response.data;
        setError(message);
      }
      console.log(response.data.user)

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Internal server error');
      }
    }




























  };

  return (
    <>
    <ToastContainer />
    <div className="sign-in-container">
    <div className="image-container">
    <Link to="/" className="link-item">
      <img src={signInImage} alt="Sign In" className="sign-in-image" />
      </Link>
    </div>
    <div className="form-container">
      <h2 className='sign-title'>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='signin-btn'>Sign in</button>
        <div className='sign-div'>
          <p className='reg-p'> If you don't have account </p>
        <Link to="/signup" className=' sign-link'>Sign up</Link>
      

        
        </div>
      </form>
    </div>
  </div>
  </>
  );
};

export default SignInPage;





