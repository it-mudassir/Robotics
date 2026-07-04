import type { Product } from '../types';
import { Hero } from '../components/home/Hero';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { WhyUs } from '../components/home/WhyUs';
import { HowItWorks } from '../components/home/HowItWorks';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';

export function HomePage({ products }: { products: Product[] }) {
  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </>
  );
}
