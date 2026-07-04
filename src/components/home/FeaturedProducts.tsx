import { ArrowRight } from 'lucide-react';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import { Link, useReveal, staggerDelay } from '../../lib/router';

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end ${visible ? 'is-visible' : ''}`}
        >
          <div>
            <span className="section-label">Featured</span>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Meet the lineup
            </h2>
            <p className="mt-4 max-w-md text-ink-400">
              From AI companions to build-it-yourself kits — every NEXA robot is engineered to
              feel like a genuine presence in your life.
            </p>
          </div>
          <Link
            to="shop"
            className="group flex items-center gap-2 text-sm font-semibold text-accent-300 transition-colors hover:text-accent-200"
          >
            View all robots
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <div
              key={product.id}
              className={`reveal ${visible ? 'is-visible' : ''}`}
              style={staggerDelay(i)}
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
