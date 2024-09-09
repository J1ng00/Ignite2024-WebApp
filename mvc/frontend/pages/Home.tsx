import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
        <h1>IGNITE 2024 </h1>
        <Link to ="/Floorplan">Floorplan</Link>
        <Link to ="/Forms">Recommend a booth!</Link>
    </div>
  )
}

export default Home