"use client";

import { Award, Pencil, Trash2, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface CertificationItem {
  id?: string;
  name: string;
  issuer?: string | null;
  date?: string | null;
  credential_id?: string | null;
  description?: string;
  image_urls?: string[];
  sort_order: number;
}

interface CertificationsProps {
  data: CertificationItem[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (item: CertificationItem) => void;
  onDelete: (id: string) => void;
}

export default function Certifications({ data, isAdmin, onAdd, onEdit, onDelete }: CertificationsProps) {
  return (
    <section className="py-20 px-4 bg-surface/50" id="certifications">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Certifications</h2>
          </div>
          {isAdmin && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200"
              id="add-certifications-btn"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((cert, index) => (
            <div
              key={cert.id || index}
              className="bg-surface border border-border rounded-xl p-6 card-hover group flex flex-col justify-between animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-4">
                  {/* Image Thumbnail or Icon */}
                  {cert.image_urls && cert.image_urls.length > 0 ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-border bg-background relative flex-shrink-0 shadow-sm">
                      <img
                        src={cert.image_urls[0]}
                        alt={cert.name}
                        className="w-full h-full object-cover"
                      />
                      {cert.image_urls.length > 1 && (
                        <span className="absolute bottom-0.5 right-0.5 px-0.5 py-0.2 text-[8px] font-bold rounded bg-black/60 text-white leading-none">
                          +{cert.image_urls.length - 1}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                  )}

                  {isAdmin && cert.id && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(cert)}
                        className="p-1.5 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                        aria-label="Edit certification"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(cert.id!)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                        aria-label="Delete certification"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-text-primary text-sm line-clamp-2">{cert.name}</h3>
                {cert.issuer && (
                  <p className="text-accent text-sm mt-1">{cert.issuer}</p>
                )}
                {cert.date && (
                  <p className="text-text-muted text-xs mt-2">{cert.date}</p>
                )}
                {cert.credential_id && (
                  <p className="text-text-muted text-xs mt-1">
                    ID: <span className="font-mono">{cert.credential_id}</span>
                  </p>
                )}
              </div>

              {cert.id && (
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <Link
                    href={`/certifications/${cert.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border hover:border-accent text-text-muted hover:text-accent transition-all text-xs font-semibold"
                    id={`certifications-detail-${cert.id}`}
                  >
                    <span>Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
