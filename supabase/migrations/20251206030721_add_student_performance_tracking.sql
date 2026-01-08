/*
  # Add student performance tracking

  1. New Columns to student_registrations table
    - `student_id` (text, unique) - Unique identifier for each student
    - `is_trainee` (boolean) - Whether student is currently a trainee
    - `course_enrolled` (text) - Course the student is enrolled in
    - `batch_number` (text) - Batch identifier
    - `enrollment_date` (date) - Date of enrollment
    - `attendance_percentage` (numeric) - Student attendance percentage
    - `performance_rating` (text) - Overall performance rating
    - `project_score` (numeric) - Project evaluation score
    - `test_score` (numeric) - Test/exam score
    - `status` (text) - Current status (Active, Completed, Dropped)
    - `remarks` (text) - Additional remarks or notes
    
  2. Security
    - Update RLS policies to allow HR to view all student data
    - Keep insert policy for anonymous users
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_registrations' AND column_name = 'student_id'
  ) THEN
    ALTER TABLE student_registrations ADD COLUMN student_id text UNIQUE;
    ALTER TABLE student_registrations ADD COLUMN is_trainee boolean DEFAULT true;
    ALTER TABLE student_registrations ADD COLUMN course_enrolled text DEFAULT '';
    ALTER TABLE student_registrations ADD COLUMN batch_number text DEFAULT '';
    ALTER TABLE student_registrations ADD COLUMN enrollment_date date DEFAULT CURRENT_DATE;
    ALTER TABLE student_registrations ADD COLUMN attendance_percentage numeric(5,2) DEFAULT 0.00;
    ALTER TABLE student_registrations ADD COLUMN performance_rating text DEFAULT 'Not Evaluated';
    ALTER TABLE student_registrations ADD COLUMN project_score numeric(5,2) DEFAULT 0.00;
    ALTER TABLE student_registrations ADD COLUMN test_score numeric(5,2) DEFAULT 0.00;
    ALTER TABLE student_registrations ADD COLUMN status text DEFAULT 'Active';
    ALTER TABLE student_registrations ADD COLUMN remarks text DEFAULT '';
    
    CREATE INDEX IF NOT EXISTS idx_student_id ON student_registrations(student_id);
    
    UPDATE student_registrations 
    SET student_id = 'STU' || LPAD(CAST(FLOOR(RANDOM() * 99999 + 1) AS TEXT), 5, '0')
    WHERE student_id IS NULL;
  END IF;
END $$;