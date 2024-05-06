// App.js
import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import Card from "./SummaryCard";
import data from "./data.json"; 

function App(){
  const locationList = [
    { value: "AN", label: "Andaman and Nicobar Islands" },
    { value: "AP", label: "Andhra Pradesh" },
    { value: "AR", label: "Arunachal Pradesh" },
    { value: "AS", label: "Assam" },
    { value: "BR", label: "Bihar" },
    { value: "CH", label: "Chandigarh" },
    { value: "CT", label: "Chhattisgarh" },
    { value: "DN", label: "Dadra and Nagar Haveli" },
    { value: "DD", label: "Daman and Diu" },
    { value: "DL", label: "Delhi" },
    { value: "GA", label: "Goa" },
    { value: "GJ", label: "Gujarat" },
    { value: "HR", label: "Haryana" },
    { value: "HP", label: "Himachal Pradesh" },
    { value: "JK", label: "Jammu and Kashmir" },
    { value: "JH", label: "Jharkhand" },
    { value: "KA", label: "Karnataka" },
    { value: "KL", label: "Kerala" },
    { value: "LD", label: "Lakshadweep" },
    { value: "MP", label: "Madhya Pradesh" },
    { value: "MH", label: "Maharashtra" },
    { value: "MN", label: "Manipur" },
    { value: "ML", label: "Meghalaya" },
    { value: "MZ", label: "Mizoram" },
    { value: "NL", label: "Nagaland" },
    { value: "OR", label: "Odisha" },
    { value: "PY", label: "Puducherry" },
    { value: "PB", label: "Punjab" },
    { value: "RJ", label: "Rajasthan" },
    { value: "SK", label: "Sikkim" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "TS", label: "Telangana" },
    { value: "TR", label: "Tripura" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "UK", label: "Uttarakhand" },
    { value: "WB", label: "West Bengal" }
];
  const [activeLocation, setActiveLocation] = useState("AP");
  const [lastUpdated, setlastUpdated] = useState("");
  const [summaryData, setSummaryData] = useState({});

  const getVersion = async () => {
    try {
      // Simulating a version update from data.json
      setlastUpdated("2024-02-06");
    } catch (error) {
      console.error("Error fetching version data:", error);
    }
  };
  
  const getSummaryData = useCallback(() => {
    try {
      if (activeLocation === "canada") {
        return;
      }

      const summaryData = data[activeLocation];
      setSummaryData(summaryData);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  }, [activeLocation]);

  useEffect(() => {
    const fetchData = async () => {
      getSummaryData();
      getVersion();
    };

    fetchData();
  }, [getSummaryData, activeLocation]);

  return (
    <div className="App">
      <h1>COVID 19 Dashboard </h1>
      <div className="dashboard-container">
        <div className="dashboard-menu">
        <Select
            options={locationList}
            onChange={(selectedOption) =>
              setActiveLocation(selectedOption.value)
            }
            defaultValue={locationList.filter(
              (options) => options.value === activeLocation
            )}
            className="dashboard-select"
          />
          <p className="update-date"> Last Updated :  </p>
        </div>
        <div className="dashboard-summary">
          <Card title="Total Cases" value={summaryData.totalCases} />
          <Card title="Total Tests" value={summaryData.totalTests} />
          <Card title="Total Deaths" value={summaryData.totalDeaths} />
          <Card
            title="Total Vaccinated"
            value={summaryData.totalVaccinated}
          />
        </div>
      </div>
    </div>
  );
}

export default App;