import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === 'doctor' && formData.password === 'password') {
      console.log('Login Successful');
      navigate('/dashboard');
    } else {
      console.log('Invalid credentials');
      alert('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">Doctor Login</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-200 font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              placeholder="Enter your username"
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
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
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
