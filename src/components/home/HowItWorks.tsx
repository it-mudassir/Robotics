import { Home, GraduationCap, Briefcase, Wrench } from 'lucide-react';
import { useReveal, staggerDelay } from '../../lib/router';

const steps = [
  {
    icon: Home,
    title: 'At home',
    desc: 'Aria and Atlas manage your day — schedules, smart devices, and companionship that adapts to your routine.',
    accent: 'from-accent-400/20 to-transparent',
  },
  {
    icon: Briefcase,
    title: 'At the office',
    desc: 'Echo Pro handles logistics, scheduling, and document routing so your team can focus on the work that matters.',
    accent: 'from-electric-500/20 to-transparent',
  },
  {
    icon: GraduationCap,
    title: 'In the classroom',
    desc: 'Pixel and Nova bring hands-on STEM learning to students, with curriculum-aligned lessons and durable design.',
    accent: 'from-accent-300/20 to-transparent',
  },
  {
    icon: Wrench,
    title: 'At the workbench',
    desc: 'Nova Kit and Spark Mini let makers of every age build, code, and customize — no soldering required.',
    accent: 'from-electric-400/20 to-transparent',
  },
];

export function HowItWorks() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={ref}
          className={`reveal max-w-2xl ${visible ? 'is-visible' : ''}`}
        >
          <span className="section-label">How it works</span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            A robot for every space
          </h2>
          <p className="mt-4 text-ink-400">
            NEXA robots are designed to fit seamlessly into the places you live, work, and
            learn — each tuned for its environment.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`card-glow group relative flex flex-col p-7 reveal ${visible ? 'is-visible' : ''}`}
              style={staggerDelay(i)}
            >
              <div className={`absolute inset-0 rounded-4xl bg-gradient-to-b ${step.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-accent-300 transition-all duration-500 group-hover:border-accent-400/40 group-hover:shadow-glow">
                  <step.icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <span className="absolute right-0 top-0 font-display text-5xl font-bold text-white/5 transition-colors duration-500 group-hover:text-white/10">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
