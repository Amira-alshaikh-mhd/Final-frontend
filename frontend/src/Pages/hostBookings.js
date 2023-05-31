import './hosts.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from './Header';

import Footer from './Footer';




function HostBookings() {



















  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [book, setBook] = useState([]);

  
    const [hosts, setHosts] = useState([]);
  
    // const { hostId } = useParams();
    const hostId = sessionStorage.getItem('id');

    useEffect(() => {

        const fetchHost = async () => {
          try {
            const res = await axios.get(`https://trip-trail.onrender.com/host/${hostId}`);
            setHosts(res.data);
            console.log(res.data);
          } catch (error) {
            console.error(error);
            // Handle error state
          }
        };
        fetchHost(hostId);
      }, [hostId]);

  



      useEffect(() => {
        const fetchBook = async () => {
          try {
            console.log(hostId);
            const currentDate = new Date(); // Get the current date
            const response = await axios.get(
              `https://trip-trail.onrender.com/book/bookByHost/${hostId}`
            );
            const { data } = response;
      
            // Filter books based on endDate
            const filteredBooks = data.filter((book) => {
              const endDate = new Date(book.endDate);
              return endDate > currentDate;
            });
      
            setBook(filteredBooks);
            console.log(filteredBooks, "filtered books");
          } catch (error) {
            console.error(error);
          }
        };
        fetchBook(hostId);
      }, [hostId]);












  return (
    <>
  <Header />
  <div className="host-list-host">
    {/* {hosts.map((host) => ( */}
      <div key={hosts._id} className="host-item-host">
        {hosts.image && <img src={hosts.image.url} alt={hosts.name} className="host-image-host" />}
        <div className="host-details-host">
          <p className="host-name-host">{hosts.name}</p>
          <p className="host-phone-host">Phone : {hosts.phone}</p>
          <p className="host-description-host">About : {hosts.Description}</p>
        </div>
      </div>
    {/* ))} */}
  </div>


<hr />














<h2 className="section-heading-host">Bookings</h2>
<div className="user-list-section-host">

  {book.map((booking) => (
    <div className="restaurant-card-host" key={booking._id}>
      <p className="booking-user">Name : {booking.userId.name}</p>
      <p className="booking-email">E-mail : {booking.userId.email}</p>
      <p className="booking-phone">Phone : {booking.userId.phone}</p>
      <p className="booking-number">Number of guests : {booking.number}</p>
      <p className="booking-dates">From : 
        {new Date(booking.startDate).toLocaleDateString()} To {new Date(booking.endDate).toLocaleDateString()}
      </p>
    </div>
  ))}
</div>














<Footer />
    </>
  );
}

export default HostBookings;