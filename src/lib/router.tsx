import { useEffect, useState } from 'react';
export { useReveal, staggerDelay } from './useReveal';

export type Route =
  | { name: 'home' }
  | { name: 'shop' }
  | { name: 'product'; slug: string };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash || hash === 'home') return { name: 'home' };
  if (hash === 'shop') return { name: 'shop' };
  if (hash.startsWith('product/')) {
    return { name: 'product', slug: hash.slice('product/'.length) };
  }
  return { name: 'home' };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

export function navigate(path: string) {
  window.location.hash = path.startsWith('#') ? path : `#/${path}`;
}

export function Link({
  to,
  className,
  children,
  onClick,
}: {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={`#/${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
