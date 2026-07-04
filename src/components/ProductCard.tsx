import { useRef } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice } from '../types';
import { Link } from '../lib/router';
import { useCart } from '../lib/cart';
import { CATEGORY_LABELS } from '../types';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className="card-glow group flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <Link to={`product/${product.slug}`} className="relative block overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full border border-accent-400/30 bg-ink-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-300 backdrop-blur-md">
              {product.badge}
            </span>
          )}
          <span className="absolute right-4 top-4 chip backdrop-blur-md">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`product/${product.slug}`}>
              <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-accent-300">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-ink-400">{product.tagline}</p>
          </div>
          <Link
            to={`product/${product.slug}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-all duration-300 group-hover:border-accent-400/40 group-hover:text-accent-300"
            aria-label={`View ${product.name}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Spec line */}
        <p className="mt-4 text-xs text-ink-300">
          {Object.values(product.specs).slice(0, 3).join('  ·  ')}
        </p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-3.5 w-3.5 ${
                  star <= Math.round(product.rating) ? 'text-accent-400' : 'text-ink-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.957z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-ink-400">
            {product.rating.toFixed(1)} ({product.review_count})
          </span>
        </div>

        {/* Price + add */}
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-sm text-ink-500 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
          <button
            onClick={() => addItem(product, product.colors[0]?.name ?? 'Default')}
            className="group/btn flex h-11 w-11 items-center justify-center rounded-full bg-accent-400 text-ink-950 shadow-glow transition-all duration-300 hover:bg-accent-300 hover:scale-105 active:scale-95"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-5 w-5 transition-transform group-hover/btn:rotate-90" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
