import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Product, ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useReveal, staggerDelay } from '../lib/router';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const CATEGORIES: { key: ProductCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'companion', label: 'Companions' },
  { key: 'assistant', label: 'Assistants' },
  { key: 'diy', label: 'DIY & Kits' },
  { key: 'education', label: 'Education' },
];

const USE_CASES = ['Home', 'Office', 'Education', 'Hobby', 'Wellness', 'STEM', 'Smart Home'];

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Top Rated' },
];

export function ShopPage({ products }: { products: Product[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [useCase, setUseCase] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('featured');
  const [maxPrice, setMaxPrice] = useState(3500);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (useCase && !p.use_cases.includes(useCase)) return false;
      if (p.price / 100 > maxPrice) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
    return list;
  }, [products, category, useCase, sort, maxPrice]);

  const resetFilters = () => {
    setCategory('all');
    setUseCase(null);
    setMaxPrice(3500);
    setSort('featured');
  };

  return (
    <div className="pt-24 lg:pt-28">
      {/* Header */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-30 mask-fade-b" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <span className="section-label">Shop</span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            All robots
          </h1>
          <p className="mt-4 max-w-lg text-ink-400">
            Browse the full NEXA lineup. Filter by category, use case, and price to find the
            robot built for you.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-16 z-30 border-y border-white/10 bg-ink-950/80 backdrop-blur-2xl lg:top-20">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category pills */}
            <div className="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    category === cat.key
                      ? 'bg-accent-400 text-ink-950 shadow-glow'
                      : 'border border-white/10 bg-white/5 text-ink-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-white/10 bg-ink-850 px-4 py-2 text-sm font-medium text-ink-100 backdrop-blur-md transition-colors hover:border-white/20 focus:border-accent-400/50 focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key} className="bg-ink-850">
                    {s.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowFilters((v) => !v)}
                className={`flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-300 ${
                  showFilters
                    ? 'border-accent-400/40 bg-accent-400/10 text-accent-300'
                    : 'border-white/10 bg-white/5 text-ink-300 hover:bg-white/10'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Expanded filters */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              showFilters ? 'mt-4 max-h-96' : 'max-h-0'
            }`}
          >
            <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-ink-850/60 p-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
              {/* Use case */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-300">
                  Use case
                </p>
                <div className="flex flex-wrap gap-2">
                  {USE_CASES.map((uc) => (
                    <button
                      key={uc}
                      onClick={() => setUseCase((prev) => (prev === uc ? null : uc))}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                        useCase === uc
                          ? 'bg-accent-400 text-ink-950'
                          : 'border border-white/10 bg-white/5 text-ink-300 hover:bg-white/10'
                      }`}
                    >
                      {uc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="lg:w-72">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-300">
                    Max price
                  </p>
                  <span className="text-sm font-semibold text-accent-300">
                    ${maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={3500}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-700 accent-accent-400"
                />
              </div>

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 self-start text-sm text-ink-400 transition-colors hover:text-white lg:self-center"
              >
                <X className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div ref={ref} className="mb-8 flex items-center justify-between">
            <p className="text-sm text-ink-400">
              {filtered.length} {filtered.length === 1 ? 'robot' : 'robots'}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-5xl border border-white/10 bg-ink-850/40 py-24 text-center">
              <p className="font-display text-xl font-semibold text-white">No robots found</p>
              <p className="mt-2 text-sm text-ink-400">Try adjusting your filters.</p>
              <button onClick={resetFilters} className="btn-ghost mt-6">
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  className={`reveal ${visible ? 'is-visible' : ''}`}
                  style={staggerDelay(i % 3)}
                >
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
