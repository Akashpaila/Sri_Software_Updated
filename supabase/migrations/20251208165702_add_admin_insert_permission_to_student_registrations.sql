/*
  # Add Admin Insert Permission to Student Registrations

  1. Changes
    - Add INSERT policy for authenticated users (admins) to create student registrations
    - Add UPDATE policy for authenticated users (admins) to modify student registrations
  
  2. Security
    - Only authenticated users (logged in admins) can insert and update student records
    - Anonymous users can still submit registrations through the public form
    - All users can read registrations (needed for login)
*/

CREATE POLICY "Authenticated users can insert student registrations"
  ON student_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update student registrations"
  ON student_registrations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);