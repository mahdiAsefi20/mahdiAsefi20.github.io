/**
 * Canonical content for the Portfolio Website.
 *
 * Every value here is derived from `facts.md` at the repository root
 * (the Canonical Facts file). Change a fact there first, then propagate.
 *
 * Nothing in this file may be inferred, embellished, or "rounded up".
 */

export const profile = {
  name: "Mahdi Asefi",
  initials: "MA",
  position: "AI Engineer",
  domains: ["LLM Systems", "Computer Vision", "Generative AI"],
  positionLine: "AI Engineer — LLM Systems, Computer Vision & Generative AI",
  location: "Tehran, Iran",
  email: "asefi.mahdii@gmail.com",
  phone: "+98 910 011 1974",
  phoneHref: "tel:+989100111974",
  github: "https://github.com/mahdiAsefi20",
  linkedin: "https://www.linkedin.com/in/mahdiasefi",
  telegram: "https://t.me/mahdiAsefi",
  summary:
    "AI Engineer with 4+ years of experience shipping production systems across LLM orchestration, computer vision and generative media. Currently building generative video and vision-language pipelines at Metadeep, while completing an M.Sc. in Artificial Intelligence with a thesis on deepfake detection.",
  cvPath: "/Mahdi%20Asefi%20CV.pdf",
} as const;

export const navLinks = [
  { id: "position", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionMeta = [
  { id: "position", index: "01", title: "Position", kicker: "What I do" },
  { id: "experience", index: "02", title: "Experience", kicker: "Where I have shipped" },
  { id: "work", index: "03", title: "Open Source Work", kicker: "Inspectable, not described" },
  { id: "skills", index: "04", title: "Skills & Stack", kicker: "Confirmed and interviewable" },
  { id: "education", index: "05", title: "Education", kicker: "Academic background" },
  { id: "research", index: "06", title: "Research", kicker: "In progress, supervised" },
  { id: "contact", index: "07", title: "Contact", kicker: "Open to opportunities" },
] as const;

/* ─── Hero ─── */

export const heroRoles = ["LLM Systems", "Computer Vision", "Generative AI"];

export const heroStats = [
  { value: "4+", label: "Years in AI/ML engineering" },
  { value: "3", label: "AI products shipped" },
  { value: "7+", label: "Models in production" },
  { value: "2", label: "Papers reimplemented from scratch" },
] as const;

/* ─── Position (the three Domains) ─── */

export const domainCards = [
  {
    key: "llm",
    title: "LLM Systems",
    body: "Multi-agent orchestration with LangGraph, RAG pipelines, tool calling and evaluation harnesses. At Metadeep this runs as a model-agnostic layer over several generative backends.",
    proof: "metadeep_task · LangGraph orchestrator with a human-in-the-loop verifier",
  },
  {
    key: "cv",
    title: "Computer Vision",
    body: "Detection and segmentation models in production, plus a research line on face-forgery detection where published methods are reimplemented from scratch and benchmarked.",
    proof: "RFAM · RFAMxCORE · Xception backbone with frequency-aware cues",
  },
  {
    key: "genai",
    title: "Generative AI",
    body: "Generative video and image pipelines: prompt compilation into shot-level briefs, ComfyUI and diffusion workflows, and Persian voice-over with RTL subtitle rendering.",
    proof: "5+ generative video and image models integrated and benchmarked",
  },
] as const;

/* ─── Experience ─── */

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  highlights: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    role: "Full-Stack AI Engineer",
    company: "Metadeep",
    location: "Karaj, Alborz, Iran · Hybrid",
    period: "Feb 2026 – Present",
    current: true,
    highlights: [
      "Architected a multi-model AI pipeline that integrates generative video APIs behind a model-agnostic orchestration layer.",
      "Built a Vision LLM engine that extracts visual properties and auto-generates structured creative briefs.",
      "Engineered a prompt compilation pipeline translating briefs into shot-level prompts across cinematic styles.",
      "Integrated a Persian voice-over pipeline using voice cloning and TTS with RTL subtitle rendering.",
      "Ran systematic R&D benchmarking across 5+ generative video and image models to guide production selection.",
    ],
    tech: ["LangGraph", "Vision LLM", "ComfyUI", "ElevenLabs", "FFmpeg", "OpenAI API", "Redis"],
  },
  {
    role: "AI Engineer",
    company: "Tetronix",
    location: "Remote (Canada)",
    period: "Sep 2025 – Dec 2025",
    highlights: [
      "Reduced summarisation memory consumption by roughly 30%, cutting context and token usage across the pipeline.",
      "Implemented similarity-based vehicle retrieval and an AI chatbot backed by Redis conversational memory.",
      "Designed the ingestion pipeline for a car-marketplace data aggregation service and integrated real-time voice interaction via ElevenLabs.",
    ],
    tech: ["LangChain", "OpenAI API", "Langfuse", "Redis", "ElevenLabs", "Docker"],
  },
  {
    role: "AI Engineer",
    company: "PiRun (Drivee.ai)",
    location: "Remote (US)",
    period: "Mar 2023 – Jul 2025",
    highlights: [
      "Shipped 3 AI products — Drivee AI, Drivee Sales Agent and HeyGent — with 7+ models running in production.",
      "Built foreground segmentation and car-part detection models on top of YOLO.",
      "Developed lighting enhancement, depth-based bokeh and CGAN-based shadow and reflection systems.",
      "Created chatbots and multi-agent systems for sales, booking and customer engagement, handling hundreds of leads and bookings per month.",
    ],
    tech: ["Python", "PyTorch", "YOLO", "GANs", "OpenCV", "OpenAI API", "LangGraph"],
  },
  {
    role: "NLP Engineer Intern",
    company: "Commercialization & Innovation Center, University of Kashan",
    location: "Isfahan, Iran",
    period: "Apr – Jun 2022",
    highlights: [
      "Implemented question-answering models for Persian text using Hugging Face Transformers.",
    ],
    tech: ["PyTorch", "Transformers", "Hugging Face"],
  },
  {
    role: "Computer Vision Engineer (Part-time)",
    company: "Sina Teb",
    location: "Isfahan, Iran",
    period: "Mar – Oct 2021",
    highlights: [
      "Built and deployed a real-time car detection pipeline on server infrastructure.",
      "Trained detection models for long-distance and aerial imagery using YOLO.",
    ],
    tech: ["Python", "PyTorch", "YOLO", "OpenCV"],
  },
];

