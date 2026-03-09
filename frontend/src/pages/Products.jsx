import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

/* ─── Hook ─── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setV(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, y = 24 }) {
  const [ref, v] = useReveal(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : `translateY(${y}px)`,
        transition: "opacity 0.65s ease, transform 0.65s ease",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Product Card ─── */
function ProductCard({ product, index }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={index * 50}>
      <Link
        to={`/product/${product.id}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]"
      >
        <div className="relative h-[220px] overflow-hidden bg-gray-100 dark:bg-gray-800">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-3 font-oxanium text-[1.15rem] font-bold tracking-wide text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <p className="line-clamp-3 text-[0.9rem] leading-relaxed text-gray-600 dark:text-gray-400">
            {product.shortDescription || product.description}
          </p>
          <div className="mt-auto pt-6 flex w-fit items-center text-sm font-semibold text-[#818cf8] transition-transform duration-300 group-hover:translate-x-1">
            View Details <ArrowRight size={16} className="ml-2" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ─── Main ─── */
const Products = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="prd-root pt-20" style={{ minHeight: "100vh" }}>
      {/* ════ OUR PRODUCTS ════ */}
      <section style={{ padding: "8% 4%", minHeight: "80vh" }}>
        <div style={{ width: "90%", margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: "6%", textAlign: "center", paddingTop: "5%" }}>
              <span className="prd-label">Our Solutions</span>
              <h1 className="prd-section-title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Explore Our Products</h1>
            </div>
          </Reveal>

          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            style={{ alignItems: "stretch" }}
          >
            {products.map((prod, i) => (
              <ProductCard key={prod.id} product={prod} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
