export type ProductCategory = 'companion' | 'assistant' | 'diy' | 'education';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // cents
  compare_at_price: number | null;
  category: ProductCategory;
  use_cases: string[];
  specs: Record<string, string>;
  features: string[];
  colors: ProductColor[];
  images: string[];
  rating: number;
  review_count: number;
  badge: string | null;
  featured: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  created_at: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  companion: 'Companion',
  assistant: 'Assistant',
  diy: 'DIY & Kits',
  education: 'Education',
};

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
