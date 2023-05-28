import "./Home.css";
import logo from "../images/logo.png";
import img1 from '../images/h11.jpg'
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "./Footer";




function Home() {




    
     // Replace with your array of reviews
  
      var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
      };




  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 900,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };






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
        
        <p className="title">Travel Around The World</p>
        <div className="title2">
          Create your <div className="memo"> memories</div>
        </div>
      </div>






















      
      <p className="home-countries">Start your vacation</p>
      <div className="all-countries">
      <div className="country-flex">
        {countries.map((country) => (
          <div key={country._id} className="country-item-container">
            <Link to={`/country/${country._id}`} className="country-item">
            <img src={country.image.url} alt={country.name} className="country-image" />

              <p>{country.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>




    <div className="gall-header">


</div>



    <div className="gallery-container">
      <p>Our Clients Gallery</p>
      <div>
      {reviews.map((review) => (
        <div key={review.id} className="review-item-img">
          <div>
          {review.image.length > 0 && (
            <img src={review.image[0].url} alt={review.name} className="gal_img" />
            
          )}
          </div>
  
          
        </div>
      ))}
    </div>
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



{/* 
    <div className="reviews-container-all" >
  <h2 className="reviews-heading-all">Reviews</h2>
  {reviews.map((review) => (
    <div key={review.id} className="review-item-all">
        {review.image.length > 0 && (
            <img src={review.image[0].url} alt={review.name} className="review-image-all" />
            
          )}
      <div className="review-header=all">
        <p className="review-author">{review.userId.name}</p>
        <p className="review-date">{review.createdAt}</p>
     
      <p className="review-comment">{review.comment}</p>
      <hr className="review-divider" />
      </div>
    </div>
  ))}
</div> */}







<h2 className="reviews-heading-all">Reviews</h2>


<div className="main">
<Slider {...settings}>


{reviews.map((review) => (
<div key={review.id} class="card">
{review.image.length > 0 && (
  <img src={review.image[0].url} alt={review.name} />
  )}
  <div className="details">
  <h2>{review.userId.name}</h2>
  <p>{new Date(review.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}</p>
              <p >{review.comment}</p></div>

</div>
))}
</Slider>
</div>























 

<Footer />
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
