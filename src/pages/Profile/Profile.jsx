<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../Context/DarkModeContext.jsx"; // Corrected import path
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSave } from 'react-icons/fa';
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

const Profile = () => {
  // Static data for doctor's profile (replace with real data from backend)
  const [doctorData, setDoctorData] = useState({
    name: 'Dr. John Doe',
    email: 'dr.johndoe@example.com',
    specialization: 'Cardiologist',
    phone: '123-456-7890',
    bio: 'Experienced Cardiologist with 10+ years in treating heart conditions and providing holistic care.',
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctorData);

  const navigate = useNavigate();

  // Access dark mode context
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  // Handle form field changes when in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle edit mode (navigates to edit page for a more modular approach)
  const toggleEdit = () => {
    navigate('/profile/edit');
  };

  // Navigate to EditProfile
  const navigateToEditProfile = () => {
    navigate('/profile/edit'); // Corrected path
  };

  return (
<<<<<<< HEAD
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-8`}>
      <div className={`max-w-4xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-lg`}>
        <h1 className={`text-3xl font-bold text-center ${darkMode ? "text-blue-400" : "text-blue-600"} mb-8`}>
=======
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-8">
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
          {isEditing ? 'Edit Profile' : 'Doctor Profile'}
        </h1>

        <div className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
<<<<<<< HEAD
            <label htmlFor="name" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Name</label>
=======
            <label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Name
            </label>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
<<<<<<< HEAD
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
=======
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
<<<<<<< HEAD
            <label htmlFor="email" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Email</label>
=======
            <label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email
            </label>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
<<<<<<< HEAD
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
=======
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            />
          </div>

          {/* Specialization */}
          <div className="flex flex-col">
<<<<<<< HEAD
            <label htmlFor="specialization" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Specialization</label>
=======
            <label
              htmlFor="specialization"
              className="text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Specialization
            </label>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              disabled={!isEditing}
<<<<<<< HEAD
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
=======
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
<<<<<<< HEAD
            <label htmlFor="phone" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Phone</label>
=======
            <label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Phone
            </label>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
<<<<<<< HEAD
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
=======
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
<<<<<<< HEAD
            <label htmlFor="bio" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Bio</label>
=======
            <label htmlFor="bio" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Bio
            </label>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows="4"
<<<<<<< HEAD
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
=======
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            />
          </div>

          {/* Edit/Save Button */}
          <div>
            <button
<<<<<<< HEAD
              onClick={isEditing ? toggleEdit : navigateToEditProfile} // Conditionally navigate to EditProfile
              className={`w-full py-3 ${darkMode ? "bg-blue-500" : "bg-blue-600"} text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600`}
=======
              onClick={toggleEdit}
              className="w-full py-3 flex items-center justify-center bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            >
              {isEditing ? (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <FaEdit className="mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Back to Dashboard */}
          <div>
            <button
              onClick={() => navigate('/dashboard')}
<<<<<<< HEAD
              className={`w-full py-3 ${darkMode ? "bg-gray-500" : "bg-gray-600"} text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600`}
=======
              className="w-full py-3 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
