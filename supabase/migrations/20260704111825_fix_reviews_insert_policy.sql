-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "insert_reviews_public" ON reviews;

-- Create a secure INSERT policy that validates the product exists
CREATE POLICY "insert_reviews_for_valid_products" ON reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM products WHERE id = product_id)
  );