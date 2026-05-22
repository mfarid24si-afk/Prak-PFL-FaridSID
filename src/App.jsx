import React, { Suspense } from "react";
import { Link } from "react-router-dom"; // Tambahkan ini
import { MdDashboard, MdListAlt, MdPeople } from "react-icons/md";
import { Routes, Route } from "react-router-dom"; 
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
// import Dashboard from "./pages/dashboard";
// import Orders from "./pages/Orders";       // Import file baru tadi
// import Customers from "./pages/Customers"; // Import file baru tadi
// import NotFound from "./pages/NotFound"; 
// import ErrorPage from "./pages/ErrorPage";
import MainLayout from './layouts/MainLayout';
// import Login from './pages/auth/login';
// import Register from './pages/auth/register';
// import Forgot from './pages/auth/forgot';
import AuthLayout from './layouts/AuthLayout';
import Loading from "./components/Loading";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))   
const NotFound = React.lazy(() => import("./pages/NotFound"))
const Register = React.lazy(() => import("./pages/auth/register"))
const Login = React.lazy(() => import("./pages/auth/login"))
const Forgot = React.lazy(() => import("./pages/auth/forgot"))
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
            <Route path="*" element={<ErrorPage code="404" description="Not Found: Halamannya lari entah ke mana." image="/img/error-404.png" />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/products/:id" element={<ProductDetail />} /> 
            <Route path="/" element={<Dashboard />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Customers" element={<Customers />} />
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