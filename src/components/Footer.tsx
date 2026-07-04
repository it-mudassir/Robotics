import { Bot, Github, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from '../lib/router';

const footerLinks = {
  Products: ['Companions', 'Assistants', 'DIY Kits', 'Education', 'Gift Cards'],
  Company: ['About Us', 'Careers', 'Press', 'Sustainability', 'Contact'],
  Support: ['Help Center', 'Shipping & Returns', 'Warranty', 'Track Order', 'Developer API'],
  Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Accessibility'],
};

const payments = ['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'PayPal'];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-electric-500 shadow-glow">
                <Bot className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold text-white">NEXA</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              Designing the robots that live alongside us — companions, assistants, and the kits
              that build the next generation of engineers.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-all duration-300 hover:border-accent-400/40 hover:text-accent-300"
                  aria-label="Social link"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-300">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-ink-400 transition-colors duration-200 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment + copyright */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} NEXA Robotics, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {payments.map((p) => (
              <span
                key={p}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-ink-300"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
