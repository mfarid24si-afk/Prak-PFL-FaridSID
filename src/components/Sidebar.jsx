import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdListAlt,
  MdPeople,
  MdInventory,
  MdExtension,
  MdPeopleOutline,
  MdLogout,
} from "react-icons/md";
import { FaPlus, FaFire } from "react-icons/fa";
import { NotebookPenIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { isAdmin, logout, profile } = useAuth();
  const navigate = useNavigate();

  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive
      ? "text-hijau bg-green-200 font-extrabold"
      : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div
      id="sidebar"
      className="w-64 bg-white h-screen flex flex-col border-r border-gray-100 p-6 sticky top-0"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="mb-10 px-4">
        <span id="logo-title" className="text-3xl font-bold text-gray-800">
          Sedap{" "}
          <b id="logo-dot" className="text-green-500">
            .
          </b>
        </span>
        <span
          id="logo-subtitle"
          className="block text-[10px] text-gray-400 uppercase tracking-widest font-medium mt-1"
        >
          Admin Dashboard
        </span>
      </div>

      {/* List Menu */}
      <div id="sidebar-menu" className="flex-1">
        <ul id="menu-list" className="space-y-1">
          <li>
            <NavLink to="/" className={menuClass}>
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={menuClass}>
              <MdListAlt className="text-xl" />
              <span>Orders</span>
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink to="/customers" className={menuClass}>
                <MdPeople className="text-xl" />
                <span>Customers</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/produk" className={menuClass}>
              <MdInventory className="text-xl" />
              <span>Products</span>
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink to="/users" className={menuClass}>
                <MdPeopleOutline className="text-xl" />
                <span>Users</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/components" className={menuClass}>
              <MdExtension className="text-xl" />
              <span>Components</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fiturxyz" className={menuClass}>
              <FaFire className="text-xl" />
              <span>Fitur-xyz</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/note" className={menuClass}>
              <NotebookPenIcon className="text-xl" />
              <span>Note</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* User Info + Logout */}
      <div id="sidebar-footer" className="mt-auto">
        {profile && (
          <div className="px-4 mb-4 pb-4 border-b border-gray-100">
            <p className="text-sm font-bold text-gray-800 truncate">{profile.full_name || "User"}</p>
            <p className="text-[10px] text-gray-400 capitalize">{profile.role} • {profile.points} pts</p>
          </div>
        )}

        {/* Bagian Kartu Hijau */}
        <div className="bg-[#00B074] px-4 py-4 rounded-2xl shadow-lg mb-4 flex items-center">
          <div className="text-white text-[11px] flex-1 pr-2">
            <span>Please organize your menus through button below!</span>
            <div className="flex justify-center items-center p-2 mt-3 bg-white rounded-xl space-x-2 cursor-pointer shadow-sm">
              <FaPlus className="text-gray-600 text-[10px]" />
              <span className="text-gray-600 font-bold">Add Menus</span>
            </div>
          </div>
          <img
            className="w-16 h-16 rounded-full object-contain flex-shrink-0"
            src="/img/avatar.png"
            alt="avatar"
          />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
        >
          <MdLogout className="text-lg" />
          <span>Logout</span>
        </button>

        {/* Copyright */}
        <div className="px-1 mt-2">
          <span className="font-bold text-gray-400 text-[10px] block">
            Sedap Admin Dashboard
          </span>
          <p className="font-light text-gray-400 text-[10px] mt-1">
            &copy; 2025 All Right Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
