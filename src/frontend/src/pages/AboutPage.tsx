import { motion } from "motion/react";

export default function AboutPage() {
  return (
    <main className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="relative bg-card border-b border-border/50 py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.72 0.13 73) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 md:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
              The P2 Collection Story
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Born from a belief that true luxury is about quality, intention,
              and the stories we wear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src="/assets/generated/product-womens-coat.dim_600x800.jpg"
                alt="P2 Collection Story"
                className="w-full rounded aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 border border-primary/40 rounded hidden lg:block" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-primary/20 rounded hidden lg:block" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl text-foreground leading-tight">
              Crafted for the
              <br />
              <span className="gold-shimmer">Discerning Few</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              P2 Collection was founded in 2019 with a single conviction: that
              modern fashion had lost its way. Too fast, too fleeting, too
              disposable. We set out to create something different — a curated
              boutique where every piece earns its place.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our atelier sources only the finest natural materials — Italian
              silk, Scottish cashmere, full-grain calfskin leather — and works
              with heritage workshops across Europe to produce pieces that
              improve with age. We believe in slow fashion: fewer pieces, made
              better, worn longer.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              P2 stands for two principles that guide everything we do:{" "}
              <strong className="text-foreground">Precision</strong> and{" "}
              <strong className="text-foreground">Purpose</strong>. Every cut is
              intentional. Every stitch is considered. Every collection is
              edited with care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-card border-t border-border/50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl text-foreground">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Precision",
                desc: "Every pattern, seam, and proportion is the result of meticulous craftsmanship. We accept nothing less than perfection in construction.",
              },
              {
                title: "Purpose",
                desc: "Each piece serves a clear intention. We reject decoration for decoration's sake — only meaningful design earns a place in our collection.",
              },
              {
                title: "Permanence",
                desc: "We design for longevity. Classic silhouettes, durable materials, and timeless colors ensure our pieces remain relevant for decades.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 border border-border/50 rounded hover:border-primary/40 transition-colors"
              >
                <p className="text-primary text-3xl font-serif mb-4">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-xl text-foreground mb-3">
                  {v.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
            The People
          </p>
          <h2 className="font-serif text-4xl text-foreground">
            Meet Our Founders
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            {
              name: "Priya Sharma",
              role: "Creative Director & Co-Founder",
              bio: "Former creative lead at Maison Margaux Paris. 15 years shaping luxury fashion narratives.",
            },
            {
              name: "Patrick Osei",
              role: "Head of Design & Co-Founder",
              bio: "Trained at Central Saint Martins. Obsessed with the intersection of tradition and modern minimalism.",
            },
          ].map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 border border-border/50 rounded"
            >
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <span className="font-serif text-primary text-xl">
                  {person.name[0]}
                </span>
              </div>
              <h3 className="font-serif text-xl text-foreground mb-1">
                {person.name}
              </h3>
              <p className="text-primary text-xs tracking-wider uppercase mb-3">
                {person.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {person.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