/* ─── Open source work (Repositories) ─── */

export type Repository = {
  name: string;
  language: string;
  summary: string;
  detail: string;
  href: string;
  files?: string[];
  featured?: boolean;
};

export const repositories: Repository[] = [
  {
    name: "RFAMxCORE",
    language: "Python",
    summary:
      "Unified training pipeline that couples RFAM's frequency-aware cues with CORE's consistency loss on an Xception backbone.",
    detail:
      "Own work. Implements the consistency loss, the frequency-aware cue module and the RGB frequency attention module, with a full trainer and training script.",
    href: "https://github.com/mahdiAsefi20/RFAMxCORE",
    files: ["consistency_loss.py", "frequency_aware_cue.py", "rgb_frequency_attention_module.py", "trainer.py"],
    featured: true,
  },
  {
    name: "RFAM",
    language: "Python",
    summary:
      "From-scratch reimplementation of “Local Relation Learning for Face Forgery Detection” (AAAI 2021).",
    detail:
      "Own work. RGB frequency attention, a frequency-aware cue and multi-scale patch similarity modules, with dataset pipelines for Celeb-DF, DFDC, DFFD and FaceForensics++.",
    href: "https://github.com/mahdiAsefi20/RFAM",
    files: ["rgb_frequency_attention_module.py", "frequency_aware_cue.py"],
    featured: true,
  },
  {
    name: "miniBERT",
    language: "Python",
    summary: "BERT implemented from scratch in PyTorch — tokenizer, model, pretraining and fine-tuning loops.",
    detail:
      "Own work. Covers the tokenizer, config, model, masked-language-model pretraining trainer and a classification fine-tuning trainer, plus WikiText and news datasets and evaluation metrics.",
    href: "https://github.com/mahdiAsefi20/miniBERT",
    files: ["tokenizer", "config", "model", "mlm trainer", "classification trainer"],
    featured: true,
  },
  {
    name: "metadeep_task",
    language: "Python",
    summary: "LangGraph orchestration for a multi-agent generative pipeline with a human-in-the-loop verifier.",
    detail:
      "Own work. Contains the orchestrator, agent definitions, graph nodes, routing conditions, shared graph state and a verifier node that gates the run on human review.",
    href: "https://github.com/mahdiAsefi20/metadeep_task",
    files: ["langgraph_orchestrator.py", "agents.py", "graph_nodes.py", "verifier.py"],
    featured: true,
  },
  {
    name: "Persian-Paraphraser",
    language: "Notebook",
    summary:
      "Persian paraphrasing model built on mT5-small, with a co-authored 14-page Persian paper.",
    detail:
      "Own work. Training and test notebooks plus a published paper written with Prof. Mahsa Soheil Shamaee. Built on ParaNMT (50M English–Persian pairs) and the Persian portion of mC4; received a stipend for the project.",
    href: "https://github.com/mahdiAsefi20/Persian-Paraphraser",
    files: ["train notebook", "test notebook", "Doc/PersianParaphraser.pdf"],
  },
  {
    name: "Genetic & Particle Swarm Optimization",
    language: "Python",
    summary: "AI course project implementing genetic algorithms and particle swarm optimisation.",
    detail:
      "Own work. Evolutionary and swarm-based optimisation applied to complex search problems as part of the AI course curriculum.",
    href: "https://github.com/mahdiAsefi20",
  },
];

/* ─── Skills ─── */

