

// import './city.css';
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function City() {
//   const [types, setTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState(null);
//   const [places, setPlaces] = useState([]);
//   const [images, setImages] = useState([]);
//   const [data, setData] = useState({});
//   const { cityId } = useParams();

//   const [error, setError] = useState(null);


//   // useEffect(() => {
//   //   setImages(data.image || []);
//   // }, [data.image]);


//   const fetchPlacesByCityName = async (cityId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/city/${cityId}`
//       );
//       console.log(res.data, "im ress");
//       const name = res.data.name;
//         console.log(name);
//       const response = await axios.get(`http://localhost:5000/place/placesbyCityName/${name}`);
//       setPlaces(response.data);
//       console.log(response)
//       // setError(null);
//     } catch (error) {
//       console.error('Error fetching places:', error);
//       setError('Error fetching places. Please try again later.');
//     }
//   };

//   // Fetch places by city name when the component mounts
//   // const { cityName } = useParams();

//   useEffect(() => {
//     fetchPlacesByCityName(cityId);
//   }, []);




//   useEffect(() => {
//     const fetchTypes = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/type`);
//         setTypes(response.data);
//       } catch (error) {
//         console.error('Error fetching types:', error);
//         setError('Error fetching types. Please try again later.');
//       }
//     };

//     fetchTypes();
//   }, []);

//   const handleTypeClick = async (typeName) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/place/placesbyTypeName/${typeName}`);
//       const placeRes = response.data
//       console.log(placeRes)
      
//       setPlaces(response.data);
    
//       setData(response.data);
//       setSelectedType(typeName);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching places:', error);
//       setError('Error fetching places. Please try again later.');
//     }
//   };





 

//   return (
//     <>


  
  

  
 


//        <div>
//         <h1>Place List</h1>
//         <div>
         
//           {types.map((type) => {
            
//             if (type.name !== 'Hotels' && type.name !== 'Restaurants') {
//               return (
//                 <button
//                   key={type._id}
//                   onClick={() => handleTypeClick(type.name)}
//                   disabled={selectedType === type.name}
//                 > 
//                   {type.name}
//                 </button>
//               );
//             } else {
//               return null;
//             }
//           })}
//         </div>
//         <div>
//           <h2>Places</h2>
//           {places.map((place) => (
//             <div key={place._id}>
//               <h3>{place.name}</h3>
//               {images.map((image, index) => (
//                 <div key={index[0]}>
//                   <img
//                     src={image.url}
//                     className="imageProductResizeP"
//                   />
//                 </div>
//               ))}
//               <p>{place.Description}</p>
//               <p>{place.Address}</p>
          
//             </div>
//           ))}
//         </div>
//       </div> 
//     </>
//   );
// }

// export default City;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const City = () => {
  const [types, setTypes] = useState([]);
  const [place, setPlace] = useState([]);
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

  return (
    <div>




<div>
         
                   {types.map((type) => {
                     
                     if (type.name !== 'Hotels' && type.name !== 'Restaurants') {
                       return (
                         <button
                           key={type._id}
                           onClick={() => handleButtonClick(type._id)}
                           disabled={selectedType === type._id ? 'selected' : ''}
                         > 
                           {type.name}
                         </button>
                       );
                     } else {
                       return null;
                     }
                   })}
                 </div>



      
      {/* {types.map((type) => (
        <button
          key={type._id}
          onClick={() => handleButtonClick(type._id)}
          className={selectedType === type._id ? 'selected' : ''}
        >
          {type.name}
        </button>
      ))} */}
      <div>
        {place.map((place) => (
             <div  key={place._id}>
             {place.image.length > 0 && (
               <img
                 src={place.image[0].url}
                 alt={place.name}
                 
               />
             )}

             
             <h3>{place.name}</h3>
             <p>{place.Description}</p>
             <p>{place.Address}</p>
           </div>
          

        ))}
      </div>
    </div>
  );
};

export default City;


