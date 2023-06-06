

import './city.css';
import BookingComponent from './booking';
import { Link } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Hosts from './hosts';
import Header from './Header';
import Footer from './Footer';
import img2 from '../images/img2.jpg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// import './RestaurantCarousel.css'; // Import custom CSS for the carousel component



const MAX_RATING = 5;


const City = () => {


  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };




  
  const [types, setTypes] = useState([]);
  const [place, setPlace] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);










  
  

  const fetchTypes = async () => {
    try {
      const response = await axios.get('https://trip-trail.onrender.com/type'); // Replace with your types API endpoint
      const typesData = response.data;
      setTypes(typesData);
    } catch (error) {
      console.error('Failed to fetch types:', error.message);
    }
  };

  const cityId = useParams();

  useEffect(() => {
  const fetchCity = async () => {
    console.log(cityId)
    try {
      const response = await axios.get(`https://trip-trail.onrender.com/city/${cityId.cityId}`); // Replace with your types API endpoint
      const Data = response.data;
      console.log(Data,'dataaaaaaaaa')
      setCity(Data);
    } catch (error) {
      console.error('Failed to fetch types:', error.message);
    }
  };
  fetchCity();
}, []);


useEffect(() => {
  const fetchplace = async () => {
    console.log(cityId, 'city id')
    try {
      const response = await axios.get(`https://trip-trail.onrender.com/place/placesbyCity/${cityId.cityId}`); // Replace with your types API endpoint
      const Data = response.data;
      console.log(Data,'dooooooo')


      setRestaurants(response.data);
      setHotels(response.data);
      // setPlace(Data);

      const restaurant = Data.filter(
        (place) => place.typeId && place.typeId.name === "Restaurants"
      );

      const hotel = Data.filter(
        (place) => place.typeId && place.typeId.name === "Hotels"
      );



      setRestaurants(restaurant);
      console.log(restaurant, 'restooooo')
      setHotels(hotel);
      // setPlace(Data);
    } catch (error) {
      console.error('Failed to fetch types:', error.message);
    }
  };
  fetchplace();
}, []);



  
  const fetchPlacesByType = async (typeId) => {
    console.log(cityId);
    console.log(typeId);
    
    try {
      const response = await axios.get(`https://trip-trail.onrender.com/place/placesbyTypeAndCity/${cityId.cityId}?typeId=${typeId}`);
      setPlace (response.data);
      
      console.log(response.data, 'aaaaaaaaaaaaaaaaaaaaaaa')
      // Process the retrieved places as needed
    } catch (error) {
      console.error('Failed to fetch places:', error.message);
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchPlacesByType();
  }, []);

  const handleButtonClick = (typeId) => {
    setSelectedType(typeId);
    fetchPlacesByType(typeId);
  };



  const [hosts, setHosts] = useState([]);




  useEffect(() => {
    const fetchHosts = async (cityId) => {
      try {
        console.log(cityId)
    
        const response = await axios.get(
          `https://trip-trail.onrender.com/host/getbyCity/${cityId.cityId}`
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


    const Id = sessionStorage.getItem('id');
  




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






  return (


<div>

<Header />



            <img src={city.image? city.image.url : null} alt={city.name} className='city-img' />

<h3 className='city-title'>{city.name}</h3>
<h3 className='city-des'>{city.Description}</h3>
<hr />



<p className='choose'>Choose your perfect place to explore</p>


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
      <Link to={`/place/${place._id}`} className="country-item-co">
      {place.image.length > 0 && (
        <img src={place.image[0].url} alt={place.name} className="placeImage" />
      )}

      <div>
      <h3 className="placeName">{place.name}</h3>
      <p className="placeDescription">{place.Description}</p>
      <p className="placeAddress">Adress : {place.Address}</p>
      </div>
      </Link>
    </div>
  ))}
</div>









<div className='book-div'>
  <img src={img2}></img>
  <BookingComponent />
</div>




<div className='host-list'>
  
<h1 className='host-title'>Our Hosts</h1>

        <div className="host-container">
          {hosts.map((host) => (
            <div className="host-card" key={host._id}>
      <Link to={`/host/${host._id}`} className="host-item">
              

               <img
                src={host.image.url}
                alt={host.name}
                className="host-img"
              />
              <h3 className='host-name-city'>{host.name}</h3>
              <p className='host-des'>About : {host.Description}</p>
              <p className='host-phone-city'>Phone : {host.phone}</p>
              <p className='host-price-city'>$ {host.price} Per Day</p>
              </Link>
             
              
              
            </div>
          ))}
        </div>
</div>















<div className="restaurant-carousel">
      <h2>Restaurants</h2>
      
      <Slider {...settings}>
        {restaurants.map((restaurant) => (
          
          <div className="restaurant-card-city" key={restaurant._id}>
            
              {restaurant.image.length > 0 && (
     <img
                  src={restaurant.image[0].url}
                  alt={restaurant.name}
                  className="res-img-city"
                />
              )}<Link to={`/place/${restaurant._id}`} >
            <div className="res-content-city">
              
      
              <h3>{restaurant.name}</h3>
              <p className='res-des-1'>About : {restaurant.Description}</p>
              <p className='address-city'>Address : {restaurant.Address}</p>
            </div></Link>
          </div>
        
        
        ))}
      </Slider>
     
    </div>



        <div className="restaurant-container-city">
          <h2 className='hotel-title'>Hotels</h2>
          
      <Slider {...settings}>

          {hotels.map((hotel) => (
            <div className="restaurant-card-city-h" key={hotel._id}>
              {hotel.image.length > 0 && (
                <img
                  src={hotel.image[0].url}
                  alt={hotel.name}
                  className="res-img-city"
                />
              )}
            <Link to={`/place/${hotel._id}`} >
              <div className="res-content-city">
              <h3>{hotel.name}</h3>
              <p className='res-des-1'>About : {hotel.Description}</p>
              <p className='address-city'>Address : {hotel.Address}</p>
            </div></Link>
            </div>
          ))}
          
          </Slider>
        </div>





<Footer />

</div>
  );
};

export default City;


