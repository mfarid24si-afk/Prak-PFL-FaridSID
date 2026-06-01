import React, { Suspense } from "react";
import { Link } from "react-router-dom"; 
import { MdDashboard, MdListAlt, MdPeople } from "react-icons/md";
import { Routes, Route } from "react-router-dom"; 
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Loading from "./components/Loading";
import Components from "./pages/Components";

// PERBAIKAN: Mengubah nama file menjadi huruf kecil sesuai folder src/pages/
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))   
const NotFound = React.lazy(() => import("./pages/NotFound"))

// Halaman auth menggunakan huruf kecil semua
const Register = React.lazy(() => import("./pages/auth/Register"))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Forgot = React.lazy(() => import("./pages/auth/Forgot"))

// Halaman Produk (menggunakan huruf kapital P sesuai file baru kita)
const Produk = React.lazy(() => import("./pages/Produk"))
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/400" element={<ErrorPage code="400" description="Bad Request: Permintaanmu nggak dipahami koki." image="/img/error-400.png" />} />
          <Route path="/401" element={<ErrorPage code="401" description="Unauthorized: Kamu nggak punya kunci masuk sini." image="/img/error-401.png" />} />
          <Route path="/403" element={<ErrorPage code="403" description="Forbidden: Area terlarang buat umum!" image="/img/error-403.png" />} />
          
          <Route path="/components" element={<Components />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/products/:id" element={<ProductDetail />} /> 
          <Route path="/" element={<Dashboard />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Customers" element={<Customers />} />
          
          {/* Posisi rute jebakan '*' dipindah ke paling bawah agar tidak memblokir rute lain */}
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<AuthLayout/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot" element={<Forgot/>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
