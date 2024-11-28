-- Enable Row Level Security on 'service_requests' table
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own service requests
CREATE POLICY "Allow users to insert service requests" ON service_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow admin to select all service requests
CREATE POLICY "Allow admins to select all service requests" ON service_requests FOR SELECT
  USING (auth.email() = 'daoudi.abdennour@gmail.com');

-- Allow users to select their own service requests
CREATE POLICY "Allow users to select own service requests" ON service_requests FOR SELECT
  USING (auth.uid() = user_id);