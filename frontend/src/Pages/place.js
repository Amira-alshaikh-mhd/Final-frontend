

import './place.css';
import BookingComponent from './booking';
import { Link } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Hosts from './hosts';
const MAX_RATING = 5;

const Place = () => {

  // Review

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


<div >
        
        
          
            <div key={place._id}>
              <h3>{place.name}</h3>
            <img src={place.image? place.image[0].url: null} alt={place.name} />

              <p>{place.name}</p>  
           
           <p>{place.Description}</p> 
            </div>
          
        
      </div>
      <div>
      <div className="user-list-section">
      {review.map((review) => (
            <div className="restaurant-card" key={review._id}>
              <p>{review.userId.name}</p>
              <p className="review-date">
        {new Date(review.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

              <p>{review.comment}</p>
              {/* {place.image.length > 0 && (
                <img
                  src={place.image[1].url}
                  alt={place.name}
                  className="res-img"
                />
              )} */}
            </div>
          ))}
      </div>
      </div>


    
<div>
      <h2>Post a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" value={comment} onChange={handleCommentChange} required />
        </div>





        <div>
          <label htmlFor="rating">Rating:</label>
          <div className="stars-container">{renderStars()}</div>
        </div>
   
        <div>
  <label htmlFor="images">Images:</label>
  <input type="file" id="images" name="file" onChange={handleImage} multiple />

  <div>
  {images.map((image, index) => (
    <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: "100px", height: "100px" }} />
  ))}
</div>
 
</div>
        <div>
            <input type='text' value={userId} onChange={(e) => { setUserId(e.target.value)
            }}></input>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post Review'}
        </button>
      </form>
      </div>

    </>
    );
};

export default Place;
