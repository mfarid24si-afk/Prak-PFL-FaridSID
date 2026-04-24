import {
  FaShoppingCart,
  FaTruck,
  FaBan,
  FaDollarSign,
  FaTasks
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import PageHeader from "../components/PageHeader";

const data = [
  { name: "Jan", revenue: 400 },
  { name: "Feb", revenue: 700 },
  { name: "Mar", revenue: 500 },
];

export default function Dashboard() {
  return (
    <div>

      <PageHeader />

      <div className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">

        {/* Orders */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-hijau rounded-full p-4">
            <FaShoppingCart className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">75</span>
            <span className="text-gray-400">Total Orders</span>
          </div>
        </div>

        {/* Delivered */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-biru rounded-full p-4">
            <FaTruck className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">175</span>
            <span className="text-gray-400">Total Delivered</span>
          </div>
        </div>

        {/* Canceled */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-merah rounded-full p-4">
            <FaBan className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">40</span>
            <span className="text-gray-400">Total Canceled</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
          <div className="bg-kuning rounded-full p-4">
            <FaDollarSign className="text-3xl text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold">Rp.128</span>
            <span className="text-gray-400">Total Revenue</span>
          </div>
        </div>
        
              {/* Active Projects */}
        <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
            <div className="bg-purple-500 rounded-full p-4">
                <FaTasks className="text-3xl text-white" />
            </div>

            <div className="flex flex-col">
                <span className="text-2xl font-bold">24</span>
                <span className="text-gray-400">Active Projects</span>
        </div>
        </div>
          </div>
          
          {/* chart section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
  <h2 className="text-xl font-semibold mb-4">
    Revenue Overview
  </h2>

  <div style={{ width: "100%", height: 300 }}>
    <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#00B074"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
    </div>
  );
}