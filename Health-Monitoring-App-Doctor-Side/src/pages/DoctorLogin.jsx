import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../Context/DarkModeContext";
import { FaEnvelope, FaLock, FaUserMd, FaSignInAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const DoctorLogin = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
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
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 md:p-8 ${
        darkMode 
        ? "bg-gradient-to-br from-gray-900 to-indigo-950 text-white" 
        : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          darkMode 
          ? "bg-gray-800/90 border border-gray-700" 
          : "bg-white/95 border border-blue-100 backdrop-blur-sm"
        }`}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full ${
              darkMode 
              ? "bg-indigo-700/30 text-blue-400" 
              : "bg-blue-100 text-blue-600"
            }`}>
              <FaUserMd className="text-4xl" />
            </div>
          </div>
          <h1
            className={`text-3xl font-bold ${
              darkMode 
              ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400" 
              : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600"
            }`}
          >
            Doctor Login
          </h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className={`font-medium mb-2 flex items-center gap-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <FaEnvelope className={darkMode ? "text-blue-400" : "text-blue-500"} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@example.com"
              className={`px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                darkMode
                  ? "bg-gray-700/70 text-gray-200 focus:ring-blue-500 border border-gray-600 placeholder-gray-500"
                  : "bg-blue-50 text-gray-900 focus:ring-blue-400 border border-blue-200 placeholder-gray-400"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className={`font-medium mb-2 flex items-center gap-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              <FaLock className={darkMode ? "text-blue-400" : "text-blue-500"} />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700/70 text-gray-200 focus:ring-blue-500 border border-gray-600 placeholder-gray-500"
                    : "bg-blue-50 text-gray-900 focus:ring-blue-400 border border-blue-200 placeholder-gray-400"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-3 text-sm ${
                  darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <a 
                href="/forgot-password" 
                className={`text-sm hover:underline ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 flex items-center justify-center gap-2 mt-6 font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white focus:ring-blue-400"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white focus:ring-blue-300"
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <FaSignInAlt /> Sign In
              </>
            )}
          </motion.button>

          {/* Optional Links */}
          <div className="mt-8 text-center">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Don't have an account?{" "}
              <a 
                href="/register" 
                className={`font-medium hover:underline flex items-center justify-center gap-1 mt-1 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Register here <FaArrowRight className="text-xs" />
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DoctorLogin;