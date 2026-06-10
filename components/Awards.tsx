"use client";

import { Trophy, Pencil, Trash2, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface AwardItem {
  id?: string;
  title: string;
  organizer?: string | null;
  date?: string | null;
  description?: string;
  image_urls?: string[];
  sort_order: number;
}

interface AwardsProps {
  data: AwardItem[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (item: AwardItem) => void;
  onDelete: (id: string) => void;
}

export default function Awards({ data, isAdmin, onAdd, onEdit, onDelete }: AwardsProps) {
  return (
    <section className="py-20 px-4" id="awards">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Trophy className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Awards</h2>
          </div>
          {isAdmin && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200"
              id="add-awards-btn"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        <div className="space-y-3">
          {data.map((award, index) => (
            <div
              key={award.id || index}
              className="bg-surface border border-border rounded-xl p-5 card-hover group flex items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Image Thumbnail or Icon */}
              {award.image_urls && award.image_urls.length > 0 ? (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-background relative flex-shrink-0 shadow-sm">
                  <img
                    src={award.image_urls[0]}
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                  {award.image_urls.length > 1 && (
                    <span className="absolute bottom-0.5 right-0.5 px-0.5 py-0.2 text-[8px] font-bold rounded bg-black/60 text-white leading-none">
                      +{award.image_urls.length - 1}
                    </span>
                  )}
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary text-sm truncate">{award.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                  {award.organizer && <span>{award.organizer}</span>}
                  {award.organizer && award.date && <span className="text-border">•</span>}
                  {award.date && <span>{award.date}</span>}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {award.id && (
                  <Link
                    href={`/awards/${award.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border hover:border-accent text-text-muted hover:text-accent transition-all text-xs font-semibold"
                    id={`awards-detail-${award.id}`}
                  >
                    <span>Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {isAdmin && award.id && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(award)}
                      className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                      aria-label="Edit award"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(award.id!)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                      aria-label="Delete award"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
