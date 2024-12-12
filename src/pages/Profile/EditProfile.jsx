import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  // Static data for doctor's profile (this will be fetched from the backend in a real app)
  const [doctorData, setDoctorData] = useState({
    name: 'Dr. John Doe',
    email: 'dr.johndoe@example.com',
    specialization: 'Cardiologist',
    phone: '123-456-7890',
    bio: 'Experienced Cardiologist with 10+ years in treating heart conditions and providing holistic care.',
  });

  const [formData, setFormData] = useState(doctorData);
  const [isLoading, setIsLoading] = useState(false);  // To show loading indicator during form submission

  const navigate = useNavigate();

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the form (save changes)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here, you would call an API to update the doctor's profile data
      // Example: await updateDoctorProfile(formData);

      // Simulate a successful update with a timeout
      setTimeout(() => {
        setIsLoading(false);
        alert('Profile updated successfully');
        navigate('/profile');
      }, 1000);  // Simulate network delay
    } catch (error) {
      setIsLoading(false);
      alert('Error updating profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-200 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
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
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
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
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
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
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
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
              rows="4"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 ${isLoading ? 'bg-gray-600' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Back to Profile Button */}
          <div className="mt-4">
            <button
              onClick={() => navigate('/profile')}
              className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Back to Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
