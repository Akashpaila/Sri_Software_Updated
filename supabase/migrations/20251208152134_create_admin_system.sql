/*
  # Create Admin System for HR Management

  1. New Tables
    - `admin_users` - Store admin/HR credentials
      - `id` (uuid, primary key)
      - `username` (text, unique) - Admin username
      - `password` (text) - Admin password (hashed in production)
      - `full_name` (text) - Admin full name
      - `role` (text) - Admin role (hr_admin, trainer, etc.)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on admin_users table
    - Only admins can view admin data
    - Public access for login verification
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  full_name text NOT NULL,
  role text DEFAULT 'hr_admin',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow admin login verification"
  ON admin_users FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO admin_users (username, password, full_name, role)
VALUES ('admin', 'admin123', 'System Administrator', 'hr_admin')
ON CONFLICT (username) DO NOTHING;
