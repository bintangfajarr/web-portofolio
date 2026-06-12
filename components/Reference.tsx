"use client";

import { MessageSquare, Pencil, Trash2, Plus, ChevronRight, Quote } from "lucide-react";
import Link from "next/link";

export interface ReferenceItem {
  id?: string;
  name: string;
  relationship: string;
  company: string;
  email?: string;
  phone?: string;
  description: string;
  image_urls?: string[];
  sort_order: number;
}

interface ReferenceProps {
  data: ReferenceItem[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (item: ReferenceItem) => void;
  onDelete: (id: string) => void;
}

export default function Reference({ data, isAdmin, onAdd, onEdit, onDelete }: ReferenceProps) {
  return (
    <section className="py-20 px-4 bg-surface/50" id="reference">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <MessageSquare className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">References</h2>
          </div>
          {isAdmin && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200"
              id="add-reference-btn"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((ref, index) => (
            <div
              key={ref.id || index}
              className="bg-surface border border-border rounded-xl p-6 card-hover group relative flex flex-col justify-between animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="absolute top-6 right-6 text-accent/10 pointer-events-none">
                <Quote className="w-12 h-12" />
              </div>

              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold text-text-primary text-lg leading-tight">{ref.name}</h3>
                    <p className="text-accent text-sm font-medium mt-1">{ref.relationship}</p>
                    <p className="text-text-muted text-xs mt-0.5">{ref.company}</p>
                  </div>
                </div>

                <div className="text-text-muted text-sm leading-relaxed mb-6 italic">
                  &ldquo;{ref.description}&rdquo;
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <div className="text-xs text-text-muted">
                  {ref.email && <p className="truncate">Email: {ref.email}</p>}
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  {ref.id && (
                    <Link
                      href={`/reference/${ref.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border hover:border-accent text-text-muted hover:text-accent transition-all text-xs font-semibold"
                      id={`reference-detail-${ref.id}`}
                    >
                      <span>Detail</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {isAdmin && ref.id && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(ref)}
                        className="p-1.5 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                        aria-label="Edit reference"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(ref.id!)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                        aria-label="Delete reference"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
