import { supabase } from "../lib/supabase";

export const orderService = {
  async getAll() {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*), profiles(full_name), customers(name)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*, products(name, sku)), profiles(full_name), customers(name)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async getMyOrders(userId) {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*), profiles(full_name)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(orderData) {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: orderData.user_id || null,
        customer_id: orderData.customer_id || null,
        notes: orderData.notes || "",
        status: "pending",
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async addOrderItem(orderId, product, qty) {
    const { data, error } = await supabase
      .from("order_items")
      .insert({
        order_id: orderId,
        product_id: product.id,
        product_name: product.name,
        unit_price: product.price,
        qty,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async removeOrderItem(itemId) {
    const { error } = await supabase
      .from("order_items")
      .delete()
      .eq("id", itemId);
    if (error) throw error;
  },
};
