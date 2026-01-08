/*
  # Enhanced Student Registration Fields

  1. Changes
    - Add email field for student contact
    - Add degree_type field (Bachelor's, Master's, Diploma, etc.)
    - Add branch_specialization field (Computer Science, IT, etc.)
    - Add year_of_graduation field
    - Add university_board field
    - Add previous_education field (for 12th/intermediate details)
    - Add gender field
    - Add date_of_birth field
    - Add father_name field
    - Add mother_name field
    - Add permanent_address field
    - Add current_address field
    - Add emergency_contact_name field
    - Add emergency_contact_number field
    - Add blood_group field
    - Add alternate_mobile_number field
    
  2. Notes
    - All new fields are optional and allow NULL values
    - Existing data will not be affected
*/

-- Add new columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'email'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'degree_type'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN degree_type text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'branch_specialization'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN branch_specialization text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'year_of_graduation'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN year_of_graduation text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'university_board'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN university_board text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'previous_education'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN previous_education text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'gender'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN gender text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'date_of_birth'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN date_of_birth date;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'father_name'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN father_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'mother_name'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN mother_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'permanent_address'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN permanent_address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'current_address'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN current_address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'emergency_contact_name'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN emergency_contact_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'emergency_contact_number'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN emergency_contact_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'blood_group'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN blood_group text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'student_registrations' AND column_name = 'alternate_mobile_number'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN alternate_mobile_number text;
  END IF;
END $$;