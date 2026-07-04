import { CartProvider } from './lib/cart';
import { useRouter } from './lib/router';
import { useProducts } from './lib/hooks';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';

function App() {
  const route = useRouter();
  const { products, loading, error } = useProducts();

  return (
    <CartProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar route={route} />
        <CartDrawer />

        <main>
          {loading ? (
            <div className="flex min-h-screen items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent-400" />
                <p className="text-sm text-ink-400">Loading the future...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
              <p className="font-display text-2xl font-bold text-white">Something went wrong</p>
              <p className="text-ink-400">{error}</p>
            </div>
          ) : route.name === 'home' ? (
            <HomePage products={products} />
          ) : route.name === 'shop' ? (
            <ShopPage products={products} />
          ) : route.name === 'product' ? (
            <ProductPage slug={route.slug} allProducts={products} />
          ) : (
            <HomePage products={products} />
          )}
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
