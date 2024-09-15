import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Company = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access recommendation from location.state
  const { recommendation } = location.state || {};

  // Function to format and remove the intro and summary from the recommendation
  const formatRecommendation = () => {
    if (!recommendation) return null;

    // Use regex to remove any part that matches the introductory sentence
    const cleanedRecommendation = recommendation
      .replace(
        /Based on the student's interest.*companies that would be a good fit for them are:\n*/i,
        ''
      )
      .replace(
        /Based on the student's interest.*here are the top.*:\n*/i,
        ''
      )
      .replace(
        /These companies offer.*$/i, // Remove any final summary like "These companies offer a mix of opportunities..."
        ''
      );

    // Split the cleaned recommendation into numbered parts
    const parts = cleanedRecommendation.split(/(\d+\.\s)/g).filter(Boolean);

    return parts.map((part, index) => {
      if (part.match(/\d+\.\s/)) {
        return (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong style={{ fontSize: '18px', color: '#1E40AF' }}>{part}</strong>
          </div>
        ); // Bold the numbers and style them
      } else {
        return (
          <p key={index} style={{ marginLeft: '20px', fontSize: '12px', lineHeight: '1.5', color: '#333' }}>
            {part}
          </p>
        ); // Display the recommendation text with better styling
      }
    });
  };

  if (!recommendation) {
    return (
      <div
        style={{
          backgroundImage: `url('/assets/background.jpg')`,
        }}
        className="bg-cover bg-center bg-no-repeat min-h-screen w-full flex flex-col items-center justify-center"
      >
        <h2>No recommendation available.</h2>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'block', margin: '0 auto' }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url('/assets/background.jpg')`,
      }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center"
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <div>{formatRecommendation()}</div>
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'block',
          margin: '20px auto',
          backgroundColor: '#1E40AF',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          border: 'none',
        }}
        className="hover:bg-blue-700 transition duration-300"
      >
        Go Back
      </button>
    </div>
  );
};

export default Company;
