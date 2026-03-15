import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactMessage } from "@/hooks/useQueries";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const mutation = useSubmitContactMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    mutation.mutate(form);
  };

  return (
    <main className="pt-16 min-h-screen">
      <section className="bg-card border-b border-border/50 py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-primary text-xs tracking-[0.3em] uppercase mb-3">
              We'd Love to Hear From You
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Whether you have a styling question, order inquiry, or simply want
              to say hello — our team is here for you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-serif text-3xl text-foreground mb-6">
                Visit Our Boutique
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our flagship store on Fashion Avenue is open six days a week.
                Our style consultants are available for private appointments and
                bespoke consultations.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  Icon: MapPin,
                  label: "Address",
                  value: "123 Fashion Avenue, New York, NY 10001",
                },
                { Icon: Phone, label: "Phone", value: "+1 (555) 234-5678" },
                { Icon: Mail, label: "Email", value: "hello@p2collection.com" },
                {
                  Icon: Clock,
                  label: "Hours",
                  value: "Mon–Sat: 10am – 8pm · Sun: 12pm – 6pm",
                },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-primary mb-1">
                      {label}
                    </p>
                    <p className="text-foreground text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {mutation.isSuccess ? (
              <div
                data-ocid="contact.success_state"
                className="flex flex-col items-center justify-center gap-4 text-center py-16 border border-border/50 rounded"
              >
                <CheckCircle className="h-12 w-12 text-primary" />
                <h3 className="font-serif text-2xl text-foreground">
                  Message Received
                </h3>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for reaching out. Our team will respond within 24
                  hours.
                </p>
                <Button
                  variant="ghost"
                  className="text-primary"
                  onClick={() => {
                    mutation.reset();
                    setForm({ name: "", email: "", message: "" });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    data-ocid="contact.name_input"
                    placeholder="Alexandra Chen"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    className="bg-card border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    data-ocid="contact.email_input"
                    placeholder="alex@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    className="bg-card border-border focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="contact.textarea"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    required
                    rows={5}
                    className="bg-card border-border focus:border-primary transition-colors resize-none"
                  />
                </div>

                {mutation.isError && (
                  <div
                    data-ocid="contact.error_state"
                    className="flex items-center gap-3 p-4 border border-destructive/40 bg-destructive/10 rounded text-sm text-destructive"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={mutation.isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-sm tracking-widest uppercase shadow-gold"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2
                        data-ocid="contact.loading_state"
                        className="mr-2 h-4 w-4 animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
