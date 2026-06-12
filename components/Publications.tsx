"use client";

import { BookOpen, Pencil, Trash2, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface PublicationItem {
  id?: string;
  title: string;
  publisher: string;
  date: string;
  description?: string;
  authors?: string;
  image_urls?: string[];
  sort_order: number;
}

interface PublicationsProps {
  data: PublicationItem[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (item: PublicationItem) => void;
  onDelete: (id: string) => void;
}

export default function Publications({ data, isAdmin, onAdd, onEdit, onDelete }: PublicationsProps) {
  return (
    <section className="py-20 px-4" id="publications">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Publications</h2>
          </div>
          {isAdmin && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200"
              id="add-publications-btn"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        <div className="space-y-4">
          {data.map((pub, index) => (
            <div
              key={pub.id || index}
              className="bg-surface border border-border rounded-xl p-6 card-hover group flex flex-col md:flex-row gap-6 items-start justify-between animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-primary text-lg leading-snug">{pub.title}</h3>
                <p className="text-accent text-sm font-medium mt-1">{pub.publisher}</p>
                {pub.date && (
                  <p className="text-text-muted text-xs mt-1">{pub.date}</p>
                )}
                {pub.description && (
                  <p className="text-text-muted text-sm mt-3 line-clamp-2 leading-relaxed">
                    {pub.description}
                  </p>
                )}
                {pub.authors && (
                  <p className="text-text-muted/80 text-xs mt-2 italic">
                    Authors: {pub.authors}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {pub.id && (
                  <Link
                    href={`/publications/${pub.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border hover:border-accent text-text-muted hover:text-accent transition-all text-xs font-semibold"
                    id={`publications-detail-${pub.id}`}
                  >
                    <span>Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {isAdmin && pub.id && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(pub)}
                      className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                      aria-label="Edit publication"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(pub.id!)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                      aria-label="Delete publication"
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
