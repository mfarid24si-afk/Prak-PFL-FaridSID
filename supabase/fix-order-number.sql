-- =============================================================
-- FIX: Order Number Generator (Race Condition Fix)
-- =============================================================
-- Masalah 1: trigger lama pake SELECT MAX + 1 → rawan duplikat
-- Masalah 2: sequence mulai dari 1, padahal udah ada order sebelumnya
-- 
-- Solusi: pake SEQUENCE + set ke nilai maksimal yang ada
-- =============================================================

-- 1. Buat sequence (kalo belum ada)
CREATE SEQUENCE IF NOT EXISTS public.order_no_seq START 1;

-- 2. Set sequence ke nomor order terakhir + 1 (biar gak bentrok)
SELECT setval(
  'public.order_no_seq',
  COALESCE(
    (SELECT MAX(CAST(SPLIT_PART(order_no, '-', 3) AS INTEGER)) FROM public.orders),
    0
  ) + 1,
  false
);

-- 3. Ganti trigger function pake NEXTVAL (atomic, no race condition)
CREATE OR REPLACE FUNCTION public.trg_orders_set_no_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.order_no := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('public.order_no_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$;

-- 4. Hapus trigger lama & bikin ulang
DROP TRIGGER IF EXISTS trg_orders_set_no ON public.orders;
CREATE TRIGGER trg_orders_set_no
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.trg_orders_set_no_func();

-- 5. Verifikasi
SELECT '✅ Fix applied! Sequence starts at: ' || currval('public.order_no_seq') AS result;

-- =============================================================
-- ✅ FIX SELESAI!
-- Sekarang nomor order: ORD-YYYYMMDD-XXXX (unique, no duplicate)
-- =============================================================
