import { Award, BatteryCharging, Cpu, ShieldCheck } from 'lucide-react';
import { useReveal, staggerDelay } from '../../lib/router';

const stats = [
  { icon: Cpu, value: 'Neural Core M3', label: 'On-device AI', desc: 'Privacy-first processing — no cloud required for everyday tasks.' },
  { icon: BatteryCharging, value: '18+ hours', label: 'Battery life', desc: 'All-day runtime with fast wireless charging and smart power management.' },
  { icon: ShieldCheck, value: 'ISO 13482', label: 'Safety certified', desc: 'Independently tested for human-robot interaction safety standards.' },
  { icon: Award, value: '2-year', label: 'Warranty included', desc: 'Every NEXA robot is backed by a comprehensive warranty and support.' },
];

export function WhyUs() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal mx-auto max-w-2xl text-center ${visible ? 'is-visible' : ''}`}
        >
          <span className="section-label">Why NEXA</span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Engineered to be trusted
          </h2>
          <p className="mt-4 text-ink-400">
            We build robots that live alongside you — so we hold them to the highest standards
            in AI, safety, and longevity.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`card-glow group p-7 reveal ${visible ? 'is-visible' : ''}`}
              style={staggerDelay(i)}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-400/10 text-accent-300 transition-all duration-500 group-hover:bg-accent-400/20 group-hover:shadow-glow">
                <stat.icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <p className="mt-6 font-display text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-accent-300">{stat.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-400">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
