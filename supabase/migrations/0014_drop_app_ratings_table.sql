-- Migration script to drop 'app_ratings' table and related policies

-- Drop policies on 'app_ratings' table
DROP POLICY IF EXISTS "Allow public insert into app_ratings" ON app_ratings;

-- Disable Row Level Security on 'app_ratings' table
ALTER TABLE app_ratings DISABLE ROW LEVEL SECURITY;

-- Drop 'app_ratings' table
DROP TABLE IF EXISTS app_ratings;