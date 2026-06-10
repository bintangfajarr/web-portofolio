"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import ProjectCard from "@/components/ProjectCard";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Awards from "@/components/Awards";
import AdminModal from "@/components/AdminModal";
import { personalInfo, defaultProjects } from "@/lib/data";
import {
  defaultExperience,
  defaultEducation,
  defaultSkills,
  defaultCertifications,
  defaultAwards,
} from "@/lib/data";
import { Mail, Heart, FolderGit2, Plus, ExternalLink } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");

  // Data states
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [aboutInfo, setAboutInfo] = useState<any>({
    name: personalInfo.name,
    title: personalInfo.title,
    bio: personalInfo.bio,
    email: personalInfo.email,
    phone: personalInfo.phone,
    linkedin: personalInfo.linkedin,
    github: personalInfo.github,
    languages: personalInfo.languages,
    cv_url: "/cv.pdf",
  });

  // Project modal & slideshow states
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

  // Reset active image index when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedProject]);

  // Check session
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      setIsAdmin(true);
      setAdminToken(token);
    }
  }, []);

  // Handle hash scroll on landing
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 600);
    }
  }, []);

  // Fetch data
  const fetchData = useCallback(async (endpoint: string) => {
    try {
      const res = await fetch(`/api/${endpoint}`);
      if (res.ok) return await res.json();
    } catch {
      // silently fail, use defaults
    }
    return null;
  }, []);

  const loadAllData = useCallback(async () => {
    const [exp, edu, proj, sk, cert, aw, ab] = await Promise.all([
      fetchData("experience"),
      fetchData("education"),
      fetchData("projects"),
      fetchData("skills"),
      fetchData("certifications"),
      fetchData("awards"),
      fetchData("about"),
    ]);

    setExperience(exp?.length ? exp : defaultExperience);
    setEducation(edu?.length ? edu : defaultEducation);
    setProjects(proj?.length ? proj : defaultProjects);
    setSkills(sk?.length ? sk : defaultSkills);
    setCertifications(cert?.length ? cert : defaultCertifications);
    setAwards(aw?.length ? aw : defaultAwards);
    if (ab) {
      setAboutInfo(ab);
    }
  }, [fetchData]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Admin login
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

  // Generic API helpers
  const apiCall = async (
    endpoint: string,
    method: string,
    body?: any
  ) => {
    const res = await fetch(`/api/${endpoint}`, {
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

  const handleDelete = async (endpoint: string, id: string, refreshFn: () => void) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await apiCall(endpoint, "DELETE", { id });
    refreshFn();
  };

  // Section refresh functions
  const refreshExperience = async () => {
    const data = await fetchData("experience");
    setExperience(data?.length ? data : defaultExperience);
  };
  const refreshEducation = async () => {
    const data = await fetchData("education");
    setEducation(data?.length ? data : defaultEducation);
  };
  const refreshProjects = async () => {
    const data = await fetchData("projects");
    setProjects(data?.length ? data : defaultProjects);
  };
  const refreshSkills = async () => {
    const data = await fetchData("skills");
    setSkills(data?.length ? data : defaultSkills);
  };
  const refreshCertifications = async () => {
    const data = await fetchData("certifications");
    setCertifications(data?.length ? data : defaultCertifications);
  };
  const refreshAwards = async () => {
    const data = await fetchData("awards");
    setAwards(data?.length ? data : defaultAwards);
  };
  const refreshAbout = async () => {
    const data = await fetchData("about");
    if (data) setAboutInfo(data);
  };

  // About me fields
  const aboutFields = [
    { key: "name", label: "Full Name", type: "text" as const },
    { key: "title", label: "Primary Title", type: "text" as const },
    { key: "bio", label: "Bio Description", type: "textarea" as const },
    { key: "email", label: "Email Address", type: "text" as const },
    { key: "phone", label: "Phone Number", type: "text" as const },
    { key: "linkedin", label: "LinkedIn URL", type: "text" as const },
    { key: "github", label: "GitHub URL", type: "text" as const },
    { key: "cv_url", label: "CV Document URL", type: "text" as const },
  ];

  // Section fields with description and image_urls added
  const experienceFields = [
    { key: "company", label: "Company", type: "text" as const },
    { key: "role", label: "Role", type: "text" as const },
    { key: "period", label: "Period", type: "text" as const },
    { key: "location", label: "Location", type: "text" as const },
    { key: "bullets", label: "Description Points", type: "array" as const },
    { key: "description", label: "Detailed Explanation (For Detail Page)", type: "textarea" as const },
    { key: "image_urls", label: "Image URLs (For Slideshow)", type: "array" as const },
    { key: "sort_order", label: "Sort Order", type: "text" as const },
  ];

  const educationFields = [
    { key: "institution", label: "Institution", type: "text" as const },
    { key: "degree", label: "Degree", type: "text" as const },
    { key: "period", label: "Period", type: "text" as const },
    { key: "gpa", label: "GPA", type: "text" as const },
    { key: "notes", label: "Notes", type: "array" as const },
    { key: "description", label: "Detailed Explanation (For Detail Page)", type: "textarea" as const },
    { key: "image_urls", label: "Image URLs (For Slideshow)", type: "array" as const },
    { key: "sort_order", label: "Sort Order", type: "text" as const },
  ];

  const projectFields = [
    { key: "name", label: "Project Name", type: "text" as const },
    { key: "description", label: "Description", type: "textarea" as const },
    { key: "stack", label: "Tech Stack", type: "array" as const },
    { key: "github", label: "GitHub URL", type: "text" as const },
    { key: "demo", label: "Demo URL", type: "text" as const },
    { key: "image_urls", label: "Image URLs (One per line)", type: "array" as const },
    { key: "sort_order", label: "Sort Order", type: "text" as const },
  ];

  const skillsFields = [
    { key: "category", label: "Category", type: "text" as const },
    { key: "items", label: "Skills", type: "array" as const },
    { key: "sort_order", label: "Sort Order", type: "text" as const },
  ];

  const certificationFields = [
    { key: "name", label: "Name", type: "text" as const },
    { key: "issuer", label: "Issuer", type: "text" as const },
    { key: "date", label: "Date", type: "text" as const },
    { key: "credential_id", label: "Credential ID", type: "text" as const },
    { key: "description", label: "Detailed Explanation (For Detail Page)", type: "textarea" as const },
    { key: "image_urls", label: "Image URLs (For Slideshow)", type: "array" as const },
    { key: "sort_order", label: "Sort Order", type: "text" as const },
  ];

  const awardFields = [
    { key: "title", label: "Title", type: "text" as const },
    { key: "organizer", label: "Organizer", type: "text" as const },
    { key: "date", label: "Date", type: "text" as const },
    { key: "description", label: "Detailed Explanation (For Detail Page)", type: "textarea" as const },
    { key: "image_urls", label: "Image URLs (For Slideshow)", type: "array" as const },
    { key: "sort_order", label: "Sort Order", type: "text" as const },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        isAdmin={isAdmin}
        onAdminLogin={() => setShowLoginModal(true)}
        onAdminLogout={handleLogout}
      />

      <Hero
        aboutInfo={aboutInfo}
        isAdmin={isAdmin}
        onEditAbout={() =>
          setModalConfig({
            isOpen: true,
            title: "Edit Profile Info",
            fields: aboutFields,
            initialData: aboutInfo,
            onSave: async (data) => {
              await apiCall("about", "POST", data);
              refreshAbout();
            },
          })
        }
      />

      <Experience
        data={experience}
        isAdmin={isAdmin}
        onAdd={() =>
          setModalConfig({
            isOpen: true,
            title: "Add Experience",
            fields: experienceFields,
            onSave: async (data) => {
              await apiCall("experience", "POST", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshExperience();
            },
          })
        }
        onEdit={(item) =>
          setModalConfig({
            isOpen: true,
            title: "Edit Experience",
            fields: experienceFields,
            initialData: item,
            onSave: async (data) => {
              await apiCall("experience", "PUT", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshExperience();
            },
          })
        }
        onDelete={(id) => handleDelete("experience", id, refreshExperience)}
      />

      <Education
        data={education}
        isAdmin={isAdmin}
        onAdd={() =>
          setModalConfig({
            isOpen: true,
            title: "Add Education",
            fields: educationFields,
            onSave: async (data) => {
              await apiCall("education", "POST", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshEducation();
            },
          })
        }
        onEdit={(item) =>
          setModalConfig({
            isOpen: true,
            title: "Edit Education",
            fields: educationFields,
            initialData: item,
            onSave: async (data) => {
              await apiCall("education", "PUT", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshEducation();
            },
          })
        }
        onDelete={(id) => handleDelete("education", id, refreshEducation)}
      />

      {/* Projects Section */}
      <section className="py-20 px-4" id="projects">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <FolderGit2 className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-text-primary">Projects</h2>
            </div>
            {isAdmin && (
              <button
                onClick={() =>
                  setModalConfig({
                    isOpen: true,
                    title: "Add Project",
                    fields: projectFields,
                    onSave: async (data) => {
                      await apiCall("projects", "POST", {
                        ...data,
                        sort_order: Number(data.sort_order) || 0,
                      });
                      refreshProjects();
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        await apiCall("projects", "PUT", {
                          ...data,
                          sort_order: Number(data.sort_order) || 0,
                        });
                        refreshProjects();
                      },
                    });
                  }}
                  onDelete={() => project.id && handleDelete("projects", project.id, refreshProjects)}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Skills
        data={skills}
        isAdmin={isAdmin}
        onAdd={() =>
          setModalConfig({
            isOpen: true,
            title: "Add Skill Category",
            fields: skillsFields,
            onSave: async (data) => {
              await apiCall("skills", "POST", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshSkills();
            },
          })
        }
        onEdit={(item) =>
          setModalConfig({
            isOpen: true,
            title: "Edit Skill Category",
            fields: skillsFields,
            initialData: item,
            onSave: async (data) => {
              await apiCall("skills", "PUT", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshSkills();
            },
          })
        }
        onDelete={(id) => handleDelete("skills", id, refreshSkills)}
      />

      <Certifications
        data={certifications}
        isAdmin={isAdmin}
        onAdd={() =>
          setModalConfig({
            isOpen: true,
            title: "Add Certification",
            fields: certificationFields,
            onSave: async (data) => {
              await apiCall("certifications", "POST", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshCertifications();
            },
          })
        }
        onEdit={(item) =>
          setModalConfig({
            isOpen: true,
            title: "Edit Certification",
            fields: certificationFields,
            initialData: item,
            onSave: async (data) => {
              await apiCall("certifications", "PUT", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshCertifications();
            },
          })
        }
        onDelete={(id) => handleDelete("certifications", id, refreshCertifications)}
      />

      <Awards
        data={awards}
        isAdmin={isAdmin}
        onAdd={() =>
          setModalConfig({
            isOpen: true,
            title: "Add Award",
            fields: awardFields,
            onSave: async (data) => {
              await apiCall("awards", "POST", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshAwards();
            },
          })
        }
        onEdit={(item) =>
          setModalConfig({
            isOpen: true,
            title: "Edit Award",
            fields: awardFields,
            initialData: item,
            onSave: async (data) => {
              await apiCall("awards", "PUT", { ...data, sort_order: Number(data.sort_order) || 0 });
              refreshAwards();
            },
          })
        }
        onDelete={(id) => handleDelete("awards", id, refreshAwards)}
      />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border" id="footer">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-text-primary font-semibold">{personalInfo.shortName}</p>
              <p className="text-text-muted text-sm mt-1">
                {personalInfo.title}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-lg hover:bg-surface text-text-muted hover:text-accent transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-surface text-text-muted hover:text-accent transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-surface text-text-muted hover:text-accent transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-text-muted text-sm flex items-center justify-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 inline" /> using Next.js &amp; Tailwind CSS
            </p>
            <p className="text-text-muted/60 text-xs mt-2">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Admin CMS Modal */}
      <AdminModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onSave={modalConfig.onSave}
        fields={modalConfig.fields}
        initialData={modalConfig.initialData}
        title={modalConfig.title}
      />

      {/* Project Details Modal */}
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
              id="admin-password-input"
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
                id="admin-login-submit"
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
