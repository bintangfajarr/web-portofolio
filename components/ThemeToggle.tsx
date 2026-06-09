"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg bg-surface border border-border" aria-label="Toggle theme">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-surface border border-border hover:border-accent transition-all duration-200 group"
      aria-label="Toggle theme"
      id="theme-toggle"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
      ) : (
        <Moon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
      )}
    </button>
  );
}
