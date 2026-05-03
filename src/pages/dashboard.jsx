import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
      <div id="dashboard-container" className="p-8 bg-gray-50 flex-1 min-h-screen">
        <PageHeader/>
            <div id="dashboard-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                
                {/* Total Orders */}
                <div id="dashboard-orders" className="bg-white p-6 rounded-3xl flex items-center gap-5 shadow-sm">
                    <div id="orders-icon" className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl">
                        <FaShoppingCart />
                    </div>
                    <div id="orders-info">
                        <span id="orders-count" className="text-3xl font-extrabold text-gray-800 block">75</span>
                        <span id="orders-text" className="text-sm text-gray-400 font-medium">Total Orders</span>
                    </div>
                </div>

                {/* Total Delivered */}
                <div id="dashboard-delivered" className="bg-white p-6 rounded-3xl flex items-center gap-5 shadow-sm">
                    <div id="delivered-icon" className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl">
                        <FaTruck />
                    </div>
                    <div id="delivered-info">
                        <span id="delivered-count" className="text-3xl font-extrabold text-gray-800 block">357</span>
                        <span id="delivered-text" className="text-sm text-gray-400 font-medium">Total Delivered</span>
                    </div>
                </div>

                {/* Total Canceled */}
                <div id="dashboard-canceled" className="bg-white p-6 rounded-3xl flex items-center gap-5 shadow-sm">
                    <div id="canceled-icon" className="w-16 h-16 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-2xl">
                        <FaBan />
                    </div>
                    <div id="canceled-info">
                        <span id="canceled-count" className="text-3xl font-extrabold text-gray-800 block">65</span>
                        <span id="canceled-text" className="text-sm text-gray-400 font-medium">Total Canceled</span>
                    </div>
                </div>

                {/* Total Revenue */}
                <div id="dashboard-revenue" className="bg-white p-6 rounded-3xl flex items-center gap-5 shadow-sm">
                    <div id="revenue-icon" className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl">
                        <FaDollarSign />
                    </div>
                    <div id="revenue-info">
                        <span id="revenue-amount" className="text-3xl font-extrabold text-gray-800 block">$128</span>
                        <span id="revenue-text" className="text-sm text-gray-400 font-medium">Total Revenue</span>
                    </div>
                </div>
            </div>

            {/* === BAGIAN BARU: CHART & REVIEW === */}
            {/* === BAGIAN BARU: CHART & REVIEW === */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
    
    {/* Bagian Chart Order (Kiri - 2 Kolom) */}
    <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="text-xl font-bold text-gray-800">Chart Order</h3>
                <p className="text-xs text-gray-400">Average orders over time</p>
            </div>
            <button className="text-green-500 text-sm font-bold border border-green-500 px-4 py-1.5 rounded-xl hover:bg-green-50 transition-all">
                View Report
            </button>
        </div>
        
        {/* Visual Grafik Line (SVG) */}
        <div className="h-64 bg-green-50/30 rounded-3xl flex items-end p-6 relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                {/* Area Shadow di bawah garis */}
                <path d="M0,80 Q100,20 200,60 T400,30 L400,100 L0,100 Z" fill="rgba(34, 197, 94, 0.1)" />
                {/* Garis Grafik Utama */}
                <path d="M0,80 Q100,20 200,60 T400,30" fill="none" stroke="#00B074" strokeWidth="4" strokeLinecap="round" />
            </svg>
            
            {/* Grid Lines (Opsional untuk estetika) */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-20 pointer-events-none">
                <div className="border-t border-green-200 w-full"></div>
                <div className="border-t border-green-200 w-full"></div>
                <div className="border-t border-green-200 w-full"></div>
            </div>
        </div>
    </div>

    {/* Bagian Customer Review / Pie Chart (Kanan - 1 Kolom) */}
    <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Review</h3>
        <p className="text-xs text-gray-400 mb-8">Review from customers</p>
        
        <div className="flex-1 flex flex-col items-center justify-center">
            {/* Pie Chart Visual */}
            <div className="relative w-44 h-44 mb-6">
                {/* Lingkaran Luar */}
                <svg className="w-full h-full -rotate-90">
                    <circle cx="88" cy="88" r="75" stroke="#F3F4F6" strokeWidth="15" fill="none" />
                    <circle cx="88" cy="88" r="75" stroke="#00B074" strokeWidth="15" fill="none" 
                        strokeDasharray="471" strokeDashoffset="70" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-gray-800 leading-none">85%</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">Satisfied</span>
                </div>
            </div>
            <p className="text-center text-sm text-gray-500 font-medium leading-relaxed italic">
                "The food is very delicious and the delivery is very fast!"
            </p>
        </div>
    </div>

</div>


            {/* === BAGIAN BARU: ORDER LIST === */}
            <div className="mt-8 bg-white p-8 rounded-[2rem] shadow-sm overflow-hidden">
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
                                <td className="py-5 font-bold">Raihan Ghafari</td>
                                <td className="py-5 text-gray-400">#12345</td>
                                <td className="py-5">02 May 2024</td>
                                <td className="py-5 font-black text-gray-800">$12.00</td>
                                <td className="py-5">
                                    <span className="bg-green-100 text-green-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase">Delivered</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                <td className="py-5 font-bold">Samantha</td>
                                <td className="py-5 text-gray-400">#12346</td>
                                <td className="py-4">02 May 2024</td>
                                <td className="py-4 font-black text-gray-800">$25.00</td>
                                <td className="py-4">
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
