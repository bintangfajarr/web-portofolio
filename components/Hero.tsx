"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Pencil } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const titles = [
  "Software Engineer",
  "Data Engineer",
  "Machine Learning Engineer",
  "Backend Developer",
  "IT System Engineer",
];

interface HeroProps {
  aboutInfo: {
    name: string;
    title?: string;
    bio: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    cv_url?: string | null;
  };
  isAdmin: boolean;
  onEditAbout: () => void;
}

export default function Hero({ aboutInfo, isAdmin, onEditAbout }: HeroProps) {
  const [currentTitle, setCurrentTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const activeTitles = aboutInfo.title ? [aboutInfo.title, ...titles] : titles;
    const currentFullTitle = activeTitles[titleIndex % activeTitles.length];

    if (!isDeleting && charIndex < currentFullTitle.length) {
      timeoutRef.current = setTimeout(() => {
        setCurrentTitle(currentFullTitle.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (!isDeleting && charIndex === currentFullTitle.length) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrentTitle(currentFullTitle.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % activeTitles.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, isDeleting, titleIndex, aboutInfo.title]);

  const nameParts = aboutInfo.name ? aboutInfo.name.split(" ") : [""];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 relative" id="hero">
      {isAdmin && (
        <button
          onClick={onEditAbout}
          className="absolute top-24 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border text-text-muted hover:text-accent hover:border-accent transition-all text-xs font-medium"
          id="edit-profile-btn"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit Profile
        </button>
      )}

      <div className="max-w-3xl mx-auto text-center">
        {/* Greeting */}
        <p className="text-text-muted text-lg mb-4 animate-fade-in-up">
          Hello, I&apos;m
        </p>

        {/* Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6 animate-fade-in-up delay-100">
          {nameParts.map((word, i) => (
            <span key={i}>
              {i === nameParts.length - 1 ? (
                <span className="text-accent">{word}</span>
              ) : (
                word
              )}{" "}
            </span>
          ))}
        </h1>

        {/* Animated title */}
        <div className="h-10 mb-6 animate-fade-in-up delay-200">
          <span className="text-xl sm:text-2xl text-text-muted">
            {currentTitle}
          </span>
          <span className="text-xl sm:text-2xl text-accent animate-pulse">|</span>
        </div>

        {/* Bio */}
        <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-in-up delay-300">
          {aboutInfo.bio}
        </p>

        {/* Download CV & Contacts */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-400">
          {aboutInfo.cv_url && (
            <a
              href={aboutInfo.cv_url}
              download="CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/90 transition-all text-sm font-medium shadow-lg shadow-accent/20"
              id="hero-cv-download"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          )}

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${aboutInfo.email}`}
              className="p-2.5 rounded-xl bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-200 group card-hover"
              aria-label="Email"
              id="hero-email-link"
            >
              <Mail className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
            </a>
            <a
              href={`tel:${aboutInfo.phone}`}
              className="p-2.5 rounded-xl bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-200 group card-hover"
              aria-label="Phone"
              id="hero-phone-link"
            >
              <Phone className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
            </a>
            <a
              href={aboutInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-200 group card-hover"
              aria-label="LinkedIn"
              id="hero-linkedin-link"
            >
              <LinkedinIcon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
            </a>
            <a
              href={aboutInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-surface border border-border hover:border-accent hover:text-accent transition-all duration-200 group card-hover"
              aria-label="GitHub"
              id="hero-github-link"
            >
              <GithubIcon className="w-5 h-5 text-text-muted group-hover:text-accent transition-colors" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-border mx-auto flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
