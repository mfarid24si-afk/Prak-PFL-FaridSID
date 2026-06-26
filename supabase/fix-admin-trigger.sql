-- =============================================================
-- FIX: Trigger protect_profile_sensitive now allows role changes
-- when running as superuser (SQL Editor) or as admin user.
-- =============================================================

-- Fix: Tambah pengecekan auth.uid() IS NULL untuk SQL Editor context
CREATE OR REPLACE FUNCTION public.protect_profile_sensitive()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Jika tidak ada auth context (SQL Editor) ATAU user adalah admin → izinkan
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

-- =============================================================
-- SEKARANG jalankan UPDATE ini untuk jadikan admin
-- GANTI email di bawah dengan email kamu!
-- =============================================================
UPDATE public.profiles 
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'email-kamu@example.com'
);

-- Cek hasilnya
SELECT p.id, u.email, p.full_name, p.role, p.points, p.tier
FROM public.profiles p
JOIN auth.users u ON u.id = p.id;
