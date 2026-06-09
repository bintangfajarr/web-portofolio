"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  isAdmin: boolean;
  onAdminLogin: () => void;
  onAdminLogout: () => void;
}

const navLinks = [
  { href: "/", label: "About Me" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar({ isAdmin, onAdminLogin, onAdminLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      const el = document.querySelector(href.replace("/", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
      id="main-navbar"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold text-text-primary hover:text-accent transition-colors duration-200"
            id="nav-logo"
          >
            <span className="text-accent">&lt;</span>
            BF
            <span className="text-accent"> /&gt;</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-accent bg-accent/10"
                    : "text-text-muted hover:text-text-primary hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
                <button
                  onClick={onAdminLogout}
                  className="p-2 rounded-lg bg-surface border border-border hover:border-red-500 hover:text-red-500 transition-all duration-200"
                  aria-label="Logout"
                  id="admin-logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAdminLogin}
                className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-accent hover:bg-surface border border-transparent hover:border-border transition-all duration-200"
                id="admin-login-btn"
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-surface border border-border hover:border-accent transition-all duration-200"
              aria-label="Toggle menu"
              id="mobile-menu-btn"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-text-muted" />
              ) : (
                <Menu className="w-5 h-5 text-text-muted" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              {!isAdmin && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onAdminLogin();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-accent hover:bg-surface transition-all duration-200"
                >
                  <Shield className="w-4 h-4" />
                  Admin Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
