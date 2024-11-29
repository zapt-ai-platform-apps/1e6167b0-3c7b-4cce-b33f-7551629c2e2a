CREATE TABLE join_team_requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security on 'join_team_requests' table
ALTER TABLE join_team_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public INSERT into join_team_requests
CREATE POLICY "Allow public insert into join_team_requests" ON join_team_requests FOR INSERT WITH CHECK (true);