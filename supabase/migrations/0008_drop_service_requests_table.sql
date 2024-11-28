-- Migration script to drop 'service_requests' table and related policies

-- Drop policies on 'service_requests' table
DROP POLICY IF EXISTS "Allow users to insert service requests" ON service_requests;
DROP POLICY IF EXISTS "Allow admins to select all service requests" ON service_requests;
DROP POLICY IF EXISTS "Allow users to select own service requests" ON service_requests;

-- Disable Row Level Security on 'service_requests' table
ALTER TABLE service_requests DISABLE ROW LEVEL SECURITY;

-- Drop 'service_requests' table
DROP TABLE IF EXISTS service_requests;