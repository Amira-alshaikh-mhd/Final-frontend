import "./Home.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function Home() {


  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/review');
        const imageUrls = response.data.map((review) => review.image[0].url);
        setImages(imageUrls);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, []);
















const [countries, setCountries] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/country');
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);


  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-nav">
          <img src={logo} alt="logo" className="logo"></img>
          <div className="header-link">
            <Link to="/home" className="link-item">
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
        <p className="title">Travel Around The World</p>
        <div className="title2">
          Create your <div className="memo"> memories</div>
        </div>
      </div>























      <div className="all-countries">
        <p className="home-countries">Start your vacation</p>







<div className="country-flex">
{countries.map((country) => (
  <div key={country._id}>
    <img src={country.image.url} alt={country.name} className="country-image" />
    <p>
      <Link to={`/country/${country._id}`} className="country-item">
        {country.name}
      </Link>
    </p>
  </div>
))}
</div>




      </div>






      <div className="galery-container">
      <p>Our Clients Gallery</p>
      <div className="galery">
        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt="galery" className="galery-item" />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;











// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";


// const CountryList = () => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/country');
//         setCountries(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="country-flex">
//       {countries.map((country) => (
//         <div key={country._id}>
//           <img src={country.image.url} alt={country.name} className="country-image" />
//           <p>
//             <Link to={`/country/${country._id}`} className="country-item">
//               {country.name}
//             </Link>
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CountryList;
