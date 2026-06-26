import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaStar, FaTrophy, FaArrowUp } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import LoadingSpinner from "../components/LoadingSpinner";

const tierColors = {
  bronze: "text-amber-600 bg-amber-100",
  silver: "text-gray-500 bg-gray-100",
  gold: "text-yellow-500 bg-yellow-100",
};

const tierIcons = {
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇",
};

export default function Dashboard() {
  const { user, profile, isAdmin, isMember } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalDelivered: 0,
    totalCancelled: 0,
    recentOrders: [],
    totalProducts: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      if (isAdmin) {
        // Admin: aggregate stats
        const { data: orders } = await supabase.from("orders").select("status, total");
        const { count: prodCount } = await supabase.from("products").select("*", { count: "exact", head: true });
        const { count: custCount } = await supabase.from("customers").select("*", { count: "exact", head: true });

        const totalOrders = orders?.length || 0;
        const totalRevenue = orders?.filter((o) => o.status === "completed" || o.status === "shipped" || o.status === "paid")
          .reduce((sum, o) => sum + parseFloat(o.total || 0), 0) || 0;
        const totalDelivered = orders?.filter((o) => o.status === "completed").length || 0;
        const totalCancelled = orders?.filter((o) => o.status === "cancelled").length || 0;

        // Recent orders
        const { data: recent } = await supabase
          .from("orders")
          .select("*, profiles(full_name)")
          .order("created_at", { ascending: false })
          .limit(5);

        setStats({
          totalOrders,
          totalRevenue,
          totalDelivered,
          totalCancelled,
          recentOrders: recent || [],
          totalProducts: prodCount || 0,
          totalCustomers: custCount || 0,
        });
      } else if (isMember) {
        // Member: own stats
        const { data: orders } = await supabase
          .from("orders")
          .select("status, total")
          .eq("user_id", user.id);

        const totalOrders = orders?.length || 0;
        const totalSpent = orders?.filter((o) => o.status !== "cancelled")
          .reduce((sum, o) => sum + parseFloat(o.total || 0), 0) || 0;

        const { data: recent } = await supabase
          .from("orders")
          .select("*, profiles(full_name)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        setStats({
          totalOrders,
          totalRevenue: totalSpent,
          totalDelivered: orders?.filter((o) => o.status === "completed").length || 0,
          totalCancelled: orders?.filter((o) => o.status === "cancelled").length || 0,
          recentOrders: recent || [],
          totalProducts: 0,
          totalCustomers: 0,
        });
      }
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  // Member Dashboard with Loyalty
  if (isMember) {
    const nextTier =
      profile?.tier === "bronze"
        ? { name: "Silver", pointsNeeded: 1000 - (profile?.points || 0) }
        : profile?.tier === "silver"
        ? { name: "Gold", pointsNeeded: 5000 - (profile?.points || 0) }
        : null;

    const progress =
      profile?.tier === "bronze"
        ? ((profile?.points || 0) / 1000) * 100
        : profile?.tier === "silver"
        ? ((profile?.points || 0) / 5000) * 100
        : 100;

    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Welcome + Points Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-[2rem] p-8 text-white mb-8">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-sm font-medium">Welcome back,</p>
              <h1 className="text-3xl font-bold mt-1">{profile?.full_name || "Member"}</h1>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">Your Points</p>
              <p className="text-4xl font-black">{profile?.points || 0}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl">{tierIcons[profile?.tier] || "🥉"}</span>
            <div>
              <p className="text-lg font-bold capitalize">{profile?.tier || "Bronze"} Member</p>
              {nextTier ? (
                <p className="text-green-100 text-xs">
                  {nextTier.pointsNeeded} more points to reach {nextTier.name}
                </p>
              ) : (
                <p className="text-yellow-200 text-xs font-semibold">🏆 You're at the highest tier!</p>
              )}
            </div>
          </div>
          {nextTier && (
            <div className="mt-4 bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <FaShoppingCart />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">{stats.totalOrders}</p>
                <p className="text-xs text-gray-400 font-medium">Total Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <FaTruck />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">{stats.totalDelivered}</p>
                <p className="text-xs text-gray-400 font-medium">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                <FaStar />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">{profile?.points || 0}</p>
                <p className="text-xs text-gray-400 font-medium">Loyalty Points</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                <FaDollarSign />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">Rp {stats.totalRevenue.toLocaleString("id-ID")}</p>
                <p className="text-xs text-gray-400 font-medium">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-6">My Recent Orders</h3>
          {stats.recentOrders.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No orders yet. Start shopping!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-50 uppercase text-xs">
                    <th className="pb-4">Order</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Total</th>
                    <th className="pb-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50">
                      <td className="py-4 font-mono text-gray-400 text-xs">{order.order_no}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          order.status === "completed" ? "bg-green-100 text-green-600" :
                          order.status === "cancelled" ? "bg-red-100 text-red-600" :
                          "bg-orange-100 text-orange-600"
                        }`}>{order.status}</span>
                      </td>
                      <td className="py-4 font-bold">Rp {parseInt(order.total).toLocaleString("id-ID")}</td>
                      <td className="py-4 text-gray-400 text-xs">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome back, {profile?.full_name || "Admin"}!</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-2xl">
              <FaShoppingCart />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-800">{stats.totalOrders}</p>
              <p className="text-sm text-gray-400 font-medium">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-2xl">
              <FaTruck />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-800">{stats.totalDelivered}</p>
              <p className="text-sm text-gray-400 font-medium">Delivered</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-2xl">
              <FaBan />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-800">{stats.totalCancelled}</p>
              <p className="text-sm text-gray-400 font-medium">Cancelled</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-2xl">
              <FaDollarSign />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-gray-800">Rp {stats.totalRevenue.toLocaleString("id-ID")}</p>
              <p className="text-sm text-gray-400 font-medium">Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xl">
            <MdEmojiEvents />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-800">{stats.totalProducts}</p>
            <p className="text-sm text-gray-400 font-medium">Total Products</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 text-xl">
            <FaArrowUp />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-800">{stats.totalCustomers}</p>
            <p className="text-sm text-gray-400 font-medium">Total Customers</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="mt-8 bg-white p-8 rounded-[2rem] shadow-sm overflow-hidden">
        <h3 className="text-xl font-bold text-gray-800 mb-8">Recent Orders</h3>
        {stats.recentOrders.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-sm uppercase tracking-wider border-b border-gray-50">
                  <th className="pb-5 font-bold">Customer</th>
                  <th className="pb-5 font-bold">Order No</th>
                  <th className="pb-5 font-bold">Status</th>
                  <th className="pb-5 font-bold">Total</th>
                  <th className="pb-5 font-bold">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold">{order.profiles?.full_name || "Guest"}</td>
                    <td className="py-4 text-gray-400 font-mono text-xs">{order.order_no}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase ${
                        order.status === "completed" ? "bg-green-100 text-green-600" :
                        order.status === "cancelled" ? "bg-red-100 text-red-600" :
                        order.status === "paid" ? "bg-blue-100 text-blue-600" :
                        order.status === "shipped" ? "bg-purple-100 text-purple-600" :
                        "bg-orange-100 text-orange-600"
                      }`}>{order.status}</span>
                    </td>
                    <td className="py-4 font-black">Rp {parseInt(order.total).toLocaleString("id-ID")}</td>
                    <td className="py-4 text-gray-400 text-xs">{new Date(order.created_at).toLocaleDateString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
