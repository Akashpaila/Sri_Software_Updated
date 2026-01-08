/*
  # Add Trainer Assignment Tracking
  
  1. Changes
    - Add `assigned_by` column to `student_projects` table to track which trainer assigned the project
    - Add `assigned_by` column to `student_tasks` table to track which trainer assigned the task
    - Add `assigned_by` column to `student_notes` table to track which trainer created the note
    - This ensures only trainers can create/assign projects, tasks, and notes to students
  
  2. Notes
    - The `assigned_by` field will store the trainer's identifier (could be trainer name or ID)
    - Students cannot create these records themselves - only trainers can assign them
*/

-- Add assigned_by column to student_projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_projects' AND column_name = 'assigned_by'
  ) THEN
    ALTER TABLE student_projects ADD COLUMN assigned_by text DEFAULT '';
  END IF;
END $$;

-- Add assigned_by column to student_tasks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_tasks' AND column_name = 'assigned_by'
  ) THEN
    ALTER TABLE student_tasks ADD COLUMN assigned_by text DEFAULT '';
  END IF;
END $$;

-- Add assigned_by column to student_notes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'student_notes' AND column_name = 'assigned_by'
  ) THEN
    ALTER TABLE student_notes ADD COLUMN assigned_by text DEFAULT '';
  END IF;
END $$;