import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import './country.css'

const Country = () => {
  const [cities, setCities] = useState([]);
  const [name, setName] = useState();
  // const [country_id, setCountry_id] = useState();
  // const country = country_id.name;

  const { countryName } = useParams()


  console.log(countryName, 'im country name')













 














  useEffect(() => {
    const fetchCities = async () => {
      // const res = await axios.get(`http://localhost:5000/city/citiesbyCountry/${category_id}`);
      // setCities(res.data);
      // console.log (res.data)


    
      try { 
        const res = await axios.get(`http://localhost:5000/country/${countryName}`);
        console.log(res.data, 'im ress')
        const name = res.data.name;
        console.log(name)
        const response = await axios.get(`http://localhost:5000/city/citiesbyCountryName/${name}`);
        
        setCities(response.data); 
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  return (


    <div className="city-container">
  {cities.map((city) => (
    <div className="city-card" key={city._id}>
      <img src={city.image.url} alt={city.name} />
      <h3>{city.name}</h3>
      <p>{city.description}</p>
    </div>
  ))}
</div>



  //   <div>
  //   <Carousel>
  //     {cities.map((city) => (
  //       <Carousel.Item key={city._id}>
  //         <img src={city.image.url} alt={city.name} />
  //         <Carousel.Caption>
  //           <h3>{city.name}</h3>
  //         </Carousel.Caption>
  //       </Carousel.Item>
  //     ))}
  //   </Carousel>
  // </div>
  );
};

export default Country;




// import React, { useState } from 'react';
// import axios from 'axios';

// import axios from 'axios';
// import {  useParams } from 'react-router-dom';



 


// const Country = () => {

//   const [cities, setCities] = useState([]);
//   // const [country, setCountry] = useState();
//   const  country  = useParams();


//   // const countryName = useParams


//   useEffect(() => {

//   const fetchCitiesByCountry = async () => {
//     try {
    
//       const response = await axios.get(`http://localhost:5000/city/citiesbyCountryName/${country.name}`);
//       console.log(response)
//       const cities = response.data;
//       setCities(cities)
//       console.log(cities)
//       // Do something with the cities data
  
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchCitiesByCountry();
// }, [country]);







// useEffect(() => {

//   const fetchCities = async () => {
//     try {
    
//       const response = await axios.get(`http://localhost:5000/city`);
//       console.log(response)
//       const cities = response.data;
//       setCities(cities)
//       console.log(cities)
//       // Do something with the cities data
  
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchCities();
// }, [country]);





//   return (
//     <div className="city-container">
//       {cities.map((city) => (
//         <div className="city-card" key={city._id}>
//           <img src={city.image.url} alt={city.name} />
//           <h3>{city.name}</h3>
//           <p>{city.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Country;





