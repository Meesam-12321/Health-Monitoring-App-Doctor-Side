import React, { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../Context/DarkModeContext";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FaHeartbeat, FaWalking, FaLungs } from "react-icons/fa";
import { GiBlood } from "react-icons/gi";

Chart.register(...registerables);

const PatientDetails = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const patient = {
    id: 101,
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "john.doe@example.com",
    phone: "+1 234-567-890",
    address: "123 Elm Street, Springfield, IL",
  };

  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: 75,
    stepCount: 2000,
    bloodPressure: "120/80",
    bloodOxygen: 98,
  });

  const [dailyData, setDailyData] = useState([
    { heartRate: 72, bloodPressure: "118/78", bloodOxygen: 97 },
    { heartRate: 75, bloodPressure: "120/80", bloodOxygen: 98 },
    { heartRate: 78, bloodPressure: "122/82", bloodOxygen: 99 },
  ]);
  const [viewWeekly, setViewWeekly] = useState(false);

  const weeklyData = {
    heartRate: [72, 75, 78, 74, 77, 80, 76],
    bloodPressure: ["120/80", "122/82", "118/78", "125/85", "119/79", "121/81", "124/83"],
    bloodOxygen: [98, 97, 99, 96, 98, 97, 99],
  };

  // Helper function to get appropriate chart color based on metric
  const getMetricColor = (metric) => {
    switch(metric) {
      case "heartRate": return { bg: "rgba(255, 99, 132, 0.5)", border: "rgb(255, 99, 132)" };
      case "bloodPressure": return { bg: "rgba(54, 162, 235, 0.5)", border: "rgb(54, 162, 235)" };
      case "bloodOxygen": return { bg: "rgba(75, 192, 192, 0.5)", border: "rgb(75, 192, 192)" };
      default: return { bg: "rgba(54, 162, 235, 0.5)", border: "rgb(54, 162, 235)" };
    }
  };

  // Generate realistic value changes for metrics
  const generateRealisticValue = useCallback((current, metric) => {
    let min, max, value;
    
    switch(metric) {
      case "heartRate":
        // Heart rate varies by ±3 BPM
        min = Math.max(60, current - 3);
        max = Math.min(100, current + 3);
        value = Math.floor(Math.random() * (max - min + 1)) + min;
        return value;
      
      case "bloodPressure":
        // Blood pressure: extract systolic/diastolic
        const [systolic, diastolic] = current.split("/").map(Number);
        
        // Systolic varies by ±4 mmHg
        const newSystolic = Math.max(100, Math.min(140, systolic + (Math.random() * 8 - 4)));
        
        // Diastolic varies by ±3 mmHg
        const newDiastolic = Math.max(60, Math.min(90, diastolic + (Math.random() * 6 - 3)));
        
        return `${Math.floor(newSystolic)}/${Math.floor(newDiastolic)}`;
      
      case "bloodOxygen":
        // Blood oxygen varies by ±1.5%
        min = Math.max(94, current - 1.5);
        max = Math.min(100, current + 0.5);
        value = Math.min(100, min + Math.random() * (max - min));
        return Math.round(value * 10) / 10;
      
      default:
        return current;
    }
  }, []);

  // Function to update daily data
  const updateDailyData = useCallback(() => {
    setDailyData(prevData => {
      const newData = [...prevData];
      
      // Update each metric with a realistic new value
      newData.forEach((timepoint, index) => {
        newData[index] = {
          heartRate: generateRealisticValue(timepoint.heartRate, "heartRate"),
          bloodPressure: generateRealisticValue(timepoint.bloodPressure, "bloodPressure"),
          bloodOxygen: generateRealisticValue(timepoint.bloodOxygen, "bloodOxygen")
        };
      });
      
      // Update current health metrics with the latest values (evening)
      setHealthMetrics({
        heartRate: newData[2].heartRate,
        stepCount: Math.floor(healthMetrics.stepCount + (Math.random() * 200 - 50)),
        bloodPressure: newData[2].bloodPressure,
        bloodOxygen: newData[2].bloodOxygen
      });
      
      return newData;
    });
  }, [generateRealisticValue, healthMetrics.stepCount]);

  // Set interval to update data periodically when in daily view
  useEffect(() => {
    let interval;
    
    if (!viewWeekly) {
      // Update every 5 seconds when in daily view
      interval = setInterval(() => {
        updateDailyData();
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [viewWeekly, updateDailyData]);
  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="mt-20 flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Patient Details</h1>
        <button
          onClick={() => navigate("/patients")}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Back to Patients
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg col-span-1`}>
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">General Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="font-medium">Name:</span>
              <span>{patient.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="font-medium">Age:</span>
              <span>{patient.age}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="font-medium">Gender:</span>
              <span>{patient.gender}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="font-medium">Contact:</span>
              <span className="text-blue-500 dark:text-blue-400">{patient.contact}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="font-medium">Phone:</span>
              <span>{patient.phone}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-700">
              <span className="font-medium">Address:</span>
              <span className="text-right">{patient.address}</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: <FaHeartbeat />, label: "Heart Rate", value: `${healthMetrics.heartRate} BPM`, color: "bg-red-100 dark:bg-red-900/30", iconColor: "text-red-500" },
            { icon: <FaWalking />, label: "Step Count", value: healthMetrics.stepCount, color: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-500" },
            { icon: <GiBlood />, label: "Blood Pressure", value: healthMetrics.bloodPressure, color: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-500" },
            { icon: <FaLungs />, label: "Blood Oxygen", value: `${healthMetrics.bloodOxygen}%`, color: "bg-purple-100 dark:bg-purple-900/30", iconColor: "text-purple-500" },
          ].map((metric, index) => (
            <div key={index} className={`flex items-center p-4 ${metric.color} rounded-lg shadow-md`}>
              <div className={`text-3xl mr-4 ${metric.iconColor}`}>{metric.icon}</div>
              <div>
                <h3 className="text-lg font-medium">{metric.label}</h3>
                <p className="text-gray-600 dark:text-gray-300 font-bold">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">Health Trends</h2>
          <div className="flex items-center gap-4">
            {!viewWeekly && (
              <span className="text-sm text-gray-500 dark:text-gray-400 italic">
                Auto-refreshing every 5 seconds
              </span>
            )}
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-300 hover:bg-blue-600" 
              onClick={() => setViewWeekly(!viewWeekly)}
            >
              {viewWeekly ? "Switch to Daily View" : "Switch to Weekly View"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {["heartRate", "bloodPressure", "bloodOxygen"].map((metric, index) => {
            const colors = getMetricColor(metric);
            return (
              <div key={index} className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg h-64`}>
                <h3 className="text-lg font-semibold mb-2">
                  {metric === "heartRate" ? "Heart Rate (BPM)" : 
                   metric === "bloodPressure" ? "Blood Pressure (mmHg)" : 
                   "Blood Oxygen (%)"}
                </h3>
                {viewWeekly ? (
                  <Bar
                    data={{
                      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                      datasets: [{
                        label: metric,
                        data: weeklyData[metric].map(value =>
                          metric === "bloodPressure" ? parseInt(value.split("/")[0]) : value
                        ),
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        borderWidth: 1,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                          titleColor: darkMode ? '#fff' : '#000',
                          bodyColor: darkMode ? '#fff' : '#000',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: 1,
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                          },
                          ticks: {
                            color: darkMode ? '#fff' : '#666',
                            font: {
                              size: 10,
                            },
                            maxRotation: 0,
                          },
                        },
                        y: {
                          grid: {
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                          },
                          ticks: {
                            color: darkMode ? '#fff' : '#666',
                            font: {
                              size: 10,
                            },
                            padding: 8,
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <Line
                    data={{
                      labels: ["Morning", "Afternoon", "Evening"],
                      datasets: [{
                        label: metric,
                        data: dailyData.map(d =>
                          metric === "bloodPressure" ? parseInt(d[metric].split("/")[0]) : d[metric]
                        ),
                        borderColor: colors.border,
                        backgroundColor: colors.bg,
                        fill: true,
                        tension: 0.3,
                        pointRadius: 4,
                        pointBackgroundColor: colors.border,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      animation: {
                        duration: 1000,
                        easing: 'easeInOutQuad'
                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          backgroundColor: darkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                          titleColor: darkMode ? '#fff' : '#000',
                          bodyColor: darkMode ? '#fff' : '#000',
                          borderColor: 'rgba(0, 0, 0, 0.1)',
                          borderWidth: 1,
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                          },
                          ticks: {
                            color: darkMode ? '#fff' : '#666',
                            font: {
                              size: 10,
                            },
                            maxRotation: 0,
                          },
                        },
                        y: {
                          grid: {
                            color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                          },
                          ticks: {
                            color: darkMode ? '#fff' : '#666',
                            font: {
                              size: 10,
                            },
                            padding: 8,
                          },
                          beginAtZero: false,
                        },
                      },
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;