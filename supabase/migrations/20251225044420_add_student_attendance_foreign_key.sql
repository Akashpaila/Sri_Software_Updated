/*
  # Add Foreign Key Constraint to Student Attendance

  1. Changes
    - Add foreign key constraint linking `student_attendance.student_id` to `student_registrations.student_id`
    - This enables proper joins between attendance records and student information
    
  2. Security
    - Maintains existing RLS policies
    - Ensures data integrity with referential constraints
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'student_attendance_student_id_fkey' 
    AND table_name = 'student_attendance'
  ) THEN
    ALTER TABLE student_attendance
    ADD CONSTRAINT student_attendance_student_id_fkey
    FOREIGN KEY (student_id)
    REFERENCES student_registrations(student_id)
    ON DELETE CASCADE;
  END IF;
END $$;
