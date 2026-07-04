import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type { Product, Review } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!active) return;
      if (error) setError(error.message);
      else setProducts((data as Product[]) ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (!active) return;
      if (error) setError(error.message);
      else setProduct((data as Product) ?? null);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  return { product, loading, error };
}

export function useReviews(productId: string | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });
      if (!active) return;
      setReviews((data as Review[]) ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [productId]);

  return { reviews, loading };
}

export async function submitReview(
  productId: string,
  review: { author_name: string; rating: number; title: string; body: string }
): Promise<{ error: string | null }> {
  const { error } = await supabase.from('reviews').insert({
    product_id: productId,
    author_name: review.author_name,
    rating: review.rating,
    title: review.title,
    body: review.body,
    verified: false,
  });
  return { error: error?.message ?? null };
}
