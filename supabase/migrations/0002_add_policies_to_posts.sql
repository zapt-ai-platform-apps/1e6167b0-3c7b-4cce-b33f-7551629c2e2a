-- Enable Row Level Security on 'posts' table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public SELECT on posts
CREATE POLICY "Allow public select on posts" ON posts FOR SELECT USING (true);

-- Create policy to allow public INSERT on posts
CREATE POLICY "Allow public insert on posts" ON posts FOR INSERT WITH CHECK (true);

-- Create policy to allow public UPDATE on posts
CREATE POLICY "Allow public update on posts" ON posts FOR UPDATE USING (true);

-- Create policy to allow public DELETE on posts
CREATE POLICY "Allow public delete on posts" ON posts FOR DELETE USING (true);