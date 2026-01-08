/*
  # Add Password Field to Student Registrations

  1. Changes
    - Add `password` column to `student_registrations` table
    - Set default password as last 4 digits of mobile number for existing records
    - Allow students to change password later

  2. Notes
    - Default password: Last 4 digits of mobile number
    - Students can change this after first login
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_registrations' AND column_name = 'password'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN password text DEFAULT '1234';
  END IF;
END $$;

UPDATE student_registrations
SET password = RIGHT(mobile_number, 4)
WHERE password = '1234' OR password IS NULL;