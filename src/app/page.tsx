"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Briefcase,
  Beaker,
  FolderOpen,
  ExternalLink,
  Calendar,
  ArrowUp,
  Menu,
  X,
  GraduationCap,
  BookOpen,
  Languages,
  Download,
  Heart,
  Code2,
  Cpu,
  Eye,
  Wrench,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Sparkles,
  Bot,
  FlaskConical,
  Building2,
  ArrowRight,
  Quote,
  Zap,
} from "lucide-react";

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Typewriter Hook ─── */
function useTypewriter(words: string[], { typeSpeed = 80, eraseSpeed = 45, pauseBetween = 2000, pauseAfterErase = 400 } = {}) {
  const [text, setText] = useState("");
  const phaseRef = useRef({ wordIndex: 0, isDeleting: false });

  useEffect(() => {
    const phase = phaseRef.current;
    const currentWord = words[phase.wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!phase.isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typeSpeed + Math.random() * 40);
      } else {
        timeout = setTimeout(() => {
          phaseRef.current.isDeleting = true;
          setText(text.slice(0, -1)); // trigger re-render
        }, pauseBetween);
      }
    } else {
      if (text.length > 1) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, eraseSpeed);
      } else {
        timeout = setTimeout(() => {
          phaseRef.current.isDeleting = false;
          phaseRef.current.wordIndex = (phase.wordIndex + 1) % words.length;
          setText("");
        }, pauseAfterErase);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, words, typeSpeed, eraseSpeed, pauseBetween, pauseAfterErase]);

  return text;
}

/* ─── data ─── */
const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#research", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/mahdiAsefi20", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mahdiasefi", label: "LinkedIn" },
  { icon: Mail, href: "mailto:asefi.mahdii@gmail.com", label: "Email" },
  { icon: Send, href: "https://t.me/mahdiAsefi20", label: "Telegram" },
];

const roles = [
  "AI Engineer",
  "Deep Learning Specialist",
  "Computer Vision Researcher",
  "Generative AI Enthusiast",
];

const skills = [
  { category: "Languages", icon: Code2, items: [
    { name: "Python", tip: "Primary language · 6+ years" },
    { name: "C++", tip: "Systems programming" },
    { name: "C#", tip: ".NET development" },
    { name: "Java", tip: "Enterprise applications" },
  ]},
  { category: "Deep Learning", icon: Cpu, items: [
    { name: "PyTorch", tip: "Primary DL framework" },
    { name: "TensorFlow", tip: "Production ML" },
    { name: "Hugging Face", tip: "NLP & Transformers" },
    { name: "scikit-learn", tip: "Classical ML" },
  ]},
  { category: "Computer Vision", icon: Eye, items: [
    { name: "OpenCV", tip: "Image processing" },
    { name: "YOLO", tip: "Real-time detection" },
    { name: "GANs", tip: "Generative models" },
    { name: "Vision LLM", tip: "Multimodal AI" },
  ]},
  { category: "Frameworks & Tools", icon: Wrench, items: [
    { name: "FastAPI", tip: "API development" },
    { name: "Redis", tip: "Caching & queues" },
    { name: "MongoDB", tip: "NoSQL database" },
    { name: "Git", tip: "Version control" },
    { name: "FFmpeg", tip: "Video processing" },
  ]},
];

const experiences = [
  {
    role: "AI Engineer",
    company: "Metadeep",
    location: "Karaj, Alborz",
    period: "Jan 2026 – Present",
    highlights: [
      "Architected a multi-model AI pipeline integrating video generation APIs with a model-agnostic orchestration layer.",
      "Built a Vision LLM engine to extract visual properties and auto-generate structured creative briefs.",
      "Engineered a prompt compilation system translating briefs into shot-level prompts across cinematic styles.",
      "Integrated a Persian voice-over pipeline using voice cloning and TTS with RTL subtitle rendering.",
      "Conducted systematic R&D benchmarking of generative video models.",
    ],
    tech: ["ComfyUI", "FFmpeg", "Vision LLM", "ElevenLabs", "FastAPI", "LangChain", "Redis"],
  },
  {
    role: "AI Engineer",
    company: "Tetronix",
    location: "Remote (Canada)",
    period: "Sep 2025 – Jan 2026",
    highlights: [
      "Developed a scalable web crawling pipeline for car marketplace data aggregation with MongoDB.",
      "Implemented similarity-based vehicle retrieval and AI-powered chatbot with memory systems.",
      "Designed FastAPI backend services and integrated real-time voice interaction via ElevenLabs.",
    ],
    tech: ["MongoDB", "FastAPI", "OpenAI API", "Langfuse", "ElevenLabs", "Redis"],
  },
  {
    role: "AI Engineer",
    company: "Drivee.ai",
    location: "Remote (US)",
    period: "2023 – 2025",
    highlights: [
      "Contributed to computer vision and LLM products: Drivee AI, Drivee Sales Agent, HeyGent.",
      "Built high-accuracy foreground segmentation and car part detection models using YOLO.",
      "Developed lighting enhancement, depth-based bokeh, and CGAN-based shadow/reflection systems.",
      "Created AI chatbots and multi-agent systems for sales, booking, and customer engagement.",
    ],
    tech: ["Python", "PyTorch", "OpenAI API", "YOLO", "GANs", "OpenCV", "Multi-Agent Systems"],
  },
  {
    role: "NLP Engineer Intern",
    company: "Commercialization Center, Univ. of Kashan",
    location: "Isfahan, Iran",
    period: "Fall 2022",
    highlights: [
      "Implemented NLP models for Question Answering using Hugging Face Transformers.",
    ],
    tech: ["PyTorch Lightning", "Transformers"],
  },
  {
    role: "Computer Vision Engineer",
    company: "Sina Teb",
    location: "Isfahan, Iran",
    period: "2021",
    highlights: [
      "Achieved 99% accuracy in long-distance car detection from UAV aerial images.",
      "Built and deployed a real-time car detection & tracking system on server.",
    ],
    tech: ["Python", "PyTorch", "YOLO"],
  },
];

