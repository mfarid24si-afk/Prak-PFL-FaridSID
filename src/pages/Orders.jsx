import { useState, useEffect } from "react";
import { orderService } from "../services/orderService";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderForm from "../components/OrderForm";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../lib/toast";

const statusStyles = {
  pending: "bg-orange-100 text-orange-600",
  paid: "bg-blue-100 text-blue-600",
  shipped: "bg-purple-100 text-purple-600",
  completed: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
};

export default function Orders() {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await orderService.updateStatus(id, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      loadOrders();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getCustomerName = (order) => {
    if (order.profiles?.full_name) return order.profiles.full_name;
    if (order.customers?.name) return order.customers.name;
    return "Guest";
  };

  if (loading) return <LoadingSpinner text="Loading orders..." />;

  return (
    <div className="p-8 bg-gray-50 flex-1 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-400 mt-1">Dashboard / Orders</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-all text-sm"
        >
          + New Order
        </button>
      </div>

      {showForm && (
        <OrderForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            loadOrders();
          }}
        />
      )}

      <div className="mt-6 bg-white rounded-[2rem] p-8 shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-50 text-sm uppercase">
              <th className="pb-4">Order No</th>
              <th className="pb-4">Customer</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Items</th>
              <th className="pb-4">Total</th>
              <th className="pb-4">Date</th>
              {isAdmin && <th className="pb-4">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 7 : 6} className="py-12 text-center text-gray-400">
                  No orders found. Click '+ New Order' to create one.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 text-gray-400 font-mono text-xs">{order.order_no}</td>
                  <td className="py-4 font-bold">{getCustomerName(order)}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${statusStyles[order.status] || "bg-gray-100 text-gray-600"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500">
                    {order.order_items?.length || 0} item(s)
                  </td>
                  <td className="py-4 font-black">
                    Rp {parseInt(order.total).toLocaleString("id-ID")}
                  </td>
                  <td className="py-4 text-gray-400 text-xs">
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  {isAdmin && (
                    <td className="py-4">
                      <div className="flex gap-1">
                        {order.status === "pending" && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, "paid"); }}
                              className="text-blue-500 hover:text-blue-700 text-xs font-bold px-2"
                            >
                              Pay
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, "cancelled"); }}
                              className="text-red-500 hover:text-red-700 text-xs font-bold px-2"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {order.status === "paid" && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, "shipped"); }}
                            className="text-purple-500 hover:text-purple-700 text-xs font-bold px-2"
                          >
                            Ship
                          </button>
                        )}
                        {order.status === "shipped" && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, "completed"); }}
                            className="text-green-500 hover:text-green-700 text-xs font-bold px-2"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
