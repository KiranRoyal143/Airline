import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/header/Header";
import Home from "./Components/home/Home";
import StaffDashboard from "./Components/staffDashboard/StaffDashboard";
import AdminDashboard from "./Components/adminDashboard/AdminDashboard";
import PageNotFound from "./Components/pageNotFound/PageNotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
