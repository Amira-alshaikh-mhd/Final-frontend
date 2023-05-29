

import './place.css';
import BookingComponent from './booking';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Hosts from './hosts';
import Footer from './Footer';
import Header from './Header';
const MAX_RATING = 5;

const Place = () => {


  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };







  

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [review, setReview] = useState([]);
  const [userId, setUserId] = useState('6453793dbdd7f879fa978bf2');
  const [isLoading, setIsLoading] = useState(false);
  const [place, setPlace] = useState([]);

  const placeId = useParams();


  useEffect(() => {

        const fetchPlace = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/place/${placeId.placeId}`);
            setPlace(res.data);
            console.log(res.data);
          } catch (error) {
            console.error(error);
            // Handle error state
          }
        };
        fetchPlace(placeId);
      }, [placeId]);





      // get Rivew 
      useEffect(() => {
      const fetchReview = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/review/byplace/${placeId.placeId}`
          );
          const { data } = response;
          setReview(data);
        
          console.log(data, "im res");

        } catch (error) {
          console.error(error);
        }
      };
      fetchReview(placeId);
    }, [placeId]);




  const [image, setimage] = useState([])

  function handleImage(e) {
    const selectedFiles = e.target.files;
    const newImages = [];
  
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
  
      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        newImages.push(file);
      }
    }
  
    setImages(newImages);
  }
















  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event) => {
    // setRating(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const reviewData = new FormData();
      reviewData.append('comment', comment);
      reviewData.append('rating', rating);
      reviewData.append('userId', userId);
      reviewData.append('placeId', placeId.placeId);

      // Append each image to the FormData
      for (let i = 0; i < images.length; i++) {
        reviewData.append('image', images[i]);
      }
  

      // Send review data to the backend API
      const res = await axios.post('http://localhost:5000/review', reviewData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Set the content type as multipart/form-data
          },
      });

      // Handle success or show notification

      // Reset form fields
      setUserId('')
      setComment('');
      setRating(0);
      setImages([]);
      console.log(res, 'plaaaaaaaaaaaa')
    } catch (error) {
      console.error(error);
      // Handle error or show error notification
    }
     finally {
      setIsLoading(false);
    }


};


    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= MAX_RATING; i++) {
          stars.push(
            <span
              key={i}
              className={`star ${rating >= i ? 'filled' : ''}`}
              onClick={() => handleRatingChange(i)}
            >
              &#9733;
            </span>
          );
        }
        
        return stars;
      };

return(
    <>
<Header />



<div className='place-one'>
        
        
          
            <div className='place-map' key={place._id}>
            <img className='place-img-one' src={place.image? place.image[0].url: null} alt={place.name} />
            <h3 className='place-name-one'>{place.name}</h3>
           
           <p className='place-des-one'>{place.Description}</p> 
           <p className='place-add-one'> Address : {place.Address}</p> 
            </div>
          
        
      </div>
      <hr />











      <p className='section-heading-host'>Reviews</p>

<div className="main">
<Slider {...settings}>


{review.map((review) => (
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










      {/* <div className="main-host">
    <p className='section-heading-host'>Reviews</p>
<Slider {...settings}>


{review.map((review) => (
<div key={review.id} className="card-host">
{review.image.length > 0 && (
  <img src={review.image[0].url} alt={review.name} />
  )}
  <div className="details-host">
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
</div> */}







    

<div className="post-review-section">
  <h2 className="section-heading">Post a Review</h2>
  <form onSubmit={handleSubmit} className="review-form">
    <div>
      <label htmlFor="comment" className="form-label">Comment:</label>
      <textarea id="comment" value={comment} onChange={handleCommentChange} required className="form-textarea" />
    </div>
    {/* <div>
      <label htmlFor="rating" className="form-label">Rating:</label>
      <div class="rate">
        <a href="#!" class="active">★</a>
        <a href="#!" class="active">★</a>
        <a href="#!" class="active">★</a>
        <a href="#!">★</a>
        <a href="#!">★</a>
      </div>
      
    </div> */}
    <div>
      <label htmlFor="images" className="form-label">Images:</label>
      <input type="file" id="images" name="file" onChange={handleImage} multiple className="form-file-input" />
      <div className="image-preview">
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} className="image-preview-item" />
        ))}
      </div>
    </div>
    <div>
      <label htmlFor="userId" className="form-label">User ID:</label>
      <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} className="form-input" />
    </div>
    <button type="submit" disabled={isLoading} className="submit-button">
      {isLoading ? 'Posting...' : 'Post Review'}
    </button>
  </form>
</div>

<Footer />
    </>
    );
};

export default Place;
