/*
  # Fix Function Search Path Security

  1. Security Updates
    - Recreate `set_default_password` function with immutable search_path
    - This prevents search_path injection attacks
    - Sets explicit search_path to public schema only
  
  2. Changes
    - Drop and recreate the function with SECURITY DEFINER and explicit search_path
    - Maintains same functionality (sets default password to last 4 digits of mobile)
*/

-- Drop existing function
DROP FUNCTION IF EXISTS public.set_default_password() CASCADE;

-- Recreate with secure search_path
CREATE OR REPLACE FUNCTION public.set_default_password()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.password IS NULL OR NEW.password = '' THEN
    NEW.password := RIGHT(NEW.mobile_number, 4);
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS set_password_on_insert ON public.student_registrations;

CREATE TRIGGER set_password_on_insert
  BEFORE INSERT ON public.student_registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.set_default_password();
