"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/theme-provider";

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 0,
    title: "Ubuntu Logistics",
    description:
      "We help organizations ship the right products and bring our own innovations to market.t.",
    image: "/ubuntulogistics.png",
    tags: [
      "Next.js",
      "Framer Motion",
      "Tailwind CSS",
      "zustand",
      "Django",
      "Python",
    ],
    category: "Web Development",
    demoUrl: "https://ubuntuport.com/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 1,
    title: "RetailGo Platform",
    description:
      "Your all-in-one platform connecting Muslims with their local masjids and strengthening Ummah bonds",
    image: "/retailgo.png",
    tags: ["React.js", "Zustand", "Framer Motion", "Tailwind CSS"],
    category: "Web Development",
    demoUrl: "https://retailgong.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Ubuntu Portal - Trade Platform",
    description:
      "A full-featured online store with animations and micro-interactions that enhance the shopping experience.",
    image: "/UbuntuPortal.png",
    tags: [
      "Next.js",
      "Zustand",
      "Framer Motion",
      "Tailwind CSS",
      "Django",
      "Python",
    ],
    category: "Web Development",
    demoUrl: "https://ubuntuportal.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "HomeDirect - Property listing",
    description:
      "A property listing website that allows home-owners lists thier spaces to liable tenants.",
    image: "/homedirect.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "SupaBase"],
    category: "3D Development",
    demoUrl: "https://homedirect.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Parkkly",
    description:
      "We are a technology company first, but with a major focus on Safe, Smart, and Sustainable Parking Within Your Reach.",
    image: "/Parkkly.png",
    tags: ["Next.js", "Firebase", "Framer Motion", "Tailwind"],
    category: "UI/UX Design",
    demoUrl: "https://www.parkkly.com/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 5,
    title: "OmniFood",
    description:
      "We are a technology company first, but with a major focus on consumer well-being through a healthy diet.",
    image: "/OmniFood.png",
    tags: ["Html", "CSS", "JavaScript"],
    category: "Mobile Development",
    demoUrl: "https://maydan12.github.io/Omni-Food/",
    githubUrl: "https://github.com/MayDan12/Omni-Food",
    featured: false,
  },
  {
    id: 6,
    title: "TestMaster",
    description:
      "TestMaster is the ultimate tool for teachers who want to create computer-based tests quickly and efficiently. Set up timed tests, provide instant feedback, and track student progress effortlessly.",
    image: "/TestMaster.png",
    tags: ["Next.js", "Tailwind", "Supabase", "NextAuth", "Framer Motion"],
    category: "AI/ML",
    demoUrl: "https://testmaster-beta.vercel.app/",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 7,
    title: "Mently Dasboard",
    description: "Learning Dashboard",
    image: "/mently.png",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    category: "Web Development",
    demoUrl: "https://mently-fe-test.vercel.app/",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 8,
    title: "Ubuntu Portal Logistics",
    description: "Logistics website.",
    image: "/Logistic.png",
    tags: ["React", "OpenWeather API", "Mapbox"],
    category: "Web Development",
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 9,
    title: "Friskay",
    description: "A cat food website",
    image: "/Friskay.png",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    category: "Web Development",
    demoUrl: "",
    githubUrl: "#",
    featured: false,
  },
];

// Extract unique categories and tags
const allCategories = [
  "All",
  ...new Set(projectsData.map((project) => project.category)),
];
const allTags = [...new Set(projectsData.flatMap((project) => project.tags))];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [mounted, setMounted] = useState(false);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter projects based on search, category, and tags
  useEffect(() => {
    let filtered = projectsData;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTags.some((tag) => project.tags.includes(tag))
      );
    }

    setFilteredProjects(filtered);
  }, [searchQuery, selectedCategory, selectedTags]);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold">
              <span className="text-primary">My</span> Projects
            </h1>
            <div className="w-[100px]"></div> {/* Spacer for centering */}
          </div>
        </header>

        <main className="container px-4 py-12 md:py-16">
          {/* Filters section */}
          <section className="mb-12">
            <div className="flex flex-col gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Filter by Category
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {allCategories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-muted-foreground">
                    Filter by Tags
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {allTags.slice(0, 6).map((tag) => (
                      <Button
                        key={tag}
                        variant={
                          selectedTags.includes(tag) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(
                              selectedTags.filter((t) => t !== tag)
                            );
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                        className={
                          selectedTags.includes(tag)
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }
                      >
                        {tag}
                      </Button>
                    ))}
                    {allTags.length > 6 && (
                      <Button variant="ghost" size="sm">
                        +{allTags.length - 6} more
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects grid */}
          <section>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <h3 className="text-xl font-medium">No projects found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

interface ProjectCardProps {
  project: (typeof projectsData)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-card"
    >
      {project.featured && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Featured
        </div>
      )}

      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={800}
          height={600}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="sm"
            variant="outline"
            className="bg-background/80 backdrop-blur-sm"
          >
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener"
              className="flex gap-26"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-background/80 backdrop-blur-sm"
          >
            <Github className="mr-2 h-4 w-4" />
            Code
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
