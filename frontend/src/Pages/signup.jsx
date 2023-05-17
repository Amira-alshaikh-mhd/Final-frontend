
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"


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
      console.log('Registration successful:', response.data);
                navigate("/", { replace: true });

      // Optionally, you can redirect the user to another page upon successful registration
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle registration error here, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;



























