"use client";

import { GraduationCap, Pencil, Trash2, Plus } from "lucide-react";

interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  period: string;
  gpa?: string | null;
  notes: string[];
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
              <div className="absolute -left-8 top-1 w-4 h-4 rounded-full bg-accent border-4 border-background z-10" />

              <div className="bg-surface border border-border rounded-xl p-6 card-hover group">
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
          ))}
        </div>
      </div>
    </section>
  );
}
