/*
  # Create Fees Management System

  1. New Tables
    - `student_fees`
      - `id` (uuid, primary key) - Unique identifier for fee record
      - `student_id` (text) - Foreign key to student_registrations
      - `fee_type` (text) - Type of fee (course, registration, exam, etc.)
      - `amount` (numeric) - Fee amount
      - `due_date` (date) - Payment due date
      - `paid_date` (date, nullable) - Date when payment was made
      - `payment_status` (text) - Status: pending, paid, overdue, partial
      - `paid_amount` (numeric, default 0) - Amount paid so far
      - `payment_method` (text, nullable) - Payment method used
      - `transaction_id` (text, nullable) - Transaction reference
      - `remarks` (text, nullable) - Additional notes
      - `created_at` (timestamptz) - Record creation timestamp
      - `created_by` (text, nullable) - Admin who created the fee record

  2. Security
    - Enable RLS on `student_fees` table
    - Policy for authenticated users to view all fees (admins use separate auth)
    - Policy for authenticated users to manage fees (admins use separate auth)

  3. Indexes
    - Index on student_id for faster queries
    - Index on payment_status for filtering
*/

CREATE TABLE IF NOT EXISTS student_fees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL REFERENCES student_registrations(student_id) ON DELETE CASCADE,
  fee_type text NOT NULL,
  amount numeric NOT NULL CHECK (amount >= 0),
  due_date date NOT NULL,
  paid_date date,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue', 'partial')),
  paid_amount numeric DEFAULT 0 CHECK (paid_amount >= 0),
  payment_method text,
  transaction_id text,
  remarks text,
  created_at timestamptz DEFAULT now(),
  created_by text
);

CREATE INDEX IF NOT EXISTS idx_student_fees_student_id ON student_fees(student_id);
CREATE INDEX IF NOT EXISTS idx_student_fees_payment_status ON student_fees(payment_status);
CREATE INDEX IF NOT EXISTS idx_student_fees_due_date ON student_fees(due_date);

ALTER TABLE student_fees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own fees"
  ON student_fees
  FOR SELECT
  TO authenticated
  USING (
    student_id IN (
      SELECT student_id FROM student_registrations WHERE auth.uid() = id
    )
  );

CREATE POLICY "Authenticated users can view all fees"
  ON student_fees
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert fees"
  ON student_fees
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update fees"
  ON student_fees
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete fees"
  ON student_fees
  FOR DELETE
  TO authenticated
  USING (true);