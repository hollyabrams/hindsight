import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import HindsightApi from '../api'

const ProfileForm = ({ deleteUser }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const INITIAL_STATE = {
    username: currentUser?.username || "",
    password: "",
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || ""
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (currentUser) {
      const INITIAL_STATE = {
        username: currentUser?.username,
        password: '',
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email
      };
      
      setFormData(INITIAL_STATE);
    }
  }, [currentUser]);

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

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await HindsightApi.saveProfile(username, profileData);
      setMessage('Saved successfully!');
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: '' }));
    setFormErrors([]);

    setCurrentUser(updatedUser);
  };

  return (
    <div className="Profile mx-auto mt-5 flex flex-col items-center justify-center w-full md:w-6/12 lg:w-6/12 p-8 min-w-full md:min-w-3/4 lg:min-w-3/4">
      <div className="card bg-white shadow-lg rounded-lg p-6">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
          <form className="ProfileForm-form space-y-4" onSubmit={handleSubmit}>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <p className="text-lg">@{currentUser?.username}</p>

            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              className="ProfileForm-Input block w-full p-2 border border-gray-300 rounded-md"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />

            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              className="ProfileForm-Input block w-full p-2 border border-gray-300 rounded-md"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />

            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="ProfileForm-Input block w-full p-2 border border-gray-300 rounded-md"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm password to make changes:
            </label>
            <input
              className="ProfileForm-Input block w-full p-2 border border-gray-300 rounded-md"
              id="password"
              name="password"
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="ProfileForm-message space-y-2">
              {formErrors ? <p className="text-red-500 text-lg">{formErrors}</p> : null}
              {message ? <p className="text-green-500 text-lg">{message}</p> : null}
            </span>
            <button
              type="submit"
              className="btn w-full py-2 mt-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
      <div className="Delete text-center mt-8">
        <button
          onClick={deleteUser}
          className="btn text-red-500 underline hover:text-red-600 mb-5"
        >
          Delete my profile
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;