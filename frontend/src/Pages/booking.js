import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingComponent = () => {
  const [books, setBooks] = useState([]);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    number: '',
    hostId: '',
    userId: ''
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

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
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

  return (
    <div>
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
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
        <label htmlFor="hostId">Host ID:</label>
        <input
          type="text"
          name="hostId"
          id="hostId"
          value={bookingData.hostId}
          onChange={handleInputChange}
        />
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
      <h2>List of Books:</h2>
      {books.map((book) => (
        <div key={book._id}>
          <p>Start Date: {book.startDate}</p>
          <p>End Date: {book.endDate}</p>
          <p>Number: {book.number}</p>
          <p>Host ID: {book.hostId}</p>
          <p>User ID: {book.userId}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BookingComponent;
