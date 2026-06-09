"use client";

import { Briefcase, Pencil, Trash2, Plus } from "lucide-react";

interface ExperienceItem {
  id?: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  sort_order: number;
}

interface ExperienceProps {
  data: ExperienceItem[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (item: ExperienceItem) => void;
  onDelete: (id: string) => void;
}

export default function Experience({ data, isAdmin, onAdd, onEdit, onDelete }: ExperienceProps) {
  return (
    <section className="py-20 px-4" id="experience">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Briefcase className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Experience</h2>
          </div>
          {isAdmin && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200"
              id="add-experience-btn"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        <div className="timeline-line pl-8 space-y-8">
          {data.map((item, index) => (
            <div key={item.id || index} className="relative animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Timeline dot */}
              <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-accent border-4 border-background z-10" />

              <div className="bg-surface border border-border rounded-xl p-6 card-hover group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary">{item.role}</h3>
                    <p className="text-accent font-medium mt-1">{item.company}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-text-muted">
                      <span>{item.period}</span>
                      {item.location && (
                        <>
                          <span className="text-border">•</span>
                          <span>{item.location}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {isAdmin && item.id && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                        aria-label="Edit experience"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id!)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                        aria-label="Delete experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                        <span className="text-accent mt-1.5 text-xs">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
