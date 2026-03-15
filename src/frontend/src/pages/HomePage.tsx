import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProducts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Star, Truck } from "lucide-react";
import { motion } from "motion/react";

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
];

const CATEGORIES = [
  {
    name: "Men",
    img: "/assets/generated/product-mens-blazer.dim_600x800.jpg",
    desc: "Tailored precision",
  },
  {
    name: "Women",
    img: "/assets/generated/product-womens-coat.dim_600x800.jpg",
    desc: "Timeless elegance",
  },
  {
    name: "Accessories",
    img: "/assets/generated/product-handbag.dim_600x800.jpg",
    desc: "Finishing touches",
  },
];

export default function HomePage() {
  const { data: products, isLoading } = useGetAllProducts();
  const displayProducts = (
    products && products.length > 0 ? products : SAMPLE_PRODUCTS
  ).slice(0, 4);

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1200x500.jpg"
          alt="P2 Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />

        <div className="relative container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
              New Season Collection
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6">
              Define Your
              <br />
              <span className="gold-shimmer">Signature</span>
              <br />
              Style
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Curated luxury fashion for the discerning individual. Explore
              timeless pieces crafted with uncompromising quality.
            </p>
            <Link to="/shop">
              <Button
                data-ocid="hero.primary_button"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-sm tracking-widest uppercase font-medium shadow-gold transition-all duration-300 hover:shadow-gold-lg"
              >
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </section>

      {/* Features bar */}
      <section className="border-b border-border/50 bg-card">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: Truck, text: "Free Shipping Over $150" },
              { icon: Shield, text: "Authenticity Guaranteed" },
              { icon: Star, text: "5-Star Curated Selection" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center justify-center gap-3 py-2"
              >
                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm tracking-wider text-muted-foreground uppercase">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            Explore
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to="/shop"
                className="group relative block overflow-hidden aspect-[3/4] rounded"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-primary text-xs tracking-widest uppercase mb-1">
                    {cat.desc}
                  </p>
                  <h3 className="font-serif text-2xl text-foreground">
                    {cat.name}
                  </h3>
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1 mt-2">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
              Handpicked
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Featured Pieces
            </h2>
          </div>
          <Link to="/shop">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary gap-2 hidden md:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {displayProducts.map((p, i) => (
              <ProductCard key={p.id.toString()} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Quote section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-card" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.72 0.13 73) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative container mx-auto px-4 md:px-8 text-center max-w-3xl"
        >
          <p className="text-primary text-4xl mb-6">❝</p>
          <blockquote className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed">
            Fashion is the armor to survive the reality of everyday life.
          </blockquote>
          <p className="text-muted-foreground text-sm mt-6 tracking-widest uppercase">
            — Bill Cunningham
          </p>
        </motion.div>
      </section>
    </main>
  );
}
