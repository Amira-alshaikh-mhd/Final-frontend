

import './city.css';
import BookingComponent from './booking';
import { Link } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Hosts from './hosts';
const MAX_RATING = 5;


const City = () => {
  const [types, setTypes] = useState([]);
  const [place, setPlace] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  

  const fetchTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/type'); // Replace with your types API endpoint
      const typesData = response.data;
      setTypes(typesData);
    } catch (error) {
      console.error('Failed to fetch types:', error.message);
    }
  };

  const cityId = useParams();
  const fetchPlacesByType = async (typeId) => {
    console.log(cityId);
    console.log(typeId);
    
    try {
      const response = await axios.get(`http://localhost:5000/place/placesbyTypeAndCity/${cityId.cityId}?typeId=${typeId}`);
      setPlace (response.data);
      
      console.log(response.data, 'aaaaaaaaaaaaaaaaaaaaaaa')
      // Process the retrieved places as needed
    } catch (error) {
      console.error('Failed to fetch places:', error.message);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleButtonClick = (typeId) => {
    setSelectedType(typeId);
    fetchPlacesByType(typeId);
  };



  const [hosts, setHosts] = useState([]);

  // const { cityName } = useParams();



  useEffect(() => {
    const fetchHosts = async (cityId) => {
      try {
        console.log(cityId)
        // const res = await axios.get(
        //   `http://localhost:5000/city/${cityId.cityId}`
        // );
        // // console.log(res.data, "im ress");
        // setCity(res.data)
        // const name = res.data.name;
        // console.log(name);
        const response = await axios.get(
          `http://localhost:5000/host/getbyCity/${cityId.cityId}`
        );

        setHosts(response.data);
        console.log(response.data)
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHosts(cityId);
  }, [cityId]);



  // Review

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







  return (


<div>
<h1>City Component</h1>

<div className="buttonContainer">
  {types.map((type) => {
    if (type.name !== 'Hotels' && type.name !== 'Restaurants') {
      return (
        <button
          key={type._id}
          onClick={() => handleButtonClick(type._id)}
          disabled={selectedType === type._id ? 'selected' : ''}
          className={`button ${selectedType === type._id ? 'selected' : ''}`}
        >
          {type.name}
        </button>
      );
    } else {
      return null;
    }
  })}
</div>

<div className="placeContainer">


  {place.map((place) => (
    <div key={place._id} className="placeCard">
      <Link to={`/place/${place._id}`} className="country-item">
      {place.image.length > 0 && (
        <img src={place.image[0].url} alt={place.name} className="placeImage" />
      )}


      <h3 className="placeName">{place.name}</h3>
      <p className="placeDescription">{place.Description}</p>
      <p className="placeAddress">{place.Address}</p>
      </Link>
    </div>
  ))}
</div>
<div>
  <BookingComponent />
</div>
<div>
  {/* <Hosts /> */}


        <div className="city-container">
          {hosts.map((host) => (
            <div className="city-card" key={host._id}>
      <Link to={`/host/${host._id}`} className="country-item">
              

               <img
                src={host.image.url}
                alt={host.name}
                className="country-img"
              />
              <h3>{host.name}</h3>
              <p>{host.Description}</p>
              <p>{host.phone}</p></Link>
             
              
              
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


</div>
  );
};

export default City;


