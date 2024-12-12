import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    contact: '',
    phone: '',
    address: '',
    experience: '',
    medicalLicense: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Static logic for registration
    console.log('Doctor Registered:', formData);
    // After submitting, navigate to the doctor list or another page
    navigate('/doctors');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Doctor Registration</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-200 font-medium mb-2">Full Name</label>
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

          {/* Specialty */}
          <div className="flex flex-col">
            <label htmlFor="specialty" className="text-gray-200 font-medium mb-2">Specialty</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Contact Email */}
          <div className="flex flex-col">
            <label htmlFor="contact" className="text-gray-200 font-medium mb-2">Contact Email</label>
            <input
              type="email"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-200 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-200 font-medium mb-2">Office Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col">
            <label htmlFor="experience" className="text-gray-200 font-medium mb-2">Years of Experience</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Medical License */}
          <div className="flex flex-col">
            <label htmlFor="medicalLicense" className="text-gray-200 font-medium mb-2">Medical License Number</label>
            <input
              type="text"
              id="medicalLicense"
              name="medicalLicense"
              value={formData.medicalLicense}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Emergency Contact */}
          <div className="flex flex-col">
            <label htmlFor="emergencyContactName" className="text-gray-200 font-medium mb-2">Emergency Contact Name</label>
            <input
              type="text"
              id="emergencyContactName"
              name="emergencyContactName"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="emergencyContactPhone" className="text-gray-200 font-medium mb-2">Emergency Contact Phone</label>
            <input
              type="tel"
              id="emergencyContactPhone"
              name="emergencyContactPhone"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-200 font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-200 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister;
