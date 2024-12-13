import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // Toggle edit mode (this will now navigate to EditProfile page)
  const toggleEdit = () => {
    // Navigate to EditProfile page when the button is clicked
    navigate('/profile/edit');  // Adjusted to match the route in your App.jsx
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">
          {isEditing ? 'Edit Profile' : 'Doctor Profile'}
        </h1>

        <div className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-200 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-200 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Specialization */}
          <div className="flex flex-col">
            <label htmlFor="specialization" className="text-gray-200 font-medium mb-2">Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              disabled={!isEditing}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-200 font-medium mb-2">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label htmlFor="bio" className="text-gray-200 font-medium mb-2">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows="4"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Edit Button */}
          <div className="mt-6">
            <button
              onClick={toggleEdit}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Back to Dashboard Button */}
          <div className="mt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
