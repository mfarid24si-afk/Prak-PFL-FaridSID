import { useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex justify-between items-center p-4">

      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search Here..."
          onClick={() => setShowModal(true)}
          className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none"
        />

        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
      </div>

      {/* Icons + Profile */}
      <div className="flex items-center space-x-4">

        <div className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
          <FaBell />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">
            50
          </span>
        </div>

        <div className="p-3 bg-blue-100 rounded-2xl cursor-pointer">
          <FcAreaChart />
        </div>

        <div className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
          <SlSettings />
        </div>

        <div className="flex items-center space-x-4 border-l pl-4 border-gray-300">
          <span>
            Welcome, <b>Ms Hen</b>
          </span>

          <img
            src="public/img/ayam.png"
            className="w-10 h-10 rounded-full"
            alt="profile"
          />
        </div>

          </div>
          {
  showModal && (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">

        <h2 className="text-xl font-semibold mb-4">
          Search Modal
        </h2>

        <input
          type="text"
          placeholder="Search anything..."
          className="w-full border p-3 rounded-lg outline-none"
        />

        <div className="mt-4">
          <p className="text-gray-500">
            Recent Search:
          </p>

          <ul className="mt-2 space-y-2">
            <li>Dashboard</li>
            <li>Orders</li>
            <li>Settings</li>
          </ul>
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="mt-6 bg-hijau text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>

      </div>
    </div>
  )
}
    </div>
  );
}