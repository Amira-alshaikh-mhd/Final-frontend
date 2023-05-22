




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './Dashbourd.css';

const AdminPage = () => {


  const [hostName, setHostName] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [hostPassword, setHostPassword] = useState('');
  const [hostDescription, setHostDescription] = useState('');
  const [hostPrice, setHostPrice] = useState('');
  const [hostImage, setHostImage] = useState('');
  const [hostCityId, setHostCityId] = useState("");
  const [hosts, setHosts] = useState([]);
  



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
  
      const response = await axios.post('http://localhost:5000/host', formData, {
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
      const res = await axios.get('http://localhost:5000/host');
      setHosts(res.data);
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };
  fetchHostsList();
}, []);












  



  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const [showCreateCountryModal, setShowCreateCountryModal] = useState(false);
  const [countryName, setCountryName] = useState('');
  const [countryImage, setCountryImage] = useState(null);
  const [countryUserId, setCountryUserId] = useState('');


  





  










  const handleEditCountry = (country) => {
    setSelectedCountry(country);
    setShowCreateCountryModal(true);
  };





  
   const handleDeleteCountry = async (_id) => {

    
    try {
      await axios.delete(`http://localhost:5000/country/${_id}`);
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
    formData.append('userId', countryUserId);
    formData.append('image', countryImage);
  
    try {
      const response = await axios.post('http://localhost:5000/country', formData, {
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
  
  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
  };
  
  const handleCountryImageChange = (event) => {
    setCountryImage(event.target.files[0]);
  };
  
  const handleCountryUserIdChange = (event) => {
    setCountryUserId(event.target.value);
  };
  








  useEffect(() => {
    const fetchcount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/country');
        setCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchcount();
  }, []);





















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
      const response = await axios.get('http://localhost:5000/user');
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
      const response = await axios.post('http://localhost:5000/user/Admin', {
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
      await axios.delete(`http://localhost:5000/user/${_id}`);
      // fetchUserList(); // Refresh the user list after deleting a user
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };

  const handleDeleteHost = async (_id) => {

    
    try {
      await axios.delete(`http://localhost:5000/host/${_id}`);
      // fetchUserList(); // Refresh the user list after deleting a user
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  };



  const handleClose = () => {
    setShowModal(false);
  };

  return (
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



<Button onClick={() => setShowCreateCountryModal(true)}>Create Country</Button>

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
      <input
        type="text"
        placeholder="User ID"
        value={countryUserId}
        onChange={handleCountryUserIdChange}
      />
      <Button type="submit">Create</Button>
    </form>
  </Modal.Body>
</Modal>

























      <Button onClick={() => setShowModal(true) } className='create-admin-btn'>Show Create Admin Form</Button>

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






    </div>
  );
};

export default AdminPage;
