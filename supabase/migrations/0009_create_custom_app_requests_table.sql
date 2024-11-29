CREATE TABLE custom_app_requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);