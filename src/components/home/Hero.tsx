import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { navigate } from '../../lib/router';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16 lg:pt-20">
      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-40 mask-fade-b" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-2xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        {/* Badge */}
        <div className="section-label animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Introducing the 2026 lineup</span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-white animate-fade-up sm:text-6xl lg:text-7xl xl:text-8xl">
          The Future,
          <br />
          <span className="text-gradient-cyan">Delivered.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-300 animate-fade-up [animation-delay:120ms]">
          AI companions, home assistants, and build-it-yourself kits — engineered to live
          alongside you. Designed in-house. Built to last.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 animate-fade-up [animation-delay:240ms] sm:flex-row">
          <button onClick={() => navigate('shop')} className="btn-primary group">
            Shop Robots
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="btn-ghost group">
            <Play className="h-4 w-4 fill-current" />
            Watch Demo
          </button>
        </div>

        {/* Hero visual */}
        <div className="relative mt-16 w-full max-w-3xl animate-fade-up [animation-delay:360ms]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-5xl border border-white/10 bg-ink-850/60 backdrop-blur-xl">
            <img
              src="https://images.pexels.com/photos/8294598/pexels-photo-8294598.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="NEXA robot"
              className="h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
            {/* Floating spec chips */}
            <div className="absolute left-6 top-6 glass rounded-2xl px-4 py-3 text-left animate-float">
              <p className="text-[11px] uppercase tracking-wider text-accent-300">Neural Core M3</p>
              <p className="text-sm font-semibold text-white">On-device AI</p>
            </div>
            <div className="absolute bottom-6 right-6 glass rounded-2xl px-4 py-3 text-left animate-float [animation-delay:1.5s]">
              <p className="text-[11px] uppercase tracking-wider text-accent-300">Battery</p>
              <p className="text-sm font-semibold text-white">18 hr runtime</p>
            </div>
          </div>
          {/* Glow under visual */}
          <div className="absolute -bottom-8 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-accent-400/20 blur-3xl" />
        </div>

        {/* Trust strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs text-ink-400 animate-fade-in [animation-delay:600ms]">
          {['ISO 13482 Safety Certified', '2-Year Warranty', 'Free 30-Day Returns', 'Privacy-First AI'].map(
            (item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
