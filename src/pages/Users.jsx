import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "../lib/toast";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to load users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);
      if (error) throw error;
      toast.success(`User role updated to ${newRole}`);
      loadUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner text="Loading users..." />;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-sm text-gray-400 mt-1">Dashboard / Users</p>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-50 text-sm uppercase">
              <th className="pb-4">Name</th>
              <th className="pb-4">Role</th>
              <th className="pb-4">Points</th>
              <th className="pb-4">Tier</th>
              <th className="pb-4">Joined</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 font-bold">{u.full_name || "Anonymous"}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-600"
                          : u.role === "member"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 font-bold">{u.points}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        u.tier === "gold"
                          ? "bg-yellow-100 text-yellow-600"
                          : u.tier === "silver"
                          ? "bg-gray-100 text-gray-500"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {u.tier}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400 text-xs">
                    {new Date(u.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="text-xs px-2 py-1.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                      <option value="guest">Guest</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
