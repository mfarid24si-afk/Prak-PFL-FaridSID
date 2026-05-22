import React from 'react';
import { daftarProduk } from '../data/dataproduk';
import { Link } from 'react-router-dom';

export default function Produk() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans">
            {/* Bagian Header Halaman */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                    <p className="text-sm text-gray-400 mt-1">Dashboard / Products</p>
                </div>

                {/* Tombol Tambah Produk mirip di gambar */}
                <button className="bg-[#00B050] hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all">
                    <span className="text-lg">+</span> Add Products
                </button>
            </div>

            {/* Container Tabel dengan Sudut Melengkung & Bayangan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-wider uppercase bg-white">
                                <th className="py-5 px-6">ID</th>
                                <th className="py-5 px-6">Product Name</th>
                                <th className="py-5 px-6">Code</th>
                                <th className="py-5 px-6">Category</th>
                                <th className="py-5 px-6">Brand</th>
                                <th className="py-5 px-6">Price</th>
                                <th className="py-5 px-6">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
                            {daftarProduk.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    {/* ID dengan warna abu-abu muda mirip ORDER ID di gambar */}
                                    <td className="py-4 px-6 text-gray-300 font-normal">
                                        PROD-{String(item.id).padStart(4, '0')}
                                    </td>
                                    {/* Nama Produk bercetak tebal */}
                                    <td className="py-4 px-6 text-gray-800 font-semibold">
                                        <Link to={`/products/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
                                            {item.tittle}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md font-mono">
                                            {item.code}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-500">
                                        {item.category}
                                    </td>
                                    <td className="py-4 px-6 text-gray-500">
                                        {item.brand}
                                    </td>
                                    {/* Harga dengan format tebal */}
                                    <td className="py-4 px-6 font-bold text-gray-900">
                                        Rp {item.price.toLocaleString('id-ID')}
                                    </td>
                                    {/* Stok dengan Badge Kondisional (Hijau jika aman, Merah jika sedikit) */}
                                    <td className="py-4 px-6">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.stock > 15
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-amber-50 text-amber-600'
                                            }`}>
                                            {item.stock} Pcs
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
