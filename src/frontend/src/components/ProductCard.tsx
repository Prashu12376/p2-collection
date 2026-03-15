import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "../backend.d";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();

  const formatPrice = (cents: bigint) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(cents) / 100);

  return (
    <motion.article
      data-ocid={`product.item.${index + 1}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-card rounded overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-300"
    >
      <Link
        to="/product/$productId"
        params={{ productId: product.id.toString() }}
      >
        <div className="relative overflow-hidden aspect-[3/4] bg-navy-light">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 left-3 text-xs tracking-widest uppercase px-2 py-1 bg-background/80 text-primary border border-primary/30 rounded-sm">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <Link
          to="/product/$productId"
          params={{ productId: product.id.toString() }}
        >
          <h3 className="font-serif text-foreground text-base leading-snug mb-1 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-primary font-medium text-sm mb-3">
          {formatPrice(product.price)}
        </p>
        <Button
          size="sm"
          className="w-full bg-primary/10 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-xs tracking-wider"
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
        >
          <ShoppingBag className="h-3.5 w-3.5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.article>
  );
}
