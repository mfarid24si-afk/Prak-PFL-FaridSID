-- =============================================================
-- FIXED MIGRATION: Full System Setup
-- Menghilangkan OLD/NEW dari RLS (penyebab error) dan 
-- menggantinya dengan trigger protection
--
=== CARA PAKAI ===
-- 1. Buka Supabase Dashboard → SQL Editor
-- 2. Copy-Paste SELURUH script ini
-- 3. RUN (sekali jalan, jangan dipotong-potong)
-- =============================================================

-- ====================== RESET DULU ======================
-- Hapus semua kebocoran dari percobaan sebelumnya
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS trg_orders_set_no ON public.orders;
DROP TRIGGER IF EXISTS trg_recalc_order_totals ON public.order_items;
DROP TRIGGER IF EXISTS trg_order_items_stock ON public.order_items;
DROP TRIGGER IF EXISTS trg_orders_points ON public.orders;
DROP TRIGGER IF EXISTS trg_profiles_update_tier ON public.profiles;
DROP TRIGGER IF EXISTS trg_protect_profile_sensitive ON public.profiles;

DROP POLICY IF EXISTS profiles_admin_all ON public.profiles;
DROP POLICY IF EXISTS profiles_self_read ON public.profiles;
DROP POLICY IF EXISTS profiles_self_update ON public.profiles;
DROP POLICY IF EXISTS customers_admin_all ON public.customers;
DROP POLICY IF EXISTS products_admin_all ON public.products;
DROP POLICY IF EXISTS products_read_active ON public.products;
DROP POLICY IF EXISTS orders_admin_all ON public.orders;
DROP POLICY IF EXISTS orders_member_insert ON public.orders;
DROP POLICY IF EXISTS orders_member_select ON public.orders;
DROP POLICY IF EXISTS orders_member_cancel ON public.orders;
DROP POLICY IF EXISTS order_items_admin_all ON public.order_items;
DROP POLICY IF EXISTS order_items_member_all ON public.order_items;

