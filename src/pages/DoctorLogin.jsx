import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../Context/DarkModeContext";

const DoctorLogin = () => {
  const { darkMode } = useContext(DarkModeContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/doctor/login", {
        email: formData.email,
        password: formData.password,
      });

      // Save token and other info in localStorage
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));

      console.log("Login Successful:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };

  return (
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
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 focus:ring-blue-400 border border-gray-600"
                  : "bg-gray-100 text-gray-900 focus:ring-blue-500 border border-gray-300"
              }`}
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
              className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 focus:ring-blue-400 border border-gray-600"
                  : "bg-gray-100 text-gray-900 focus:ring-blue-500 border border-gray-300"
              }`}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400"
                  : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
              }`}
            >
              Login
            </button>
          </div>

          {/* Optional Links */}
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
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
