import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../services/productService";
import ProductForm from "../components/ProductForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../lib/toast";

export default function Produk() {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await productService.remove(id);
      toast.success("Product deleted successfully");
      loadProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    loadProducts();
  };

  if (loading) return <LoadingSpinner text="Loading products..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-400 mt-1">Dashboard / Products</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#00B050] hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <span className="text-lg">+</span> Add Product
          </button>
        )}
      </div>

      {showForm && (
        <ProductForm
          product={editProduct}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-wider uppercase bg-white">
                <th className="py-5 px-6">SKU</th>
                <th className="py-5 px-6">Product Name</th>
                <th className="py-5 px-6">Category</th>
                <th className="py-5 px-6">Price</th>
                <th className="py-5 px-6">Stock</th>
                <th className="py-5 px-6">Status</th>
                {isAdmin && <th className="py-5 px-6">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 7 : 6} className="py-12 text-center text-gray-400">
                    No products found. {isAdmin && "Click '+ Add Product' to create one."}
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-400 font-mono text-xs">{product.sku}</td>
                    <td className="py-4 px-6">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-emerald-600 hover:text-emerald-700 font-semibold"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-gray-500">{product.category}</td>
                    <td className="py-4 px-6 font-bold text-gray-900">
                      Rp {parseInt(product.price).toLocaleString("id-ID")}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          product.stock > 10
                            ? "bg-green-50 text-green-600"
                            : product.stock > 0
                            ? "bg-amber-50 text-amber-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {product.stock} Pcs
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          product.is_active
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-500 hover:text-blue-700 text-xs font-bold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Delete
                          </button>
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
    </div>
  );
}
