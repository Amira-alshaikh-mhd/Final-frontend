import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import axios from 'axios';


const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

const ReviewForm = () => {





  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }






















  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState('6453793dbdd7f879fa978bf2');
  const [isLoading, setIsLoading] = useState(false);







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

      // Append each image to the FormData
      for (let i = 0; i < images.length; i++) {
        reviewData.append('image', images[i]);
      }
  

      // Send review data to the backend API
      const res = await axios.post('https://trip-trail.onrender.com/review', reviewData, {
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
      console.log(res)
    } catch (error) {
      console.error(error);
      // Handle error or show error notification
    }
     finally {
      setIsLoading(false);
    }


};








      const [reviews, setReviews] = useState([]);

  useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get('https://trip-trail.onrender.com/review');
          setReviews(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchReviews();
    }, [])
    

  

  return (




    <div>




<div className='container'>
      <h2> React Ratings </h2>
      <div className='stars' >
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <textarea
        placeholder="What's your experience?"
        className='textarea' 
      />

      <button className='button' >
        Submit
      </button>
      
    </div>










      <h2>Post a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" value={comment} onChange={handleCommentChange} required />
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


      {/* <h2>List of Reviews:</h2>
{reviews.map((review) => (
  <div key={review.id}>
    <p>Comment: {review.comment}</p>
    <p>Rating: {review.rating}</p>
    {review.image.length > 0 && (
                <img
                  src={review.image[0].url}
                  alt={review.name}
                  className="res-img"
                />
              )}

  
    <hr />
  </div>
))} */}


    </div>
  );
};

export default ReviewForm;
