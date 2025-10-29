import React, { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-white transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const cn = (...classes) => classes.filter(Boolean).join(" ");

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-black/90 backdrop-blur-lg shadow-md border-b border-cyan-900/30"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* BRAND LOGO */}
          <a
            href="#home"
            className="flex items-center space-x-2 text-white hover:text-cyan-400 transition"
          >
           
            <span className="text-xl font-bold tracking-wide font-['Outfit']">
              CTRL<span className="text-cyan-400">Z</span>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a
              href="https://wa.me/qr/7DGKFLHEAXGOB1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="ml-4 bg-cyan-500 hover:bg-cyan-400 text-white">
                Contact Us
              </Button>
            </a>
          </nav>

          {/* MOBILE MENU ICON */}
          <button
            className="md:hidden text-gray-300 hover:text-cyan-400 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 flex flex-col space-y-3 bg-black/90 backdrop-blur-lg border-t border-cyan-800/30 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/qr/7DGKFLHEAXGOB1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="mt-2 bg-cyan-500 hover:bg-cyan-400 text-white w-full">
                Contact Us
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
