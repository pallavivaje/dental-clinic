import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle,
  Clock,
  Heart,
  MessageCircle,
  Quote,
  Smile,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const SERVICES = [
  {
    icon: Sparkles,
    name: "Teeth Whitening",
    desc: "Professional-grade whitening up to 8 shades brighter in a single session.",
    price: "From $199",
    color: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: Smile,
    name: "Teeth Cleaning",
    desc: "Deep professional cleaning to remove tartar, plaque, and surface stains.",
    price: "From $89",
    color: "bg-teal-50",
    iconColor: "text-dental-teal",
  },
  {
    icon: Zap,
    name: "Dental Implants",
    desc: "Permanent, natural-looking tooth replacements with titanium roots.",
    price: "From $1,499",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: ArrowRight,
    name: "Orthodontics",
    desc: "Invisible aligners and traditional braces for a perfectly straight smile.",
    price: "From $2,499",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Heart,
    name: "Root Canal",
    desc: "Gentle, effective root canal therapy to save your natural tooth.",
    price: "From $699",
    color: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    icon: Zap,
    name: "Emergency Dental",
    desc: "Same-day appointments for dental emergencies. We're here when you need us.",
    price: "From $149",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const WHY_US = [
  {
    icon: Award,
    title: "15+ Years Experience",
    desc: "Our team of board-certified dentists brings decades of combined expertise to every treatment.",
  },
  {
    icon: Sparkles,
    title: "Modern Equipment",
    desc: "State-of-the-art digital X-rays, 3D scanning, and laser dentistry for precise, comfortable care.",
  },
  {
    icon: Heart,
    title: "Gentle & Caring",
    desc: "We specialize in anxiety-free dentistry, ensuring every visit is relaxed and comfortable.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Evening and weekend appointments available. Book online in seconds.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Manager",
    text: "I used to dread going to the dentist, but DentaCare changed everything. The team is so warm and professional. My smile has never looked better after the whitening treatment!",
    rating: 5,
    initials: "SM",
  },
  {
    name: "James Rodriguez",
    role: "Software Engineer",
    text: "Got my dental implant done here and I couldn't be happier. The procedure was painless and the result looks completely natural. The WhatsApp reminders kept me on track too!",
    rating: 5,
    initials: "JR",
  },
  {
    name: "Aisha Patel",
    role: "Teacher",
    text: "Brought my whole family here. The kids love it — Dr. Chen makes them feel comfortable instantly. We've been patients for 3 years and won't go anywhere else.",
    rating: 5,
    initials: "AP",
  },
];

export function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[92vh] flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/dental-hero.dim_1400x700.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-dental-dark/75" />
        {/* Decorative circle */}
        <div
          className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "oklch(0.65 0.1 195)" }}
        />
        <div
          className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full opacity-10"
          style={{ background: "oklch(0.78 0.12 85)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <Badge className="mb-6 bg-dental-teal/20 text-dental-teal-light border-dental-teal/30 font-semibold">
              ✦ Award-Winning Dental Care
            </Badge>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Smile with
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.65 0.1 195), oklch(0.78 0.12 85))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Confidence
              </span>
            </h1>
            <p className="text-white/75 text-lg sm:text-xl mb-10 leading-relaxed">
              Experience painless, professional dental care with our expert
              team. From routine cleanings to complete smile transformations —
              we make every visit something to look forward to.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book">
                <Button
                  size="lg"
                  className="bg-dental-teal hover:bg-dental-teal-dark text-white font-semibold px-8 rounded-full shadow-dental-lg"
                  data-ocid="hero.book.primary_button"
                >
                  <CalendarCheck size={18} className="mr-2" />
                  Book Appointment
                </Button>
              </Link>
              <a href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full"
                  data-ocid="hero.services.secondary_button"
                >
                  Our Services
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-6 mt-10 flex-wrap">
              {[
                { label: "Happy Patients", value: "4,200+" },
                { label: "Years Experience", value: "15+" },
                { label: "5-Star Reviews", value: "800+" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl text-white">
                    {s.value}
                  </div>
                  <div className="text-white/55 text-xs font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-dental-teal-muted text-dental-teal border-dental-teal/20">
              Our Services
            </Badge>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dental-dark mb-4">
              Complete Dental Care
              <br />
              Under One Roof
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From preventive care to cosmetic transformations, we offer a full
              range of dental treatments tailored to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border dental-card-hover group"
                data-ocid={`services.item.${i + 1}`}
              >
                <div
                  className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <service.icon size={22} className={service.iconColor} />
                </div>
                <h3 className="font-display font-bold text-lg text-dental-dark mb-2">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-dental-teal font-semibold text-sm">
                    {service.price}
                  </span>
                  <Link to="/book">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-dental-teal hover:bg-dental-teal-muted rounded-full text-xs"
                      data-ocid={`services.book.primary_button.${i + 1}`}
                    >
                      Book <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-dental-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-dental-teal/20 text-dental-teal-light border-dental-teal/30">
                Why DentaCare
              </Badge>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                The Dental Experience
                <br />
                You Deserve
              </h2>
              <p className="text-white/60 mb-10 leading-relaxed">
                We believe going to the dentist shouldn't be stressful. That's
                why we've built a practice around comfort, transparency, and
                results that last.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {WHY_US.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 rounded-xl p-5 border border-white/10"
                    data-ocid={`why.item.${i + 1}`}
                  >
                    <item.icon
                      size={22}
                      className="text-dental-teal-light mb-3"
                    />
                    <h3 className="font-heading font-bold text-white text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border border-dental-teal/30" />
              <img
                src="/assets/generated/dental-team.dim_800x600.jpg"
                alt="DentaCare Team"
                className="relative w-full rounded-2xl object-cover"
              />
              <div className="absolute -bottom-5 -left-5 bg-dental-teal rounded-xl p-5 shadow-dental-lg">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className="text-yellow-300 fill-yellow-300"
                    />
                  ))}
                </div>
                <div className="font-display font-bold text-white text-xl">
                  4.9/5.0
                </div>
                <div className="text-white/70 text-xs">from 800+ reviews</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-dental-teal-muted text-dental-teal border-dental-teal/20">
              Patient Stories
            </Badge>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dental-dark">
              Real Smiles,
              <br />
              Real Results
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card rounded-2xl p-6 border border-border dental-card-hover"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <Quote size={28} className="text-dental-teal/30 mb-4" />
                <p className="text-foreground/75 text-sm leading-relaxed mb-5">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dental-teal flex items-center justify-center text-white font-bold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-dental-dark text-sm">
                      {t.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {t.role}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    <Star
                      size={12}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <Star
                      size={12}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <Star
                      size={12}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <Star
                      size={12}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <Star
                      size={12}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + WHATSAPP */}
      <section id="contact" className="py-24 bg-dental-teal-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-dental-teal/15 text-dental-teal border-dental-teal/20">
                Contact Us
              </Badge>
              <h2 className="font-display text-4xl font-bold text-dental-dark mb-6">
                Ready for Your
                <br />
                Best Smile?
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Clock,
                    label: "Hours",
                    value: "Mon–Sat: 9:00 AM – 6:00 PM",
                  },
                  { icon: Users, label: "Phone", value: "+1 (555) 234-5678" },
                  {
                    icon: CheckCircle,
                    label: "Address",
                    value: "123 Smile Avenue, Suite 200, Los Angeles, CA 90001",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-dental-teal/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={16} className="text-dental-teal" />
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-dental-dark text-sm">
                        {item.label}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/book">
                  <Button
                    className="bg-dental-teal text-white hover:bg-dental-teal-dark rounded-full font-semibold"
                    data-ocid="contact.book.primary_button"
                  >
                    <CalendarCheck size={16} className="mr-2" />
                    Book Online
                  </Button>
                </Link>
                <a
                  href="https://wa.me/+12345678901?text=Hi%2C%20I'd%20like%20to%20book%20a%20dental%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50 rounded-full font-semibold"
                    data-ocid="contact.whatsapp.secondary_button"
                  >
                    <MessageCircle size={16} className="mr-2" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/generated/dental-smile.dim_800x600.jpg"
                alt="Beautiful dental results"
                className="rounded-2xl w-full object-cover shadow-dental-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