const education = [
  {
    degree: "M.Sc. in Artificial Intelligence",
    school: "Azad University",
    location: "Tehran, Iran",
    period: "2023 – Present",
    gpa: "4 / 4",
    gpaNumeric: 4,
    supervisors: "Prof. Azadeh Mansouri, Prof. Reyhaneh Tati",
  },
  {
    degree: "B.Sc. in Computer Science",
    school: "University of Kashan",
    location: "Isfahan, Iran",
    period: "2018 – 2023",
    gpa: "3.4 / 4",
    gpaNumeric: 3.4,
    supervisors: "Prof. Mahsa Soheil Shamaee",
    note: "Received a stipend for exceptional undergraduate project on Persian Paraphrasing.",
  },
];

const research = [
  {
    title: "Deepfake Detection",
    period: "2024 – Present",
    supervisor: "Prof. Azadeh Mansouri",
    description:
      "Reviewed and synthesized insights from five deepfake detection papers. Trained models from two papers, evaluated performance, and developed an innovative approach combining methods for improved face deepfake detection.",
  },
  {
    title: "GANs in Radiogenomics",
    period: "Winter 2023",
    supervisor: "Prof. Qian Liu",
    description:
      "Studied GAN-based synthetic data generation for breast cancer detection, combining MRI images and genomics information. Investigated techniques to fuse genomics data with MRI feature maps into a unified generation network.",
  },
  {
    title: "Authentication & Clustering in News",
    period: "March 2022",
    supervisor: "Dr. Pooria Lajevardy",
    description:
      "Summarized and analyzed papers on face detection and identification in news images. Provided feedback on methodologies and discussed potential solutions with the research team.",
  },
];

const teaching = {
  role: "Teaching Assistant",
  course: "Fundamentals of Computer and Programming",
  professor: "Prof. Mahsa Soheil Shamaee",
  period: "Spring 2019",
  highlights: [
    "Designed assignments to enhance students' understanding of programming basics in C++.",
    "Taught C++ programming concepts and provided hands-on coding experience using Visual Studio.",
    "Assisted approximately 10 students with problem-solving and debugging during coding sessions.",
    "Graded assignments and provided feedback to help students improve their programming skills.",
  ],
};

const testimonials = [
  {
    quote: "Mahdi is one of the most talented AI engineers I've worked with. His ability to translate complex research into production systems is exceptional.",
    name: "Dr. Azadeh Mansouri",
    title: "Thesis Supervisor",
    company: "Azad University",
    avatar: "AM",
  },
  {
    quote: "His work on our computer vision pipeline exceeded all expectations. The accuracy improvements he achieved were remarkable.",
    name: "CTO, Drivee.ai",
    title: "Engineering Lead",
    company: "Drivee.ai",
    avatar: "DA",
  },
  {
    quote: "Mahdi consistently delivers high-quality solutions under tight deadlines. His expertise in deep learning and generative AI is truly impressive.",
    name: "Tech Lead, Tetronix",
    title: "AI Team",
    company: "Tetronix",
    avatar: "TL",
  },
];

const projects = [
  {
    title: "Persian Paraphrasing",
    tag: "Undergraduate Project",
    highlights: [
      "Developed a Persian paraphrasing model using state-of-the-art transformer architectures.",
      "Translated English datasets to Persian and curated a clean paraphrase corpus from scratch.",
      "Fine-tuned a multilingual T5 model achieving strong paraphrasing and error correction performance.",
      "Received a stipend for exceptional research contributions.",
    ],
    tech: ["Transformers", "T5", "Python"],
    link: "https://github.com/mahdiAsefi20",
    favorite: true,
  },
  {
    title: "Genetic & PSO Algorithms",
    tag: "AI Course Project",
    highlights: [
      "Implemented Genetic Algorithm and Particle Swarm Optimization for complex optimization problems.",
    ],
    tech: ["Python", "Optimization"],
    link: "https://github.com/mahdiAsefi20",
    favorite: false,
  },
];

const sectionNavItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

/* ─── Tooltip ─── */
function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 text-[11px] text-teal-100 bg-slate-800/95 border border-slate-700/60 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none backdrop-blur-sm"
          >
            {text}
            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-700/60" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ─── Profile Photo ─── */
function ProfilePhoto() {
  return (
    <div className="relative group cursor-default">
      {/* Outer glow ring */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 opacity-60 group-hover:opacity-90 blur-[2px] transition-all duration-500 avatar-glow" />
      {/* Photo container */}
      <div className="relative w-36 h-44 sm:w-44 sm:h-52 lg:w-52 lg:h-60 rounded-3xl p-[2.5px] bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 transition-all duration-500 overflow-hidden">
        <div className="w-full h-full rounded-3xl overflow-hidden bg-[#0a0f1a]">
          <img
            src="/profile.png"
            alt="Mahdi Asefi"
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>
      {/* Subtle teal glow on hover */}
      <div className="absolute -inset-3 rounded-3xl bg-teal-500/0 group-hover:bg-teal-500/5 transition-all duration-500 pointer-events-none" />
    </div>
  );
}

/* ─── Skill Category ─── */
function SkillCategory({ category, icon: Icon, items, index }: { category: string; icon: React.ElementType; items: { name: string; tip: string }[]; index: number }) {
  const widths = [80, 90, 75, 85];
  const barWidth = widths[index % widths.length];
  return (
    <motion.div variants={fadeUp} custom={index + 1} className="glass glass-hover rounded-2xl p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-teal-300/90 mb-4 tracking-wide uppercase flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
          <Icon size={15} className="text-teal-400" />
        </div>
        {category}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <Tooltip key={item.name} text={item.tip}>
            <span className="min-h-[40px] inline-flex items-center px-3.5 py-1.5 text-[13px] rounded-xl bg-slate-800/60 text-slate-300 border border-slate-700/40 hover:border-teal-500/30 hover:bg-teal-500/5 hover:text-teal-200 hover:shadow-[0_0_16px_rgba(20,184,166,0.1)] transition-all duration-300 cursor-default">
              {item.name}
            </span>
          </Tooltip>
        ))}
      </div>
      <div className="mt-4 h-1 rounded-full bg-slate-800/80 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400/60 skill-progress" style={{ width: `${barWidth}%`, animationDelay: `${index * 0.2}s` }} />
      </div>
    </motion.div>
  );
}

/* ─── GPA Bar ─── */
function GpaBar({ gpa, max = 4 }: { gpa: number; max?: number }) {
  const pct = (gpa / max) * 100;
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">GPA</span>
      <div className="flex-1 h-2 rounded-full bg-slate-800/80 overflow-hidden max-w-[120px]">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400" />
      </div>
      <span className="text-[12px] text-slate-400 font-medium">{gpa}/{max}</span>
    </div>
  );
}

