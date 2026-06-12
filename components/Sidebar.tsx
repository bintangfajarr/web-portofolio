"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Shield,
  LogOut,
  User,
  Briefcase,
  GraduationCap,
  Cpu,
  Award,
  Trophy,
  Users,
  FileText,
  MessageSquare,
  FolderGit2
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  isAdmin: boolean;
  onAdminLogin: () => void;
  onAdminLogout: () => void;
}

const navLinks = [
  { href: "/#hero", label: "About Me", id: "hero", icon: User },
  { href: "/#experience", label: "Experience", id: "experience", icon: Briefcase },
  { href: "/#education", label: "Education", id: "education", icon: GraduationCap },
  { href: "/#skills", label: "Skills", id: "skills", icon: Cpu },
  { href: "/#certifications", label: "Certifications", id: "certifications", icon: Award },
  { href: "/#awards", label: "Awards", id: "awards", icon: Trophy },
  { href: "/#volunteer", label: "Volunteer", id: "volunteer", icon: Users },
  { href: "/#publications", label: "Publications", id: "publications", icon: FileText },
  { href: "/#reference", label: "Reference", id: "reference", icon: MessageSquare },
  { href: "/#projects", label: "Projects", id: "projects", icon: FolderGit2 },
];

export default function Sidebar({ isAdmin, onAdminLogin, onAdminLogout }: SidebarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();

  // Scroll spy observer
  useEffect(() => {
    if (pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setActiveSection(id);
      }
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between py-6">
      {/* Header Profile */}
      <div className="px-4 mb-6 text-center lg:text-left flex flex-col items-center lg:items-start">
        <Link href="/" className="group flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-bold text-white text-base shadow-md shadow-accent/20 group-hover:scale-110 transition-all duration-300">
            BF
          </div>
          <span className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-200">
            Bintang Fajar
          </span>
        </Link>
        <p className="text-xs font-medium text-text-muted/80 uppercase tracking-wider pl-1.5 hidden lg:block">
          Software &amp; Data Engineer
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 py-4 scrollbar-thin">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold relative transition-all duration-300 ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-muted hover:text-accent hover:bg-surface-hover hover:translate-x-1"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent rounded-r-md animate-pulse" />
              )}
              <Icon className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110 ${
                isActive ? "text-accent" : "text-text-muted/75 group-hover:text-accent"
              }`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-border/80 px-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Theme
          </span>
          <ThemeToggle />
        </div>

        {isAdmin ? (
          <div className="flex items-center justify-between pt-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 animate-pulse" />
              Admin
            </span>
            <button
              onClick={onAdminLogout}
              className="p-2 rounded-lg bg-surface border border-border hover:border-red-500 hover:text-red-500 hover:scale-105 transition-all duration-200"
              aria-label="Logout"
              id="admin-logout-btn"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onAdminLogin}
            className="flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-text-muted hover:text-accent hover:bg-surface border border-border/60 hover:border-accent/40 transition-all duration-200"
            id="admin-login-btn"
          >
            <Shield className="w-3.5 h-3.5" />
            Admin Panel
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Left side, permanent) */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 bg-surface border-r border-border z-40 flex-col shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile Sticky Top Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-white text-sm shadow-md shadow-accent/15">
            BF
          </div>
          <span className="text-base font-bold text-text-primary">
            Bintang Fajar
          </span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg bg-surface border border-border hover:border-accent transition-all duration-200"
          aria-label="Toggle menu"
          id="mobile-menu-btn"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-text-muted" />
          ) : (
            <Menu className="w-5 h-5 text-text-muted" />
          )}
        </button>
      </header>

      {/* Mobile Drawer (Slide in from left) */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-45 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-64 bg-surface border-r border-border z-50 flex flex-col transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
