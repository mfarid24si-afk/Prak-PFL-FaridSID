import { MdDashboard, MdListAlt, MdPeople } from "react-icons/md";
import { FaPlus } from "react-icons/fa"; // Tambahkan import ini untuk icon plus

export default function Sidebar() {
    return (
        <div id="sidebar" className="w-64 bg-white h-screen flex flex-col border-r border-gray-100 p-6 sticky top-0">
            {/* Logo */}
            <div id="sidebar-logo" className="mb-10 px-4">
                <span id="logo-title" className="text-3xl font-bold text-gray-800">
                    Sedap <b id="logo-dot" className="text-green-500">.</b>
                </span>
                <span id="logo-subtitle" className="block text-[10px] text-gray-400 uppercase tracking-widest font-medium mt-1">
                    Modern Admin Dashboard
                </span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="flex-1">
                <ul id="menu-list" className="space-y-1">
                  <li className="flex items-center gap-4 px-6 py-3 bg-green-100 text-green-600 rounded-xl font-semibold cursor-pointer">
                      <MdDashboard className="text-xl" />
                      <span>Dashboard</span>
                  </li>
                  <li className="flex items-center gap-4 px-6 py-3 text-gray-400 hover:bg-gray-50 hover:text-green-600 rounded-xl cursor-pointer transition-all">
                      <MdListAlt className="text-xl" />
                      <span>Orders</span>
                  </li>
                  <li className="flex items-center gap-4 px-6 py-3 text-gray-400 hover:bg-gray-50 hover:text-green-600 rounded-xl cursor-pointer transition-all">
                      <MdPeople className="text-xl" />
                      <span>Customers</span>
                  </li>
                </ul>
            </div>

            {/* Footer (Mengikuti Tampilan Kode Kedua) */}
            <div id="sidebar-footer" className="mt-auto">
                {/* Bagian Kartu Hijau dengan Koki di Samping */}
                <div className="bg-[#00B074] px-4 py-4 rounded-2xl shadow-lg mb-6 flex items-center">
                    <div className="text-white text-[11px] flex-1 pr-2">
                        <span>
                            Please organize your menus through button below!
                        </span>

                        {/* Tombol Putih */}
                        <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-xl space-x-2 cursor-pointer shadow-sm">
                            <FaPlus className="text-gray-600 text-[10px]" />
                            <span className="text-gray-600 font-bold">
                                Add Menus
                            </span>
                        </div>
                    </div>

                    {/* Gambar Koki di Sebelah Kanan */}
                    <img
                        className="w-16 h-16 rounded-full object-contain flex-shrink-0"
                        src="/img/avatar.png" 
                        alt="avatar"
                    />
                </div>

                {/* Teks Copyright di Bawah */}
                <div className="px-1">
                    <span className="font-bold text-gray-400 text-[10px] block">
                        Sedap Restaurant Admin Dashboard
                    </span>
                    <p className="font-light text-gray-400 text-[10px] mt-1">
                        &copy; 2025 All Right Reserved
                    </p>
                </div>
            </div>
        </div>
    );
}
