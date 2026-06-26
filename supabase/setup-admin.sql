-- =============================================================
-- SETUP ADMIN + SEED DATA TAMBAHAN
-- 
-- CARA PAKAI:
-- 1. Buka Supabase Dashboard → SQL Editor
-- 2. GANTI 'email-kamu@example.com' dengan email yang kamu daftarkan
-- 3. RUN semua (jangan dipotong)
-- =============================================================

-- ========== STEP 0: CEK USER YANG SUDAH DAFTAR ==========
-- Jalankan ini dulu untuk lihat daftar user:
SELECT id, email, raw_user_meta_data->>'full_name' as full_name 
FROM auth.users;

-- ========== STEP 1: JADIKAN USER ANDA ADMIN ==========
-- GANTI 'email-kamu@example.com' dengan email yg kamu daftarkan!
UPDATE public.profiles 
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'email-kamu@example.com'  -- <<< GANTI INI!
);

-- Cek hasilnya
SELECT p.id, u.email, p.full_name, p.role, p.points, p.tier
FROM public.profiles p
JOIN auth.users u ON u.id = p.id;

-- ========== STEP 2: TAMBAH PRODUK LAGI ==========
INSERT INTO public.products (sku, name, description, price, stock, category) VALUES
  ('SKU-007', 'Ayam Geprek', 'Ayam geprek sambal bawang + nasi', 18000, 35, 'Makanan'),
  ('SKU-008', 'Soto Ayam', 'Soto ayam hangat dengan telur', 22000, 25, 'Makanan'),
  ('SKU-009', 'Es Campur', 'Es campur buah segar', 12000, 40, 'Minuman'),
  ('SKU-010', 'Kopi Susu', 'Kopi susu kekinian', 15000, 50, 'Minuman'),
  ('SKU-011', 'French Fries', 'Kentang goreng french fries', 15000, 30, 'Camilan'),
  ('SKU-012', 'Matcha Latte', 'Matcha latte dengan whipped cream', 20000, 20, 'Minuman')
ON CONFLICT (sku) DO NOTHING;

-- ========== STEP 3: TAMBAH CUSTOMER LAGI ==========
INSERT INTO public.customers (name, email, phone, address) VALUES
  ('Dewi Lestari', 'dewi@email.com', '081234567893', 'Jl. Gatot Subroto No. 15, Jakarta'),
  ('Rudi Hartono', 'rudi@email.com', '081234567894', 'Jl. Asia Afrika No. 8, Bandung'),
  ('Mega Sari', 'mega@email.com', '081234567895', 'Jl. Tunjungan No. 3, Surabaya');

-- ========== CEK SEMUA DATA ==========
SELECT 'PRODUCTS' as tabel, count(*) as jumlah FROM public.products
UNION ALL
SELECT 'CUSTOMERS', count(*) FROM public.customers
UNION ALL
SELECT 'PROFILES', count(*) FROM public.profiles;
