import './hosts.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from './Header';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from './Footer';




function Hosts() {




  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
        },
      },
      ],

  
    
  };
















  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  // const [userId, setUserId] = useState('6453793dbdd7f879fa978bf2');
  // const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [book, setBook] = useState([]);

  
    const [hosts, setHosts] = useState([]);
  
    const { hostId } = useParams();
    const Id = sessionStorage.getItem('id');

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
          
            console.log(data, "im resssss");
  
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
    reviewData.append('userId', Id);
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
    // setUserId('')
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





  return (
    <>
  <Header />
  <div className="host-list-host">
    {/* {hosts.map((host) => ( */}
      <div key={hosts._id} className="host-item-host">
        {hosts.image && <img src={hosts.image.url} alt={hosts.name} className="host-image-host" />}
        <div className="host-details-host">
          <p className="host-name-host">{hosts.name}</p>
          <p className="host-phone-host">Phone : {hosts.phone}</p>
          <p className="host-description-host">About : {hosts.Description}</p>
        </div>
      </div>
    {/* ))} */}
  </div>


<hr />














<h2 className="section-heading-host">Bookings</h2>
<div className="user-list-section-host">

  {book.map((booking) => (
    <div className="restaurant-card-host" key={booking._id}>
      <p className="booking-user">Name : {booking.userId.name}</p>
      <p className="booking-email">E-mail : {booking.userId.email}</p>
      <p className="booking-phone">Phone : {booking.userId.phone}</p>
      <p className="booking-number">Number of guests : {booking.number}</p>
      <p className="booking-dates">From : 
        {new Date(booking.startDate).toLocaleDateString()} To {new Date(booking.endDate).toLocaleDateString()}
      </p>
    </div>
  ))}
</div>



<p className='section-heading-host'>Reviews</p>

<div className="main">
<Slider {...settings}>


{review.map((review) => (
<div key={review.id} class="card">
{review.image.length > 0 && (
  <img src={review.image[0].url} alt={review.name} />
  )}
  <div className="details">
  <h2>{review && review.userId && review.userId.name}</h2>
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
 
    <div>
      <label htmlFor="images" className="form-label">Images:</label>
      <input type="file" id="images" name="file" onChange={handleImage} multiple className="form-file-input" />
      <div className="image-preview">
        {images.map((image, index) => (
          <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} className="image-preview-item" />
        ))}
      </div>
    </div>
    {/* <div>
      <label htmlFor="userId" className="form-label">User ID:</label>
      <input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} className="form-input" />
    </div> */}
    <button type="submit" disabled={isLoading} className="submit-button">
      {isLoading ? 'Posting...' : 'Post Review'}
    </button>
  </form>
</div>

<Footer />
    </>
  );
}

export default Hosts;