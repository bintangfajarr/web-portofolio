"use client";

import { Trophy, Pencil, Trash2, Plus } from "lucide-react";

interface AwardItem {
  id?: string;
  title: string;
  organizer?: string | null;
  date?: string | null;
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
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-accent" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary text-sm">{award.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-muted">
                  {award.organizer && <span>{award.organizer}</span>}
                  {award.organizer && award.date && <span className="text-border">•</span>}
                  {award.date && <span>{award.date}</span>}
                </div>
              </div>

              {isAdmin && award.id && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
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
          ))}
        </div>
      </div>
    </section>
  );
}
