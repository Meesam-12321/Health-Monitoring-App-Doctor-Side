import React, { useState, useContext } from 'react';
import { useEffect } from 'react';
import { Calendar, Printer, Plus, Trash2 } from 'lucide-react';
import { DarkModeContext } from "../Context/DarkModeContext";

export default function PrescriptionForm() {
  const { darkMode } = useContext(DarkModeContext);
  
  const [formData, setFormData] = useState({
    // Doctor Information
    doctorName: "",
    doctorSpecialty: "",
    doctorLicense: "",
    hospitalName: "",
    hospitalAddress: "",
    
    // Patient Information
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientId: "",
    visitDate: new Date().toISOString().substr(0, 10),
    
    // Vitals
    temperature: "",
    bloodPressure: "",
    pulse: "",
    weight: "",
    
    // Medications
    medications: [
      { name: "", dosage: "", route: "", frequency: "", duration: "", instructions: "" }
    ],
    
    // Additional Elements
    diagnosis: "",
    symptoms: "",
    tests: "",
    advice: "",
    followUp: ""
  });
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    style.setAttribute('id', 'print-styles');
    style.innerHTML = `
      @media print {
        /* Hide sidebar and other navigation elements */
        nav, .sidebar, header, footer, .print-hidden, .print\\:hidden {
          display: none !important;
        }
        
        /* Full width for the prescription */
        body, html {
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          background-color: white !important;
          font-size: 12pt !important;
        }
        
        /* Reset main container styles for print */
        .max-w-4xl {
          max-width: 100% !important;
          margin: 0 !important;
          padding: 1.5cm 1cm !important;
          box-shadow: none !important;
          border: 1px solid #ddd !important;
        }
        
        /* Fix backgrounds and text colors for printing */
        * {
          background-color: white !important;
          color: black !important;
          box-shadow: none !important;
        }
        
        /* Better section spacing */
        h1 {
          font-size: 18pt !important;
          margin-bottom: 0.5cm !important;
          text-align: center !important;
          border-bottom: 2px solid #000 !important;
          padding-bottom: 0.25cm !important;
        }
        
        h2 {
          font-size: 14pt !important;
          color: #000 !important;
          margin-top: 0.5cm !important;
          text-decoration: underline !important;
        }
        
        /* Enhance form layout for print */
        .border-b {
          border-bottom: 1px solid #ccc !important;
          padding-bottom: 0.3cm !important;
          margin-bottom: 0.3cm !important;
        }
        
        /* Add letterhead style */
        .pt-24 {
          padding-top: 0 !important;
        }
        
        /* Style the signature area */
        .mt-8 {
          margin-top: 2cm !important;
        }
        
        input, textarea, select {
          border: none !important;
          border-bottom: 1px solid #999 !important;
          background: transparent !important;
        }
        
        label {
          font-weight: bold !important;
        }
      }
    `;
    
    // Add the style to the document head
    document.head.appendChild(style);
    
    // Clean up when component unmounts
    return () => {
      const styleElement = document.getElementById('print-styles');
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      medications: updatedMedications
    });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [
        ...formData.medications,
        { name: "", dosage: "", route: "", frequency: "", duration: "", instructions: "" }
      ]
    });
  };

  const removeMedication = (index) => {
    if (formData.medications.length > 1) {
      const updatedMedications = [...formData.medications];
      updatedMedications.splice(index, 1);
      
      setFormData({
        ...formData,
        medications: updatedMedications
      });
    }
  };

  const handlePrint = () => {
    // You can add additional dynamic styling right before printing if needed
    window.print();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the prescription to your backend
    console.log("Prescription submitted:", formData);
    alert("Prescription saved successfully!");
  };
  return (
    <div className="pt-24"> 
    <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-6 rounded-lg shadow-lg print:shadow-none`}>
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>New Prescription</h1>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrint}
            className={`flex items-center px-4 py-2 ${darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700'} rounded hover:${darkMode ? 'bg-green-700' : 'bg-green-200'}`}
          >
            <Printer size={18} className="mr-2" />
            Print
          </button>
          <button 
            onClick={handleSubmit}
            className={`px-4 py-2 ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white rounded hover:${darkMode ? 'bg-blue-800' : 'bg-blue-700'}`}
          >
            Save Prescription
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Header Section */}
        <div className={`mb-6 border-b-2 ${darkMode ? 'border-blue-600' : 'border-blue-800'} pb-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-3">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Doctor Name</label>
                <input
                  type="text"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Dr. Full Name"
                />
              </div>
              <div className="mb-3">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Specialty</label>
                <input
                  type="text"
                  name="doctorSpecialty"
                  value={formData.doctorSpecialty}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="e.g. Cardiology"
                />
              </div>
              <div className="mb-3">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>License Number</label>
                <input
                  type="text"
                  name="doctorLicense"
                  value={formData.doctorLicense}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="License #"
                />
              </div>
            </div>
            <div>
              <div className="mb-3">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Hospital/Clinic Name</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Hospital or Clinic Name"
                />
              </div>
              <div className="mb-3">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Hospital/Clinic Address</label>
                <input
                  type="text"
                  name="hospitalAddress"
                  value={formData.hospitalAddress}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Full Address"
                />
              </div>
              <div className="mb-3">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Date</label>
                <div className="flex items-center">
                  <Calendar size={18} className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleInputChange}
                    className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-3`}>Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Age</label>
              <input
                type="text"
                name="patientAge"
                value={formData.patientAge}
                onChange={handleInputChange}
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Years"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Gender</label>
              <select
                name="patientGender"
                value={formData.patientGender}
                onChange={handleInputChange}
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Patient ID</label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Patient ID"
              />
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-3`}>Vitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Temperature</label>
              <input
                type="text"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="°F"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Blood Pressure</label>
              <input
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleInputChange}
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="mmHg"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Pulse</label>
              <input
                type="text"
                name="pulse"
                value={formData.pulse}
                onChange={handleInputChange}
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="bpm"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="kg"
              />
            </div>
          </div>
        </div>

        {/* I'll continue with the rest of the JSX in the next part */}
        {/* Tests & Advice */}
        <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Lab Tests</label>
              <textarea
                name="tests"
                value={formData.tests}
                onChange={handleInputChange}
                rows="3"
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Required laboratory tests"
              ></textarea>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Advice & Recommendations</label>
              <textarea
                name="advice"
                value={formData.advice}
                onChange={handleInputChange}
                rows="3"
                className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Lifestyle recommendations, precautions, etc."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Follow Up */}
        <div className="mb-6">
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Follow Up Instructions</label>
          <input
            type="text"
            name="followUp"
            value={formData.followUp}
            onChange={handleInputChange}
            className={`w-full p-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300 text-gray-900'} rounded focus:ring-blue-500 focus:border-blue-500`}
            placeholder="e.g. Follow up in 2 weeks"
          />
        </div>

        {/* Signature Section */}
        <div className={`mt-8 border-t-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 flex justify-end print:block`}>
          <div className="w-64 text-center print:ml-auto print:mr-0">
            <div className={`h-16 border-b ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}></div>
            <p className="text-center mt-2 font-medium">Doctor's Signature</p>
          </div>
        </div>

        {/* Submit Buttons - Hidden in Print */}
        <div className="mt-6 flex justify-end space-x-3 print:hidden">
          <button
            type="button"
            className={`px-4 py-2 border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} rounded`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 ${darkMode ? 'bg-blue-700' : 'bg-blue-600'} text-white rounded hover:${darkMode ? 'bg-blue-800' : 'bg-blue-700'}`}
          >
            Save Prescription
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}