import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../Context/DarkModeContext";
import { FaEnvelope, FaLock, FaUserMd, FaSignInAlt, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Import your images
import healthcareImage1 from "../assets/images/healthcare1.png";
import healthcareImage2 from "../assets/images/healthcare2.png";
import healthcareImage3 from "../assets/images/healthcare3.png";

// Alternative: Using gradient backgrounds if images aren't high quality
const gradientBackgrounds = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #7f7fd5 0%, #86a8e7 50%, #91eae4 100%)",
  "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)"
];

const DoctorLogin = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [useGradients, setUseGradients] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  // Healthcare-related images from local folder
  const images = [
    healthcareImage1,
    healthcareImage2,
    healthcareImage3
  ];
  
  // Image slider effect with smoother transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (useGradients ? gradientBackgrounds.length : images.length));
    }, 6000); // Slightly longer for better user experience
    
    return () => clearInterval(interval);
  }, [images.length, useGradients, gradientBackgrounds.length]);
  
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

      // Success animation before redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-0 ${
        darkMode 
        ? "bg-gradient-to-br from-gray-900 to-indigo-950 text-white" 
        : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div className="flex w-full max-w-6xl h-screen overflow-hidden shadow-2xl rounded-2xl">
        {/* Image/Gradient Slider Section */}
        <motion.div 
          className="hidden lg:block w-1/2 relative overflow-hidden rounded-l-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {useGradients ? (
            /* Gradient Backgrounds */
            gradientBackgrounds.map((gradient, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: currentImageIndex === index ? 1 : 0,
                  zIndex: currentImageIndex === index ? 1 : 0
                }}
                transition={{ duration: 1.2 }}
                style={{ background: gradient }}
              />
            ))
          ) : (
            /* Image Backgrounds with enhanced overlay */
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/80 z-10" />
              
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 bg-cover bg-center"
                  initial={{ opacity: 0, scale: currentImageIndex === index ? 1 : 1.05 }}
                  animate={{ 
                    opacity: currentImageIndex === index ? 1 : 0,
                    scale: currentImageIndex === index ? 1.05 : 1,
                    zIndex: currentImageIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 1.5 }}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </>
          )}
          
          {/* Enhanced text overlay on images/gradients */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-12 text-white">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-sm bg-blue-900/20 p-8 rounded-2xl w-full max-w-md"
            >
              <motion.h1 
                className="text-4xl font-bold mb-6 text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Healthcare Platform
              </motion.h1>
              <motion.p 
                className="text-xl text-center mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Providing excellence in patient care and management
              </motion.p>
              <motion.div 
                className="flex space-x-2 justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {(useGradients ? gradientBackgrounds : images).map((_, idx) => (
                  <motion.div 
                    key={idx} 
                    className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${currentImageIndex === idx ? 'bg-white w-6' : 'bg-white/50'}`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-8">
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
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className={`p-4 rounded-full ${
                  darkMode 
                  ? "bg-indigo-700/50 text-blue-400" 
                  : "bg-blue-100 text-blue-600"
                }`}>
                  <FaUserMd className="text-4xl" />
                </div>
              </motion.div>
              <motion.h1
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className={`text-3xl font-bold ${
                  darkMode 
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400" 
                  : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600"
                }`}
              >
                Doctor Login
              </motion.h1>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Sign in to access your dashboard
              </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field with Floating Label */}
              <div className="relative">
                <div className={`absolute left-3 ${
                  focusedField === 'email' || formData.email ? 'top-1 text-xs' : 'top-3 text-base'
                } transition-all duration-200 pointer-events-none flex items-center gap-2 ${
                  darkMode ? 
                    (focusedField === 'email' ? "text-blue-400" : "text-gray-400") : 
                    (focusedField === 'email' ? "text-blue-600" : "text-gray-500")
                }`}>
                  <FaEnvelope className={`${focusedField === 'email' ? "text-xs" : "text-sm"} ${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  }`} />
                  <span>Email</span>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pt-6 pb-2 px-10 rounded-lg focus:outline-none transition-all duration-300 ${
                    darkMode
                      ? `bg-gray-700/70 text-gray-200 border ${focusedField === 'email' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-600'} placeholder-gray-500`
                      : `bg-blue-50 text-gray-900 border ${focusedField === 'email' ? 'border-blue-400 ring-2 ring-blue-500/20' : 'border-blue-200'} placeholder-gray-400`
                  }`}
                  required
                />
              </div>

              {/* Password Field with Floating Label */}
              <div className="relative">
                <div className={`absolute left-3 ${
                  focusedField === 'password' || formData.password ? 'top-1 text-xs' : 'top-3 text-base'
                } transition-all duration-200 pointer-events-none flex items-center gap-2 ${
                  darkMode ? 
                    (focusedField === 'password' ? "text-blue-400" : "text-gray-400") : 
                    (focusedField === 'password' ? "text-blue-600" : "text-gray-500")
                }`}>
                  <FaLock className={`${focusedField === 'password' ? "text-xs" : "text-sm"} ${
                    darkMode ? "text-blue-400" : "text-blue-500"
                  }`} />
                  <span>Password</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pt-6 pb-2 px-10 rounded-lg focus:outline-none transition-all duration-300 ${
                    darkMode
                      ? `bg-gray-700/70 text-gray-200 border ${focusedField === 'password' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-600'} placeholder-gray-500`
                      : `bg-blue-50 text-gray-900 border ${focusedField === 'password' ? 'border-blue-400 ring-2 ring-blue-500/20' : 'border-blue-200'} placeholder-gray-400`
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-3 text-sm p-1 rounded-full hover:bg-opacity-10 hover:bg-blue-500 transition-all ${
                    darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex justify-end -mt-2">
                <motion.a 
                  whileHover={{ x: 3 }}
                  href="/forgot-password" 
                  className={`text-sm hover:underline flex items-center gap-1 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Forgot password? <FaArrowRight className="text-xs" />
                </motion.a>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, backgroundColor: darkMode ? 'rgba(79, 70, 229, 1)' : 'rgba(79, 70, 229, 1)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 flex items-center justify-center gap-2 mt-6 font-semibold text-white transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 focus:ring-blue-400"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 focus:ring-blue-300"
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
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 text-center"
              >
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Don't have an account?
                </p>
                <motion.a 
                  whileHover={{ scale: 1.03, x: 3 }}
                  href="/register" 
                  className={`font-medium hover:underline inline-flex items-center justify-center gap-1 mt-1 ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Register here <FaArrowRight className="text-xs" />
                </motion.a>
              </motion.div>
            </form>
            
            {/* Theme toggle button (enhanced) */}
            <div className="mt-6 text-center">
              <motion.button 
                onClick={() => setUseGradients(!useGradients)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xs px-3 py-1 rounded-full ${
                  darkMode 
                  ? "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300" 
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                } transition-all duration-300`}
              >
                {useGradients ? "Switch to Images" : "Switch to Gradients"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;