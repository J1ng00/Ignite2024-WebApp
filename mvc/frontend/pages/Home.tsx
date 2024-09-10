import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/assets/background.jpg')`, // Path relative to the `public` folder
      }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold text-white mb-8">IGNITE 2024</h1>
      
      <nav className="space-x-4">
        <Link 
          to="/Floorplan" 
          className="text-xl text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Floorplan
        </Link>
        <Link 
          to="/Forms" 
          className="text-xl text-white bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition duration-300">
          Recommend a booth!!!!??
        </Link>
      </nav>
    </div>
  );
};

export default Home