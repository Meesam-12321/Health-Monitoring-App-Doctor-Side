import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../Context/DarkModeContext'; // Import DarkModeContext

const DoctorRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        specialization: '',
        experience: '',
        contactNumber: '',
        clinicAddress: '',
    });

    const navigate = useNavigate();
    const { darkMode } = useContext(DarkModeContext); // Access dark mode context

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/doctor/register', {
                ...formData,
                role: 'doctor', // Add the role as 'doctor' from the model
            });
            console.log('Doctor Registered:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration Error:', error.response?.data || error.message);
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-8`}>
            <div className={`max-w-4xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-lg`}>
                <h1 className={`text-3xl font-bold text-center ${darkMode ? "text-blue-400" : "text-blue-600"} mb-8`}>
                    Doctor Registration
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </div>

                    {/* Specialization */}
                    <div className="flex flex-col">
                        <label htmlFor="specialization" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Specialization
                        </label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </div>

                    {/* Experience */}
                    <div className="flex flex-col">
                        <label htmlFor="experience" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Years of Experience
                        </label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="flex flex-col">
                        <label htmlFor="contactNumber" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </div>

                    {/* Clinic Address */}
                    <div className="flex flex-col">
                        <label htmlFor="clinicAddress" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Clinic Address
                        </label>
                        <textarea
                            id="clinicAddress"
                            name="clinicAddress"
                            value={formData.clinicAddress}
                            onChange={handleChange}
                            rows="3"
                            className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className={`w-full py-3 ${darkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
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
