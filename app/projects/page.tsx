"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import AdminModal from "@/components/AdminModal";
import { defaultProjects } from "@/lib/data";
import { Plus, FolderGit2, ExternalLink } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ProjectsPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Modal state
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    fields: { key: string; label: string; type: "text" | "textarea" | "array" }[];
    initialData?: any;
    onSave: (data: any) => Promise<void>;
  }>({
    isOpen: false,
    title: "",
    fields: [],
    onSave: async () => {},
  });

  // Login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
      setAdminToken(token);
    }
  }, []);

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProject]);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data?.length ? data : defaultProjects);
        return;
      }
    } catch {
      // silently fail
    }
    setProjects(defaultProjects);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: loginPassword }),
      });
      if (res.ok) {
        const { token } = await res.json();
        sessionStorage.setItem("adminToken", token);
        setAdminToken(token);
        setIsAdmin(true);
        setShowLoginModal(false);
        setLoginPassword("");
        setLoginError("");
      } else {
        setLoginError("Invalid password");
      }
    } catch {
      setLoginError("Login failed");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsAdmin(false);
    setAdminToken("");
  };

  const apiCall = async (method: string, body?: any) => {
    const res = await fetch("/api/projects", {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": adminToken,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "API call failed");
    }
    return res.json();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await apiCall("DELETE", { id });
    fetchProjects();
  };

  const projectFields = [
    { key: "name", label: "Project Name", type: "text" as const },
    { key: "description", label: "Description", type: "textarea" as const },
    { key: "stack", label: "Tech Stack", type: "array" as const },
    { key: "github", label: "GitHub URL", type: "text" as const },
    { key: "demo", label: "Demo URL", type: "text" as const },
    { key: "image_urls", label: "Image URLs (One per line)", type: "array" as const },
    { key: "sort_order", label: "Sort Order", type: "text" as const },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        isAdmin={isAdmin}
        onAdminLogin={() => setShowLoginModal(true)}
        onAdminLogout={handleLogout}
      />

      <section className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <FolderGit2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
                <p className="text-text-muted text-sm mt-1">
                  A collection of my notable projects and contributions
                </p>
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={() =>
                  setModalConfig({
                    isOpen: true,
                    title: "Add Project",
                    fields: projectFields,
                    onSave: async (data) => {
                      await apiCall("POST", {
                        ...data,
                        sort_order: Number(data.sort_order) || 0,
                      });
                      fetchProjects();
                    },
                  })
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-all duration-200"
                id="add-project-btn"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            )}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard
                  {...project}
                  isAdmin={isAdmin}
                  onEdit={() => {
                    setModalConfig({
                      isOpen: true,
                      title: "Edit Project",
                      fields: projectFields,
                      initialData: project,
                      onSave: async (data) => {
                        await apiCall("PUT", {
                          ...data,
                          sort_order: Number(data.sort_order) || 0,
                        });
                        fetchProjects();
                      },
                    });
                  }}
                  onDelete={() => project.id && handleDelete(project.id)}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin CMS Modal */}
      <AdminModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onSave={modalConfig.onSave}
        fields={modalConfig.fields}
        initialData={modalConfig.initialData}
        title={modalConfig.title}
      />

      {/* Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          />
          <div className="relative bg-surface border border-border rounded-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up shadow-2xl flex flex-col max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white transition-all z-20"
              aria-label="Close details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Multiple Images Slideshow */}
            {selectedProject.image_urls && selectedProject.image_urls.length > 0 ? (
              <div className="h-64 md:h-80 w-full overflow-hidden relative flex-shrink-0 bg-background group">
                <img
                  src={selectedProject.image_urls[activeImageIndex]}
                  alt={`${selectedProject.name} image ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-350 animate-fade-in"
                />
                
                {/* Left Arrow */}
                {selectedProject.image_urls.length > 1 && (
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === 0 ? selectedProject.image_urls.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {/* Right Arrow */}
                {selectedProject.image_urls.length > 1 && (
                  <button
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev === selectedProject.image_urls.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}

                {/* Dots Indicators */}
                {selectedProject.image_urls.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {selectedProject.image_urls.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === activeImageIndex ? "bg-accent scale-125" : "bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="h-24 bg-gradient-to-b from-accent/10 to-surface flex-shrink-0" />
            )}

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-grow">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                {selectedProject.name}
              </h2>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.stack?.map((tech: string, i: number) => (
                  <span key={i} className="pill text-xs px-2.5 py-1">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="text-text-muted text-sm md:text-base leading-relaxed mb-6 whitespace-pre-wrap">
                {selectedProject.description || "No description provided."}
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border hover:border-accent text-text-primary hover:text-accent transition-all text-sm font-medium"
                  >
                    <GithubIcon className="w-5 h-5" />
                    View Code (GitHub)
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent/90 transition-all text-sm font-medium shadow-lg shadow-accent/20"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
                {!selectedProject.github && !selectedProject.demo && (
                  <span className="text-xs text-text-muted">No external links available for this project.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          />
          <div className="relative bg-surface border border-border rounded-2xl w-full max-w-sm p-6 animate-fade-in-up shadow-2xl">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Admin Login</h3>
            <input
              type="password"
              placeholder="Enter admin password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-text-primary text-sm focus:outline-none focus:border-accent transition-colors mb-3"
              autoFocus
            />
            {loginError && (
              <p className="text-red-500 text-sm mb-3">{loginError}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginPassword("");
                  setLoginError("");
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-muted hover:text-text-primary border border-border transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent/90 transition-all"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
