import "./Home.css";
import logo from "../images/logo.png";
import img1 from '../images/h11.jpg'
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';



function Home() {


  const [reviews, setReviews] = useState([]);

  useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get('http://localhost:5000/review');
          setReviews(response.data);
          console.log(response.data, "tesssst")
        } catch (error) {
          console.log(error);
        }
      };
      fetchReviews();
    }, [])
















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
          <div key={country._id} className="country-item-container">
            <img src={country.image.url} alt={country.name} className="country-image" />
            <Link to={`/country/${country._id}`} className="country-item">
              {country.name}
            </Link>
          </div>
        ))}
      </div>
    </div>

    <div className="gallery-container">
      <p>Our Clients Gallery</p>
      <div>
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <div>
          {review.image.length > 0 && (
            <img src={review.image[0].url} alt={review.name} className="review-image" />
            
          )}
          </div>
  
          <hr />
        </div>
      ))}
    </div>
    </div>






    <div className="reviews-container">
  <h2 className="reviews-heading">Reviews</h2>
  {reviews.map((review) => (
    <div key={review.id} className="review-item">
        {review.image.length > 0 && (
            <img src={review.image[0].url} alt={review.name} className="review-image" />
            
          )}
      <div className="review-header">
        <p className="review-author">{review.userId.name}</p>
        <p className="review-date">{review.createdAt}</p>
      </div>
      <p className="review-comment">{review.comment}</p>
      <hr className="review-divider" />
    </div>
  ))}
</div>


    <div className="articles-container">
        <h2>Featured Articles</h2>
        <div className="article-item">
          <img src={img1} alt="Article 1" className="article-image" />
          <div className="article-content">
            <h3>Article 1 Title</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales tristique tincidunt.</p>
            <Link to="/articles/1" className="article-link">Read More</Link>
          </div>
        </div>
        <div className="article-item">
          <img src={img1} alt="Article 2" className="article-image" />
          <div className="article-content">
            <h3>Article 2 Title</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales tristique tincidunt.</p>
            <Link to="/articles/2" className="article-link">Read More</Link>
          </div>
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
