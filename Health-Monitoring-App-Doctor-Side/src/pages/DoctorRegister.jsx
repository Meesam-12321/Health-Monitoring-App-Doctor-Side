import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../Context/DarkModeContext';
// Removed react-toastify import

const DoctorRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        specialization: '',
        experience: '',
        contactNumber: '',
        licenseNumber: '',
        clinicAddress: '',
        profileImage: null,
        bio: '',
        languages: [],
        educationQualifications: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({ show: false, message: '', type: '' }); // Added for notifications
    const [specializations, setSpecializations] = useState([
        'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics',
        'Pediatrics', 'Psychiatry', 'Oncology', 'Gynecology',
        'Ophthalmology', 'Dentistry', 'General Practice', 'Other'
    ]);
    const [availableLanguages, setAvailableLanguages] = useState([
        'English', 'Spanish', 'French', 'German', 'Chinese',
        'Japanese', 'Russian', 'Arabic', 'Hindi', 'Portuguese'
    ]);

    const navigate = useNavigate();
    const { darkMode } = useContext(DarkModeContext);

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        if (!formData.experience) newErrors.experience = 'Experience is required';
        if (!formData.contactNumber) {
            newErrors.contactNumber = 'Contact number is required';
        } else if (!/^\d{10,15}$/.test(formData.contactNumber.replace(/[^0-9]/g, ''))) {
            newErrors.contactNumber = 'Enter a valid contact number';
        }
        if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
        
        if (!formData.clinicAddress.trim()) newErrors.clinicAddress = 'Clinic address is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Custom notification function to replace toast
    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        
        // Auto-hide notification after 3 seconds
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle checkbox changes (languages)
    const handleLanguageChange = (language) => {
        setFormData(prev => {
            const updatedLanguages = prev.languages.includes(language)
                ? prev.languages.filter(lang => lang !== language)
                : [...prev.languages, language];
            
            return {
                ...prev,
                languages: updatedLanguages
            };
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Please correct the errors in the form', 'error');
            return;
        }
        
        setLoading(true);
        
        try {
            // Create FormData for file upload
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'languages') {
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                } else if (key === 'profileImage' && formData[key]) {
                    formDataToSend.append(key, formData[key]);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });
            
            formDataToSend.append('role', 'doctor');
            
            const response = await axios.post('http://localhost:3000/api/auth/doctor/register', 
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            showNotification('Registration successful!', 'success');
            console.log('Doctor Registered:', response.data);
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            showNotification(errorMessage, 'error');
            console.error('Registration Error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };
    // Beginning of the UI rendering
    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} py-12 px-4 sm:px-6 lg:px-8`}>
            {/* Custom notification */}
            {notification.show && (
                <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white z-50 transition-opacity duration-300`}>
                    {notification.message}
                </div>
            )}
            
            <div className={`max-w-5xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-xl`}>
                <div className="flex items-center justify-center mb-8">
                    <div className={`w-16 h-16 rounded-full ${darkMode ? "bg-blue-500" : "bg-blue-600"} flex items-center justify-center`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                </div>
                <h1 className={`text-3xl font-bold text-center ${darkMode ? "text-blue-400" : "text-blue-600"} mb-2`}>
                    Doctor Registration
                </h1>
                <p className={`text-center mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Join our professional healthcare network
                </p>
                {/* Form starts here */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="flex flex-col">
                            <label htmlFor="fullName" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Full Name*
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                required
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Email*
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
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <label htmlFor="password" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Password*
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
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col">
                            <label htmlFor="confirmPassword" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Confirm Password*
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                required
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* Specialization - Dropdown */}
                        <div className="flex flex-col">
                            <label htmlFor="specialization" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Specialization*
                            </label>
                            <select
                                id="specialization"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                required
                            >
                                <option value="">Select Specialization</option>
                                {specializations.map((specialization, index) => (
                                    <option key={index} value={specialization}>
                                        {specialization}
                                    </option>
                                ))}
                            </select>
                            {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
                        </div>

                        {/* Experience */}
                        <div className="flex flex-col">
                            <label htmlFor="experience" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Years of Experience*
                            </label>
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                min="0"
                                max="70"
                                value={formData.experience}
                                onChange={handleChange}
                                className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                required
                            />
                            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                        </div>

                        {/* Contact Number */}
                        <div className="flex flex-col">
                            <label htmlFor="contactNumber" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Contact Number*
                            </label>
                            <input
                                type="tel"
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="+1 (123) 456-7890"
                                className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                required
                            />
                            {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
                        </div>
                        {/* License Number */}
                        <div className="flex flex-col">
                            <label htmlFor="licenseNumber" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                License Number*
                            </label>
                            <input
                                type="text"
                                id="licenseNumber"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                                required
                            />
                            {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
                        </div>

                        {/* Profile Image */}
                        <div className="flex flex-col">
                            <label htmlFor="profileImage" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                                Profile Image
                            </label>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleChange}
                                className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            />
                            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Upload a professional photo (Max 2MB)
                            </p>
                        </div>
                    </div>

                    {/* Education Qualifications */}
                    <div className="flex flex-col">
                        <label htmlFor="educationQualifications" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Educational Qualifications*
                        </label>
                        <textarea
                            id="educationQualifications"
                            name="educationQualifications"
                            value={formData.educationQualifications}
                            onChange={handleChange}
                            rows="2"
                            placeholder="E.g., MD from Harvard Medical School, Fellowship in Cardiology"
                            className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                            required
                        />
                    </div>

                    {/* Languages */}
                    <div className="flex flex-col">
                        <label className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Languages Spoken
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {availableLanguages.map((language, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`lang-${language}`}
                                        checked={formData.languages.includes(language)}
                                        onChange={() => handleLanguageChange(language)}
                                        className="mr-2"
                                    />
                                    <label 
                                        htmlFor={`lang-${language}`}
                                        className={darkMode ? "text-gray-300" : "text-gray-700"}
                                    >
                                        {language}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col">
                        <label htmlFor="bio" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Professional Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Briefly describe your professional background and approach to patient care"
                            className={`px-4 py-2 ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />
                    </div>

                    {/* Clinic Address */}
                    <div className="flex flex-col">
                        <label htmlFor="clinicAddress" className={`font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                            Clinic Address*
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
                        {errors.clinicAddress && <p className="text-red-500 text-sm mt-1">{errors.clinicAddress}</p>}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            required
                            className="mr-2"
                        />
                        <label htmlFor="terms" className={darkMode ? "text-gray-300" : "text-gray-700"}>
                            I agree to the <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 ${darkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center transition-all`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Register as Doctor"
                            )}
                        </button>
                    </div>
                </form>
                
                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorRegister;