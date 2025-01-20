import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSave } from "react-icons/fa";
import { DarkModeContext } from "../Context/DarkModeContext.jsx"; // Corrected import path

const Profile = () => {
  // Static data for doctor's profile (replace with real data from backend)
  const [doctorData, setDoctorData] = useState({
    name: "Dr. John Doe",
    email: "dr.johndoe@example.com",
    specialization: "Cardiologist",
    phone: "123-456-7890",
    bio: "Experienced Cardiologist with 10+ years in treating heart conditions and providing holistic care.",
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctorData);

  const navigate = useNavigate();

  // Access dark mode context
  const { darkMode } = useContext(DarkModeContext);

  // Handle form field changes when in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if (isEditing) {
      setDoctorData(formData); // Save changes
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-8`}>
      <div className={`max-w-4xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-lg`}>
        <h1 className={`text-3xl font-bold text-center ${darkMode ? "text-blue-400" : "text-blue-600"} mb-8`}>
          {isEditing ? "Edit Profile" : "Doctor Profile"}
        </h1>

        <div className="space-y-6">
          {/* Profile Fields */}
          {["name", "email", "specialization", "phone", "bio"].map((field) => (
            <div className="flex flex-col" key={field}>
              <label
                htmlFor={field}
                className={`font-medium mb-2 ${darkMode ? "text-gray-100" : "text-gray-700"}`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "bio" ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="4"
                  className={`px-4 py-2 rounded-lg focus:outline-none ${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                  }`}
                />
              ) : (
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`px-4 py-2 rounded-lg focus:outline-none ${
                    darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800"
                  }`}
                />
              )}
            </div>
          ))}

          {/* Edit/Save Button */}
          <div>
            <button
              onClick={toggleEdit}
              className={`w-full py-3 flex items-center justify-center rounded-lg focus:outline-none ${
                darkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isEditing ? (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <FaEdit className="mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Back to Dashboard */}
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className={`w-full py-3 rounded-lg focus:outline-none ${
                darkMode ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-600 hover:bg-gray-700"
              } text-white`}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
