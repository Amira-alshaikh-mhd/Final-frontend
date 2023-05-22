import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


import axios from "axios";
import "./country.css";

const Country = () => {
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [place, setPlace] = useState([]);

  const { countryName } = useParams();

  // console.log(countryName, "im country name");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/country/${countryName}`
        );
        // console.log(res.data, "im ress");
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

        const restaurants = data.filter(
          (place) => place.typeId && place.typeId.name === "Restaurants"
        );

        setRestaurants(restaurants);
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
      <div className="country-container">
        <h1>{countryName.name}</h1>
        <div className="city-container">
          {cities.map((city) => (
            <div className="city-card" key={city._id}>
              <img
                src={city.image.url}
                alt={city.name}
                className="country-img"
              />
              
            <Link to={`/city/${city._id}`} className="country-item">
              <h3>{city.name}</h3></Link>
              <p>{city.description}</p>
            </div>
          ))}
        </div>
        <div className="restaurant-container">
          <h2>Restaurants</h2>
          {restaurants.map((restaurant) => (
            <div className="restaurant-card" key={restaurant._id}>
              {restaurant.image.length > 0 && (
                <img
                  src={restaurant.image[0].url}
                  alt={restaurant.name}
                  className="res-img"
                />
              )}

              {/* <img src={restaurant.image.url} alt={restaurant.name} className="res-img"/> */}
              <h3>{restaurant.name}</h3>
              <p>{restaurant.Description}</p>
              <p>{restaurant.Address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Country;
