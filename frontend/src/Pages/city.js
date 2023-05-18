import './city.css';import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";


function City() {


  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/type`);
        setTypes(response.data);
      } catch (error) {
        console.error('Error fetching types:', error);
        setError('Error fetching types. Please try again later.');
      }
    };

    fetchTypes();
  }, []);

  const handleTypeClick = async (typeName) => {
    try {
      const response = await axios.get(`http://localhost:5000/place/placesbyTypeName/${typeName}`);
      setPlaces(response.data);
      setSelectedType(typeName);
      setError(null);
    } catch (error) {
      console.error('Error fetching places:', error);
      setError('Error fetching places. Please try again later.');
    }
  };



  return (
  <>


<div>
      <h1>Place List</h1>
      <div>
        {types.map((type) => {
          if (type.name !== 'Hotels' && type.name !== 'Restaurants') {
            return (
              <button
                key={type._id}
                onClick={() => handleTypeClick(type.name)}
                disabled={selectedType === type.name}
              >
                {type.name}
              </button>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div>
        <h2>Places</h2>
        {places.map((place) => (
          <div key={place._id}>
            <h3>{place.name}</h3>
            <p>{place.description}</p>
            <p>{place.address}</p>
            <p>Type: {place.typeId.name}</p> {/* Display the type name */}
            {/* Add other place information here */}
          </div>
        ))}
      </div>
    </div>


</>
  );
}

export default City;