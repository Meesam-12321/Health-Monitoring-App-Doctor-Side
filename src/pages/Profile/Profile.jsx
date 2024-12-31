import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../Context/DarkModeContext.jsx"; // Corrected import path

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

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      // Save the updated data (you can replace this with an API call)
      setDoctorData(formData);
      alert('Profile updated successfully');
    }
    setIsEditing(!isEditing);
  };

  // Navigate to EditProfile
  const navigateToEditProfile = () => {
    navigate('/profile/edit'); // Corrected path
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-8`}>
      <div className={`max-w-4xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-lg`}>
        <h1 className={`text-3xl font-bold text-center ${darkMode ? "text-blue-400" : "text-blue-600"} mb-8`}>
          {isEditing ? 'Edit Profile' : 'Doctor Profile'}
        </h1>

        <div className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>

          {/* Specialization */}
          <div className="flex flex-col">
            <label htmlFor="specialization" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              disabled={!isEditing}
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label htmlFor="bio" className={`text-gray-200 ${darkMode ? "dark:text-gray-100" : "text-gray-700"} font-medium mb-2`}>Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows="4"
              className="px-4 py-2 bg-gray-700 dark:bg-gray-600 text-gray-300 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>

          {/* Edit Button */}
          <div className="mt-6">
            <button
              onClick={isEditing ? toggleEdit : navigateToEditProfile} // Conditionally navigate to EditProfile
              className={`w-full py-3 ${darkMode ? "bg-blue-500" : "bg-blue-600"} text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Back to Dashboard Button */}
          <div className="mt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`w-full py-3 ${darkMode ? "bg-gray-500" : "bg-gray-600"} text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600`}
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
