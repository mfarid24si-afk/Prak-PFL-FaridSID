import { useState, useEffect } from "react";
import { customerService } from "../services/customerService";
import PageHeader from "../components/PageHeader";
import CustomerForm from "../components/CustomerForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "../lib/toast";

export default function Customers() {
  const { isAdmin } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAll();
      setCustomers(data);
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      await customerService.remove(id);
      toast.success("Customer deleted successfully");
      loadCustomers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditCustomer(null);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    loadCustomers();
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  if (loading) return <LoadingSpinner text="Loading customers..." />;

  return (
    <div className="p-8 bg-gray-50 flex-1 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-400 mt-1">Dashboard / Customers</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-all text-sm"
          >
            + Add Customer
          </button>
        )}
      </div>

      {showForm && (
        <CustomerForm
          customer={editCustomer}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Search */}
      <div className="mt-6 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers by name, email, or phone..."
          className="w-full max-w-md px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-50 text-sm uppercase">
              <th className="pb-4">Name</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Phone</th>
              <th className="pb-4">Address</th>
              <th className="pb-4">Status</th>
              {isAdmin && <th className="pb-4">Actions</th>}
            </tr>
          </thead>
          <tbody className="text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 6 : 5} className="py-12 text-center text-gray-400">
                  {search ? "No customers match your search." : "No customers found."}
                </td>
              </tr>
            ) : (
              filtered.map((cust) => (
                <tr key={cust.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 font-bold">{cust.name}</td>
                  <td className="py-4 text-gray-500">{cust.email}</td>
                  <td className="py-4 text-gray-500">{cust.phone}</td>
                  <td className="py-4 text-gray-500 max-w-[200px] truncate">{cust.address}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        cust.is_active
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {cust.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(cust)}
                          className="text-blue-500 hover:text-blue-700 text-xs font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cust.id)}
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
  );
}
