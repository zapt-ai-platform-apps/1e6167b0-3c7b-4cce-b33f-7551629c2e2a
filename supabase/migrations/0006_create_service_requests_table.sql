CREATE TABLE service_requests (
  id SERIAL PRIMARY KEY,
  service_name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users (id),
  user_email TEXT NOT NULL,
  user_name TEXT,
  details TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);