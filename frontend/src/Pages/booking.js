import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages/booking.css'
import { useParams } from 'react-router-dom';

const BookingComponent = () => {
  const cityId = useParams();


  const userId = sessionStorage.getItem('id');

  const [totalPrice, setTotalPrice] = useState(0);
  const [books, setBooks] = useState([]);
  const [host, setHost] = useState([]);
  const [selectedHost, setSelectedHost] = useState(null);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    number: '',
    hostId: '',
    userId: userId
  });


    

  



 







  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/book');
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchHosts = async () => {
      console.log(cityId)
      try {
        const response = await axios.get(`http://localhost:5000/host/getbyCity/${cityId.cityId}`);
        setHost(response.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchHosts();
  }, []);


  // const handleInputChange = (e) => {
  //   setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  // };










  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'startDate' || name === 'endDate') {
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const pricePerDay = parseFloat(host.price);
      const totalPrice = isNaN(pricePerDay) || numberOfDays <= 0 ? 0 : numberOfDays * pricePerDay;
  
      setBookingData((prevState) => ({
        ...prevState,
        [name]: value,
        totalPrice: totalPrice.toFixed(2),
      }));
    } else {
      setBookingData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  






  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/book', bookingData);
      console.log(response.data.message);
      // Refresh the list of books after successful booking
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };



  const handleHostSelection = (e) => {
    const selectedHostId = e.target.value;
    const selectedHost = host.find((host) => host._id === selectedHostId);
    setSelectedHost(selectedHost);
    setBookingData({ ...bookingData, hostId: selectedHostId });
  };

  return (
   
  
    <div className="bookingFormContainer">
      <h1 className="bookingFormTitle">Booking Form</h1>
      <form className="bookingForm" onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={bookingData.startDate}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={bookingData.endDate}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="number">Number:</label>
        <input
          type="number"
          name="number"
          id="number"
          value={bookingData.number}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="hostId">Host:</label>
        <select
          name="hostId"
          id="hostId"
          value={bookingData.hostId}
          onChange={handleHostSelection}
        >
          <option value="">Select a host</option>
          {host.map((host) => (
            <option key={host._id} value={host._id}>
              {host.name}
            </option>
          ))}
        </select>
        {selectedHost && (
          <p>Price: $ {selectedHost.price}</p>
        )}
        <br />
        <div className="total-price">
  <p>Total Price: {totalPrice}</p>
</div>
        <br />
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          name="userId"
          id="userId"
          value={bookingData.userId}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingComponent;
