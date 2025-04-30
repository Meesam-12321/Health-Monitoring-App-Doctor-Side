import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../Context/DarkModeContext"; // Import the context

const DoctorLogin = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode from context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

<<<<<<< HEAD
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Login Successful:", response.data);
      // Navigate to doctor's dashboard or main page after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Invalid email or password");
=======
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === 'doctor' && formData.password === 'password') {
      console.log('Login Successful');
      navigate('/dashboard');
    } else {
      console.log('Invalid credentials');
      alert('Invalid username or password');
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
    }
  };

  return (
<<<<<<< HEAD
    <div
      className={`min-h-screen p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto p-8 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white border border-gray-300"
        }`}
      >
        <h1
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Doctor Login
        </h1>
=======
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">Doctor Login</h1>
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={`font-medium mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
<<<<<<< HEAD
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 focus:ring-blue-400 border border-gray-600"
                  : "bg-gray-100 text-gray-900 focus:ring-blue-500 border border-gray-300"
              }`}
=======
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              placeholder="Enter your username"
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className={`font-medium mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
<<<<<<< HEAD
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 focus:ring-blue-400 border border-gray-600"
                  : "bg-gray-100 text-gray-900 focus:ring-blue-500 border border-gray-300"
              }`}
=======
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              placeholder="Enter your password"
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
<<<<<<< HEAD
              className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
                  : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
              }`}
=======
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
>>>>>>> 48d35f3379615a80edf2d9f8838ca5b967d2a74f
            >
              Login
            </button>
          </div>

          {/* Optional Links */}
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-400 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;







