"use client";

import { Award, Pencil, Trash2, Plus } from "lucide-react";

interface CertificationItem {
  id?: string;
  name: string;
  issuer?: string | null;
  date?: string | null;
  credential_id?: string | null;
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
              className="bg-surface border border-border rounded-xl p-6 card-hover group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-text-primary text-sm">{cert.name}</h3>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
