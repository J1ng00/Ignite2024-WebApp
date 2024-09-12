import React, { useState } from 'react';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (formData) => {
    formData.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/posts', { // Use port 3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });
  
      if (response.ok) {
        console.log("Form submitted successfully:", response.status);
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
                onChange={handleInputChange}
                className="block w-full mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">-- Select an Industry --</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Consulting">Consulting</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Energy">Energy</option>
                <option value="Other">Other</option>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="block w-full mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">-- Select a Position --</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Marketing Specialist">Marketing Specialist</option>
                <option value="Sales Representative">Sales Representative</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Human Resources Manager">Human Resources Manager</option>
                <option value="Operations Manager">Operations Manager</option>
                <option value="Consultant">Consultant</option>
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
