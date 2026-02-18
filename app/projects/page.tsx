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
    title: "Ubuntu Logistics - Leading African Logistics Solutions",
    description:
      " Your trusted African logistics partner Global experts in container shipping, warehousing and supply chain management, backed by our proven technology and African market expertise.",
    image: "/ubuntulogistics.png",
    tags: [
      "Next.js",
      "Framer Motion",
      "Tailwind CSS",
      "zustand",
      "API Integration",
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
      "Nigeria's pioneering self-checkout platform that lets customers scan products, pay instantly, and walk out — no queues, no waiting.",
    image: "/retailgo.png",
    tags: [
      "React.js",
      "Zustand",
      "API Integration",
      "Framer Motion",
      "Tailwind CSS",
    ],
    category: "Web Development",
    demoUrl: "https://retailgong.vercel.app/",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Ubuntu Portal - Connecting sellers with buyers across Africa",
    description:
      "The premier B2B market place where sellers showcase quality products and buyers discover trusted partners.",
    image: "/ubuntutrade.png",
    tags: [
      "Next.js",
      "Zustand",
      "API Integration",
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
    title: "Parcel App",
    description:
      "ParcelApp is a modern, user-friendly delivery service platform designed for seamless package sending, tracking, and management. Whether you're a customer, rider, or business, ParcelApp brings everything you need into one unified, fast, and mobile-first experience.",
    image: "/parcel.png",
    tags: ["HTML", "CSS"],
    category: "Mobile Engineering",
    demoUrl: "https://parcel-appp.vercel.app/",
    githubUrl: "https://github.com/thesongmartins/Parcel",
    featured: true,
  },
  {
    id: 4,
    title: "Expense Tracker",
    description:
      "The Expense Tracker is a simple and intuitive web application that helps users track their income and expenses. It provides insightful financial data, including income, expenses, and balance calculations, using local storage for data persistence.",
    image: "/expensetracker.png",
    tags: ["Html", "CSS", "JavaScript"],
    category: "UI/UX Design",
    demoUrl: "https://myexpensetracker1.vercel.app/",
    githubUrl: "https://github.com/thesongmartins/Expense-Tracker",
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
    demoUrl: "https://omni-food-phi.vercel.app/",
    githubUrl: "https://github.com/thesongmartins/Manage-Landing-Page/",
    featured: false,
  },
  {
    id: 6,
    title: "Jenom Portfolio",
    description:
      "This a portfolio project for an outstanding designer, based in Jos, Nigeria. The project showcases some the prominent and eye catching designs and styles of the designer which will captivate the heart of his clients and the general public.",
    image: "/jenom.png",
    tags: ["Html", "CSS", "JavaScript", "SCSS", "SASS"],
    category: "AI/ML",
    demoUrl: "https://jenom-web.vercel.app/",
    githubUrl: "https://github.com/thesongmartins/Jenom-web",
    featured: false,
  },
  {
    id: 7,
    title: "Re-Flect",
    description:
      "Re-Flect is your all-in-one journaling platform, designed to foster mindfulness and personal growth. It is a next-generation journaling application designed to transform the way you interact with your thoughts and emotions.",
    image: "/reflect.png",
    tags: ["React.js", "Axios", "API Integration", "Django", "Tailwind CSS"],
    category: "Web Development",
    demoUrl: "https://re-flect.vercel.app/dashboard",
    githubUrl: "https://github.com/thesongmartins/Re-Flect",
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
              <span className="text-primary">All</span> Projects
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
