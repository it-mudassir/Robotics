import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useReveal } from '../../lib/router';

const testimonials = [
  {
    quote:
      'Aria has become part of our family. The conversation feels natural, and it genuinely anticipates what we need. It is the first robot that does not feel like a gadget.',
    author: 'Maya Chen',
    role: 'Homeowner, Seattle',
    product: 'Aria Companion',
    rating: 5,
  },
  {
    quote:
      'We deployed Echo Pro across our studio and it saved our team an estimated 12 hours a week on scheduling and document routing. It just works.',
    author: 'Helena Voss',
    role: 'Studio Director, Berlin',
    product: 'Echo Pro',
    rating: 5,
  },
  {
    quote:
      'I bought five Nova Kits for my after-school STEM club. The kids are obsessed — they built a voice-controlled rover in one weekend. No soldering is a game changer.',
    author: 'Lena Ortiz',
    role: 'STEM Educator, Austin',
    product: 'Nova Kit',
    rating: 5,
  },
  {
    quote:
      'Atlas unified my entire smart home. The LiDAR navigation is uncanny — it never gets lost, and the Matter integration means it controls everything.',
    author: 'James Liu',
    role: 'Smart-home enthusiast, Toronto',
    product: 'Atlas Assistant',
    rating: 5,
  },
];

export function Testimonials() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);

  const next = () => setActive((v) => (v + 1) % testimonials.length);
  const prev = () => setActive((v) => (v - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal text-center ${visible ? 'is-visible' : ''}`}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Loved by thousands
          </h2>
        </div>

        <div className={`mt-14 reveal ${visible ? 'is-visible' : ''}`}>
          <div className="relative overflow-hidden rounded-5xl border border-white/10 bg-ink-850/60 p-8 backdrop-blur-xl sm:p-12">
            <Quote className="absolute right-8 top-8 h-16 w-16 text-white/5" />

            <div className="relative">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent-400 text-accent-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                key={active}
                className="mt-6 animate-fade-in font-display text-xl font-medium leading-relaxed text-white sm:text-2xl lg:text-3xl"
              >
                "{testimonials[active].quote}"
              </blockquote>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-electric-500 font-display text-lg font-bold text-ink-950">
                  {testimonials[active].author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonials[active].author}</p>
                  <p className="text-sm text-ink-400">
                    {testimonials[active].role} · {testimonials[active].product}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? 'w-8 bg-accent-400' : 'w-4 bg-white/15 hover:bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
