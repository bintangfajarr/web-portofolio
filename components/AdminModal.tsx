"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "array";
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  fields: FieldDef[];
  initialData?: Record<string, unknown>;
  title: string;
}

export default function AdminModal({
  isOpen,
  onClose,
  onSave,
  fields,
  initialData,
  title,
}: AdminModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({ ...initialData });
      } else {
        const empty: Record<string, unknown> = {};
        fields.forEach((f) => {
          empty[f.key] = f.type === "array" ? [""] : "";
        });
        setFormData(empty);
      }
      setError("");
    }
  }, [isOpen, initialData, fields]);

  const handleTextChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key: string, index: number, value: string) => {
    const arr = [...((formData[key] as string[]) || [])];
    arr[index] = value;
    setFormData((prev) => ({ ...prev, [key]: arr }));
  };

  const addArrayItem = (key: string) => {
    const arr = [...((formData[key] as string[]) || []), ""];
    setFormData((prev) => ({ ...prev, [key]: arr }));
  };

  const removeArrayItem = (key: string, index: number) => {
    const arr = [...((formData[key] as string[]) || [])];
    arr.splice(index, 1);
    setFormData((prev) => ({ ...prev, [key]: arr }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Clean up array fields (remove empty strings)
      const cleanData = { ...formData };
      fields.forEach((f) => {
        if (f.type === "array") {
          cleanData[f.key] = ((cleanData[f.key] as string[]) || []).filter(
            (s) => s.trim() !== ""
          );
        }
      });

      await onSave(cleanData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-border rounded-2xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-fade-in-up shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-background text-text-muted hover:text-text-primary transition-all"
            aria-label="Close modal"
            id="admin-modal-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                {field.label}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  value={(formData[field.key] as string) || ""}
                  onChange={(e) => handleTextChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  value={(formData[field.key] as string) || ""}
                  onChange={(e) => handleTextChange(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-text-primary text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}

              {field.type === "array" && (
                <div className="space-y-2">
                  {((formData[field.key] as string[]) || [""]).map(
                    (item: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleArrayChange(field.key, index, e.target.value)
                          }
                          className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-text-primary text-sm focus:outline-none focus:border-accent transition-colors"
                          placeholder={`Item ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayItem(field.key, index)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                          aria-label="Remove item"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => addArrayItem(field.key)}
                    className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add item
                  </button>
                </div>
              )}
            </div>
          ))}

          {error && (
            <p className="text-red-500 text-sm bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text-primary hover:bg-background border border-border transition-all"
            id="admin-modal-cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-all disabled:opacity-50"
            id="admin-modal-save"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
