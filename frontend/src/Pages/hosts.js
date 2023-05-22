import './hosts.css';
import React, { useState, useEffect } from "react";

import axios from "axios";

function Hosts() {
  
    const [hosts, setHosts] = useState([]);


    useEffect(() => {

        const fetchHostsList = async () => {
          try {
            const res = await axios.get('http://localhost:5000/host');
            setHosts(res.data);
            console.log(res.data);
          } catch (error) {
            console.error(error);
            // Handle error state
          }
        };
        fetchHostsList();
      }, []);

  return (
    <>

<div className="user-list-section">
        <h2>Host List</h2>
        <ul>
          {hosts.map((host) => (
            <li key={host.id}>
            <img src={host.image.url} alt={host.name} />

             <p>{host.name}</p> 
           <p>{host.phone}</p>
           <p>{host.Description}</p>
            </li>
          ))}
        </ul>
      </div>
  
    </>
  );
}

export default Hosts;