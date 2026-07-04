import { useEffect, useState } from 'react';
import { Bot, Menu, ShoppingBag, X } from 'lucide-react';
import { Link, navigate, type Route } from '../lib/router';
import { useCart } from '../lib/cart';

export function Navbar({ route }: { route: Route }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: 'home' },
    { label: 'Shop', to: 'shop' },
    { label: 'Companions', to: 'shop' },
    { label: 'Kits', to: 'shop' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
        {/* Logo */}
        <Link to="home" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-electric-500 shadow-glow transition-transform duration-300 group-hover:scale-105">
            <Bot className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            NEXA
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              (link.to === 'home' && route.name === 'home') ||
              (link.to === 'shop' && route.name === 'shop') ||
              (link.to === 'shop' && route.name === 'product');
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  active ? 'text-white' : 'text-ink-300 hover:text-white'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 backdrop-blur-md transition-all duration-300 hover:border-accent-400/40 hover:bg-white/10"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-400 px-1 text-[11px] font-bold text-ink-950 shadow-glow">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-100 backdrop-blur-md transition-colors hover:bg-white/10 md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-ink-950/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          mobileOpen ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-ink-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              navigate('shop');
            }}
            className="btn-primary mt-2 w-full"
          >
            Shop Robots
          </button>
        </div>
      </div>
    </header>
  );
}
