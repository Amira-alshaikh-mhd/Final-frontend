import './hosts.css';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function Hosts() {
  
    const [hosts, setHosts] = useState([]);
  
    const { hostId } = useParams();

    useEffect(() => {

        const fetchHost = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/host/${hostId}`);
            setHosts(res.data);
            console.log(res.data);
          } catch (error) {
            console.error(error);
            // Handle error state
          }
        };
        fetchHost(hostId);
      }, [hostId]);

  return (
    <>

<div className="user-list-section">
        <h2>Host List</h2>
        <ul>
          
            <li key={hostId.id}>
            <img src={hosts.image.url} alt={hosts.name} />

              <p>{hosts.name}</p>  
           <p>{hosts.phone}</p>
           <p>{hosts.Description}</p> 
            </li>
          
        </ul>
      </div>
  
    </>
  );
}

export default Hosts;