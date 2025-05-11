import React, { useState, useContext } from 'react';
import { Calendar, Printer, Eye, ChevronRight } from 'lucide-react';
import { DarkModeContext } from "../Context/DarkModeContext";

export default function PastPrescriptions() {
  const { darkMode } = useContext(DarkModeContext);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  
  // Dummy prescription data
  const prescriptions = [
    {
      id: "RX-2025-001",
      date: "2025-05-01",
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialty: "Cardiology",
      doctorLicense: "MDC-45678",
      hospitalName: "Central Medical Center",
      hospitalAddress: "123 Health Avenue, New York, NY 10001",
      patientName: "Robert Anderson",
      patientAge: "62",
      patientGender: "Male",
      patientId: "P-10045",
      visitDate: "2025-05-01",
      temperature: "98.6",
      bloodPressure: "140/90",
      pulse: "72",
      weight: "85",
      medications: [
        { 
          name: "Lisinopril", 
          dosage: "10mg", 
          route: "Oral", 
          frequency: "Once daily", 
          duration: "30 days", 
          instructions: "Take in the morning" 
        },
        { 
          name: "Aspirin", 
          dosage: "81mg", 
          route: "Oral", 
          frequency: "Once daily", 
          duration: "30 days", 
          instructions: "Take with food" 
        }
      ],
      diagnosis: "Hypertension, Grade 1",
      symptoms: "Occasional headaches, mild dizziness",
      tests: "Complete Blood Count, Lipid Profile, Kidney Function Test",
      advice: "Reduce salt intake, regular exercise for 30 minutes daily, avoid alcohol",
      followUp: "Follow up in 4 weeks"
    },
    {
      id: "RX-2025-002",
      date: "2025-04-15",
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Internal Medicine",
      doctorLicense: "MDC-34567",
      hospitalName: "Riverdale Community Hospital",
      hospitalAddress: "456 Wellness Blvd, New York, NY 10025",
      patientName: "Robert Anderson",
      patientAge: "62",
      patientGender: "Male",
      patientId: "P-10045",
      visitDate: "2025-04-15",
      temperature: "99.1",
      bloodPressure: "145/95",
      pulse: "78",
      weight: "86.2",
      medications: [
        { 
          name: "Amoxicillin", 
          dosage: "500mg", 
          route: "Oral", 
          frequency: "3 times daily", 
          duration: "7 days", 
          instructions: "Take with or without food" 
        },
        { 
          name: "Ibuprofen", 
          dosage: "400mg", 
          route: "Oral", 
          frequency: "Every 6 hours as needed", 
          duration: "5 days", 
          instructions: "Take with food for pain" 
        }
      ],
      diagnosis: "Acute Bronchitis",
      symptoms: "Productive cough, mild fever, chest discomfort",
      tests: "Chest X-ray, Sputum Culture",
      advice: "Rest adequately, increase fluid intake, avoid smoking",
      followUp: "Follow up in 1 week if symptoms persist"
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleBackToList = () => {
    setSelectedPrescription(null);
  };

  return (
    <div className="pt-24">
      <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} p-6 rounded-lg shadow-lg print:shadow-none`}>
        {!selectedPrescription ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>Past Prescriptions</h1>
            </div>
            
            <div className={`overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg`}>
              {prescriptions.map((prescription, index) => (
                <div 
                  key={prescription.id}
                  className={`${
                    index !== prescriptions.length - 1 
                      ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}` 
                      : ''
                  }`}
                >
                  <div className={`flex justify-between items-center p-4 hover:${darkMode ? 'bg-gray-800' : 'bg-gray-100'} cursor-pointer`}
                       onClick={() => handleViewPrescription(prescription)}>
                    <div>
                      <div className="flex items-center">
                        <Calendar size={16} className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {new Date(prescription.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="font-medium mt-1">{prescription.doctorName} - {prescription.diagnosis}</h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {prescription.medications.map((med, i) => (
                          <span key={i} className={`text-xs px-2 py-1 rounded ${
                            darkMode 
                              ? 'bg-blue-900 text-blue-200'
                              : 'bg-blue-100 text-blue-800' 
                          }`}>
                            {med.name} {med.dosage}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 print:hidden">
              <button
                onClick={handleBackToList}
                className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded flex items-center`}
              >
                <ChevronRight size={18} className="transform rotate-180 mr-1" />
                Back to list
              </button>
              <button 
                onClick={handlePrint}
                className={`flex items-center px-4 py-2 ${darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-700'} rounded hover:${darkMode ? 'bg-green-700' : 'bg-green-200'}`}
              >
                <Printer size={18} className="mr-2" />
                Print
              </button>
            </div>

            {/* Prescription Details */}
            <div className="prescription-details">
              {/* Header */}
              <div className={`mb-6 border-b-2 ${darkMode ? 'border-blue-600' : 'border-blue-800'} pb-4`}>
                <div className="text-center mb-4">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>
                    {selectedPrescription.hospitalName}
                  </h2>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {selectedPrescription.hospitalAddress}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Doctor: </span>
                      <span>{selectedPrescription.doctorName}</span>
                    </div>
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Specialty: </span>
                      <span>{selectedPrescription.doctorSpecialty}</span>
                    </div>
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>License: </span>
                      <span>{selectedPrescription.doctorLicense}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date: </span>
                      <span>{new Date(selectedPrescription.visitDate).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Prescription ID: </span>
                      <span>{selectedPrescription.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Info */}
              <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-3`}>Patient Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name: </span>
                      <span>{selectedPrescription.patientName}</span>
                    </div>
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Age: </span>
                      <span>{selectedPrescription.patientAge}</span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gender: </span>
                      <span>{selectedPrescription.patientGender}</span>
                    </div>
                    <div className="mb-2">
                      <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Patient ID: </span>
                      <span>{selectedPrescription.patientId}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vitals */}
              <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-3`}>Vitals</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Temperature: </span>
                    <span>{selectedPrescription.temperature} °F</span>
                  </div>
                  <div>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Blood Pressure: </span>
                    <span>{selectedPrescription.bloodPressure} mmHg</span>
                  </div>
                  <div>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Pulse: </span>
                    <span>{selectedPrescription.pulse} bpm</span>
                  </div>
                  <div>
                    <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Weight: </span>
                    <span>{selectedPrescription.weight} kg</span>
                  </div>
                </div>
              </div>

              {/* Diagnosis and Symptoms */}
              <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-2`}>Diagnosis</h2>
                    <p>{selectedPrescription.diagnosis}</p>
                  </div>
                  <div>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-2`}>Symptoms</h2>
                    <p>{selectedPrescription.symptoms}</p>
                  </div>
                </div>
              </div>

              {/* Medications */}
              <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-3`}>Medications</h2>
                
                <div className={`overflow-x-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-lg`}>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-100'}>
                      <tr>
                        <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                          Medication
                        </th>
                        <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                          Dosage
                        </th>
                        <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                          Route
                        </th>
                        <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                          Frequency
                        </th>
                        <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                          Duration
                        </th>
                        <th scope="col" className={`px-4 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                          Instructions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`${darkMode ? 'bg-gray-900 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                      {selectedPrescription.medications.map((med, index) => (
                        <tr key={index} className={index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-gray-50') : ''}>
                          <td className="px-4 py-3 whitespace-nowrap">{med.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{med.dosage}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{med.route}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{med.frequency}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{med.duration}</td>
                          <td className="px-4 py-3">{med.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tests & Advice */}
              <div className={`mb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-2`}>Lab Tests</h2>
                    <p>{selectedPrescription.tests}</p>
                  </div>
                  <div>
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-2`}>Advice & Recommendations</h2>
                    <p>{selectedPrescription.advice}</p>
                  </div>
                </div>
              </div>

              {/* Follow Up */}
              <div className="mb-6">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-800'} mb-2`}>Follow Up Instructions</h2>
                <p>{selectedPrescription.followUp}</p>
              </div>

              {/* Signature Section */}
              <div className={`mt-8 border-t-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 flex justify-end print:block`}>
                <div className="w-64 text-center print:ml-auto print:mr-0">
                  <div className={`h-16 border-b ${darkMode ? 'border-gray-600' : 'border-gray-400'}`}></div>
                  <p className="text-center mt-2 font-medium">Doctor's Signature</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}