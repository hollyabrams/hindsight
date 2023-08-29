import React, { useState } from 'react';

const RetrospectiveForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    participant_name: '',
    facilitator: '',
    project_id: '',
    start_doing: '',
    continue_doing: '',
    stop_doing: '',
    action_items: '',
    lessons_learned: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.facilitator && formData.project_id) {
      onSubmit(formData);
    } else {
      alert("Facilitator and Project ID are required!");
    }
  };

  return (
    <div className="RetrospectiveForm mx-auto mt-5 flex flex-col items-center justify-center w-full md:w-6/12 lg:w-6/12 p-8 min-w-full md:min-w-3/4 lg:min-w-3/4">
      <div className="card bg-white shadow-lg rounded-lg p-6">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-4 text-center">Start a New Retrospective</h1>
          <form className="RetrospectiveForm-form space-y-4" onSubmit={handleSubmit}>
            
            {/* Facilitator field */}
            <div>
              <label htmlFor="facilitator" className="block text-gray-700 text-sm font-bold mb-2">
                Facilitator (required)
              </label>
              <input
                type="text"
                name="facilitator"
                id="facilitator"
                value={formData.facilitator}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
                maxLength={100}
              />
            </div>

            {/* Project ID field */}
            <div>
              <label htmlFor="project_id" className="block text-gray-700 text-sm font-bold mb-2">
                Project ID (required)
              </label>
              <input
                type="number"
                name="project_id"
                id="project_id"
                value={formData.project_id}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Other fields go here */}
            
            <button
              type="submit"
              className="btn w-full py-2 mt-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Start Retrospective
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RetrospectiveForm;



