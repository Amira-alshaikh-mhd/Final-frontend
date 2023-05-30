
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import image from '../images/logo.png';
import { Link } from "react-router-dom";



const RegistrationForm = () => {

    const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        name,
        email,
        password,
        phone,
      });
      alert("user created");
      console.log('Registration successful:', response.data);
                navigate("/Signin", { replace: true });

      // Optionally, you can redirect the user to another page upon successful registration
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle registration error here, e.g., display an error message to the user
    }
  };

  return (

    <div className="sign-in-container">
    <div className="image-container">
    <Link to="/" className="link-item">
      <img src={image} alt="Page Title" className="sign-in-image" />
      </Link>
    </div>
    <div className="form-container">
      <h2 className='sign-title'>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" className='signin-btn'>Register</button>
      </form>
    </div>
  </div>
    // <div>
    //   <h2>Registration</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Name:
    //       <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    //     </label>
    //     <br />
    //     <label>
    //       Email:
    //       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //     </label>
    //     <br />
    //     <label>
    //       Password:
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </label>
    //     <br />
    //     <label>
    //       Phone:
    //       <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
    //     </label>
    //     <br />
    //     <button type="submit">Register</button>
    //   </form>
    // </div>
  );
};

export default RegistrationForm;



























