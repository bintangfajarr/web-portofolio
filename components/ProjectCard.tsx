"use client";

import { ExternalLink, Pencil, Trash2, ChevronRight } from "lucide-react";
import Link from "next/link";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

interface ProjectCardProps {
  id?: string;
  name: string;
  description?: string | null;
  stack: string[];
  github?: string | null;
  demo?: string | null;
  image_urls?: string[] | null;
  isAdmin: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

export default function ProjectCard({
  id,
  name,
  description,
  stack,
  github,
  demo,
  isAdmin,
  onEdit,
  onDelete,
  onClick,
}: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-border rounded-xl card-hover group flex flex-col h-full overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="p-6 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-text-primary text-lg leading-tight">{name}</h3>
          {isAdmin && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(e);
                }}
                className="p-1.5 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all"
                aria-label="Edit project"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(e);
                }}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-all"
                aria-label="Delete project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {description}
          </p>
        )}

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stack.slice(0, 4).map((tech, i) => (
            <span key={i} className="pill text-xs">
              {tech}
            </span>
          ))}
          {stack.length > 4 && (
            <span className="pill text-xs text-text-muted">
              +{stack.length - 4} more
            </span>
          )}
        </div>

        {/* Links & Detail */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <div className="flex items-center gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                Code
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
            {!github && !demo && (
              <span className="text-xs text-text-muted">No links</span>
            )}
          </div>

          {id && (
            <Link
              href={`/projects/${id}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-background border border-border hover:border-accent text-text-muted hover:text-accent transition-all text-xs font-semibold"
              id={`projects-detail-${id}`}
            >
              <span>Detail</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