export type SkillGroup = {
  category: string;
  note: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages & Core",
    note: "Everyday engineering toolkit",
    items: ["Python", "SQL", "Git", "Linux", "Docker"],
  },
  {
    category: "LLM & Agent Systems",
    note: "Orchestration, retrieval, evaluation",
    items: [
      "OpenAI API",
      "LangChain",
      "LangGraph",
      "RAG",
      "Prompt engineering",
      "Tool / function calling",
      "Multi-agent systems",
      "LLM evaluation & fine-tuning",
      "Langfuse",
      "Redis conversational memory",
    ],
  },
  {
    category: "Deep Learning & Vision",
    note: "Models, training, inference",
    items: [
      "PyTorch",
      "Hugging Face Transformers",
      "T5 / mT5",
      "scikit-learn",
      "TensorFlow",
      "OpenCV",
      "YOLO",
      "ViT",
      "CNNs",
      "GANs",
      "Vision LLM / VLM",
    ],
  },
  {
    category: "Generative Media & Video",
    note: "Diffusion, audio, post-production",
    items: [
      "ComfyUI",
      "ComfyUI API",
      "ControlNet",
      "IP-Adapter",
      "VAE",
      "Diffusion models",
      "FFmpeg",
      "Vast.ai",
      "Image & video prompt engineering",
      "ElevenLabs (TTS / voice cloning)",
    ],
  },
  {
    category: "MLOps & Infrastructure",
    note: "Getting models to production",
    items: [
      "Model deployment & serving",
      "Experiment tracking (W&B / MLflow)",
      "CI/CD",
      "Async & background job queues",
    ],
  },
];

export const domainSkills = [
  "Deepfake & face forgery detection",
  "Face detection & identification",
  "GANs for medical imaging",
  "Synthetic data generation",
  "Persian NLP",
  "Question answering systems",
  "Multimodal / VLM pipelines",
  "Image processing",
  "Data cleaning & augmentation",
  "Hyperparameter tuning",
];

export const languages = [
  { name: "Persian", level: "Native" },
  { name: "English", level: "TOEFL iBT 91/120 · R 24 · L 24 · S 20 · W 23" },
];

/* ─── Education ─── */

export type Education = {
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa: string;
  supervisors: string;
  note?: string;
  highlight?: string;
};

export const education: Education[] = [
  {
    degree: "M.Sc. in Artificial Intelligence",
    school: "Azad University of Tehran Central Branch",
    location: "Tehran, Iran",
    period: "2023 – Present",
    gpa: "GPA 18.89 / 20",
    supervisors: "Supervisor: Prof. Reyhaneh Tati (Azad University) · Consulting Supervisor: Prof. Azadeh Mansouri (Kharazmi University)",
    highlight: "Thesis: Deepfake / face forgery detection — in progress",
  },
  {
    degree: "B.Sc. in Computer Science",
    school: "University of Kashan",
    location: "Isfahan, Iran",
    period: "2018 – Jan 2023",
    gpa: "GPA 16.64 / 20",
    supervisors: "Supervisor: Prof. Mahsa Soheil Shamaee",
    note: "Received a stipend for the undergraduate project “Persian Paraphrasing”.",
  },
];

/* ─── Research ─── */

export type ResearchItem = {
  title: string;
  period: string;
  supervisor: string;
  description: string;
  status?: string;
};

export const research: ResearchItem[] = [
  {
    title: "Deepfake & Face Forgery Detection",
    period: "2024 – Present",
    supervisor: "Prof. Azadeh Mansouri · Kharazmi University",
    description:
      "M.Sc. thesis in progress. Reimplementing published face-forgery detection methods from scratch and combining frequency-aware cues with consistency-based training on an Xception backbone.",
    status: "In progress",
  },
  {
    title: "GANs in Radiogenomics",
    period: "Jan – Mar 2023",
    supervisor: "Prof. Qian Liu",
    description:
      "Studied GAN-based synthetic data generation for breast-cancer detection, investigating how MRI imagery and genomic information can be fused into a unified generation network.",
  },
  {
    title: "Authentication & Clustering People in News",
    period: "March 2022",
    supervisor: "Dr. Pooria Lajevardy",
    description:
      "Reviewed and presented published work on face detection and identification in news imagery, and provided methodological feedback to the research group.",
  },
];

/* ─── Teaching ─── */

export const teaching = {
  role: "Teaching Assistant",
  course: "Fundamentals of Computer and Programming",
  school: "University of Kashan",
  period: "Feb – May 2019",
  supervisor: "Prof. Mahsa Soheil Shamaee",
  highlights: [
    "Designed assignments that strengthened students' grasp of programming fundamentals.",
    "Ran hands-on coding sessions and guided roughly 10 students through debugging.",
    "Graded assignments and delivered feedback that improved students' programming technique.",
  ],
} as const;

/* ─── Contact ─── */

export const contactChannels = [
  { key: "email", label: "Email", value: "asefi.mahdii@gmail.com", href: "mailto:asefi.mahdii@gmail.com" },
  { key: "phone", label: "Phone", value: "+98 910 011 1974", href: "tel:+989100111974" },
  { key: "github", label: "GitHub", value: "github.com/mahdiAsefi20", href: "https://github.com/mahdiAsefi20" },
  { key: "linkedin", label: "LinkedIn", value: "linkedin.com/in/mahdiasefi", href: "https://www.linkedin.com/in/mahdiasefi" },
  { key: "telegram", label: "Telegram", value: "t.me/mahdiAsefi", href: "https://t.me/mahdiAsefi" },
] as const;
