import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSave } from 'react-icons/fa';

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-8">
          {isEditing ? 'Edit Profile' : 'Doctor Profile'}
        </h1>

        <div className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
            />
          </div>

          {/* Specialization */}
          <div className="flex flex-col">
            <label
              htmlFor="specialization"
              className="text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              disabled={!isEditing}
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label htmlFor="bio" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows="4"
              className={`px-6 py-3 rounded-lg shadow focus:outline-none transition-all ${
                isEditing
                  ? 'bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              } text-gray-800 dark:text-gray-300`}
            />
          </div>

          {/* Edit/Save Button */}
          <div>
            <button
              onClick={toggleEdit}
              className="w-full py-3 flex items-center justify-center bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
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
              className="w-full py-3 bg-gray-600 dark:bg-gray-500 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
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
