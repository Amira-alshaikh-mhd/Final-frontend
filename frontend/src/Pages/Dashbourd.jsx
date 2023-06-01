




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './Dashbourd.css';
import Header from './Header';
import Footer from './Footer';

const AdminPage = () => {




  const role = sessionStorage.getItem("role");


  const [hostName, setHostName] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [hostPassword, setHostPassword] = useState('');
  const [hostDescription, setHostDescription] = useState('');
  const [hostPrice, setHostPrice] = useState('');
  const [hostImage, setHostImage] = useState('');
  const [hostCityId, setHostCityId] = useState("");
  const [hosts, setHosts] = useState([]);
  





  // Host

  const handleCreateHost = async () => {
    try {
      const formData = new FormData();
      formData.append('name', hostName);
      formData.append('phone', hostPhone);
      formData.append('email', hostEmail);
      formData.append('password', hostPassword);
      formData.append('Description', hostDescription);
      formData.append('price', hostPrice);
      formData.append("cityId", hostCityId);
      
  
      // Append the image file to the form data
      formData.append('image', hostImage);
  
      const response = await axios.post('https://trip-trail.onrender.com/host', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Handle the response and any necessary updates
      console.log(response.data);
  
      // Close the host form modal
      handleCloseHostForm();
    } catch (error) {
      console.error('Error creating host:', error);
    }
  };






  const [showHostForm, setShowHostForm] = useState(false);

  const handleOpenHostForm = () => {
    setShowHostForm(true);
  };

  const handleCloseHostForm = () => {
    setShowHostForm(false);
  };

  useEffect(() => {

  const fetchHostsList = async () => {
    try {
      const res = await axios.get('https://trip-trail.onrender.com/host');
      setHosts(res.data);
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };
  fetchHostsList();
}, []);









//______________________________________________________________________________________________________


  
// country


  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const [showCreateCountryModal, setShowCreateCountryModal] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [countryImage, setCountryImage] = useState(null);
  // const [countryUserId, setCountryUserId] = useState('');


  


  const handleEditCountry = (country) => {
    setSelectedCountry(country);
    setShowCreateCountryModal(true);
  };





  
   const handleDeleteCountry = async (_id) => {

    
    try {
      await axios.delete(`https://trip-trail.onrender.com/country/${_id}`);
      // fetchUserList(); // Refresh the user list after deleting a user
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };
  






  
  const handleCreateCountry = async () => {
    // Prepare form data
    const formData = new FormData();
    formData.append('name', countryName);
    // formData.append('userId', countryUserId);
    formData.append('image', countryImage);
  
    try {
      const response = await axios.post('https://trip-trail.onrender.com/country', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"); // Handle the response as needed
  
      // Fetch updated country list after creating a new country
  
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };
  
  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
  };
  
  const handleCountryImageChange = (event) => {
    setCountryImage(event.target.files[0]);
  };
  
  // const handleCountryUserIdChange = (event) => {
  //   setCountryUserId(event.target.value);
  // };
  








  useEffect(() => {
    const fetchcount = async () => {
      try {
        const response = await axios.get('https://trip-trail.onrender.com/country');
        setCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchcount();
  }, []);













//_______________________________________________________________________________________________
















// city































  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  // const [selectedCountry, setSelectedCountry] = useState('');

  
  const [showCreateCityModal, setShowCreateCityModal] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cityDescription, setCityDescription] = useState('');
  const [cityImage, setCityImage] = useState(null);
  const [cityCountry, setCityCountry] = useState('');


  

  // const handleCountryIdChange = (event) => {
  //   const selectedId = event.target.value;
  //   const selectedCountry = countries.find(country => country.id === selectedId);
  //   setSelectedCountry(selectedCountry);
  // };
  


  const handleEditCity = (city) => {
    setSelectedCity(city);
    setShowCreateCityModal(true);
  };





  
   const handleDeleteCity = async (_id) => {

    
    try {
      await axios.delete(`https://trip-trail.onrender.com/city/${_id}`);
      // fetchUserList(); // Refresh the user list after deleting a user
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };
  






  
  const handleCreateCity = async () => {
    // Prepare form data
    const formData = new FormData();
    formData.append('name', cityName);
    formData.append('Description', cityDescription);
    formData.append('country', selectedCountry);
    formData.append('image', cityImage);
  
    try {
      const response = await axios.post('https://trip-trail.onrender.com/city', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data); // Handle the response as needed
  
      // Fetch updated country list after creating a new country
  
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };
  
  const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  };

  const handleCityDescriptionChange = (event) => {
    setCityDescription(event.target.value);
  };
  
  const handleCityImageChange = (event) => {
    setCityImage(event.target.files[0]);
  };



  const handleCountryIdChange = (event) => {
    const selectedId = event.target.value;
    const selectedCountry = countries.find(country => country._id === selectedId);
    setSelectedCountry(selectedCountry);
  };
  








  useEffect(() => {
    const fetchcities = async () => {
      try {
        const response = await axios.get('https://trip-trail.onrender.com/city');
        setCities(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchcities();
  }, []);














//______________________________________________________________________________________________


























// user






  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [users, setUsers] = useState([]);

  
  
 


  useEffect(() => {
  const fetchUserList = async () => {
    try {
      const response = await axios.get('https://trip-trail.onrender.com/user');
      const usersWithAdminRole = response.data.filter(user => user.role === 'admin');
      setUsers(usersWithAdminRole);
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };
  

  fetchUserList();

}, []);








  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://trip-trail.onrender.com/user/Admin', {
        name,
        email,
        password,
        phone,
      });

      console.log(response.data); // Handle the response as needed

     
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };



 





  const handleDeleteUser = async (_id) => {

    
    try {
      await axios.delete(`https://trip-trail.onrender.com/user/${_id}`);
      // fetchUserList(); // Refresh the user list after deleting a user
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };

  const handleDeleteHost = async (_id) => {

    
    try {
      await axios.delete(`https://trip-trail.onrender.com/host/${_id}`);
      // fetchUserList(); // Refresh the user list after deleting a user
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };



  const handleClose = () => {
    setShowModal(false);
  };
















//______________________________________________________________________________



// type






const [types, setTypes] = useState([]);
const [typeName, setTypeName] = useState('');

useEffect(() => {
  fetchTypes();
}, []);

const fetchTypes = async () => {
  try {
    const response = await axios.get('https://trip-trail.onrender.com/type');
    setTypes(response.data);
  } catch (error) {
    console.log(error);
  }
};

const handleCreateType = async () => {
  try {
    const response = await axios.post('https://trip-trail.onrender.com/type', {
      name: typeName,
    });
    console.log(response.data); // Handle the response as needed
    setTypeName(''); // Clear the input field
    fetchTypes(); // Fetch the updated types list
  } catch (error) {
    console.log(error);
  }
};

const handleTypeNameChange = (event) => {
  setTypeName(event.target.value);
};

const handleDeleteType = async (_id) => {
  try {
    await axios.delete(`https://trip-trail.onrender.com/type/${_id}`);
    fetchTypes();
  } catch (error) {
    console.log(error);
  }
};


  //_________________________________________________________________________________________________________





  // place     













  





  const [places, setPlaces] = useState([]);
  // const [cities, setCities] = useState([]);
  // const [types, setTypes] = useState([]);
  const [placeData, setPlaceData] = useState({
    name: '',
    Description: '',
    Address: '',
    rating: '',
    cityId: '',
    typeId: '',
    image: '',
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    // Fetch all places, cities, and types
    fetchPlaces();
  
    fetchTypes();
  }, [placeData]);

  const fetchPlaces = async () => {
    try {
      const response = await axios.get('https://trip-trail.onrender.com/place');
      setPlaces(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [images, setImages] = useState([]);
  


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


  const handleCreatePlace = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://trip-trail.onrender.com/place`, placeData);
      console.log(response.data);
      setPlaceData({
        name: '',
        Description: '',
        Address: '',
        rating: '',
        cityId: '',
        typeId: '',
        image:'',
      });
      alert("place created successfuly")
      // Fetch all places again to update the list
      fetchPlaces();
      setImages(null)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePlace = async (placeId) => {
    try {
      await axios.delete(`https://trip-trail.onrender.com/place/${placeId}`);
      // Fetch all places again to update the list
      fetchPlaces();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPlace = (place) => {
    setSelectedPlace(place);
    setPlaceData({
      name: place.name,
      Description: place.Description,
      Address: place.Address,
      rating: place.rating,
      cityId: place.cityId,
      typeId: place.typeId,
    });
  };

  const handleUpdatePlace = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://trip-trail.onrender.com/place/${selectedPlace._id}`, placeData);
      console.log(response.data);
      setPlaceData({
        name: '',
        Description: '',
        Address: '',
        rating: '',
        cityId: '',
        typeId: '',
      });
      setSelectedPlace(null);
      // Fetch all places again to update the list
      fetchPlaces();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setPlaceData({ ...placeData, [e.target.name]: e.target.value },{ ...placeData, [e.target.Description]: e.target.value });
  };










  return (
    <>
     <Header />
    <div className="admin-page">
     
    <div className="admin-section">




    <Button onClick={() => setShowHostForm(true)}>Add Host</Button>

{/* Host form modal */}
<Modal show={showHostForm} onHide={handleCloseHostForm}>
  <Modal.Header closeButton>
    <Modal.Title>Add Host</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form >
    {/* Host form fields */}
<input type="text" value={hostName} onChange={e => setHostName(e.target.value)} placeholder="Name" />
<input type="text" value={hostPhone} onChange={e => setHostPhone(e.target.value)} placeholder="Phone" />
<input type="email" value={hostEmail} onChange={e => setHostEmail(e.target.value)} placeholder="Email" />
<input type="password" value={hostPassword} onChange={e => setHostPassword(e.target.value)} placeholder="Password" />
<input type="text" value={hostDescription} onChange={e => setHostDescription(e.target.value)} placeholder="Description" />
<input type="number" value={hostPrice} onChange={e => setHostPrice(e.target.value)} placeholder="Price" />
<input
        type="text"
        value={hostCityId}
        onChange={(e) => setHostCityId(e.target.value)} // Handle cityId change
        placeholder="City ID"
      />
<input type="file" onChange={e => setHostImage(e.target.files[0])} />

{/* Submit button */}
<button onClick={handleCreateHost}>Add Host</button>
    </form>
  </Modal.Body>
</Modal>













<Button className='create-cou' onClick={() => setShowCreateCountryModal(true)}>Create Country</Button>

<Modal show={showCreateCountryModal} onHide={() => setShowCreateCountryModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Create Country</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleCreateCountry}>
      <input
        type="text"
        placeholder="Country Name"
        value={countryName}
        onChange={handleCountryNameChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleCountryImageChange}
      />
      {/* <input
        type="text"
        placeholder="User ID"
        value={countryUserId}
        onChange={handleCountryUserIdChange}
      /> */}
      <Button type="submit">Create</Button>
    </form>
  </Modal.Body>
</Modal>




















<Button onClick={() => setShowCreateCityModal(true)}>Create City</Button>

<Modal show={showCreateCityModal} onHide={() => setShowCreateCityModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Create City</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleCreateCity}>
      <input
        type="text"
        placeholder="City Name"
        value={cityName}
        onChange={handleCityNameChange}
      />
       <input
        type="text"
        placeholder="City Description"
        value={cityDescription}
        onChange={handleCityDescriptionChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleCityImageChange}
      />


<select value={selectedCountry ? selectedCountry._id : ''} onChange={handleCountryIdChange}>
  <option value="">Select Country</option>
  {countries.map(country => (
    <option key={country._id} value={country._id}>
      {country.name}
    </option>
  ))}
</select>

<input
  type="text"
  placeholder="Country Name"
  value={selectedCountry ? selectedCountry.name : ''}
  readOnly
/>
      <Button type="submit">Create</Button>
    </form>
  </Modal.Body>
</Modal>





















        {role === "superadmin" ?


      <Button onClick={() => setShowModal(true) } className='create-admin-btn'> Add Admin </Button>
      :
      ""
        }

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button type="submit">Create Admin</Button>
          </form>
        </Modal.Body>
      </Modal>







   
</div>
      <div className="user-list-section">
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>








      <div className="user-list-section">
        <h2>Host List</h2>
        <ul>
          {hosts.map((host) => (
            <li key={host.id}>
              {host.name}
              <button onClick={() => handleDeleteHost(host._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>






      <div className="country-list-section">
  <h2>Country List</h2>
  <ul>
    {countries.map((country) => (
      <li key={country.id}>
       <div className='country-name'> {country.name}</div>
        <button onClick={() => handleEditCountry(country)} className='country-edit'>Edit</button>
        <button onClick={() => handleDeleteCountry(country._id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>
















<div className="country-list-section">
  <h2>Cities List</h2>
  <ul>
    {cities.map((city) => (
      <li key={city.id}>
       <div className='country-name'> {city.name}</div>
        <button onClick={() => handleEditCity(city)} className='country-edit'>Edit</button>
        <button onClick={() => handleDeleteCity(city._id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>







<div className='country-list-section'>
  <input
    type="text"
    placeholder="Type Name"
    value={typeName}
    onChange={handleTypeNameChange}
    className='modal-form-input'
  />
  <button onClick={handleCreateType} className='modal-form-button create-admin-btn'>Create Type</button>
</div>
<ul className='user-list-section'>
  {types.map((type) => (
    <li key={type._id}>
      <span className='country-name'>{type.name}</span>
      <button onClick={() => handleDeleteType(type._id)} className='country-edit'>Delete</button>
    </li>
  ))}
</ul>
















<div>
<Button onClick={() => setShowModal(true) } className='create-admin-btn'> Add place </Button>

      <div className='country-list-section-place'>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={selectedPlace ? handleUpdatePlace : handleCreatePlace}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={placeData.name}
            onChange={handleInputChange}
            className='modal-form-input-p'
          />
          <input
            type="text"
            name="Description"
            placeholder="Description"
            value={placeData.Description}
            onChange={handleInputChange}
            className='modal-form-input-p'
          />
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={placeData.Address}
            onChange={handleInputChange}
            className='modal-form-input-p'
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            value={placeData.rating}
            onChange={handleInputChange}
            className='modal-form-input-p'
          />
          <select
            name="cityId"
            value={placeData.cityId}
            onChange={handleInputChange}
            className='modal-form-input-p'
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
          <select
            name="typeId"
            value={placeData.typeId}
            onChange={handleInputChange}
            className='modal-form-input-p'
          >
            <option value="">Select Type</option>
            {types.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        

          <div>
  <label htmlFor="images">Images:</label>
  <input type="file" id="images" name="file" value={placeData.image} onChange={handleImage} multiple />

  <div>
  {images&&images.map((image, index) => (
    <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: "100px", height: "100px" }} />
  ))}
</div>
<button type="submit" className='modal-form-button create-admin-btn-p'>
            {selectedPlace ? 'Update Place' : 'Create Place'}
          </button>
 
</div>
        </form>
        </Modal.Body>
      </Modal>

      </div>


      </div>







      <ul className='user-list-section'>
        {places.map((place) => (
          <li key={place._id}>
      <span className='country-name'>
            {place.name}</span>
            <button onClick={() => handleEditPlace(place)} className='country-edit-p'>Edit</button>
            <button onClick={() => handleDeletePlace(place._id)} >Delete</button>
          </li>
        ))}
      </ul>
   






    </div>
    <Footer />
    </>
  );
};

export default AdminPage;
