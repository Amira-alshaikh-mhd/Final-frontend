import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Pages/booking.css';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const BookingComponent = () => {
  const cityId = useParams();
  const userId = sessionStorage.getItem('id');

  const [totalPrice, setTotalPrice] = useState(0);
  const [books, setBooks] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [host, setHost] = useState([]);
  const [selectedHost, setSelectedHost] = useState(null);
  const [error, setError] = useState(null);
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
      const response = await axios.get('https://trip-trail.onrender.com/book');
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get(`https://trip-trail.onrender.com/host/getbyCity/${cityId.cityId}`);
        setHost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHosts();
  }, [selectedHost, bookingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'startDate' || name === 'endDate') {
      const startDate = name === 'startDate' ? new Date(value) : new Date(bookingData.startDate);
      const endDate = name === 'endDate' ? new Date(value) : new Date(bookingData.endDate);
  
      if (endDate < startDate) {
        // If end date is before start date, reset the end date
        setBookingData((prevState) => ({
          ...prevState,
          startDate: value,
          endDate: value,
        }));
      } else {
        const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const sum = selectedHost && selectedHost.price * numberOfDays;
        setNumberOfDays(numberOfDays);
  
        setBookingData((prevState) => ({
          ...prevState,
          startDate: name === 'startDate' ? value : bookingData.startDate,
          endDate: name === 'endDate' ? value : bookingData.endDate,
          totalPrice: totalPrice.toFixed(2),
        }));
      }
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
      const response = await axios.post('https://trip-trail.onrender.com/book', bookingData);
      setError(response.data.message);
      // toast.success("Booking successful");
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

  const isUserSignedIn = !userId;

  return (
    <>
      {/* <ToastContainer /> */}
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
            disabled={isUserSignedIn}
          />
          <br />
          <label htmlFor="endDate">End Date:</label>
          <input
  type="date"
  name="endDate"
  id="endDate"
  value={bookingData.endDate}
  onChange={handleInputChange}
  disabled={isUserSignedIn || !bookingData.startDate}
/>

          <br />
          <label htmlFor="number">Number:</label>
          <input
            type="number"
            name="number"
            id="number"
            value={bookingData.number}
            onChange={handleInputChange}
            disabled={isUserSignedIn}
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
            <>
              <p>Price: $ {selectedHost.price}</p>
              <br />
              <div className="total-price">
                <p>Total Price: {selectedHost.price && selectedHost.price * (numberOfDays)}</p>
              </div>
              {error && (
                <div className="total-price">
                  <p>{error}</p>
                </div>
              )}
            </>
          )}

          <br />
          <button type="submit" disabled={isUserSignedIn}>Book</button>
          {isUserSignedIn && (
            <p className='alert'>You should  
              <Link to="/signin">
                <h4>Sign in</h4>
              </Link>
              to book 
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default BookingComponent;
