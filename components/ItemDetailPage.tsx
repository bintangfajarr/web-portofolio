"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Briefcase,
  Trophy,
  Users,
  FileText,
  UserCheck,
  FolderGit2,
  ExternalLink
} from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

interface ItemDetailPageProps {
  endpoint:
    | "experience"
    | "education"
    | "certifications"
    | "awards"
    | "volunteer"
    | "publications"
    | "reference"
    | "projects";
  id: string;
}

export default function ItemDetailPage({ endpoint, id }: ItemDetailPageProps) {
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetch(`/api/${endpoint}`);
        if (res.ok) {
          const data = await res.json();
          const found = data.find((x: any) => String(x.id) === String(id));
          setItem(found || null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [endpoint, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-text-muted text-sm font-medium">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Item Not Found</h1>
        <p className="text-text-muted text-sm mb-6">The details you are looking for do not exist or have been deleted.</p>
        <Link
          href={`/#${endpoint}`}
          className="px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/90 transition-all text-sm font-medium"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Map fields dynamically based on the section endpoint
  let mainTitle = "";
  let subTitle = "";
  let timePeriod = "";
  let metaInfo = "";
  let bullets: string[] = [];
  let icon = <Briefcase className="w-6 h-6 text-accent" />;

  if (endpoint === "experience") {
    mainTitle = item.role;
    subTitle = item.company;
    timePeriod = item.period;
    metaInfo = item.location || "";
    bullets = item.bullets || [];
    icon = <Briefcase className="w-6 h-6 text-accent" />;
  } else if (endpoint === "education") {
    mainTitle = item.degree;
    subTitle = item.institution;
    timePeriod = item.period;
    metaInfo = item.gpa ? `GPA: ${item.gpa}` : "";
    bullets = item.notes || [];
    icon = <BookOpen className="w-6 h-6 text-accent" />;
  } else if (endpoint === "certifications") {
    mainTitle = item.name;
    subTitle = item.issuer || "";
    timePeriod = item.date || "";
    metaInfo = item.credential_id ? `Credential ID: ${item.credential_id}` : "";
    icon = <Award className="w-6 h-6 text-accent" />;
  } else if (endpoint === "awards") {
    mainTitle = item.title;
    subTitle = item.organizer || "";
    timePeriod = item.date || "";
    icon = <Trophy className="w-6 h-6 text-accent" />;
  } else if (endpoint === "volunteer") {
    mainTitle = item.role;
    subTitle = item.organization;
    timePeriod = item.period;
    metaInfo = item.location || "";
    bullets = item.bullets || [];
    icon = <Users className="w-6 h-6 text-accent" />;
  } else if (endpoint === "publications") {
    mainTitle = item.title;
    subTitle = item.publisher;
    timePeriod = item.date || "";
    metaInfo = item.authors ? `Authors: ${item.authors}` : "";
    icon = <FileText className="w-6 h-6 text-accent" />;
  } else if (endpoint === "reference") {
    mainTitle = item.name;
    subTitle = item.relationship;
    timePeriod = item.company;
    metaInfo = [item.email, item.phone].filter(Boolean).join(" | ");
    icon = <UserCheck className="w-6 h-6 text-accent" />;
  } else if (endpoint === "projects") {
    mainTitle = item.name;
    subTitle = item.category || "Project";
    bullets = item.stack || [];
    icon = <FolderGit2 className="w-6 h-6 text-accent" />;
  }

  const hasImages = item.image_urls && item.image_urls.length > 0;
  const mainImage = hasImages ? item.image_urls[activeImageIndex] : null;

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Mini Header / Navigation */}
      <div className="border-b border-border bg-surface/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/#${endpoint}`}
            className="flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-accent transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
          <span className="text-xs font-semibold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-1 rounded-full">
            {endpoint}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-8 animate-fade-in-up">
        {/* Main Details Card */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-xl">
          {/* Main image at the top of the detail page */}
          {mainImage ? (
            <div className="h-64 sm:h-96 w-full overflow-hidden relative bg-background border-b border-border">
              {mainImage.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={`${mainImage}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-none"
                  title="PDF Preview"
                />
              ) : (
                <img
                  src={mainImage}
                  alt={`${mainTitle} main image`}
                  className="w-full h-full object-cover transition-all duration-350"
                />
              )}
            </div>
          ) : (
            <div className="h-12 bg-gradient-to-r from-accent/10 to-transparent border-b border-border" />
          )}

          {/* Card Body */}
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-accent/10 flex-shrink-0">
                {icon}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
                  {mainTitle}
                </h1>
                <p className="text-accent font-medium mt-1">
                  {subTitle}
                </p>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-3 text-xs sm:text-sm text-text-muted">
                  {timePeriod && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-text-muted/75" />
                      {timePeriod}
                    </span>
                  )}
                  {metaInfo && (
                    <>
                      {timePeriod && <span className="text-border hidden sm:inline">•</span>}
                      <span className="flex items-center gap-1">
                        {endpoint === "experience" && <MapPin className="w-4 h-4 text-text-muted/75" />}
                        {metaInfo}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {item.description ? (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                  Description
                </h2>
                <div className="text-text-muted text-sm sm:text-base leading-relaxed whitespace-pre-wrap bg-background/50 border border-border/50 rounded-xl p-4 sm:p-5">
                  {item.description}
                </div>
              </div>
            ) : null}

            {/* Bullet Points / Details list */}
            {bullets && bullets.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                  {endpoint === "projects" ? "Tech Stack" : "Key Notes & Details"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {endpoint === "projects" ? (
                    bullets.map((bullet, i) => (
                      <span key={i} className="pill text-sm px-3 py-1">
                        {bullet}
                      </span>
                    ))
                  ) : (
                    <ul className="w-full space-y-2">
                      {bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-text-muted bg-background/30 px-3 py-2 rounded-lg border border-border/30">
                          <span className="text-accent mt-1.5 text-xs">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Action Links for Projects or Publications */}
            {((endpoint === "projects" && (item.github || item.demo)) ||
              (endpoint === "publications" && (item.link || item.description?.match(/https?:\/\/[^\s]+/)))) && (
              <div className="flex items-center gap-4 pt-6 border-t border-border mt-6">
                {endpoint === "projects" && item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border hover:border-accent text-text-primary hover:text-accent transition-all text-sm font-semibold shadow-sm"
                  >
                    <GithubIcon className="w-5 h-5" />
                    View Code (GitHub)
                  </a>
                )}
                {endpoint === "projects" && item.demo && (
                  <a
                    href={item.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/90 transition-all text-sm font-semibold shadow-lg shadow-accent/20"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
                {endpoint === "publications" && (() => {
                  const url = item.link || item.description?.match(/https?:\/\/[^\s]+/)?.[0];
                  if (!url) return null;
                  const isDoi = url.includes("doi.org");
                  return (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/90 transition-all text-sm font-semibold shadow-lg shadow-accent/20"
                    >
                      <ExternalLink className="w-5 h-5" />
                      {isDoi ? "View DOI" : "View Publication"}
                    </a>
                  );
                })()}
              </div>
            )}

            {/* Gallery Section at the Bottom */}
            {item.image_urls && item.image_urls.length > 1 && (
              <div className="mt-8 pt-6 border-t border-border">
                <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                  Media Gallery ({item.image_urls.length} images)
                </h2>
                <div className="flex flex-wrap gap-3">
                  {item.image_urls.map((img: string, idx: number) => {
                    const isPdf = img.toLowerCase().endsWith(".pdf");
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border transition-all flex items-center justify-center bg-background/50 ${
                          idx === activeImageIndex
                            ? "border-accent ring-2 ring-accent/20 scale-105"
                            : "border-border hover:border-text-muted hover:scale-102"
                        }`}
                      >
                        {isPdf ? (
                          <div className="flex flex-col items-center justify-center p-1 text-center">
                            <FileText className="w-6 h-6 text-red-500" />
                            <span className="text-[10px] font-semibold text-text-muted mt-1 uppercase tracking-wider">PDF</span>
                          </div>
                        ) : (
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
