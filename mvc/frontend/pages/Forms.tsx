import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the type for the form data
interface FormData {
  industry: string;
  skills: string;
  jobPosition: string;
}

const Forms = () => {
  // Initialize the state with proper types
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    skills: '',
    jobPosition: ''
  });

  const [recommendation, setRecommendation] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://13.59.94.228:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });
  
      if (response.ok) {
        console.log("Form submitted successfully:", response.status);
        const result = await response.json();
        setRecommendation(result.recommendation);
  
        // Pass the recommendation data to the Company page
        navigate('/Company', { state: { recommendation: result.recommendation } });
      } else {
        console.error("Failed to submit form:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  

  return (
    <div
      style={{
        backgroundImage: `url('/assets/background.jpg')`, // Path relative to the `public` folder
      }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center"
    >
      {/* Form */}
      <div className="max-w-xl w-full p-6 bg-white rounded shadow-lg flex flex-col items-center justify-center">
        <form onSubmit={submitForm} className="space-y-6 w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Job Interest Form</h2>

          {/* Wrap the question in a div with a gray border */}
          <div className="p-4 border border-gray-300! rounded ">
            {/* Industry Selection */}
            <label className="block">
              <span className="text-lg">What industry are you interested in?</span>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="block w-full mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">-- Select an Industry --</option>
                <option value="Accountancy/Consulting ">Accountancy/Consulting </option>
                <option value="Banking and Finance">Banking and Finance</option>
                <option value="Financial Services ">Financial Services </option>
                <option value="Government/Public Sector">Government/Public Sector</option>
                <option value="Hospitality, Recreation and Leisure & Lifestyle">Hospitality, Recreation and Leisure & Lifestyle</option>
                <option value="Human Resources/Recruitment & Staffing">Human Resources/Recruitment & Staffing</option>
                <option value="IT Services and Consulting">IT Services and Consulting</option>
                <option value="Media & Communications">Media & Communications</option>
                <option value="Retail and Consumer Goods">Retail and Consumer Goods</option>
                <option value="Social Services">Social Services</option>
              </select>
            </label>
          </div>

          {/* Skills Selection */}
          <div className="p-4 border border-gray-300! rounded">
            <label className="block">
              <span className="text-lg">What are your top skills or strengths?</span>
              <select
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="block w-full mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">-- Select Your Skills --</option>
                <option value="Leadership">Leadership</option>
                <option value="Communication">Communication</option>
                <option value="Problem-solving">Problem-solving</option>
                <option value="Technical expertise">Technical expertise</option>
                <option value="Creativity">Creativity</option>
                <option value="Time management">Time management</option>
                <option value="Teamwork">Teamwork</option>
                <option value="Analytical thinking">Analytical thinking</option>
                <option value="Customer service">Customer service</option>
                <option value="Adaptability">Adaptability</option>
              </select>
            </label>
          </div>

          {/* Job Position Selection */}
          <div className="p-4 border border-gray-300! rounded">
            <label className="block">
              <span className="text-lg">What job position or role are you looking for?</span>
              <select
                name="jobPosition"
                value={formData.jobPosition}
                onChange={handleChange}
                className="block w-full mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">-- Select a Position --</option>
                <option value="Accounting & Finance">Accounting & Finance</option>
                <option value="Administration & Office Support">Administration & Office Support</option>
                <option value="Creative & Design">Creative & Design</option>
                <option value="Human Resource">Human Resource</option>
                <option value="Marketing & Communications">Marketing & Communications</option>
                <option value="Operations & Supply Chain">Operations & Supply Chain</option>
                <option value="Human Resources Manager">Human Resources Manager</option>
                <option value="Public Sector & Government">Public Sector & Government</option>
                <option value="Sales">Sales</option>
                <option value="Technology & IT">Technology & IT</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{ display: 'block', margin: '0 auto' }} // This will center the button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default Forms;
