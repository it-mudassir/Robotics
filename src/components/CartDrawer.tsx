import { useEffect, useState } from 'react';
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../lib/cart';
import { Link, navigate } from '../lib/router';
import { formatPrice } from '../types';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, count, clear } = useCart();
  const [checkout, setCheckout] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCheckout('idle');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-900/95 backdrop-blur-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-accent-300" />
            <h2 className="font-display text-lg font-semibold text-white">
              Your Cart {count > 0 && <span className="text-ink-400">({count})</span>}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        {checkout === 'success' ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-400/15 text-accent-300 shadow-glow">
              <Check className="h-10 w-10" strokeWidth={2.5} />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-white">Order Confirmed</h3>
            <p className="mt-2 text-sm text-ink-400">
              Your robots are being prepared for launch. A confirmation has been sent to your
              email.
            </p>
            <button
              onClick={() => {
                clear();
                closeCart();
                navigate('home');
              }}
              className="btn-primary mt-8"
            >
              Continue Shopping
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-400">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-white">
              Your cart is empty
            </h3>
            <p className="mt-2 text-sm text-ink-400">
              Discover robots designed to live alongside you.
            </p>
            <button
              onClick={() => {
                closeCart();
                navigate('shop');
              }}
              className="btn-primary mt-8"
            >
              Explore Robots
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.color}`}
                  className="flex gap-4 rounded-3xl border border-white/10 bg-ink-850/60 p-4"
                >
                  <Link
                    to={`product/${item.slug}`}
                    onClick={closeCart}
                    className="shrink-0 overflow-hidden rounded-2xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          to={`product/${item.slug}`}
                          onClick={closeCart}
                          className="font-display text-sm font-semibold text-white hover:text-accent-300"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-400">{item.color}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId, item.color)}
                        className="text-ink-400 transition-colors hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.color, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.color, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-300">Subtotal</span>
                <span className="font-display text-xl font-bold text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-400">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={() => setCheckout('success')}
                className="btn-primary mt-4 w-full"
              >
                Checkout
              </button>
              <button
                onClick={closeCart}
                className="mt-2 w-full text-center text-xs text-ink-400 transition-colors hover:text-white"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
