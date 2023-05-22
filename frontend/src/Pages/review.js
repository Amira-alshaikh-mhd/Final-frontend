import React, { useEffect, useState } from 'react';
import axios from 'axios';
const MAX_RATING = 5;

const ReviewForm = () => {
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
      console.log(res)
    } catch (error) {
      console.error(error);
      // Handle error or show error notification
    }
    //  finally {
    //   setIsLoading(false);
    // }


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





      const [reviews, setReviews] = useState([]);

  useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get('http://localhost:5000/review');
          setReviews(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchReviews();
    }, [])
    

  

  return (
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
        {/* <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={handleRatingChange} required>
            <option value={0}>Select a rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div> */}
        <div>
  <label htmlFor="images">Images:</label>
  <input type="file" id="images" name="file" onChange={handleImage} multiple />

  <div>
  {images.map((image, index) => (
    <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: "100px", height: "100px" }} />
  ))}
</div>
  {/* <div>
    {images.map((image, index) => (
      <img key={index} src={image} alt={`Image ${index}`} style={{ width: "100px", height: "100px" }} />
    ))}
  </div> */}
</div>
        <div>
            <input type='text' value={userId} onChange={(e) => { setUserId(e.target.value)
            }}></input>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post Review'}
        </button>
      </form>


      <h2>List of Reviews:</h2>
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

    <div>
      {/* {reviews.images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          style={{ width: '100px', height: '100px' }}
        />
      ))} */}
    </div>
    <hr />
  </div>
))}


    </div>
  );
};

export default ReviewForm;
