import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProducts } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = ["All", "Men", "Women", "Accessories"];

const SAMPLE_PRODUCTS = [
  {
    id: BigInt(1),
    name: "The Oxford Tailored Blazer",
    description:
      "A masterpiece of tailoring — slim cut, peak lapels, wool-blend construction.",
    imageUrl: "/assets/generated/product-mens-blazer.dim_600x800.jpg",
    category: "Men",
    price: BigInt(38900),
  },
  {
    id: BigInt(2),
    name: "Silk Evening Gown — Ivory",
    description:
      "Floor-length bias-cut silk gown with subtle drape and satin finish.",
    imageUrl: "/assets/generated/product-womens-dress.dim_600x800.jpg",
    category: "Women",
    price: BigInt(52500),
  },
  {
    id: BigInt(3),
    name: "Structured Leather Tote",
    description:
      "Hand-stitched Italian calfskin with gold hardware and suede interior.",
    imageUrl: "/assets/generated/product-handbag.dim_600x800.jpg",
    category: "Accessories",
    price: BigInt(87000),
  },
  {
    id: BigInt(4),
    name: "Slim Wool Dress Trousers",
    description:
      "Precise flat-front cut in fine merino wool with a natural drape.",
    imageUrl: "/assets/generated/product-mens-trousers.dim_600x800.jpg",
    category: "Men",
    price: BigInt(22500),
  },
  {
    id: BigInt(5),
    name: "Cashmere Camel Overcoat",
    description:
      "Double-faced cashmere in a refined camel tone, ankle-length cut.",
    imageUrl: "/assets/generated/product-womens-coat.dim_600x800.jpg",
    category: "Women",
    price: BigInt(129000),
  },
  {
    id: BigInt(6),
    name: "Gold Cufflinks & Pocket Square Set",
    description:
      "18k gold-plated cufflinks with matching hand-rolled silk pocket square.",
    imageUrl: "/assets/generated/product-accessories.dim_600x800.jpg",
    category: "Accessories",
    price: BigInt(18500),
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: products, isLoading } = useGetAllProducts();

  const allProducts =
    products && products.length > 0 ? products : SAMPLE_PRODUCTS;
  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-16 min-h-screen">
      <section className="bg-card border-b border-border/50 py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
              P2 Collection
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground">
              The Collection
            </h1>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Timeless silhouettes. Exceptional materials. Every piece chosen
              with intention.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10" role="tablist">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              data-ocid="shop.category_filter.tab"
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-sm tracking-widest uppercase border transition-all duration-200 rounded-sm ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-gold"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            data-ocid="shop.empty_state"
          >
            <p className="font-serif text-2xl text-foreground">
              No items in this category
            </p>
            <p className="text-muted-foreground">
              Try another category or check back soon.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id.toString()} product={p} index={i} />
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
