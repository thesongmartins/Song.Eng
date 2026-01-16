"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code,
  ExternalLink,
  Github,
  Loader,
  Mail,
  Menu,
  Moon,
  Sun,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "@/lib/utils";
import Image from "next/image";
import TrustedPartners from "@/components/TrustedClient";
import { useRouter } from "next/navigation";

export default function Portfolio() {
  // const { setTheme, theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle cursor hover state
  useEffect(() => {
    const handleMouseOver = () => setCursorHovered(true);
    const handleMouseOut = () => setCursorHovered(false);

    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [mounted]);

  // Update cursor position
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
  }, [cursorPosition]);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("access_key", process.env.NEXT_PUBLIC_ACCESS_KEY!); // Replace with your actual key

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        alert("Message sent successfully!");
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="relative min-h-screen bg-background text-foreground overflow-hidden ">
        {/* Custom cursor */}
        <div
          ref={cursorRef}
          className={cn(
            "fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference",
            "border-2 border-white transition-all duration-100 ease-out",
            cursorHovered ? "w-16 h-16 bg-white/20" : "bg-transparent"
          )}
          style={{
            transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
            marginLeft: "-16px",
            marginTop: "-16px",
          }}
        />

        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
          style={{ width: progressWidth }}
        />

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b">
          <div className="container flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter interactive"
            >
              <p>
                <span className="text-primary">Jehoshaphat </span>Martins
              </p>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
              <ThemeToggle />
            </div>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="interactive">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 mt-8">
                    <NavLinks mobile />
                    <ThemeToggle />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <main ref={containerRef}>
          {/* Hero section */}
          <section className="relative h-screen flex items-center ">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
            </div>

            <div className="container relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl"
              >
                <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-primary font-medium">
                    Frontend Engineer & Web3 Engineer
                  </span>
                </div>
                <h1 className="text-4xl md:text-7xl font-bold mb-4">
                  Creating <span className="text-primary">digital</span>{" "}
                  experiences that <AnimatedText />
                </h1>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                  I craft high-converting, clean and responsive websites &
                  mobile apps for businesses, brands & individuals
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="interactive group"
                    onClick={() => router.push("/projects")}
                  >
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="interactive"
                    onClick={() => router.push("#contact")}
                  >
                    Contact Me
                  </Button>
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-8 h-12 rounded-full border-2 border-primary flex items-start justify-center">
                <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </section>

          {/* About section */}
          <section
            className="py-12 md:py-16 lg:py-20 bg-muted/30 px-4 sm:px-6 lg:px-8"
            id="about"
          >
            <div className="container">
              <SectionHeading
                title="About Me"
                subtitle="Background and Skills"
              />

              <div className="grid md:grid-cols-2 gap-12 items-center mt-14">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src="/song.JPG"
                        alt="Engineer portrait"
                        priority
                        width={600}
                        height={600}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground text-5xl font-bold">
                        2+
                      </span>
                    </div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary rounded-lg" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-3xl font-bold mb-4">
                    I&apos;m an ardent
                    <span className="text-primary">
                      {" "}
                      Frontend Engineer
                    </span>{" "}
                    Driven by curiosity
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    and a love for building useful things, focused on creating
                    real-world web and mobile applications. I&apos;ve
                    contributed to meaningful projects like Ubuntu Portal, an
                    E-commerce and logistics-driven platform designed to help
                    people connect, trade, and ship products across africa, and
                    RetailGo, a retail-focused solution built to streamline
                    product discovery and improve the buying experience. I enjoy
                    working with React Native, Next.js, and TypeScript,
                    translating ideas and business needs into clean, intuitive
                    interfaces. Beyond writing clean, scalable and maintainable
                    code, I care deeply about growth, learning in public,
                    sharing lessons from my journey, and building projects that
                    make technology feel accessible rather than intimidating.
                    Outside of tech, I enjoy movies, gaming, reading and taking
                    time to recharge.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>React.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>React Native</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Animation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>TypeScript</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Tailwind CSS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Three.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Express.js</span>
                    </div>
                  </div>

                  <Button className="interactive">Download Resume</Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills section */}
          <section className="py-10  " id="skills">
            <div className="container">
              <SectionHeading
                title="Skills & Expertise"
                subtitle="My work stacks"
              />

              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                <SkillCard
                  icon={<Code className="h-8 w-8" />}
                  title="Frontend Engineering"
                />
                <SkillCard
                  icon={<Code className="h-8 w-8" />}
                  title="Animation"
                />
                <SkillCard
                  icon={<Code className="h-8 w-8" />}
                  title="API Integrations"
                />
                <SkillCard icon={<Code className="h-8 w-8" />} title="SEO" />
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-5 text-center">
                  Technologies
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Python",
                    "React-Native",
                    "Tailwind CSS",
                    "Framer Motion",
                    "Three.js",
                    "Firebase",
                    "Supabase",
                    "Figma",
                    "Express.js",
                  ].map((tech) => (
                    <div
                      key={tech}
                      className="px-4 py-2 bg-background border rounded-full text-sm font-medium"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Projects section */}
          <section className="py-10  bg-muted/30" id="projects">
            <div className="container ">
              <SectionHeading
                title="Featured Projects"
                subtitle="Recent Works"
              />

              <div className="mt-16 grid gap-12">
                <ProjectCard
                  title="RetailGo Platform"
                  description="Nigeria's pioneering self-checkout platform that lets customers scan products, pay instantly, and walk out — no queues, no waiting."
                  tags={["React.js", "Tailwind CSS"]}
                  imageUrl="/retailgo.png"
                  reverse={true}
                  link="https://retailgong.vercel.app/"
                  sourcecode="/"
                />
                <ProjectCard
                  title="Ubuntu Portal - Trade Platform"
                  description="A full-featured online store with animations and micro-interactions that enhance the shopping experience."
                  tags={[
                    "Next.js",
                    "Framer Motion",
                    "Tailwind CSS",
                    "Django",
                    "Python",
                  ]}
                  imageUrl="/UbuntuPortal.png"
                  reverse={false}
                  link="https://ubuntuportal.vercel.app/"
                  sourcecode="/"
                />

                <ProjectCard
                  title="Manage - Landing Page"
                  description="Manage makes it simple for software teams to plan day-to-day tasks while keeeping the larger team goals in view."
                  tags={["Next.js", "Tailwind", "Framer Motion", "SupaBase"]}
                  imageUrl="/managelandingpage.png"
                  reverse={true}
                  link="https://manage-pagee.vercel.app/"
                  sourcecode="https://github.com/thesongmartins/Manage-Landing-Page"
                />
                <ProjectCard
                  title="Ubuntu Logistics"
                  description="We help organizations ship the right products and bring our own innovations to market."
                  tags={[
                    "Next.js",
                    "Tailwind",
                    "Framer Motion",
                    "Django",
                    "Python",
                  ]}
                  imageUrl="/ubuntulogistics.png"
                  reverse={false}
                  link="https://ubuntuport.com"
                  sourcecode="/"
                />
                <ProjectCard
                  title="OmniFood"
                  description="We are a technology company first, but with a major focus on consumer well-being through a healthy diet."
                  tags={["Html", "CSS", "JavaScript"]}
                  imageUrl="/OmniFood.png"
                  reverse={true}
                  link="https://omni-food-phi.vercel.app/"
                  sourcecode="https://github.com/thesongmartins/OmniFood"
                />
              </div>

              <div className="mt-16 text-center">
                <Button variant="outline" size="lg" className="interactive">
                  <Link href="/projects">View All Projects</Link>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          {/*Trusted Clients*/}
          <section className="mt-5">
            <h2 className="font-display text-center text-xl font-bold tracking-[-0.02em] text-gray-900 drop-shadow-sm dark:text-gray-100">
              Trusted Clients
            </h2>
            <TrustedPartners />
          </section>

          {/* Contact section */}
          <section
            className="py-16 md:py-20 lg:pb-10 lg:pt-5 px-4 sm:px-6 lg:px-8"
            id="contact"
          >
            <div className="container ">
              <SectionHeading
                title="Get In Touch"
                subtitle="Let's work together"
              />

              <div className="mt-16 grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-muted/30 p-8 rounded-lg"
                >
                  <h3 className="text-2xl font-bold mb-4">
                    Contact Information
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Whether it’s a project, a question, or a random tech thought
                    — feel free to reach out.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <Link
                          href="mailto:martinsjehoshaphat@gmail.com"
                          className="font-medium"
                        >
                          martinsjehoshaphat@gmail.com
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Github className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">GitHub</p>
                        <Link
                          href="https://github.com/thesongmartins"
                          className="font-medium"
                        >
                          github.com/thesongmartins
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <input
                          id="name"
                          className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <input
                        id="subject"
                        className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-4 py-2 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Your message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full interactive"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex gap-2 items-center justify-center">
                          <Loader size={20} className="animate-spin" />{" "}
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 bg-muted/30 border-t">
          <div className="container ">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <Link
                  href="/"
                  className="text-xl font-bold tracking-tighter interactive"
                >
                  <p>
                    <span className="text-primary">Jehoshaphat</span> Martins
                  </p>
                </Link>
                <p className="mt-2 text-sm text-muted-foreground">
                  © {new Date().getFullYear()} All rights reserved.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <Link
                  href="https://github.com/thesongmartins"
                  className="interactive hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://x.com/thesongmartins"
                  className="interactive hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="mailto:martinsjehoshaphat@gmail.com"
                  className="interactive hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
                <Link
                  href="#"
                  className="interactive hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span className="sr-only">Website</span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

// Component for animated text
function AnimatedText() {
  const words = ["persuade", "attract", "influence", "convert"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-block min-w-[120px]">
      <motion.span
        key={words[index]}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute text-primary bottom-0 text-center pt-6"
      >
        {words[index]}
      </motion.span>
    </span>
  );
}

// Navigation links component
function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={cn(
            "font-medium transition-colors hover:text-primary interactive",
            mobile ? "text-lg py-2" : "text-sm"
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

// Theme toggle component
function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="interactive"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// Section heading component
function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-muted-foreground"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}

// Project card component
function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  reverse = false,
  link,
  sourcecode,
}: {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  reverse?: boolean;
  link: string;
  sourcecode: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={cn(
        "grid md:grid-cols-2 gap-8 items-center",
        reverse && "md:grid-flow-dense"
      )}
    >
      <div className={cn(reverse && "md:col-start-2")}>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="interactive">
            <Link href={link} target="_blank">
              View Project
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="interactive">
            <Github className="mr-2 h-4 w-4" />
            <Link href={sourcecode}>Source Code</Link>
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "group relative overflow-hidden rounded-lg",
          reverse && "md:col-start-1"
        )}
      >
        <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <Button variant="outline" className="bg-background interactive">
            <Link href={link}>View Project</Link>
          </Button>
        </div>
        <Image
          src={imageUrl}
          alt={title}
          width={1000}
          height={600}
          className="w-full  object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </motion.div>
  );
}

// Skill card component
function SkillCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-background p-6 rounded-lg border text-center hover:border-primary transition-colors group"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
    </motion.div>
  );
}
