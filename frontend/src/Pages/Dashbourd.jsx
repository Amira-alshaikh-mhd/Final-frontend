// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateAdminForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [showForm, setShowForm] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/user/Admin', {
//         name,
//         email,
//         password,
//         phone,
//       });

//       console.log(response.data); // Handle the response as needed
//     } catch (error) {
//       console.error(error);
//       // Handle error state
//     }
//   };

//   return (
//     <div>
//       {showForm ? (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <button type="submit">Create Admin</button>
//         </form>
//       ) : (
//         <button onClick={() => setShowForm(true)}>Show Create Admin Form</button>
//       )}
//     </div>
//   );
// };

// export default CreateAdminForm;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './Dashbourd.css';

const AdminPage = () => {



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
    // fetchAdminList();
    fetchUserList();
  }, []);

  // const fetchAdminList = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/user/Admin');
  //     setAdminList(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error state
  //   }
  // };




















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
  






















  // const fetchUserList = async () => {
    
  //   try {
      
  //     const response = await axios.get('http://localhost:5000/user');
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     // Handle error state
  //   }
  // };

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

      // Fetch updated admin list after creating a new admin
      // fetchAdminList();
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

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-page">
    <div className="admin-section">


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

























      <Button onClick={() => setShowModal(true)}>Show Create Admin Form</Button>

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

      {/* <div>
        <h2>Admin List</h2>
        <ul>
          {adminList.map((admin) => (
            <li key={admin.id}>{admin.name}</li>
          ))}
        </ul>
      </div> */}
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






      <div className="country-list-section">
  <h2>Country List</h2>
  <ul>
    {countries.map((country) => (
      <li key={country.id}>
        {country.name}
        <button onClick={() => handleEditCountry(country)}>Edit</button>
        <button onClick={() => handleDeleteCountry(country._id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>






    </div>
  );
};

export default AdminPage;
