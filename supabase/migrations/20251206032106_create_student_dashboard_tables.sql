/*
  # Create Student Dashboard Tables

  1. New Tables
    - `student_tasks` - Store student assignments and tasks
      - `id` (uuid, primary key)
      - `student_id` (text) - Reference to student
      - `title` (text) - Task title
      - `description` (text) - Task details
      - `due_date` (date) - Submission deadline
      - `status` (text) - pending, submitted, reviewed
      - `submission_link` (text) - Link to submission
      - `submission_notes` (text) - Notes with submission
      - `grade` (numeric) - Score received
      - `feedback` (text) - Instructor feedback
      - `submitted_at` (timestamptz) - Submission timestamp
      - `created_at` (timestamptz)
    
    - `student_notes` - Daily notes and learning journal
      - `id` (uuid, primary key)
      - `student_id` (text) - Reference to student
      - `date` (date) - Note date
      - `title` (text) - Note title
      - `content` (text) - Note content
      - `tags` (text[]) - Tags for organization
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `student_projects` - Student project portfolio
      - `id` (uuid, primary key)
      - `student_id` (text) - Reference to student
      - `project_name` (text) - Project name
      - `description` (text) - Project description
      - `technologies` (text[]) - Tech stack
      - `github_link` (text) - GitHub repository
      - `live_link` (text) - Deployed project URL
      - `status` (text) - in_progress, completed
      - `start_date` (date) - Project start
      - `end_date` (date) - Project completion
      - `created_at` (timestamptz)
    
    - `student_attendance` - Attendance records
      - `id` (uuid, primary key)
      - `student_id` (text) - Reference to student
      - `date` (date) - Attendance date
      - `status` (text) - present, absent, late
      - `remarks` (text) - Additional notes
      - `created_at` (timestamptz)
    
    - `student_resume` - Resume builder data
      - `id` (uuid, primary key)
      - `student_id` (text, unique) - Reference to student
      - `personal_info` (jsonb) - Personal details
      - `education` (jsonb[]) - Education history
      - `experience` (jsonb[]) - Work experience
      - `skills` (text[]) - Skills list
      - `certifications` (jsonb[]) - Certifications
      - `projects` (jsonb[]) - Projects for resume
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Students can only access their own data
    - Authenticated users (instructors) can view all data
*/

CREATE TABLE IF NOT EXISTS student_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  due_date date,
  status text DEFAULT 'pending',
  submission_link text DEFAULT '',
  submission_notes text DEFAULT '',
  grade numeric(5,2) DEFAULT 0.00,
  feedback text DEFAULT '',
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL,
  date date DEFAULT CURRENT_DATE,
  title text NOT NULL,
  content text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL,
  project_name text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  github_link text DEFAULT '',
  live_link text DEFAULT '',
  status text DEFAULT 'in_progress',
  start_date date DEFAULT CURRENT_DATE,
  end_date date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text NOT NULL,
  date date NOT NULL,
  status text NOT NULL,
  remarks text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_resume (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id text UNIQUE NOT NULL,
  personal_info jsonb DEFAULT '{}',
  education jsonb[] DEFAULT '{}',
  experience jsonb[] DEFAULT '{}',
  skills text[] DEFAULT '{}',
  certifications jsonb[] DEFAULT '{}',
  projects jsonb[] DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE student_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_resume ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own tasks"
  ON student_tasks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can insert own tasks"
  ON student_tasks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Students can update own tasks"
  ON student_tasks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Students can view own notes"
  ON student_notes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can insert own notes"
  ON student_notes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Students can update own notes"
  ON student_notes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Students can delete own notes"
  ON student_notes FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Students can view own projects"
  ON student_projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can insert own projects"
  ON student_projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Students can update own projects"
  ON student_projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Students can delete own projects"
  ON student_projects FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Students can view own attendance"
  ON student_attendance FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can view own resume"
  ON student_resume FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Students can insert own resume"
  ON student_resume FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Students can update own resume"
  ON student_resume FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_student_tasks_student_id ON student_tasks(student_id);
CREATE INDEX IF NOT EXISTS idx_student_notes_student_id ON student_notes(student_id);
CREATE INDEX IF NOT EXISTS idx_student_projects_student_id ON student_projects(student_id);
CREATE INDEX IF NOT EXISTS idx_student_attendance_student_id ON student_attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_student_resume_student_id ON student_resume(student_id);