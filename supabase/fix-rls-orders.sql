-- =============================================================
-- FIX RLS: Semua user (member & admin) bisa buat order
-- =============================================================
-- Jalankan di Supabase SQL Editor
-- =============================================================

-- 1. Drop policy lama
DROP POLICY IF EXISTS orders_member_insert ON public.orders;
DROP POLICY IF EXISTS orders_member_select ON public.orders;
DROP POLICY IF EXISTS orders_member_cancel ON public.orders;
DROP POLICY IF EXISTS order_items_member_all ON public.order_items;

-- 2. Policy baru yang lebih simpel

-- ORDER: SEMUA user yang login bisa INSERT order miliknya sendiri
CREATE POLICY orders_user_insert ON public.orders
  FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
    AND status = 'pending'
  );

-- ORDER: SEMUA user bisa SELECT order miliknya sendiri
CREATE POLICY orders_user_select ON public.orders
  FOR SELECT USING (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
  );

-- ORDER: SEMUA user bisa CANCEL order pending miliknya sendiri
CREATE POLICY orders_user_cancel ON public.orders
  FOR UPDATE USING (
    auth.uid() IS NOT NULL
    AND user_id = auth.uid()
    AND status = 'pending'
  ) WITH CHECK (
    status = 'cancelled'
    AND user_id = auth.uid()
  );

-- ORDER ITEMS: SEMUA user bisa manage items di order pending miliknya
CREATE POLICY order_items_user_all ON public.order_items
  FOR ALL USING (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
      AND orders.status = 'pending'
    )
  ) WITH CHECK (
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
      AND orders.status = 'pending'
    )
  );

-- 3. Verifikasi
SELECT tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =============================================================
-- ✅ FIX SELESAI!
-- Sekarang semua user yang login (member & admin) bisa:
-- - Buat order sendiri
-- - Lihat order sendiri
-- - Cancel order pending sendiri
-- - Tambah item ke order pending sendiri
-- =============================================================