-- ====================== 1. HELPER FUNCTIONS ======================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
SECURITY DEFINER
LANGUAGE sql
AS $$
  SELECT COALESCE(
    (SELECT role = 'admin' FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

CREATE OR REPLACE FUNCTION public.current_role()
RETURNS TEXT
SECURITY DEFINER
LANGUAGE sql
AS $$
  SELECT COALESCE(
    (SELECT role FROM public.profiles WHERE id = auth.uid()),
    'guest'
  );
$$;

-- ====================== 2. TABEL PROFILES ======================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL DEFAULT '',
  avatar_url  TEXT DEFAULT '',
  role        TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member', 'guest')),
  points      INTEGER NOT NULL DEFAULT 0 CHECK (points >= 0),
  tier        TEXT NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger: auto-create profile on register
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'member')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Proteksi field sensitif (role, points, tier) dari non-admin
CREATE OR REPLACE FUNCTION public.protect_profile_sensitive()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Jika tidak ada auth context (SQL Editor) ATAU user adalah admin → izinkan perubahan
  IF auth.uid() IS NULL OR public.is_admin() THEN
    RETURN NEW;
  END IF;
  -- Selain itu (non-admin user) → revert field sensitif
  NEW.role := OLD.role;
  NEW.points := OLD.points;
  NEW.tier := OLD.tier;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_protect_profile_sensitive
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_sensitive();

-- ====================== 3. TABEL CUSTOMERS ======================
CREATE TABLE IF NOT EXISTS public.customers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT DEFAULT '',
  phone       TEXT DEFAULT '',
  address     TEXT DEFAULT '',
  notes       TEXT DEFAULT '',
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================== 4. TABEL PRODUCTS ======================
CREATE TABLE IF NOT EXISTS public.products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku         TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  description TEXT DEFAULT '',
  price       DECIMAL(12,2) NOT NULL CHECK (price >= 0),
  stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  category    TEXT DEFAULT '',
  image_url   TEXT DEFAULT '',
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================== 5. TABEL ORDERS ======================
CREATE TABLE IF NOT EXISTS public.orders (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no        TEXT NOT NULL UNIQUE,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_id     UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','paid','shipped','completed','cancelled')),
  subtotal        DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
  total           DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (total >= 0),
  points_awarded  INTEGER NOT NULL DEFAULT 0,
  notes           TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT orders_has_owner CHECK (user_id IS NOT NULL OR customer_id IS NOT NULL)
);

-- ====================== 6. TABEL ORDER ITEMS ======================
CREATE TABLE IF NOT EXISTS public.order_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id      UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id    UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  product_name  TEXT NOT NULL,
  unit_price    DECIMAL(12,2) NOT NULL,
  qty           INTEGER NOT NULL CHECK (qty > 0),
  line_total    DECIMAL(12,2) GENERATED ALWAYS AS (unit_price * qty) STORED,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================== 7. TRIGGER: Order No ======================
CREATE OR REPLACE FUNCTION public.trg_orders_set_no_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  today_seq INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SPLIT_PART(order_no, '-', 3) AS INTEGER)), 0) + 1
  INTO today_seq
  FROM public.orders
  WHERE order_no LIKE 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-%';

  NEW.order_no := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(today_seq::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_set_no
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.trg_orders_set_no_func();

-- ====================== 8. TRIGGER: Recalc Totals ======================
CREATE OR REPLACE FUNCTION public.recalc_order_totals_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.orders
  SET
    subtotal = COALESCE(
      (SELECT SUM(line_total) FROM public.order_items WHERE order_id = NEW.order_id),
      0
    ),
    total = COALESCE(
      (SELECT SUM(line_total) FROM public.order_items WHERE order_id = NEW.order_id),
      0
    )
  WHERE id = NEW.order_id;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_recalc_order_totals
  AFTER INSERT OR UPDATE OR DELETE ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION public.recalc_order_totals_func();

-- ====================== 9. TRIGGER: Stock Management ======================
CREATE OR REPLACE FUNCTION public.trg_order_items_stock_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  order_status TEXT;
BEGIN
  SELECT status INTO order_status FROM public.orders WHERE id = COALESCE(NEW.order_id, OLD.order_id);

  IF order_status IN ('paid', 'shipped', 'completed') THEN
    RAISE EXCEPTION 'Cannot modify items on a non-pending order (status: %)', order_status;
  END IF;

  IF TG_OP = 'INSERT' THEN
    UPDATE public.products SET stock = stock - NEW.qty WHERE id = NEW.product_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    UPDATE public.products SET stock = stock + OLD.qty WHERE id = OLD.product_id;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    UPDATE public.products SET stock = stock + OLD.qty - NEW.qty WHERE id = NEW.product_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_order_items_stock
  AFTER INSERT OR UPDATE OR DELETE ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION public.trg_order_items_stock_func();

-- ====================== 10. TRIGGER: Loyalty Points ======================
CREATE OR REPLACE FUNCTION public.trg_orders_points_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  points_earned INTEGER;
BEGIN
  IF OLD.status IS NOT DISTINCT FROM NEW.status THEN
    RETURN NEW;
  END IF;

  -- Award points when completed
  IF NEW.status = 'completed' THEN
    points_earned := FLOOR(NEW.total / 1000)::INTEGER;
    IF NEW.user_id IS NOT NULL THEN
      UPDATE public.profiles
      SET points = points + points_earned, updated_at = now()
      WHERE id = NEW.user_id;
    END IF;
    NEW.points_awarded := points_earned;
  END IF;

  -- Revoke points if cancelled after completed
  IF OLD.status = 'completed' AND NEW.status != 'completed' THEN
    IF OLD.user_id IS NOT NULL THEN
      UPDATE public.profiles
      SET points = GREATEST(0, points - OLD.points_awarded), updated_at = now()
      WHERE id = OLD.user_id;
    END IF;
    NEW.points_awarded := 0;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_orders_points
  BEFORE UPDATE OF status ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.trg_orders_points_func();

-- ====================== 11. TRIGGER: Auto Tier ======================
CREATE OR REPLACE FUNCTION public.update_tier()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.points >= 5000 THEN
    NEW.tier := 'gold';
  ELSIF NEW.points >= 1000 THEN
    NEW.tier := 'silver';
  ELSE
    NEW.tier := 'bronze';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_update_tier
  BEFORE UPDATE OF points ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_tier();

-- ====================== 12. ROW LEVEL SECURITY ======================
-- (TANPA OLD/NEW — penyebab error sebelumnya!)

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY profiles_admin_all ON public.profiles
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY profiles_self_read ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- ✅ FIXED: Tidak pakai OLD lagi. Trigger trg_protect_profile_sensitive yang menjaga field sensitif
CREATE POLICY profiles_self_update ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- CUSTOMERS (admin only)
CREATE POLICY customers_admin_all ON public.customers
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- PRODUCTS
CREATE POLICY products_admin_all ON public.products
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY products_read_active ON public.products
  FOR SELECT USING (is_active = true);

-- ORDERS
CREATE POLICY orders_admin_all ON public.orders
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY orders_member_insert ON public.orders
  FOR INSERT WITH CHECK (
    public.current_role() = 'member'
    AND user_id = auth.uid()
    AND status = 'pending'
  );

CREATE POLICY orders_member_select ON public.orders
  FOR SELECT USING (
    public.current_role() = 'member'
    AND user_id = auth.uid()
  );

CREATE POLICY orders_member_cancel ON public.orders
  FOR UPDATE USING (
    public.current_role() = 'member'
    AND user_id = auth.uid()
    AND status = 'pending'
  ) WITH CHECK (
    status = 'cancelled'
    AND user_id = auth.uid()
  );

-- ORDER ITEMS
CREATE POLICY order_items_admin_all ON public.order_items
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY order_items_member_all ON public.order_items
  FOR ALL USING (
    public.current_role() = 'member'
    AND EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
      AND orders.status = 'pending'
    )
  ) WITH CHECK (
    public.current_role() = 'member'
    AND EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
      AND orders.status = 'pending'
    )
  );

