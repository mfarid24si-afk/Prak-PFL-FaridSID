import React from "react";

export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Bagian Kiri: Title & Breadcrumb */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          {title || "Default Title"}
        </h1>
        <nav className="text-sm font-medium mt-1">
          <span className="text-green-500">Dashboard</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-400">
            {/* Cek apakah breadcrumb itu array atau string */}
            {Array.isArray(breadcrumb) ? breadcrumb.join(" / ") : breadcrumb}
          </span>
        </nav>
      </div>

      {/* Bagian Kanan: Children (Misal tombol tambah data atau filter) */}
      <div className="flex items-center gap-4">
        {children}
      </div>
    </div>
  );
}
