-- =============================================================
-- DIAGNOSTIC + FIX: Check & Set Admin Role + Fix RLS
-- =============================================================
-- Jalankan SEMUA script ini di Supabase SQL Editor
-- =============================================================

-- ==================== DIAGNOSTIK ====================

-- 1. Lihat semua user yang terdaftar
SELECT '--- AUTH USERS ---' AS info;
SELECT id, email, raw_user_meta_data->>'full_name' AS full_name, created_at
FROM auth.users
ORDER BY created_at DESC;

-- 2. Lihat profile user dan role-nya
SELECT '--- PROFILES ---' AS info;
SELECT p.id, u.email, p.full_name, p.role, p.points, p.tier
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
ORDER BY p.created_at DESC;

-- 3. Cek RLS policies yang aktif
SELECT '--- RLS POLICIES ---' AS info;
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 4. Cek trigger yang aktif
SELECT '--- TRIGGERS ---' AS info;
SELECT trigger_name, event_manipulation, event_object_table, action_timing
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- ==================== FIX: SET ADMIN ====================

-- Matikan trigger dulu biar aman
ALTER TABLE public.profiles DISABLE TRIGGER trg_protect_profile_sensitive;

-- GANTI EMAIL INI dengan email akun kamu!
UPDATE public.profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@example.com');

-- Nyalakan lagi triggernya
ALTER TABLE public.profiles ENABLE TRIGGER trg_protect_profile_sensitive;

-- ==================== VERIFIKASI ====================

-- 5. Verifikasi role sudah berubah
SELECT '--- VERIFIKASI (cek role) ---' AS info;
SELECT u.email, p.full_name, p.role, p.points, p.tier
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.role = 'admin';

-- =============================================================
-- ✅ Selesai! 
-- Langkah selanjutnya di app:
-- 1. Clear cache (F12 → right-click refresh → Empty Cache & Hard Reload)
-- 2. Logout dari app (klik Logout di sidebar)
-- 3. Login lagi dengan email yang di-set sebagai admin
-- 4. Sidebar akan muncul menu Users + Customers
-- =============================================================
