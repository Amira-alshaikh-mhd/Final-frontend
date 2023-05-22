import './Footer.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function Footer() {

  const [restaurants, setRestaurants] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [neww, setNeww] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/place`);
        const { data } = response;
         console.log(response)
        const imageArrays = data.map((array) => array.image);
        const arrr = imageArrays.filter(arr => arr.length > 0);
        const newArray = arrr.map(arr => arr[0]);
        const brom = newArray.map(img => img.url);
        console.log(newArray, "brom");
        setNeww(newArray);

        setImageUrl(newArray);
        const restaurants = data.filter((place) => place.typeId && place.typeId.name === "Restaurants");

        setRestaurants(restaurants);

        // const filteredData = data.filter(obj => obj.typeId === "6464d8ff98ace34ef4eb6520");
        // console.log(filteredData);
        // setRestaurants(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <>
      <div className="restaurant-container">
        <h2>Restaurants</h2>
        {restaurants.map((restaurant) => (
          <div className="restaurant-card" key={restaurant._id}>
            <h3>{restaurant.name}</h3>
          </div>
        ))}
        {neww.map((image) => (
          <img src={image.url} key={image.public_id} />
        ))}
      </div>
    </>
  );
}

export default Footer;