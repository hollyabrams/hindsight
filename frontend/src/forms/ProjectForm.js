import React, { useState } from 'react';
import HindsightApi from '../api';

const ProjectForm = () => {
  const INITIAL_STATE = {
    title: "",
    description: "",
    manager: "",
    deadline: "",
    status: ""
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
    setFormErrors([]);
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
  
    try {
      // Append time to make it an ISO 8601 compliant date-time string
      const formattedDate = `${formData.deadline}T00:00:00Z`;
  
      // Prepare the payload
      const payload = {
        ...formData,
        deadline: formattedDate,
      };
  
      await HindsightApi.createProject(payload);
      setMessage('Project created successfully!');
      setFormData(INITIAL_STATE);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
  
    setFormErrors([]);
  };
  

  return (
    <div className="ProjectForm mx-auto mt-5 flex flex-col items-center justify-center w-full md:w-6/12 lg:w-6/12 p-8 min-w-full md:min-w-3/4 lg:min-w-3/4">
      <div className="card bg-white shadow-lg rounded-lg p-6">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-4 text-center">Create a New Project</h1>
          <form className="ProjectForm-form space-y-4" onSubmit={handleSubmit}>
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Project Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>

            {/* Project Manager */}
            <div>
              <label htmlFor="manager" className="block text-gray-700 text-sm font-bold mb-2">
                Project Manager
              </label>
              <input
                id="manager"
                name="manager"
                type="text"
                value={formData.manager}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Project Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-gray-700 text-sm font-bold mb-2">
                Project Deadline
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Project Status */}
            <div>
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                Project Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="" disabled>Select Status</option>
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <span className="ProjectForm-message space-y-2">
              {formErrors ? <p className="text-red-500 text-lg">{formErrors}</p> : null}
              {message ? <p className="text-green-500 text-lg">{message}</p> : null}
            </span>

            <button
              type="submit"
              className="btn w-full py-2 mt-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;

