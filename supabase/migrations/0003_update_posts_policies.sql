-- Revoke existing policies
DROP POLICY IF EXISTS "Allow public insert on posts" ON posts;
DROP POLICY IF EXISTS "Allow public update on posts" ON posts;
DROP POLICY IF EXISTS "Allow public delete on posts" ON posts;

-- Create policy to allow only admin to INSERT
CREATE POLICY "Admins can insert posts" ON posts FOR INSERT
  USING (auth.email() = 'daoudi.abdennour@gmail.com')
  WITH CHECK (auth.email() = 'daoudi.abdennour@gmail.com');

-- Create policy to allow only admin to UPDATE
CREATE POLICY "Admins can update posts" ON posts FOR UPDATE
  USING (auth.email() = 'daoudi.abdennour@gmail.com')
  WITH CHECK (auth.email() = 'daoudi.abdennour@gmail.com');

-- Create policy to allow only admin to DELETE
CREATE POLICY "Admins can delete posts" ON posts FOR DELETE
  USING (auth.email() = 'daoudi.abdennour@gmail.com');

-- Ensure that SELECT is allowed for all
-- No change needed for SELECT policy