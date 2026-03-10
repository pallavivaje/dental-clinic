import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  CalendarCheck,
  Menu,
  Phone,
  Shield,
  Stethoscope,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { BookPage } from "./pages/BookPage";
import { HomePage } from "./pages/HomePage";

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/#services", label: "Services" },
    { to: "/book", label: "Book Appointment" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-xs"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
          <div className="w-8 h-8 rounded-full dental-gradient flex items-center justify-center">
            <Stethoscope size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-dental-dark">
            Denta<span className="text-dental-teal">Care</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-foreground/70 hover:text-dental-teal font-medium text-sm transition-colors nav-link-underline"
                data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "-")}.link`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-dental-teal transition-colors font-medium"
            data-ocid="nav.admin.link"
          >
            <Shield size={15} />
            Admin
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-dental-teal text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-dental-teal-dark transition-colors"
            data-ocid="nav.book.primary_button"
          >
            <CalendarCheck size={15} />
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-foreground/70"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-ocid="nav.mobile.toggle"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-t border-border overflow-hidden md:hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-foreground/80 font-medium text-base hover:text-dental-teal transition-colors"
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/ /g, "-")}.link`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/book"
                  className="flex items-center gap-2 bg-dental-teal text-white px-4 py-2 rounded-full text-sm font-semibold w-fit"
                  onClick={() => setMobileOpen(false)}
                  data-ocid="nav.mobile.book.primary_button"
                >
                  <CalendarCheck size={15} />
                  Book Appointment
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-dental-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-dental-teal flex items-center justify-center">
                <Stethoscope size={16} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Denta<span className="text-dental-teal-light">Care</span>
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              Professional dental care with a gentle touch. Your smile is our
              priority.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold text-base mb-4 text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/book", label: "Book Appointment" },
                { to: "/admin", label: "Admin" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                    data-ocid={`footer.${l.label.toLowerCase().replace(/ /g, "-")}.link`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold text-base mb-4 text-white/90">
              Contact
            </h4>
            <ul className="space-y-2 text-white/55 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-dental-teal-light" />
                +1 (555) 234-5678
              </li>
              <li>123 Smile Avenue, Suite 200</li>
              <li>Mon–Sat: 9:00 AM – 6:00 PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/35 text-xs">
            &copy; {new Date().getFullYear()} DentaCare. All rights reserved.
          </p>
          <p className="text-white/35 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function Layout() {
  return (
    <div className="min-h-screen bg-background font-body">
      <NavBar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: BookPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  bookRoute,
  adminRoute,
  adminDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}
