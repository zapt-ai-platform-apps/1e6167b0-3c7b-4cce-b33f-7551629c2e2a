CREATE TABLE app_ratings (
  id SERIAL PRIMARY KEY,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security on 'app_ratings' table
ALTER TABLE app_ratings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public INSERT into app_ratings
CREATE POLICY "Allow public insert into app_ratings" ON app_ratings FOR INSERT WITH CHECK (true);