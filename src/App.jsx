import React from "react";
import { Link } from "react-router-dom"; // Tambahkan ini
import { MdDashboard, MdListAlt, MdPeople } from "react-icons/md";
import { Routes, Route } from "react-router-dom"; 
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/Orders";       // Import file baru tadi
import Customers from "./pages/Customers"; // Import file baru tadi


function App() {
  return (

      <div className="flex flex-row flex-1">

        <Sidebar />

        <div className="flex-1 p-4">
        <Header />
        
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Customers" element={<Customers />} />
    </Routes>
        </div>

      </div>
  );
}

export default App;