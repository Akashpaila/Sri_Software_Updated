/*
  # Add Profile Photo Column to Student Registrations

  1. Changes
    - Add `profile_photo_url` column to `student_registrations` table to store student profile photos
    
  2. Details
    - Column: `profile_photo_url` (text, nullable)
    - Default: empty string
    - Students can upload and update their profile photos
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_registrations' AND column_name = 'profile_photo_url'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN profile_photo_url text DEFAULT '';
  END IF;
END $$;
