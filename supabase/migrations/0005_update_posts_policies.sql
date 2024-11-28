-- Update the SELECT policy to allow all users to read posts
ALTER POLICY "Allow public select on posts" ON posts USING (true);

-- Ensure the policies are numbered correctly
-- This is the 5th migration script