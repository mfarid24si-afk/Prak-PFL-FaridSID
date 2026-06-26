import { supabase } from "../lib/supabase";

export const productService = {
  async getAll() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getActive() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(product) {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, product) {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },
};
