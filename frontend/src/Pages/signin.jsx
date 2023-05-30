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

const [_, setCookies] = useCookies(["access_token"])


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
      const response = await axios.post('http://localhost:5000/user/login', payload);
      setCookies("access_token", response.data.token)

      if (response.data.role === "superadmin" || response.data.role === "admin") {
        sessionStorage.setItem('id', response.data.user);
        // sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('role', response.data.role);

        navigate("/Dashboard", { replace: true });
    } else if (response.data.role === "user") {
        sessionStorage.setItem('id', response.data.user);
        // sessionStorage.setItem('token', response.data.token);
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
      const response = await axios.post('http://localhost:5000/host/login', payload);


      setCookies("access_token", response.data.token)
      
        sessionStorage.setItem('id', response.data.host);
        sessionStorage.setItem('token', response.data.token);
      

        navigate("/bookings", { replace: true });


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
  );
};

export default SignInPage;








// import logo from '../images/logo.png'
// import { useEffect, useState } from "react";
// import axios from "axios"
// import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login() {






//     const navigate = useNavigate();
//     //   function navigateToSingUp (){
//     //     navigate("/users/new", { replace: true });
//     // }
//     //     navigate("/Admin", { replace: true });





//     const [email, setemail] = useState('')
//     const [password, setpassword] = useState('')


//     const handleEmailChange = (event) => {
//         setemail(event.target.value);
//     }




//     const handlepasswordchange = (event) => {
//         setpassword(event.target.value);
//     }

//     useEffect(() => { }, [email, password]);


//     const submitlogin = async () => {
//         try {
//             const data = { email: email, password: password };
//             const response = await axios.post(`http://localhost:5000/user/login`, data);
//             // console.log(response.data.role);
//             // console.log(response.data.token);
//             // if (response.data.role === "admin") {
//             //     sessionStorage.setItem('id', response.data._id);
//             //     sessionStorage.setItem('token', response.data.token);
//             //     sessionStorage.setItem('role', response.data.role);

//             //     navigate("/Dashboard", { replace: true });
//             // } else {
//                 // sessionStorage.setItem('id', response.data._id);
//                 // sessionStorage.setItem('token', response.data.token);
//                 // sessionStorage.setItem('role', response.data.role);
//                 // sessionStorage.setItem('address', response.data.address);
//                 // sessionStorage.setItem('phone', response.data.phone);
//                 navigate("/", { replace: true });
//             // } 

//             if (response.status === 200) {
//                         const  token  = response.data;
//                         console.log(token)
//                         navigate("/", { replace: true });
//                         // Handle successful login, e.g., store the token in local storage or state
//                       } else {
//                         const { message } = response.data;
                        
//                       }
//         } catch (error) {
//             console.error(error);
//         }
//     };



//     return (
//         <div className="container-login" >

//             <ToastContainer />

//             <div className="login-leftdiv">



//                 <img className="pablo-login" src={logo} alt="" />




//                 <div className="login-form-container">


//                     <h1 className="sign-in">Sign in</h1>

//                     <label className="label-usernamepass" >email</label>
//                     <input className="input-usernamepass" onChange={handleEmailChange} value={email} type="text" />


//                     <label className="label-usernamepass"  >Password</label>
//                     <input className="input-usernamepass" onChange={handlepasswordchange} value={password} type="password" />


//                     <button className="submit-login" onClick={() => submitlogin()}>Submit</button>

//                     <div className="signup-word">


//                         <Link to="/signup">  <h4>Register</h4></Link>
//                     </div>
//                 </div>
//             </div>




//             <div className="login-rightdiv">

//             </div>












//         </div>













//     );
// }

// export default Login;