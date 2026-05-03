import React from "react";
import { Link } from "react-router-dom"; // Tambahkan ini
import { MdDashboard, MdListAlt, MdPeople } from "react-icons/md";
import { Routes, Route } from "react-router-dom"; 
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/dashboard";
import Orders from "./pages/Orders";       // Import file baru tadi
import Customers from "./pages/Customers"; // Import file baru tadi
import NotFound from "./pages/NotFound"; // Import file baru tadi
import ErrorPage from "./pages/ErrorPage";


function App() {
  return (

      <div className="flex flex-row flex-1">

        <Sidebar />

        <div className="flex-1 p-4">
        <Header />
        
        <Routes>
        <Route path="/400" element={<ErrorPage code="400" description="Bad Request: Permintaanmu nggak dipahami koki." image="/img/error-400.png" />} />
        <Route path="/401" element={<ErrorPage code="401" description="Unauthorized: Kamu nggak punya kunci masuk sini." image="/img/error-401.png" />} />
        <Route path="/403" element={<ErrorPage code="403" description="Forbidden: Area terlarang buat umum!" image="/img/error-403.png" />} />
        <Route path="*" element={<ErrorPage code="404" description="Not Found: Halamannya lari entah ke mana." image="/img/error-404.png" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Customers" element={<Customers />} />
    </Routes>
        </div>

      </div>
  );
}

export default App;