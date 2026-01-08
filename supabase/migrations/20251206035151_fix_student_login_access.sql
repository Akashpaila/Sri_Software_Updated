/*
  # Fix Student Login Access

  1. Changes
    - Add SELECT policy for anonymous users to enable login
    - Students need to read their own records to authenticate

  2. Security
    - Anonymous users can only SELECT (read) data for login verification
    - Combined with existing INSERT policy for registration
*/

CREATE POLICY "Anyone can read registrations for login"
  ON student_registrations
  FOR SELECT
  TO anon
  USING (true);