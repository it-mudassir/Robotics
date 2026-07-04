import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { useReveal } from '../../lib/router';

export function Newsletter() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal relative overflow-hidden rounded-5xl border border-white/10 bg-ink-850/60 p-8 backdrop-blur-xl sm:p-14 lg:p-20 ${visible ? 'is-visible' : ''}`}
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-[500px] -translate-x-1/2 rounded-full bg-accent-400/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:40px_40px] opacity-20" />

          <div className="relative text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-400/10 text-accent-300 shadow-glow">
              <Mail className="h-7 w-7" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Join the future, early.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ink-400">
              Be first to hear about new robots, exclusive drops, and early-access pricing. No
              spam — just the good stuff.
            </p>

            {submitted ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-full border border-accent-400/30 bg-accent-400/10 px-6 py-4 text-accent-300 animate-fade-up">
                <Check className="h-5 w-5" />
                <span className="font-medium">You are on the list. Welcome aboard.</span>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="input-futuristic flex-1"
                />
                <button type="submit" className="btn-primary group whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
            <p className="mt-4 text-xs text-ink-500">
              By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
