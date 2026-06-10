"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Award, BookOpen, Briefcase, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";

interface ItemDetailPageProps {
  endpoint: "experience" | "education" | "certifications" | "awards";
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
  }

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
          {/* Slideshow of images */}
          {item.image_urls && item.image_urls.length > 0 ? (
            <div className="h-64 sm:h-96 w-full overflow-hidden relative bg-background border-b border-border group">
              <img
                src={item.image_urls[activeImageIndex]}
                alt={`${mainTitle} image ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-350"
              />

              {item.image_urls.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? item.image_urls.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === item.image_urls.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {item.image_urls.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === activeImageIndex ? "bg-accent scale-125" : "bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-12 bg-gradient-to-r from-accent/10 to-transparent" />
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
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-text-muted/75" />
                    {timePeriod}
                  </span>
                  {metaInfo && (
                    <>
                      <span className="text-border hidden sm:inline">•</span>
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

            {/* Bullet Points */}
            {bullets && bullets.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">
                  Key Notes & Details
                </h2>
                <ul className="space-y-2">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-text-muted bg-background/30 px-3 py-2 rounded-lg border border-border/30">
                      <span className="text-accent mt-1.5 text-xs">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
