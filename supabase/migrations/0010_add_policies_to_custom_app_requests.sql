-- Enable Row Level Security on 'custom_app_requests' table
ALTER TABLE custom_app_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public INSERT on custom_app_requests
CREATE POLICY "Allow public insert into custom_app_requests" ON custom_app_requests FOR INSERT WITH CHECK (true);