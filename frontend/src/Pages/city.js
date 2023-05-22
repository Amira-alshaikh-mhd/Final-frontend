

import './city.css';
import BookingComponent from './booking';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Hosts from './hosts';

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
      
      console.log(response.data)
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
      {place.image.length > 0 && (
        <img src={place.image[0].url} alt={place.name} className="placeImage" />
      )}

      <h3 className="placeName">{place.name}</h3>
      <p className="placeDescription">{place.Description}</p>
      <p className="placeAddress">{place.Address}</p>
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
               <img
                src={host.image.url}
                alt={host.name}
                className="country-img"
              />
              <h3>{host.name}</h3>
              <p>{host.Description}</p>
              <p>{host.phone}</p>
             
              
              
            </div>
          ))}
        </div>
</div>
</div>
  );
};

export default City;


