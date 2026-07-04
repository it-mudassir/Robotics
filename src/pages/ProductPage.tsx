import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Shield,
  Star,
  Truck,
  Zap,
} from 'lucide-react';
import type { Product, Review } from '../types';
import { CATEGORY_LABELS, formatPrice } from '../types';
import { useProduct, useReviews, submitReview } from '../lib/hooks';
import { Link, navigate, useReveal, staggerDelay } from '../lib/router';
import { useCart } from '../lib/cart';
import { ProductCard } from '../components/ProductCard';

export function ProductPage({
  slug,
  allProducts,
}: {
  slug: string;
  allProducts: Product[];
}) {
  const { product, loading, error } = useProduct(slug);
  const { reviews, loading: reviewsLoading } = useReviews(product?.id);
  const { addItem, openCart } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImage(0);
    setColor(0);
    setQuantity(1);
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-accent-400" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-24 text-center">
        <p className="font-display text-2xl font-bold text-white">Robot not found</p>
        <p className="text-ink-400">The product you are looking for does not exist.</p>
        <button onClick={() => navigate('shop')} className="btn-primary">
          Back to shop
        </button>
      </div>
    );
  }

  const related = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <nav className="flex items-center gap-2 text-sm text-ink-400">
          <Link to="home" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="shop" className="transition-colors hover:text-white">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-ink-200">{CATEGORY_LABELS[product.category]}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-5xl border border-white/10 bg-ink-850/60 backdrop-blur-xl">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover animate-fade-in"
                key={activeImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
              {product.badge && (
                <span className="absolute left-5 top-5 rounded-full border border-accent-400/30 bg-ink-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-300 backdrop-blur-md">
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square w-20 overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                      i === activeImage
                        ? 'border-accent-400 shadow-glow'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="chip w-fit">{CATEGORY_LABELS[product.category]}</span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-ink-300">{product.tagline}</p>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(product.rating)
                        ? 'fill-accent-400 text-accent-400'
                        : 'text-ink-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-ink-400">
                {product.rating.toFixed(1)} · {product.review_count} reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-white">
                {formatPrice(product.price)}
              </span>
              {product.compare_at_price && (
                <span className="text-lg text-ink-500 line-through">
                  {formatPrice(product.compare_at_price)}
                </span>
              )}
              {product.compare_at_price && (
                <span className="rounded-full bg-accent-400/15 px-2.5 py-1 text-xs font-semibold text-accent-300">
                  Save {formatPrice(product.compare_at_price - product.price)}
                </span>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-ink-300">{product.description}</p>

            {/* Color selector */}
            <div className="mt-8">
              <p className="text-sm font-semibold text-white">
                Color — <span className="text-ink-400">{product.colors[color]?.name}</span>
              </p>
              <div className="mt-3 flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(i)}
                    className={`relative h-11 w-11 rounded-full transition-all duration-300 ${
                      i === color
                        ? 'ring-2 ring-accent-400 ring-offset-2 ring-offset-ink-950'
                        : 'ring-1 ring-white/15 hover:ring-white/30'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  >
                    {i === color && (
                      <Check
                        className="absolute inset-0 m-auto h-5 w-5"
                        style={{
                          color: parseInt(c.hex.slice(1), 16) > 0x999999 ? '#0b0d10' : '#fff',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + buy */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  addItem(product, product.colors[color]?.name ?? 'Default', quantity);
                }}
                className="btn-primary flex-1"
              >
                Add to Cart · {formatPrice(product.price * quantity)}
              </button>
            </div>
            <button
              onClick={() => {
                addItem(product, product.colors[color]?.name ?? 'Default', quantity);
                openCart();
              }}
              className="btn-ghost mt-3 w-full"
            >
              Buy Now
            </button>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Free shipping' },
                { icon: Shield, label: '2-year warranty' },
                { icon: Zap, label: 'Ships in 48hr' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center"
                >
                  <item.icon className="h-5 w-5 text-accent-300" />
                  <span className="text-xs text-ink-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="rounded-5xl border border-white/10 bg-ink-850/40 p-8 backdrop-blur-xl sm:p-12">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Key features
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-400/15 text-accent-300">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </div>
                <p className="text-sm text-ink-200">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
          Technical specs
        </h2>
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full">
            <tbody>
              {Object.entries(product.specs).map(([key, value], i) => (
                <tr
                  key={key}
                  className={i % 2 === 0 ? 'bg-ink-850/40' : 'bg-ink-900/40'}
                >
                  <td className="w-1/3 px-6 py-4 text-sm font-medium capitalize text-ink-300">
                    {key}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reviews */}
      <ReviewSection productId={product.id} reviews={reviews} loading={reviewsLoading} productRating={product.rating} />

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              You might also like
            </h2>
            <Link
              to="shop"
              className="group flex items-center gap-2 text-sm font-semibold text-accent-300 hover:text-accent-200"
            >
              View all
              <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ReviewSection({
  productId,
  reviews,
  loading,
  productRating,
}: {
  productId: string;
  reviews: Review[];
  loading: boolean;
  productRating: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ author_name: '', rating: 5, title: '', body: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);

  useEffect(() => {
    setLocalReviews(reviews);
  }, [reviews]);

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: localReviews.filter((r) => r.rating === star).length,
  }));
  const totalReviews = localReviews.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const { error } = await submitReview(productId, form);
    if (error) {
      setSubmitError(error);
      setSubmitting(false);
      return;
    }
    setLocalReviews((prev) => [
      {
        id: crypto.randomUUID(),
        product_id: productId,
        author_name: form.author_name,
        rating: form.rating,
        title: form.title,
        body: form.body,
        verified: false,
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);
    setForm({ author_name: '', rating: 5, title: '', body: '' });
    setShowForm(false);
    setSubmitting(false);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Customer reviews
          </h2>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="btn-ghost"
          >
            {showForm ? 'Cancel' : 'Write a review'}
          </button>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-8 rounded-5xl border border-white/10 bg-ink-850/40 p-8 backdrop-blur-xl sm:grid-cols-[auto_1fr] sm:p-10">
          <div className="flex flex-col items-center justify-center text-center sm:border-r sm:border-white/10 sm:pr-10">
            <p className="font-display text-6xl font-bold text-white">
              {productRating.toFixed(1)}
            </p>
            <div className="mt-2 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(productRating)
                      ? 'fill-accent-400 text-accent-400'
                      : 'text-ink-600'
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-ink-400">
              {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="flex w-12 items-center gap-1 text-sm text-ink-300">
                  {star} <Star className="h-3 w-3 fill-accent-400 text-accent-400" />
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-accent-400 transition-all duration-700"
                    style={{
                      width: totalReviews ? `${(count / totalReviews) * 100}%` : '0%',
                    }}
                  />
                </div>
                <span className="w-8 text-right text-sm text-ink-400">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-5xl border border-white/10 bg-ink-850/60 p-8 backdrop-blur-xl animate-fade-up"
          >
            <h3 className="font-display text-xl font-bold text-white">Share your experience</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-300">
                  Name
                </label>
                <input
                  required
                  value={form.author_name}
                  onChange={(e) => setForm({ ...form, author_name: e.target.value })}
                  className="input-futuristic mt-2"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-ink-300">
                  Rating
                </label>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      aria-label={`${star} stars`}
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          star <= form.rating
                            ? 'fill-accent-400 text-accent-400'
                            : 'text-ink-600 hover:text-ink-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-ink-300">
                Title
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input-futuristic mt-2"
                placeholder="Summarize your review"
              />
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-ink-300">
                Review
              </label>
              <textarea
                required
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={4}
                className="mt-2 w-full rounded-3xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-ink-100 placeholder:text-ink-400 backdrop-blur-md transition-all focus:border-accent-400/60 focus:outline-none focus:ring-2 focus:ring-accent-400/30"
                placeholder="What did you think?"
              />
            </div>
            {submitError && (
              <p className="mt-4 text-sm text-red-400">{submitError}</p>
            )}
            <button type="submit" disabled={submitting} className="btn-primary mt-6">
              {submitting ? 'Submitting...' : 'Submit review'}
            </button>
          </form>
        )}

        {/* Review list */}
        <div className="mt-8 space-y-4">
          {loading ? (
            <p className="text-ink-400">Loading reviews...</p>
          ) : localReviews.length === 0 ? (
            <p className="text-ink-400">No reviews yet. Be the first to share your experience.</p>
          ) : (
            localReviews.map((review, i) => (
              <div
                key={review.id}
                className="rounded-3xl border border-white/10 bg-ink-850/40 p-6 backdrop-blur-xl"
                style={staggerDelay(i)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-electric-500 font-display text-sm font-bold text-ink-950">
                        {review.author_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{review.author_name}</p>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-xs text-accent-300">
                            <Check className="h-3 w-3" /> Verified buyer
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'fill-accent-400 text-accent-400'
                            : 'text-ink-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h4 className="mt-4 font-display font-semibold text-white">{review.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{review.body}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
