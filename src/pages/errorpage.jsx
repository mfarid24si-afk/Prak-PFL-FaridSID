import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      {/* Gambar Error */}
      <img src="/img/Error.png" alt="error-img" className="w-64 mb-8 drop-shadow-xl" />
      
      {/* Kode Error */}
      <h1 className="text-8xl font-black text-green-500 tracking-tighter">
        {code}
      </h1>
      
      {/* Deskripsi Error */}
      <h2 className="text-2xl font-bold text-gray-800 mt-4 px-4">
        {description}
      </h2>
      
      <p className="text-gray-400 mt-2 mb-10 max-w-md">
        Sepertinya ada kendala teknis. Jangan panik, koki kami sedang membereskannya!
      </p>

      {/* Tombol Balik */}
      <Link 
        to="/" 
        className="bg-green-500 text-white px-10 py-3 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
