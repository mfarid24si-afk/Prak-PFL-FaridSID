import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div id="header-container" className="h-20 bg-white px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-96">
                <input
                    id="search-input"
                    className="w-full bg-gray-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    type="text"
                    placeholder="Search Here..."
                />
                <FaSearch id="search-icon" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center gap-6">
                <div className="flex gap-4 border-r border-gray-100 pr-6">
                    <div id="notification-icon" className="relative text-blue-500 bg-blue-50 p-2 rounded-full cursor-pointer">
                        <FaBell />
                        <span id="notification-badge" className="absolute -top-1 -right-1 bg-red-500 text-[9px] text-white w-4 h-4 flex items-center justify-center rounded-full">50</span>
                    </div>
                    <div id="chart-icon" className="bg-blue-50 p-2 rounded-full cursor-pointer">
                        <FcAreaChart />
                    </div>
                    <div id="settings-icon" className="text-gray-400 bg-gray-50 p-2 rounded-full cursor-pointer">
                        <SlSettings />
                    </div>
                </div>

                <div id="profile-container" className="flex items-center gap-3">
                    <span id="profile-text" className="text-sm font-bold text-gray-800">
                        Hello, <b className="font-extrabold text-green-600">Farid</b>
                    </span>
                    <img
            src="public/img/ayam.png"
            className="w-10 h-10 rounded-full"
            alt="profile"
          />
                </div>
            </div>
        </div>
    );
}
