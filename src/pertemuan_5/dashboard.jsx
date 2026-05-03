import React from 'react';
import { 
  LayoutDashboard, ShoppingCart, Users, PieChart, 
  Utensils, MessageSquare, Wallet, Calendar, Search, Bell 
} from 'lucide-react';

const DashboardSedap = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Sedap<span className="text-green-500">.</span></h1>
        <nav className="space-y-4">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <SidebarItem icon={<ShoppingCart size={20} />} label="Order List" />
          <SidebarItem icon={<Users size={20} />} label="Customer" />
          <SidebarItem icon={<PieChart size={20} />} label="Analytics" />
          <SidebarItem icon={<Utensils size={20} />} label="Foods" />
          <SidebarItem icon={<Calendar size={20} />} label="Calendar" />
          <SidebarItem icon={<MessageSquare size={20} />} label="Chat" />
          <SidebarItem icon={<Wallet size={20} />} label="Wallet" />
        </nav>
        
        {/* Banner Upgrade */}
        <div className="mt-20 p-4 bg-green-500 rounded-2xl text-white text-center">
          <p className="text-sm mb-4">Please, organize your menus through button below!</p>
          <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold text-sm">+ Add Menus</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-96">
            <input type="text" placeholder="Search here..." className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-green-400" />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <IconButton icon={<Bell size={20} />} badge="12" color="blue" />
              <IconButton icon={<MessageSquare size={20} />} badge="5" color="purple" />
              <IconButton icon={<ShoppingCart size={20} />} badge="2" color="red" />
            </div>
            <div className="flex items-center gap-3 border-l pl-6">
              <p className="text-sm font-medium">Hello, <span className="font-bold">Samantha</span></p>
              <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
                <img src="/api/placeholder/40/40" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Title & Stats Grid */}
        <section className="mb-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-gray-500">Hi, Samantha. Welcome back to Sedap Admin!</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm text-sm font-medium">
              Filter Periode: <span className="text-gray-400">17 April 2020 - 21 May 2020</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <StatCard label="Total Orders" value="75" change="+12% (30 days)" icon={<ShoppingCart className="text-green-500" />} />
            <StatCard label="Total Delivered" value="357" change="+5% (30 days)" icon={<Utensils className="text-blue-500" />} />
            <StatCard label="Total Canceled" value="65" change="-2% (30 days)" icon={<MessageSquare className="text-red-500" />} />
            <StatCard label="Total Revenue" value="$128" change="+15% (30 days)" icon={<Wallet className="text-teal-500" />} />
          </div>
        </section>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold mb-6">Pie Chart</h3>
            <div className="flex justify-around items-center h-48">
              {/* Sederhanakan dengan lingkaran CSS untuk mock-up */}
              <div className="relative w-24 h-24 rounded-full border-8 border-red-400 flex items-center justify-center font-bold">81%</div>
              <div className="relative w-24 h-24 rounded-full border-8 border-green-400 flex items-center justify-center font-bold">22%</div>
            </div>
          </div>
          <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Chart Order</h3>
              <button className="text-blue-500 text-sm font-bold">Save Report</button>
            </div>
            <div className="h-48 bg-blue-50 rounded-xl flex items-end p-4">
              {/* Visual representasi grafik line (placeholder) */}
              <div className="w-full h-full border-b-2 border-l-2 relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 100">
                  <path d="M0,80 Q100,20 200,60 T400,30" fill="none" stroke="#3B82F6" strokeWidth="4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-komponen Pendukung
const SidebarItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-green-50 text-green-600' : 'text-gray-400 hover:bg-gray-50'}`}>
    {icon} <span className="font-medium">{label}</span>
  </div>
);

const StatCard = ({ label, value, change, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
    <div className="p-4 bg-gray-50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-[10px] text-green-500">{change}</p>
    </div>
  </div>
);

const IconButton = ({ icon, badge, color }) => (
  <div className="relative p-2 bg-white rounded-xl shadow-sm cursor-pointer">
    {icon}
    <span className={`absolute -top-1 -right-1 bg-${color}-500 text-white text-[10px] px-1 rounded-full border-2 border-white`}>{badge}</span>
  </div>
);

export default DashboardSedap;