/* ─── Experience Card ─── */
function ExperienceCard({ exp, idx, isCurrent }: { exp: (typeof experiences)[0]; idx: number; isCurrent: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const initialCount = 2;
  const visibleHighlights = expanded ? exp.highlights : exp.highlights.slice(0, initialCount);
  const hasMore = exp.highlights.length > initialCount;
  return (
    <motion.div variants={fadeUp} custom={idx + 1} className="group relative pl-8 sm:pl-10">
      <div className={`absolute left-0 top-3 w-3 h-3 rounded-full border-2 transition-all duration-300 ${isCurrent ? "border-teal-400 bg-teal-500 pulse-dot" : "border-slate-600 bg-[#0a0f1a] group-hover:border-teal-400/60 group-hover:bg-teal-500/60"}`} />
      <div className="glass glass-hover card-shimmer relative rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-100">{exp.role}</h3>
            <p className="text-[14px] text-teal-400 font-medium mt-0.5">
              {exp.company}
              <span className="text-slate-700 mx-2">·</span>
              <span className="text-slate-500 font-normal">{exp.location}</span>
            </p>
          </div>
          <span className="text-[12px] text-slate-500 whitespace-nowrap flex items-center gap-1.5 shrink-0">
            <Calendar size={11} strokeWidth={1.5} />
            {exp.period}
          </span>
        </div>
        <ul className="space-y-2">
          {visibleHighlights.map((h) => (
            <li key={h} className="text-[14px] sm:text-[15px] text-slate-400 leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-teal-500/60 before:text-lg before:font-bold before:leading-none">
              {h}
            </li>
          ))}
        </ul>
        {hasMore && (
          <button onClick={() => setExpanded(!expanded)} className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-teal-500/70 hover:text-teal-400 hover:bg-teal-500/8 rounded-lg transition-all duration-200">
            {expanded ? <>Show less <ChevronUp size={12} /></> : <>+{exp.highlights.length - initialCount} more <ChevronDown size={12} /></>}
          </button>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span key={t} className="text-[11px] px-3 py-1 rounded-lg bg-slate-800/80 text-slate-400 font-medium border border-slate-700/30 hover:border-teal-500/20 hover:text-teal-400/80 transition-all duration-200">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Research Card ─── */
function ResearchCard({ item, idx }: { item: (typeof research)[0]; idx: number }) {
  const isLast = idx === research.length - 1;
  return (
    <div className="relative">
      {!isLast && <div className="absolute left-4 top-12 bottom-0 w-px bg-gradient-to-b from-slate-700/50 to-transparent hidden sm:block" />}
      <motion.div variants={fadeUp} custom={idx + 1} className="glass glass-hover card-shimmer relative rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-3">
            <span className={`text-[12px] font-mono font-bold tracking-wider w-8 h-8 rounded-lg flex items-center justify-center ${item.period.includes('Present') ? 'text-teal-400 bg-teal-500/15 border border-teal-500/20' : 'text-teal-500/50 bg-teal-500/5'}`}>0{idx + 1}</span>
            <h3 className="text-base sm:text-lg font-semibold text-slate-100">{item.title}</h3>
          </div>
          <span className="text-[12px] text-slate-500 whitespace-nowrap sm:ml-auto">{item.period}</span>
        </div>
        <p className="text-[13px] text-teal-400/70 mb-2 ml-11">{item.supervisor}</p>
        <p className="text-[14px] sm:text-[15px] text-slate-400 leading-relaxed ml-11">{item.description}</p>
      </motion.div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ proj }: { proj: (typeof projects)[0] }) {
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 600);
  };
  return (
    <motion.div variants={fadeUp} custom={1} className={`glass glass-hover rounded-2xl overflow-hidden group ${proj.favorite ? "glass-accent" : ""}`}>
      <div className="h-36 bg-gradient-to-br from-slate-800/80 via-slate-800/40 to-teal-900/10 relative overflow-hidden stripe-pattern">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/60 to-transparent" />
        <div className="absolute bottom-3 left-5">
          <span className="text-[10px] uppercase tracking-wider text-teal-400/70 font-bold bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/10">{proj.tag}</span>
        </div>
        {proj.favorite && (
          <button onClick={handleHeartClick} className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:bg-rose-500/10" aria-label="Toggle favorite">
            <Heart size={16} className={`transition-colors duration-200 ${liked ? "fill-rose-500 text-rose-500" : "text-slate-500 hover:text-rose-400"} ${showHeart ? "star-pop" : ""}`} />
          </button>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-base sm:text-lg font-semibold text-slate-100">{proj.title}</h3>
          {proj.link && (
            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-slate-500 hover:text-teal-400 hover:bg-teal-500/10 transition-all duration-200 shrink-0" aria-label="View on GitHub">
              <ExternalLink size={14} strokeWidth={1.5} />
            </a>
          )}
        </div>
        <ul className="space-y-2 mb-4">
          {proj.highlights.map((h) => (
            <li key={h} className="text-[13px] sm:text-[14px] text-slate-400 leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-teal-500/50 before:text-base before:font-bold before:leading-none">
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/30">
          {proj.tech.map((t) => (
            <span key={t} className="text-[11px] px-3 py-1 rounded-lg bg-slate-800/80 text-slate-400 font-medium border border-slate-700/30">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { setStatus("error"); setErrorMsg("All fields are required."); return; }
    setStatus("sending"); setErrorMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || "Failed to send"); }
      setStatus("success"); setFormData({ name: "", email: "", message: "" }); setCharCount(0);
    } catch {
      // Fallback: open mailto link (for static deployments like GitHub Pages)
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.open(`mailto:asefi.mahdii@gmail.com?subject=${subject}&body=${body}`, "_self");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-5">
          <Sparkles size={24} className="text-teal-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-100 mb-2">Message Sent!</h3>
        <p className="text-[14px] text-slate-400 mb-6">Thank you for reaching out. I&apos;ll get back to you soon.</p>
        <button onClick={() => setStatus("idle")} className="px-6 py-2.5 rounded-xl text-[13px] font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/15 transition-all duration-200">
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-[12px] text-slate-500 font-medium mb-2 uppercase tracking-wider">Name</label>
          <input id="contact-name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" required className="contact-input w-full" />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-[12px] text-slate-500 font-medium mb-2 uppercase tracking-wider">Email</label>
          <input id="contact-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" required className="contact-input w-full" />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="contact-message" className="block text-[12px] text-slate-500 font-medium uppercase tracking-wider">Message</label>
          <span className={`text-[11px] font-medium tabular-nums ${charCount > 900 ? 'text-amber-400' : 'text-slate-500'}`}>{charCount}/1000</span>
        </div>
        <textarea id="contact-message" value={formData.message} onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setCharCount(e.target.value.length); }} placeholder="Your message..." required rows={5} maxLength={1000} className="contact-textarea w-full" />
      </div>
      {status === "error" && errorMsg && <p className="text-[13px] text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-2.5">{errorMsg}</p>}
      <button type="submit" disabled={status === "sending"} className="w-full py-3.5 rounded-xl text-[14px] font-semibold bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-500 hover:to-teal-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20">
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

/* ─── Section Reveal Wrapper ─── */
function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1, rootMargin: "-60px 0px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`section-reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Section Title ─── */
function SectionTitle({ icon: Icon, label, subtitle }: { icon: React.ElementType; label: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
          <Icon size={18} className="text-teal-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">{label}</h2>
      </div>
      {subtitle && <p className="text-[15px] text-slate-500 ml-[52px]">{subtitle}</p>}
      <div className="mt-4 section-divider" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
/* ─── Floating Particles ─── */
/* ═══════════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 5,
      opacity: 0.15 + Math.random() * 0.35,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.current.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Section Nav Dots ─── */
function SectionNavDots({ activeSection }: { activeSection: string }) {
  const handleClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <div className="section-dots no-print" aria-label="Section navigation">
      {sectionNavItems.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`section-dot ${activeSection === id ? "active" : ""}`}
          aria-label={`Go to ${label}`}
        >
          <span className="section-dot-label">{label}</span>
        </button>
      ))}
    </div>
  );
}

/* ─── Cursor Glow ─── */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);
  return <div ref={glowRef} className="cursor-glow hidden lg:block" style={{ opacity: visible ? 1 : 0 }} aria-hidden="true" />;
}

/* ═══════════════════════════════════════════════════ */
/* ─── MAIN COMPONENT ─── */
/* ═══════════════════════════════════════════════════ */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const typedRole = useTypewriter(roles);
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY: motionScrollY } = useScroll();
  const heroY = useTransform(motionScrollY, [0, 400], [0, -60]);
  const heroOpacity = useTransform(motionScrollY, [0, 300], [1, 0.6]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => { setScrollY(window.scrollY); setShowScrollTop(window.scrollY > 600); };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = ["hero", "about", "experience", "education", "research", "projects", "testimonials", "contact"];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sectionIds.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);
  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("asefi.mahdii@gmail.com").then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }, []);

  const [docHeight, setDocHeight] = useState(0);
  useEffect(() => {
    const measure = () => setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);
  const scrollProgress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 font-sans relative page-reveal">
      <div className="ambient-bg" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <CursorGlow />
      <SectionNavDots activeSection={activeSection} />

      {/* ─── Scroll Progress ─── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent no-print">
        <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-[width] duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ─── Nav ─── */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-[2px] inset-x-0 z-50 transition-all duration-300 no-print ${scrollY > 50 ? "bg-[#0a0f1a]/80 backdrop-blur-2xl shadow-[0_1px_20px_rgba(0,0,0,0.4)] border-b border-slate-800/50" : "bg-transparent backdrop-blur-md"}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="text-base font-bold tracking-tight text-slate-100 hover:text-teal-400 transition-colors">
            MA<span className="text-teal-400">.</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${activeSection === href.slice(1) ? "text-teal-400 bg-teal-500/10" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="mailto:asefi.mahdii@gmail.com" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20 hover:bg-teal-500/15 hover:border-teal-500/30 transition-all duration-200">
              <Mail size={13} /> Hire Me
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 text-slate-400 hover:text-slate-200 transition-colors rounded-xl hover:bg-slate-800/40" aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm" onClick={closeMobile} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 300 }} className="fixed top-0 right-0 bottom-0 z-[56] w-72 bg-[#0f172a] border-l border-slate-800 shadow-2xl">
              <div className="p-6 pt-20">
                <nav className="flex flex-col gap-1">
                  {navLinks.map(({ href, label }, i) => (
                    <motion.a key={href} href={href} onClick={closeMobile} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 + 0.08 }} className={`px-4 py-3 rounded-xl text-[14px] font-medium transition-all ${activeSection === href.slice(1) ? "bg-teal-500/10 text-teal-400" : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"}`}>
                      {label}
                    </motion.a>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-slate-800">
                  <a href="mailto:asefi.mahdii@gmail.com" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <Mail size={14} /> Hire Me
                  </a>
                  <div className="mt-5 flex items-center justify-center gap-4">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-teal-400 transition-colors">
                        <Icon size={18} strokeWidth={1.5} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════ HERO ═══════════ */}
      <header id="hero" ref={heroRef} className="relative min-h-screen flex items-center hero-gradient pt-16 overflow-hidden">
        <FloatingParticles />
        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div variants={fadeUp} custom={0} className="flex flex-col sm:flex-row items-start gap-8 sm:gap-12">
              <div className="shrink-0">
                <ProfilePhoto />
              </div>
              <div className="pt-1 sm:pt-4">
                {/* Availability badge */}
                <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/15 mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="avail-dot absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                  </span>
                  <span className="text-[12px] text-teal-400 font-medium">Open to Opportunities</span>
                </motion.div>

                <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight gradient-text-name">
                  Mahdi Asefi
                </motion.h1>

                <motion.div variants={fadeUp} custom={2} className="mt-3 flex items-center gap-2 text-lg sm:text-xl h-8">
                  <Bot size={20} className="text-teal-400/60" />
                  <span className="text-teal-300 font-semibold">
                    {typedRole}<span className="typing-cursor">|</span>
                  </span>
                </motion.div>

                <motion.p variants={fadeUp} custom={3} className="mt-5 text-[15px] sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                  AI Engineer and M.Sc. student specializing in deep learning, computer vision, and generative AI.
                  Experienced in building production-grade systems for deepfake detection, video generation pipelines,
                  and automotive computer vision. Passionate about turning cutting-edge research into practical solutions.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap items-center gap-4">
                  <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-500 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-teal-500/15 hover:shadow-teal-500/25">
                    Get in Touch <ArrowRight size={15} />
                  </a>
                  <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-medium text-slate-300 border border-slate-700/50 hover:border-teal-500/30 hover:text-teal-300 hover:bg-teal-500/5 transition-all duration-200">
                    View Projects <FolderOpen size={15} />
                  </a>
                </motion.div>

                {/* What I Bring Highlights */}
                <motion.div variants={fadeUp} custom={5} className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="glass rounded-full px-4 py-2 flex items-center gap-2 text-[12px] text-slate-400">
                    <Briefcase size={13} className="text-teal-400" />
                    <span>5+ Years</span>
                  </div>
                  <div className="glass rounded-full px-4 py-2 flex items-center gap-2 text-[12px] text-slate-400">
                    <FlaskConical size={13} className="text-teal-400" />
                    <span>AI Research</span>
                  </div>
                  <div className="glass rounded-full px-4 py-2 flex items-center gap-2 text-[12px] text-slate-400">
                    <Zap size={13} className="text-teal-400" />
                    <span>Production Systems</span>
                  </div>
                </motion.div>

                {/* Contact info bar */}
                <motion.div variants={fadeUp} custom={6} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-500">
                  <button onClick={copyEmail} className="flex items-center gap-2 hover:text-teal-400 transition-colors group min-h-[44px]">
                    <Mail size={13} strokeWidth={1.5} />
                    asefi.mahdii@gmail.com
                    {copied ? <Check size={12} className="text-teal-400" /> : <Copy size={11} className="text-slate-600 group-hover:text-teal-400/60 transition-colors" />}
                  </button>
                  <a href="tel:+989100111974" className="flex items-center gap-2 hover:text-teal-400 transition-colors min-h-[44px]">
                    <Phone size={13} strokeWidth={1.5} />
                    +98 910 011 1974
                  </a>
                  <span className="flex items-center gap-2 min-h-[44px]">
                    <MapPin size={13} strokeWidth={1.5} />
                    Alborz, Iran
                  </span>
                  <div className="flex items-center gap-3 ml-auto">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <Tooltip key={label} text={label}>
                        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-600 hover:text-teal-400 transition-all duration-200 rounded-xl hover:bg-teal-500/5">
                          <Icon size={17} strokeWidth={1.5} />
                        </a>
                      </Tooltip>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5">
              <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-1.5 rounded-full bg-teal-400" />
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <main className="relative z-10 px-6 pb-16 dot-grid">
        <div className="max-w-6xl mx-auto">

          {/* ──── About & Skills ──── */}
          <section id="about" className="py-16 sm:py-24">
            <SectionReveal>
              <SectionTitle icon={BookOpen} label="Skills & Expertise" subtitle="Technologies and tools I work with daily" />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {skills.map(({ category, icon, items }, i) => (
                  <SkillCategory key={category} category={category} icon={icon} items={items} index={i} />
                ))}
              </motion.div>
              {/* Languages */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-10">
                <motion.div variants={fadeUp} custom={0} className="glass rounded-2xl p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-teal-300/90 mb-4 tracking-wide uppercase flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center"><Languages size={15} className="text-teal-400" /></div>
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-6 text-[14px] text-slate-400">
                    <div><span className="text-slate-200 font-medium">English</span><span className="text-slate-600 mx-2">—</span>TOEFL 91 (R:24, L:24, S:20, W:23)</div>
                    <div><span className="text-slate-200 font-medium">Persian</span><span className="text-slate-600 mx-2">—</span>Native</div>
                  </div>
                </motion.div>
              </motion.div>
            </SectionReveal>
          </section>

          <div className="section-divider" />

          {/* ──── Work Experience ──── */}
          <section id="experience" className="py-16 sm:py-24">
            <SectionReveal>
              <SectionTitle icon={Briefcase} label="Work Experience" subtitle="Companies and roles I've contributed to" />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
                <div className="relative space-y-6">
                  <div className="absolute left-[5px] sm:left-[6px] top-4 bottom-4 w-[2px] timeline-line rounded-full hidden sm:block" />
                  {experiences.map((exp, idx) => (
                    <ExperienceCard key={exp.company + exp.period} exp={exp} idx={idx} isCurrent={idx === 0} />
                  ))}
                </div>
              </motion.div>
            </SectionReveal>
          </section>

          <div className="section-divider" />

          {/* ──── Education ──── */}
          <section id="education" className="py-16 sm:py-24">
            <SectionReveal>
              <SectionTitle icon={GraduationCap} label="Education" subtitle="Academic background and qualifications" />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger}>
                <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <motion.div key={edu.degree} variants={fadeUp} custom={idx + 1} className="glass glass-hover rounded-2xl p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
                        <div className="sm:w-44 shrink-0 flex flex-col gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/15 to-teal-500/5 border border-teal-500/10 flex items-center justify-center">
                            <GraduationCap size={20} className="text-teal-400/70" />
                          </div>
                          <p className="text-[12px] text-slate-500 font-medium flex items-center gap-1.5">
                            <Calendar size={11} strokeWidth={1.5} />
                            {edu.period}
                          </p>
                          <GpaBar gpa={edu.gpaNumeric} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-slate-100">{edu.degree}</h3>
                          <p className="text-[14px] text-teal-400 font-medium mt-1">
                            {edu.school}
                            <span className="text-slate-700 mx-2">·</span>
                            <span className="text-slate-500 font-normal">{edu.location}</span>
                          </p>
                          <p className="text-[13px] text-slate-500 mt-2">Supervisors: {edu.supervisors}</p>
                          {edu.note && <p className="text-[13px] text-slate-400 mt-1.5 italic">{edu.note}</p>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Teaching Assistant */}
                <motion.div variants={fadeUp} custom={3} className="mt-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center"><BookOpen size={15} className="text-teal-400" /></div>
                    <h3 className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Teaching Assistant</h3>
                    <span className="text-[12px] text-slate-500 ml-auto">{teaching.period}</span>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <p className="text-[15px] text-slate-200 font-medium mb-1">{teaching.course}</p>
                    <p className="text-[13px] text-slate-500 mb-4">{teaching.professor}</p>
                    <ul className="space-y-2">
                      {teaching.highlights.map((h) => (
                        <li key={h} className="text-[14px] text-slate-400 leading-relaxed pl-4 relative before:content-['›'] before:absolute before:left-0 before:text-teal-500/40 before:text-base before:font-bold before:leading-none">{h}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </SectionReveal>
          </section>

          <div className="section-divider" />

          {/* ──── Research ──── */}
          <section id="research" className="py-16 sm:py-24">
            <SectionReveal>
              <SectionTitle icon={Beaker} label="Research" subtitle="Academic research and publications" />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="space-y-5">
                {research.map((r, idx) => (
                  <ResearchCard key={r.title} item={r} idx={idx} />
                ))}
              </motion.div>
            </SectionReveal>
          </section>

          <div className="section-divider" />

          {/* ──── Projects ──── */}
          <section id="projects" className="py-16 sm:py-24">
            <SectionReveal>
              <SectionTitle icon={FolderOpen} label="Selected Projects" subtitle="Featured work and side projects" />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <ProjectCard key={proj.title} proj={proj} />
                ))}
              </motion.div>
            </SectionReveal>
          </section>

          <div className="section-divider" />

          {/* ──── Testimonials ──── */}
          <section id="testimonials" className="py-16 sm:py-24">
            <SectionReveal>
              <SectionTitle icon={Quote} label="Testimonials" subtitle="What colleagues and collaborators say" />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, idx) => (
                  <motion.div key={t.name} variants={fadeUp} custom={idx + 1} className="glass glass-hover rounded-2xl p-6 sm:p-7 flex flex-col">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-[14px] sm:text-[15px] text-slate-400 leading-relaxed italic flex-1">&ldquo;{t.quote}&rdquo;</p>
                    {/* Author */}
                    <div className="mt-5 pt-5 border-t border-slate-700/30 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-500/5 border border-teal-500/15 flex items-center justify-center text-[12px] font-bold text-teal-400">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-200">{t.name}</p>
                        <p className="text-[11px] text-slate-500">{t.title} <span className="text-slate-700">·</span> {t.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </SectionReveal>
          </section>

          <div className="section-divider" />

          {/* ──── Contact ──── */}
          <section id="contact" className="py-16 sm:py-24">
            <SectionReveal>
              <SectionTitle icon={Mail} label="Get in Touch" subtitle="Have a question or want to collaborate?" />
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Left: Info */}
                <motion.div variants={fadeUp} custom={0} className="lg:col-span-2 space-y-6">
                  <p className="text-[15px] text-slate-400 leading-relaxed">
                    I&apos;m always open to discussing new projects, research ideas, or opportunities. Whether you need an AI solution, want to collaborate on research, or just want to say hi — feel free to reach out.
                  </p>
                  {/* Quick contact cards */}
                  <div className="space-y-3">
                    <div className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-teal-500/20 transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/15 transition-colors">
                        <Mail size={16} className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Email</p>
                        <button onClick={copyEmail} className="text-[13px] text-slate-300 hover:text-teal-400 transition-colors hover-underline">
                          asefi.mahdii@gmail.com
                          {copied ? <Check size={11} className="inline ml-1 text-teal-400" /> : null}
                        </button>
                      </div>
                    </div>
                    <div className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-teal-500/20 transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/15 transition-colors">
                        <Phone size={16} className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Phone</p>
                        <a href="tel:+989100111974" className="text-[13px] text-slate-300 hover:text-teal-400 transition-colors hover-underline">+98 910 011 1974</a>
                      </div>
                    </div>
                    <div className="glass rounded-xl p-4 flex items-center gap-4 group hover:border-teal-500/20 transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/15 transition-colors">
                        <MapPin size={16} className="text-teal-400" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Location</p>
                        <p className="text-[13px] text-slate-300">Alborz, Iran</p>
                      </div>
                    </div>
                  </div>
                  {/* Social links */}
                  <div className="flex items-center gap-3 pt-2">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <Tooltip key={label} text={label}>
                        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 glass rounded-xl text-slate-500 hover:text-teal-400 hover:border-teal-500/20 hover:bg-teal-500/5 transition-all duration-300">
                          <Icon size={17} strokeWidth={1.5} />
                        </a>
                      </Tooltip>
                    ))}
                  </div>
                </motion.div>
                {/* Right: Form */}
                <motion.div variants={fadeUp} custom={1} className="lg:col-span-3">
                  <ContactForm />
                </motion.div>
              </motion.div>
            </SectionReveal>
          </section>
        </div>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <div className="footer-divider no-print" />
      <footer className="px-6 py-12 no-print relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <a href="#hero" className="text-lg font-bold tracking-tight text-slate-100 hover:text-teal-400 transition-colors">
                MA<span className="text-teal-400">.</span>
              </a>
              <p className="mt-3 text-[13px] text-slate-500 leading-relaxed max-w-xs">
                AI Engineer building intelligent systems at the intersection of research and production.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-4">Quick Links</h4>
              <nav className="flex flex-col gap-2.5">
                {navLinks.map(({ href, label }) => (
                  <a key={href} href={href} className="text-[13px] text-slate-500 hover:text-teal-400 transition-colors hover-underline w-fit">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
            {/* Connect */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-4">Connect</h4>
              <div className="flex items-center gap-2 mb-4">
                {socials.map(({ icon: Icon, href, label }) => (
                  <Tooltip key={label} text={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-teal-400 hover:bg-teal-500/5 transition-all duration-200">
                      <Icon size={15} strokeWidth={1.5} />
                    </a>
                  </Tooltip>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-500 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20">
                <Download size={13} strokeWidth={2} />
                Download CV
              </button>
            </div>
          </div>
          {/* Bottom bar */}
          <div className="footer-divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-600">
            <span>&copy; {new Date().getFullYear()} Mahdi Asefi. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span>Built with</span>
                <Heart size={11} className="text-rose-500/50" />
                <span>using Next.js &middot; Tailwind CSS &middot; Framer Motion</span>
              </span>
            </div>
            <span>Last updated: June 2025</span>
          </div>
        </div>
      </footer>

      {/* ─── Scroll-to-top ─── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-2xl glass border border-slate-700/50 hover:border-teal-500/30 transition-all duration-200 no-print group scroll-btn-glow"
            aria-label="Scroll to top"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(100,116,139,0.2)" strokeWidth="2" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray={`${2 * Math.PI * 20}`} strokeDashoffset={`${2 * Math.PI * 20 - (2 * Math.PI * 20 * scrollProgress) / 100}`} strokeLinecap="round" className="progress-ring-circle" />
            </svg>
            <ArrowUp size={18} strokeWidth={2} className="text-slate-400 group-hover:text-teal-400 transition-colors relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
