import './hosts.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const MAX_RATING = 5;




function Hosts() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [userId, setUserId] = useState('6453793dbdd7f879fa978bf2');
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [book, setBook] = useState([]);

  
    const [hosts, setHosts] = useState([]);
  
    const { hostId } = useParams();

    useEffect(() => {

        const fetchHost = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/host/${hostId}`);
            setHosts(res.data);
            console.log(res.data);
          } catch (error) {
            console.error(error);
            // Handle error state
          }
        };
        fetchHost(hostId);
      }, [hostId]);

      useEffect(() => {
        const fetchReview = async () => {
          try {
            console.log(hostId)
            const response = await axios.get(
              `http://localhost:5000/review/byHost/${hostId}`
            );
            const { data } = response;
            setReview(data);
          
            console.log(data, "im res");
  
          } catch (error) {
            console.error(error);
          }
        };
        fetchReview(hostId);
      }, [hostId]);



      useEffect(() => {
        const fetchBook = async () => {
          try {
            console.log(hostId);
            const currentDate = new Date(); // Get the current date
            const response = await axios.get(
              `http://localhost:5000/book/bookByHost/${hostId}`
            );
            const { data } = response;
      
            // Filter books based on endDate
            const filteredBooks = data.filter((book) => {
              const endDate = new Date(book.endDate);
              return endDate > currentDate;
            });
      
            setBook(filteredBooks);
            console.log(filteredBooks, "filtered books");
          } catch (error) {
            console.error(error);
          }
        };
        fetchBook(hostId);
      }, [hostId]);








// Review 
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
    reviewData.append('hostId', hostId);

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


  // const renderStars = () => {
  //     const stars = [];
  //     for (let i = 1; i <= MAX_RATING; i++) {
  //       stars.push(
  //         <span
  //           key={i}
  //           className={`star ${rating >= i ? 'filled' : ''}`}
  //           onClick={() => handleRatingChange(i)}
  //         >
  //           &#9733;
  //         </span>
  //       );
  //     }
      
  //     return stars;
  //   };


      

  return (
    <>
<div className="user-list-section">
  <h2 className="section-heading">Host List</h2>
  <ul className="host-list">
    {/* {hosts.map((host) => ( */}
      <li key={hosts._id} className="host-item">
        {hosts.image && <img src={hosts.image.url} alt={hosts.name} className="host-image" />}
        <div className="host-details">
          <p className="host-name">{hosts.name}</p>
          <p className="host-phone">{hosts.phone}</p>
          <p className="host-description">{hosts.Description}</p>
        </div>
      </li>
    {/* ))} */}
  </ul>
</div>

<div className="user-list-section">
  <h2 className="section-heading">Reviews</h2>
  {review.map((review) => (
    <div className="restaurant-card" key={review._id}>
      <p className="review-author">{review.userId.name}</p>
      <p className="review-comment">{review.comment}</p>
    </div>
  ))}
</div>

<div className="user-list-section">
  <h2 className="section-heading">Bookings</h2>
  {book.map((booking) => (
    <div className="restaurant-card" key={booking._id}>
      <p className="booking-user">{booking.userId.name}</p>
      <p className="booking-email">{booking.userId.email}</p>
      <p className="booking-phone">{booking.userId.phone}</p>
      <p className="booking-number">{booking.number}</p>
      <p className="booking-dates">
        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
      </p>
    </div>
  ))}
</div>

<div className="post-review-section">
  <h2 className="section-heading">Post a Review</h2>
  <form onSubmit={handleSubmit} className="review-form">
    <div>
      <label htmlFor="comment" className="form-label">Comment:</label>
      <textarea id="comment" value={comment} onChange={handleCommentChange} required className="form-textarea" />
    </div>
    <div>
      <label htmlFor="rating" className="form-label">Rating:</label>
      <div class="rate">
        <a href="#!" class="active">★</a>
        <a href="#!" class="active">★</a>
        <a href="#!" class="active">★</a>
        <a href="#!">★</a>
        <a href="#!">★</a>
      </div>
      {/* <div className="stars-container">{renderStars()}</div> */}
    </div>
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

{/* <div className="user-list-section">
        <h2>Host List</h2>
        <ul>
          
            <li key={hosts._id}>
            <img src={hosts.image? hosts.image.url : null} alt={hosts.name} />

              <p>{hosts.name}</p>  
           <p>{hosts.phone}</p>
           <p>{hosts.Description}</p> 
            </li>
          
        </ul>
      </div>
      <div className="user-list-section">
      {review.map((review) => (
            <div className="restaurant-card" key={review._id}>
              <p>{review.userId.name}</p>

              <p>{review.comment}</p>
            
            </div>
          ))}
      </div>
      <div className="user-list-section">
      {book.map((book) => (
            <div className="restaurant-card" key={book._id}>
              <p>{book.userId.name}</p>
              <p>{book.userId.email}</p>
              <p>{book.userId.phone}</p>
              {book.number}
              <p>{book.startDate}</p>
              <p>{book.endDate}</p>
            
            </div>
          ))}
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
      </div> */}
  
    </>
  );
}

export default Hosts;