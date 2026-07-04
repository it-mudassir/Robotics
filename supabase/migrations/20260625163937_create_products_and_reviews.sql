-- Products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL, -- in cents
  compare_at_price integer,
  category text NOT NULL, -- 'companion' | 'assistant' | 'diy' | 'education'
  use_cases text[] NOT NULL DEFAULT '{}',
  specs jsonb NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  colors jsonb NOT NULL DEFAULT '[]', -- [{name, hex}]
  images text[] NOT NULL DEFAULT '{}',
  rating numeric(2,1) NOT NULL DEFAULT 0,
  review_count integer NOT NULL DEFAULT 0,
  badge text, -- 'New' | 'Bestseller' | 'Limited'
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title text NOT NULL,
  body text NOT NULL,
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_all_products" ON products FOR SELECT
  TO anon, authenticated USING (true);
CREATE POLICY "read_all_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

-- Allow anyone to submit reviews (public e-commerce)
CREATE POLICY "insert_reviews_public" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);
