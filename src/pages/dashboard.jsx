import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="p-8 bg-gray-50 flex-1 min-h-screen overflow-y-auto">
            {/* 1. Header Halaman */}
        <PageHeader
        title="Dashboard" 
        breadcrumb="Home"/>

            {/* 2. Statistik Utama (4 Kotak di Atas) */}
            <div id="dashboard-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {/* Total Orders */}
                <div className="bg-white p-6 rounded-3xl flex items-center gap-5 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl">
                        <FaShoppingCart />
                    </div>
                    <div>
                        <span className="text-3xl font-extrabold text-gray-800 block">75</span>
                        <span className="text-sm text-gray-400 font-medium">Total Orders</span>
                    </div>
                </div>

                {/* Total Delivered */}
                <div className="bg-white p-6 rounded-3xl flex items-center gap-5 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl">
                        <FaTruck />
                    </div>
                    <div>
                        <span className="text-3xl font-extrabold text-gray-800 block">357</span>
                        <span className="text-sm text-gray-400 font-medium">Total Delivered</span>
                    </div>
                </div>

                {/* Total Canceled */}
                <div className="bg-white p-6 rounded-3xl flex items-center gap-5 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-2xl">
                        <FaBan />
                    </div>
                    <div>
                        <span className="text-3xl font-extrabold text-gray-800 block">65</span>
                        <span className="text-sm text-gray-400 font-medium">Total Canceled</span>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white p-6 rounded-3xl flex items-center gap-5 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl">
                        <FaDollarSign />
                    </div>
                    <div>
                        <span className="text-3xl font-extrabold text-gray-800 block">$128</span>
                        <span className="text-sm text-gray-400 font-medium">Total Revenue</span>
                    </div>
                </div>
            </div>

            {/* 3. Baris Tengah: Chart & Review */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Chart Order */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Chart Order</h3>
                            <p className="text-xs text-gray-400">Average orders over time</p>
                        </div>
                        <button className="text-green-500 text-sm font-bold border border-green-500 px-4 py-1.5 rounded-xl hover:bg-green-50">
                            View Report
                        </button>
                    </div>
                    <div className="flex-1 min-h-[250px] bg-green-50/30 rounded-3xl flex items-end p-6 relative overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                            <path d="M0,80 Q100,20 200,60 T400,30 L400,100 L0,100 Z" fill="rgba(34, 197, 94, 0.1)" />
                            <path d="M0,80 Q100,20 200,60 T400,30" fill="none" stroke="#00B074" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                {/* Customer Review */}
                <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col items-center">
                    <h3 className="text-xl font-bold text-gray-800 self-start mb-6">Customer Review</h3>
                    <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="88" cy="88" r="75" stroke="#F3F4F6" strokeWidth="15" fill="none" />
                            <circle cx="88" cy="88" r="75" stroke="#00B074" strokeWidth="15" fill="none" 
                                strokeDasharray="471" strokeDashoffset="70" strokeLinecap="round" />
                        </svg>
                        <span className="absolute text-3xl font-black text-gray-800">85%</span>
                    </div>
                    <p className="text-center text-sm text-gray-500 font-medium leading-relaxed italic">
                        "The food is very delicious and the delivery is very fast!"
                    </p>
                </div>
            </div>

            {/* 4. Baris Bawah: Recent Orders (Tabel) */}
            <div className="mt-8 bg-white p-8 rounded-[2rem] shadow-sm overflow-hidden mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-8">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-50">
                                <th className="pb-5 font-bold">Customer</th>
                                <th className="pb-5 font-bold">Order ID</th>
                                <th className="pb-5 font-bold">Date</th>
                                <th className="pb-5 font-bold">Price</th>
                                <th className="pb-5 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="py-5 font-bold flex items-center gap-3">
                                    <img src="https://liara.run" className="w-8 h-8 rounded-full" />
                                    Raihan Ghafari
                                </td>
                                <td className="py-5 text-gray-400">#12345</td>
                                <td className="py-5">02 May 2024</td>
                                <td className="py-5 font-black text-gray-800">$12.00</td>
                                <td className="py-5">
                                    <span className="bg-green-100 text-green-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase">Delivered</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="py-5 font-bold flex items-center gap-3">
                                    <img src="https://liara.run" className="w-8 h-8 rounded-full" />
                                    Samantha
                                </td>
                                <td className="py-5 text-gray-400">#12346</td>
                                <td className="py-5">02 May 2024</td>
                                <td className="py-5 font-black text-gray-800">$25.00</td>
                                <td className="py-5">
                                    <span className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase">Canceled</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
