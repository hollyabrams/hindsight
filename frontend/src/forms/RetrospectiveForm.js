import React, { useState } from 'react';

const RetrospectiveForm = ({ onSubmit }) => {
  const INITIAL_STATE = {
    participant_name: '',
    facilitator: '',
    project_id: '',
    start_doing: '',
    continue_doing: '',
    stop_doing: '',
    action_items: '',
    lessons_learned: ''
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
      await onSubmit(formData);
      setMessage('Retrospective data submitted successfully!');
      setFormData(INITIAL_STATE);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
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
            
            {/* Start Doing field */}
            <div>
              <label htmlFor="start_doing" className="block text-gray-700 text-sm font-bold mb-2">
                Start Doing
              </label>
              <textarea
                name="start_doing"
                id="start_doing"
                value={formData.start_doing}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>

            {/* Continue Doing field */}
            <div>
              <label htmlFor="continue_doing" className="block text-gray-700 text-sm font-bold mb-2">
                Continue Doing
              </label>
              <textarea
                name="continue_doing"
                id="continue_doing"
                value={formData.continue_doing}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>

            {/* Stop Doing field */}
            <div>
              <label htmlFor="stop_doing" className="block text-gray-700 text-sm font-bold mb-2">
                Stop Doing
              </label>
              <textarea
                name="stop_doing"
                id="stop_doing"
                value={formData.stop_doing}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>

            {/* Action Items field */}
            <div>
              <label htmlFor="action_items" className="block text-gray-700 text-sm font-bold mb-2">
                Action Items
              </label>
              <textarea
                name="action_items"
                id="action_items"
                value={formData.action_items}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>

            {/* Lessons Learned field */}
            <div>
              <label htmlFor="lessons_learned" className="block text-gray-700 text-sm font-bold mb-2">
                Lessons Learned
              </label>
              <textarea
                name="lessons_learned"
                id="lessons_learned"
                value={formData.lessons_learned}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            
            <button
              type="submit"
              className="btn w-full py-2 mt-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Submit Retrospective Data
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RetrospectiveForm;




