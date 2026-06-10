"use client";

import { GraduationCap, Pencil, Trash2, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  period: string;
  gpa?: string | null;
  notes: string[];
  description?: string;
  image_urls?: string[];
  sort_order: number;
}

interface EducationProps {
  data: EducationItem[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (item: EducationItem) => void;
  onDelete: (id: string) => void;
}

export default function Education({ data, isAdmin, onAdd, onEdit, onDelete }: EducationProps) {
  return (
    <section className="py-20 px-4 bg-surface/50" id="education">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <GraduationCap className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Education</h2>
          </div>
          {isAdmin && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200"
              id="add-education-btn"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        <div className="timeline-line pl-8 space-y-8">
          {data.map((item, index) => (
            <div key={item.id || index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-background z-10" />

              <div className="bg-surface border border-border rounded-xl p-6 card-hover group flex flex-col md:flex-row gap-6 items-start">
                {/* Image Thumbnail */}
                {item.image_urls && item.image_urls.length > 0 && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-background relative shadow-sm">
                    <img
                      src={item.image_urls[0]}
                      alt={item.institution}
                      className="w-full h-full object-cover"
                    />
                    {item.image_urls.length > 1 && (
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 text-[9px] font-bold rounded bg-black/60 text-white leading-none">
                        +{item.image_urls.length - 1}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex-1 w-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary">{item.degree}</h3>
                      <p className="text-accent font-medium mt-1">{item.institution}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-text-muted">
                        <span>{item.period}</span>
                        {item.gpa && (
                          <>
                            <span className="text-border">•</span>
                            <span>GPA: {item.gpa}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.id && (
                        <Link
                          href={`/education/${item.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-background border border-border hover:border-accent text-text-muted hover:text-accent transition-all text-xs font-semibold"
                          id={`education-detail-${item.id}`}
                        >
                          <span>Detail</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {isAdmin && item.id && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEdit(item)}
                            className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                            aria-label="Edit education"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDelete(item.id!)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                            aria-label="Delete education"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {item.notes && item.notes.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.notes.map((note, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                          <span className="text-accent mt-1.5 text-xs">▸</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
