import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminRoute, ProtectedRoute } from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Produk = React.lazy(() => import("./pages/Produk"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Components = React.lazy(() => import("./pages/Components"));
const Fiturxyz = React.lazy(() => import("./pages/Fiturxyz"));
const Note = React.lazy(() => import("./pages/Note"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Users = React.lazy(() => import("./pages/Users"));

const Register = React.lazy(() => import("./pages/auth/Register"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/Orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/Customers" element={<AdminRoute><Customers /></AdminRoute>} />
            <Route path="/produk" element={<ProtectedRoute><Produk /></ProtectedRoute>} />
            <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
            <Route path="/components" element={<Components />} />
            <Route path="/Fiturxyz" element={<Fiturxyz />} />
            <Route path="/Note" element={<Note />} />
            <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />

            <Route path="/400" element={<ErrorPage code="400" description="Bad Request: Permintaanmu nggak dipahami koki." image="/img/error-400.png" />} />
            <Route path="/401" element={<ErrorPage code="401" description="Unauthorized: Kamu nggak punya kunci masuk sini." image="/img/error-401.png" />} />
            <Route path="/403" element={<ErrorPage code="403" description="Forbidden: Area terlarang buat umum!" image="/img/error-403.png" />} />

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
