import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import axios from "axios";
import "./country.css";
import Footer from "./Footer";
import Header from "./Header";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Country = () => {



  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };










  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [place, setPlace] = useState([]);
  const [country, setCountry] = useState([]);

  const { countryName } = useParams();



  // console.log(countryName, "im country name");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/country/${countryName}`
        );
        // console.log(res.data, "im ress");
        setCountry(res.data)
        const name = res.data.name;
        // console.log(name);
        const response = await axios.get(
          `http://localhost:5000/city/citiesbyCountryName/${name}`
        );

        setCities(response.data);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/place/placesbyCountry/${countryName}`
        );
        const { data } = response;
        setRestaurants(data);
        setHotels(data);
        setPlace(data);

        const restaurants = data.filter(
          (place) => place.typeId && place.typeId.name === "Restaurants"
        );

        const hotels = data.filter(
          (place) => place.typeId && place.typeId.name === "Hotels"
        );


        const place = data.filter(
          (place) => place.typeId && place.typeId.name !== "Restaurants" && place.typeId.name !== "Hotels"
        );
        setPlace(place.slice(0, 3));

        setRestaurants(restaurants);
        setHotels(hotels);
        console.log(restaurants, "im res");

        // const filteredData = data.filter(obj => obj.typeId === "6464d8ff98ace34ef4eb6520");
        //  console.log(filteredData)
        // setRestaurants(filteredData)
      } catch (error) {
        console.error(error);
      }
    };
    fetchCities();
    fetchRestaurants();
  }, [countryName]);

  return (
    <div className="city-container">
      <div className="count-head">
      <Header />
      </div>
      <div className="test">
        {place.map((place, index) => (
            <div className={`country-image${index + 1}`} key={place._id}>
              {place.image.length > 0 && (
                <img
                  src={place.image[1].url}
                  alt={place.name}
                  className="count-img"
                />
              )}
            </div>
          ))}</div>
          <div className="count-des">
          <p className="title">Travel Around<div className="memo"> {country.name}</div></p>
        <div className="title2">
          Create your  memories
        </div>
          </div>
          











      {/* <div key={place._id}>
      {place.image.length > 0 && (
        <img src={place.image[0].url} alt={place.name} className="placeImage" />
      )}

      </div> */}












      {/* <div className="country-container"> */}
      
        
        <div className="coun-city-container">
          {cities.map((city) => (
            
            <div className="city-card" key={city._id}>
              <Link to={`/city/${city._id}`} className="count-country-item">
              <img
                src={city.image.url}
                alt={city.name}
                className="coun-city-img"
              />
              
            
              <h3>{city.name}</h3></Link>
              {/* <p>{city.description}</p> */}
            </div>
          ))}
        </div>
      























        <div className="restaurant-container">
          <h2>Restaurants</h2>
          <Slider {...settings}>
          {restaurants.map((restaurant) => (
            <div className="coun-restaurant-card" key={restaurant._id}>
              {restaurant.image.length > 0 && (
                <img
                  src={restaurant.image[0].url}
                  alt={restaurant.name}
                  className="res-img"
                />
              )}

              {/* <img src={restaurant.image.url} alt={restaurant.name} className="res-img"/> */}
              <div className="res-des">
                <h3>{restaurant.name}</h3>
              <p>{restaurant.Description}</p>
              <p>Address: {restaurant.Address}</p>
              </div>
            </div>
          ))}
          </Slider>
        </div>

        <div className="restaurant-container">
          <h2>Hotels</h2>
          <Slider {...settings}>
          {hotels.map((hotel) => (
            <div className="coun-restaurant-card" key={hotel._id}>
              {hotel.image.length > 0 && (
                <img
                  src={hotel.image[0].url}
                  alt={hotel.name}
                  className="res-img"
                />
              )}

              {/* <img src={restaurant.image.url} alt={restaurant.name} className="res-img"/> */}
              <div className="res-des">

              <h3>{hotel.name}</h3>
              <p>{hotel.Description}</p>
              <p>{hotel.Address}</p>
              </div>
            </div>
          ))}
          </Slider>
        </div>


      {/* </div> */}
      <Footer />
    </div>
    
  );
};

export default Country;
