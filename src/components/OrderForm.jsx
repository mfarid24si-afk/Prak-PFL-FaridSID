import { useState, useEffect } from "react";
import { orderService } from "../services/orderService";
import { productService } from "../services/productService";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../lib/toast";

export default function OrderForm({ onClose, onSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState("create"); // create | items

  useEffect(() => {
    productService.getActive().then(setProducts).catch(console.error);
  }, []);

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      const order = await orderService.create({
        user_id: user?.id,
        notes,
      });
      setOrderId(order.id);
      toast.success("Order created! Now add items.");
      setStep("items");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!selectedProduct || qty < 1) return;
    try {
      const product = products.find((p) => p.id === selectedProduct);
      await orderService.addOrderItem(orderId, product, qty);
      setItems([...items, { product, qty }]);
      setSelectedProduct("");
      setQty(1);
      toast.success("Item added");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {step === "create" ? "New Order" : "Add Items to Order"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        {step === "create" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Optional notes for this order..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 py-2 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={handleCreateOrder} disabled={loading} className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition disabled:opacity-50">
                {loading ? "Creating..." : "Create Order & Add Items"}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Order #{orderId?.slice(0, 8)} — Add products to this order.
            </p>

            {/* Add item form */}
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Product</label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">Select a product...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — Rp {parseInt(p.price).toLocaleString("id-ID")} (Stock: {p.stock})
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-24">
                <label className="block text-xs font-medium text-gray-700 mb-1">Qty</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <button
                onClick={handleAddItem}
                disabled={!selectedProduct}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                Add
              </button>
            </div>

            {/* Items list */}
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-4 py-2 font-medium">{item.product.name}</td>
                      <td className="px-4 py-2 text-center">{item.qty}</td>
                      <td className="px-4 py-2 text-right">Rp {parseInt(item.product.price).toLocaleString("id-ID")}</td>
                      <td className="px-4 py-2 text-right font-semibold">Rp {(item.product.price * item.qty).toLocaleString("id-ID")}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td colSpan={3} className="px-4 py-3 text-right font-bold">Total:</td>
                    <td className="px-4 py-3 text-right font-bold">Rp {total.toLocaleString("id-ID")}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 py-2 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                {items.length === 0 ? "Cancel Order" : "Close"}
              </button>
              {items.length > 0 && (
                <button onClick={onSuccess} className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition">
                  Complete Order
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
