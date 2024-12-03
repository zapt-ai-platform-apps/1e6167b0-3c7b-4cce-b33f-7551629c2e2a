-- Migration script to drop 'custom_app_requests' table and related policies

-- Drop policies on 'custom_app_requests' table
DROP POLICY IF EXISTS "Allow public insert into custom_app_requests" ON custom_app_requests;

-- Disable Row Level Security on 'custom_app_requests' table
ALTER TABLE custom_app_requests DISABLE ROW LEVEL SECURITY;

-- Drop 'custom_app_requests' table
DROP TABLE IF EXISTS custom_app_requests;