import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Research", to: "/research" },
  { label: "Publications", to: "/publications" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Talks", to: "/talks" },
  { label: "CV", to: "/cv" },
];

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground/5">
      <div className="px-5 md:px-20 py-5 md:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl md:text-3xl font-bold">
            R. Garg
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-text transition-opacity hover:opacity-70 ${
                  location.pathname === link.to ? "opacity-100" : "opacity-60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-foreground/10 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`nav-text transition-opacity hover:opacity-70 ${
                  location.pathname === link.to ? "opacity-100" : "opacity-60"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