-- ====================== 13. SEED DATA ======================
INSERT INTO public.products (sku, name, description, price, stock, category) VALUES
  ('SKU-001', 'Nasi Goreng Spesial', 'Nasi goreng dengan telur, ayam, dan sayuran', 25000, 50, 'Makanan'),
  ('SKU-002', 'Mie Ayam Bakso', 'Mie ayam dengan bakso sapi', 20000, 40, 'Makanan'),
  ('SKU-003', 'Es Teh Manis', 'Es teh manis segar', 5000, 100, 'Minuman'),
  ('SKU-004', 'Jus Alpukat', 'Jus alpukat dengan susu coklat', 15000, 30, 'Minuman'),
  ('SKU-005', 'Pisang Goreng', 'Pisang goreng crispy dengan taburan meses', 10000, 60, 'Camilan'),
  ('SKU-006', 'Kentang Goreng', 'Kentang goreng crispy dengan saus sambal', 12000, 45, 'Camilan')
ON CONFLICT (sku) DO NOTHING;

INSERT INTO public.customers (name, email, phone, address) VALUES
  ('Budi Santoso', 'budi@email.com', '081234567890', 'Jl. Merdeka No. 1, Jakarta'),
  ('Siti Rahmawati', 'siti@email.com', '081234567891', 'Jl. Sudirman No. 5, Bandung'),
  ('Ahmad Hidayat', 'ahmad@email.com', '081234567892', 'Jl. Diponegoro No. 10, Surabaya');

-- =============================================================
-- ✅ SUKSES! Sekarang:
-- 1. Buat user admin di Supabase Auth → Settings → Authentication
--    atau daftar lewat form register di app
-- 2. Jalankan SQL ini untuk jadikan admin:
--    UPDATE public.profiles SET role = 'admin' WHERE email = 'email-anda';
-- =============================================================
