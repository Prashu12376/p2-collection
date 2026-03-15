import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useGetProductById } from "@/hooks/useQueries";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, Share2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

const SAMPLE_PRODUCTS: Record<
  string,
  {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
  }
> = {
  "1": {
    id: BigInt(1),
    name: "The Oxford Tailored Blazer",
    description:
      "A masterpiece of tailoring — slim cut, peak lapels, wool-blend construction. The Oxford Tailored Blazer represents the pinnacle of contemporary menswear. Crafted from a premium wool-cashmere blend, each blazer is cut by hand in our atelier and finished with meticulous attention to detail. The peak lapels and structured shoulders create an authoritative silhouette, while the slim cut ensures modern relevance.",
    imageUrl: "/assets/generated/product-mens-blazer.dim_600x800.jpg",
    category: "Men",
    price: BigInt(38900),
  },
  "2": {
    id: BigInt(2),
    name: "Silk Evening Gown — Ivory",
    description:
      "Floor-length bias-cut silk gown with subtle drape and satin finish. The Silk Evening Gown in Ivory is an heirloom-quality piece designed for moments that deserve to be remembered. The bias cut follows the body's natural contours, while 22mm pure silk charmeuse creates an unmatched luminous drape. Available in standard and custom lengths.",
    imageUrl: "/assets/generated/product-womens-dress.dim_600x800.jpg",
    category: "Women",
    price: BigInt(52500),
  },
  "3": {
    id: BigInt(3),
    name: "Structured Leather Tote",
    description:
      "Hand-stitched Italian calfskin with gold hardware and suede interior. This structured tote is built for the modern professional who refuses to compromise on style or substance. Full-grain calfskin leather develops a rich patina over time, while the custom brass hardware and ultra-soft suede interior elevate every interaction.",
    imageUrl: "/assets/generated/product-handbag.dim_600x800.jpg",
    category: "Accessories",
    price: BigInt(87000),
  },
  "4": {
    id: BigInt(4),
    name: "Slim Wool Dress Trousers",
    description:
      "Precise flat-front cut in fine merino wool with a natural drape. Tailored to exacting measurements, these slim trousers pair equally well with a blazer for formal occasions or a relaxed shirt for smart-casual events. Side-adjusters replace belt loops for a clean, uninterrupted waistline.",
    imageUrl: "/assets/generated/product-mens-trousers.dim_600x800.jpg",
    category: "Men",
    price: BigInt(22500),
  },
  "5": {
    id: BigInt(5),
    name: "Cashmere Camel Overcoat",
    description:
      "Double-faced cashmere in a refined camel tone, ankle-length cut. This overcoat is the definition of quiet luxury — crafted from double-faced Scottish cashmere, it requires no lining while providing exceptional warmth. The clean minimalist silhouette and horn buttons are designed to outlast every trend.",
    imageUrl: "/assets/generated/product-womens-coat.dim_600x800.jpg",
    category: "Women",
    price: BigInt(129000),
  },
  "6": {
    id: BigInt(6),
    name: "Gold Cufflinks & Pocket Square Set",
    description:
      "18k gold-plated cufflinks with matching hand-rolled silk pocket square. The cufflinks feature a clean double-disc design in 18k gold plating over sterling silver. Accompanied by a hand-rolled white silk pocket square, this set transforms any dress shirt into a considered ensemble.",
    imageUrl: "/assets/generated/product-accessories.dim_600x800.jpg",
    category: "Accessories",
    price: BigInt(18500),
  },
};

export default function ProductDetailPage() {
  const { productId } = useParams({ from: "/product/$productId" });
  const { data: product, isLoading } = useGetProductById(
    productId ? BigInt(productId) : null,
  );
  const { addItem } = useCart();

  const displayProduct = product ?? SAMPLE_PRODUCTS[productId ?? ""] ?? null;

  const formatPrice = (cents: bigint) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(cents) / 100);

  if (isLoading) {
    return (
      <main className="pt-16 container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="aspect-[3/4] rounded" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (!displayProduct) {
    return (
      <main className="pt-16 container mx-auto px-4 md:px-8 py-16 text-center">
        <p className="font-serif text-2xl text-foreground">Product not found</p>
        <Link to="/shop">
          <Button variant="ghost" className="mt-4">
            ← Back to Shop
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded bg-navy-light">
              <img
                src={displayProduct.imageUrl}
                alt={displayProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/30 rounded hidden lg:block pointer-events-none" />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <Badge className="w-fit mb-4 bg-primary/10 text-primary border border-primary/30 text-xs tracking-widest uppercase">
              {displayProduct.category}
            </Badge>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
              {displayProduct.name}
            </h1>
            <p className="text-2xl font-medium text-primary mb-6">
              {formatPrice(displayProduct.price)}
            </p>

            <div className="h-px bg-border/50 mb-6" />

            <p className="text-muted-foreground leading-relaxed mb-8">
              {displayProduct.description}
            </p>

            <div className="flex gap-3 mb-8">
              <Button
                data-ocid="product.add_to_cart_button"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-sm tracking-widest uppercase shadow-gold hover:shadow-gold-lg transition-all"
                onClick={() => {
                  addItem(displayProduct);
                  toast.success(`${displayProduct.name} added to cart`);
                }}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 border-border text-muted-foreground hover:text-primary hover:border-primary"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 border-border text-muted-foreground hover:text-primary hover:border-primary"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground border-t border-border/50 pt-6">
              <p className="flex items-center gap-2">
                <span className="text-primary">✦</span> Free shipping on orders
                over $150
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">✦</span> 30-day free returns
              </p>
              <p className="flex items-center gap-2">
                <span className="text-primary">✦</span> Authenticity guaranteed
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
