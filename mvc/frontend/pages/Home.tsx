import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  const pdfUrl = "https://ignite2024.s3.us-east-2.amazonaws.com/IGNITE+2024+-+Floorplan+-+21Aug2024+-+FINAL.pdf";

  return (
    <div
      style={{
        backgroundImage: `url('/assets/background.jpg')`, // Path relative to the `public` folder
      }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center"
    >
      <nav className="py-8 flex flex-col text-center">
        {/* Recommend a Booth Link */}
        <Link 
          to="/Forms" 
          style={{ 
            backgroundColor: '#ef4444', // This is the equivalent color for `bg-red-500`
            marginBottom: '16px' // Adds spacing between the buttons
          }} 
          className="text-xl text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
          Recommend a booth
        </Link>

        {/* Floorplan - Opens PDF in a New Tab */}
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            marginBottom: '16px',
            backgroundColor: '#3B82F6'  // Equivalent to Tailwind's bg-blue-500
          }}  
          className="text-xl text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Floorplan
        </a>

        {/* Company Bio Link */}
        <Link 
          to="/Company" 
          className="text-xl text-white bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition duration-300">
          Company Bio
        </Link>
      </nav>
    </div>
  );
};

export default Home;
