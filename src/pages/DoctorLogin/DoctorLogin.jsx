import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email: formData.email,
                password: formData.password
            });
            console.log('Login Successful:', response.data);
            // Navigate to doctor's dashboard or main page after successful login
            navigate('/dashboard');
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            alert('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">Doctor Login</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorLogin;
