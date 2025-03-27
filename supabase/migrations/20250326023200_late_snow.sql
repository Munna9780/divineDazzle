/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `width` (numeric)
      - `height` (numeric)
      - `price` (numeric)
      - `affiliate_link` (text)
      - `image_url` (text)
      - `created_at` (timestamp with time zone)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `products` table
    - Add policies for:
      - Anyone can view products
      - Only authenticated users can insert products
      - Only product owners can update/delete their products
*/

CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  width numeric NOT NULL,
  height numeric NOT NULL,
  price numeric NOT NULL,
  affiliate_link text,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert products
CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own products
CREATE POLICY "Users can update own products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own products
CREATE POLICY "Users can delete own products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);