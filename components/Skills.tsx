"use client";

import { Code2, Pencil, Trash2, Plus } from "lucide-react";

interface SkillItem {
  id?: string;
  category: string;
  items: string[];
  sort_order: number;
}

interface SkillsProps {
  data: SkillItem[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (item: SkillItem) => void;
  onDelete: (id: string) => void;
}

export default function Skills({ data, isAdmin, onAdd, onEdit, onDelete }: SkillsProps) {
  return (
    <section className="py-20 px-4" id="skills">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Code2 className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Skills</h2>
          </div>
          {isAdmin && (
            <button
              onClick={onAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200"
              id="add-skills-btn"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        <div className="space-y-8">
          {data.map((group, index) => (
            <div
              key={group.id || index}
              className="bg-surface border border-border rounded-xl p-6 card-hover group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">{group.category}</h3>
                {isAdmin && group.id && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(group)}
                      className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                      aria-label="Edit skills"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(group.id!)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                      aria-label="Delete skills"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, i) => (
                  <span key={i} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
