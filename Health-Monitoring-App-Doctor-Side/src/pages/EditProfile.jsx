import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  // Static data for doctor's profile (this will be fetched from the backend in a real app)
  const [doctorData, setDoctorData] = useState({
    name: 'Dr. John Doe',
    email: 'dr.johndoe@example.com',
    specialization: 'Cardiologist',
    phone: '123-456-7890',
    bio: 'Experienced Cardiologist with 10+ years in treating heart conditions and providing holistic care.',
    avatar: '/api/placeholder/150/150' // Default placeholder
  });

  const [formData, setFormData] = useState(doctorData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Add state for image preview
  const [imagePreview, setImagePreview] = useState(doctorData.avatar);
  
  // Reference to the file input
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Submit the form (save changes)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call for updating the profile
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
        // In a real app, you would send the formData including the image to your backend
        
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/profile');
        }, 2000);
      }, 1000); // Simulate network delay
    } catch (error) {
      setIsLoading(false);
      alert('Error updating profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6 pt-24">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header with avatar */}
        <div className="bg-blue-600 dark:bg-blue-800 p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <button
              onClick={() => navigate('/profile')}
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all text-sm font-medium"
            >
              Back to Profile
            </button>
          </div>
        </div>
        
        <div className="p-8">
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 rounded">
              <p className="font-medium">Profile updated successfully!</p>
            </div>
          )}
          
          {/* Profile Avatar Section with working image upload */}
          <div className="flex flex-col sm:flex-row items-center mb-8 gap-6">
            <div className="relative cursor-pointer" onClick={handleAvatarClick}>
              <img 
                src={imagePreview} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 dark:border-blue-900"
              />
              <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{formData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{formData.specialization}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Click on the image to upload a new photo</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none transition-all bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none transition-all bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
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
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none transition-all bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none transition-all bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col">
              <label htmlFor="bio" className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                Professional Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none transition-all bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 py-3 rounded-lg text-white font-medium ${
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all flex justify-center items-center`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Changes
                  </>
                ) : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;