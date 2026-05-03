import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
            <h1 className="text-9xl font-black text-green-500">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Waduh! Halaman Hilang</h2>
            <p className="text-gray-500 mt-2 mb-8">
                Sepertinya koki kami salah naruh halamannya nih. Yuk balik ke Dashboard!
            </p>
            <Link 
                to="/" 
                className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all"
            >
                Kembali ke Dashboard
            </Link>
        </div>
    );
}
