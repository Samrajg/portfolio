const portfolioProjects = [
  // ================= TIER 1: FLAGSHIP PRODUCTION & RESEARCH AI SYSTEMS =================
  {
    id: "cityscope-ai",
    title: "CityScope AI — Smart Geospatial & Public Policy Analytics",
    category: "ai",
    tier: "flagship",
    badge: "Completed • Flagship",
    badgeColor: "success",
    tagline: "District-level predictive analytics and demographic intelligence for Tamil Nadu governance.",
    desc: "Comprehensive smart data analysis engine offering multi-dimensional insights into demographics, healthcare distribution, education infrastructure, and regional policy metrics across Tamil Nadu districts with interactive ML intelligence.",
    tech: ["Python", "Machine Learning", "NLP", "GeoPandas", "Streamlit", "FastAPI"],
    metrics: [
      { label: "Coverage", val: "38 Districts" },
      { label: "Data Pillars", val: "Health • Edu • Infra" },
      { label: "Status", val: "Production Ready" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: true,
    highlights: "Multi-parameter spatial clustering, policy trend forecasting, interactive citizen & official dashboard."
  },
  {
    id: "stroke-risk-predictor",
    title: "NeuroStroke AI — Clinical Stroke Risk Prediction Engine",
    category: "ai",
    tier: "flagship",
    badge: "Working System",
    badgeColor: "success",
    tagline: "Random Forest clinical diagnostic assistant predicting stroke risks with high recall.",
    desc: "Full-stack predictive healthcare tool evaluating clinical markers (BMI, average glucose levels, hypertension, heart disease, smoking history, age demographics) to estimate personalized patient stroke risk probabilities.",
    tech: ["Python", "Random Forest", "Scikit-Learn", "Streamlit", "Pandas"],
    metrics: [
      { label: "Model", val: "Random Forest" },
      { label: "Factors Evaluated", val: "6 Key Biomarkers" },
      { label: "Inference", val: "<100ms" }
    ],
    github: "https://github.com/Samrajg/Stroke_prediction",
    demo: "https://github.com/Samrajg/Stroke_prediction",
    featured: true,
    highlights: "Class imbalance handling via SMOTE, high diagnostic recall, real-time patient risk profiling."
  },
  {
    id: "ieee-paper-writer",
    title: "IEEE Paper Synthesizer & Academic Research Agent",
    category: "ai",
    tier: "flagship",
    badge: "Completed • Research AI",
    badgeColor: "success",
    tagline: "Autonomous multi-agent system synthesizing IEEE-compliant research drafts & citations.",
    desc: "AI research workflow automation tool designed to assist scholars in structuring literature surveys, formatting LaTeX equations, abstract generation, and ensuring standard two-column IEEE conference formatting compliance.",
    tech: ["Python", "LLMs", "Prompt Engineering", "LaTeX Engine", "RAG"],
    metrics: [
      { label: "Format", val: "IEEE 2-Column" },
      { label: "Time Saved", val: "~70%" },
      { label: "Status", val: "Completed" }
    ],
    github: "https://github.com/Samrajg/ieee-paper-writer",
    demo: null,
    featured: true,
    highlights: "Automated bibtex formatting, iterative abstract refining, structured section generation."
  },
  {
    id: "mr-strict",
    title: "Mr. Strict — AI Automated Assignment Evaluator",
    category: "ai",
    tier: "flagship",
    badge: "Core Prototype • Debugging",
    badgeColor: "warning",
    tagline: "BERT-powered semantic grading and code evaluation engine for academic integrity.",
    desc: "Automated assignment grading engine using contextual embeddings to grade student submissions against reference rubrics with zero human bias. Features code similarity and Dockerized sandboxed execution.",
    tech: ["Python", "BERT NLP", "FastAPI", "Docker", "PyTorch"],
    metrics: [
      { label: "Grading Accuracy", val: "92%" },
      { label: "Speedup", val: "85% Less Time" },
      { label: "Concurrent Submissions", val: "500+" }
    ],
    github: "https://github.com/Samrajg/Mr-strict",
    demo: null,
    featured: true,
    highlights: "Contextual semantic scoring via fine-tuned Transformer embeddings and plagiarism flagging."
  },
  {
    id: "voice-legal-summarizer",
    title: "LexiVoice — Voice-Driven Legal Document Summarizer",
    category: "ai",
    tier: "flagship",
    badge: "College Mini Project",
    badgeColor: "success",
    tagline: "Voice-activated multi-lingual legal document comprehension and clause abstraction pipeline.",
    desc: "Transforms dense, multi-page legal contracts and court rulings into concise, human-readable summaries triggered by voice commands. Includes audio playback and critical clauses extraction.",
    tech: ["Python", "SpeechRecognition", "Transformer Summarizer", "Whisper", "Flask"],
    metrics: [
      { label: "Audio Processing", val: "Real-time" },
      { label: "Clause Precision", val: "88%+" },
      { label: "Type", val: "Acoustic AI + NLP" }
    ],
    github: "https://github.com/Samrajg/voice_driven_legal_document_summarizer",
    demo: null,
    featured: true,
    highlights: "Acoustic keyword spotting, legal NER (named entity recognition), high-level executive summaries."
  },
  {
    id: "autonomous-exam-monitor",
    title: "Edge Proctor — Autonomous Jetson Nano Exam Monitor",
    category: "ai",
    tier: "flagship",
    badge: "Hardware + Edge AI",
    badgeColor: "cyan",
    tagline: "Real-time edge proctoring computer vision running at 30 FPS on NVIDIA Jetson Nano.",
    desc: "Embedded deep learning system monitoring candidate facial orientation, gaze deflection, multiple person presence, and unauthorized electronic devices in real-time during remote examinations.",
    tech: ["Python", "OpenCV", "Jetson Nano", "TensorRT", "YOLOv8"],
    metrics: [
      { label: "Edge FPS", val: "30 FPS" },
      { label: "Latency", val: "<33ms" },
      { label: "Hardware", val: "NVIDIA Jetson" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: true,
    highlights: "Zero cloud lag inference, automated alert timestamps, edge-optimized quantized neural network."
  },

  // ================= TIER 2: HIGH-IMPACT ARCHITECTURAL BLUEPRINTS & PROTOTYPES =================
  {
    id: "smartrail-ai",
    title: "SmartRail AI — Predictive Railway Traffic & Safety Grid",
    category: "system",
    tier: "blueprint",
    badge: "Visionary Project Idea",
    badgeColor: "purple",
    tagline: "Next-gen rail operations optimization, track anomaly vision, and dynamic delay mitigation.",
    desc: "One of the most ambitious conceptual systems designed: dual frontend and backend architecture leveraging machine learning for rail congestion prediction, sensor-driven track integrity warnings, and real-time passenger routing.",
    tech: ["Python", "FastAPI", "React", "Graph Neural Networks", "IoT Protocols"],
    metrics: [
      { label: "Architecture", val: "Microservices" },
      { label: "Scope", val: "Smart Transit" },
      { label: "Priority", val: "Flagship Roadmap" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: true,
    highlights: "Predictive track bottleneck solver, dual-repo decoupled architecture, sensor fusion analytics."
  },
  {
    id: "mediqueue-system",
    title: "MediQueue — Intelligent Healthcare Triage & Outpatient Routing",
    category: "system",
    tier: "blueprint",
    badge: "Masterpiece Architecture",
    badgeColor: "purple",
    tagline: "Dynamic AI-driven emergency queue prioritization and hospital resource optimizer.",
    desc: "Architected to solve outpatient congestion across hospitals. Evaluates vital severity markers to dynamically adjust queue orders, streamline OPD consultations, and notify doctors with predictive schedule buffers.",
    tech: ["TypeScript", "Next.js", "Node.js", "MongoDB", "Socket.io"],
    metrics: [
      { label: "Queue Latency", val: "Real-time WebSockets" },
      { label: "Target", val: "Masterpiece OPD System" },
      { label: "Stack", val: "Full Stack Distributed" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: true,
    highlights: "Priority triage engine, automated doctor slot reallocations, live waiting queue screens."
  },
  {
    id: "mira-ai-companion",
    title: "MIRA — Multimodal Context-Aware AI Companion",
    category: "ai",
    tier: "blueprint",
    badge: "Active Development",
    badgeColor: "cyan",
    tagline: "Personalized companion agent leveraging long-term memory retrieval and conversational state tracking.",
    desc: "Next-gen AI conversational companion designed with affective computing principles, persistent episodic memory vector store, and proactive task suggestions based on routine recognition.",
    tech: ["Python", "LangChain", "Vector DB (Chroma/FAISS)", "FastAPI", "LLMs"],
    metrics: [
      { label: "Memory", val: "Vector Vector Retrieval" },
      { label: "State", val: "Episodic Graphs" },
      { label: "Role", val: "Empathetic Assistant" }
    ],
    github: "https://github.com/Samrajg/MIRA-AI-Companion",
    demo: null,
    featured: false,
    highlights: "Semantic context persistence, tone adaptation, continuous conversation grounding."
  },
  {
    id: "steel-energy-predictor",
    title: "Steel Energy Predictor — Industrial Furnace Optimization",
    category: "ai",
    tier: "blueprint",
    badge: "Heavy Industry AI",
    badgeColor: "purple",
    tagline: "Time-series energy consumption forecasting for electric arc steel manufacturing furnaces.",
    desc: "Applies multivariate regression and recurrent time-series modeling to forecast industrial power consumption spikes during steel smelting cycles, enabling plant managers to shave peak demand costs.",
    tech: ["Python", "XGBoost", "LSTM / GRU", "Pandas", "Scikit-Learn"],
    metrics: [
      { label: "Sector", val: "Industrial Smelting" },
      { label: "Target", val: "Peak Load Shaving" },
      { label: "Data", val: "Thermodynamic Timeseries" }
    ],
    github: "https://github.com/Samrajg/steel-energy-predictor",
    demo: null,
    featured: false,
    highlights: "Non-linear heat loss calculations, load forecasting, cost optimization heuristics."
  },
  {
    id: "smart-tray-tracking",
    title: "Smart Tray Tracking IoT & Computer Vision System",
    category: "system",
    tier: "blueprint",
    badge: "Prototype Ready • Hosting Phase",
    badgeColor: "cyan",
    tagline: "End-to-end industrial tray and inventory item tracking with live telemetry.",
    desc: "Complete hardware-software platform comprising dedicated backend microservices and intuitive frontend dashboards for industrial food/asset trays tracking through RFID/vision checkpoints.",
    tech: ["React.js", "Node.js / Express", "MongoDB", "IoT Webhooks", "MQTT"],
    metrics: [
      { label: "Components", val: "Dual Repos (FE & BE)" },
      { label: "Stage", val: "Hosting & Prototype" },
      { label: "Latency", val: "<500ms sync" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: false,
    highlights: "Live visual conveyor tracking, asset checkpoint verification, exception logging."
  },
  {
    id: "my-school-app",
    title: "My School App — Institutional Management Suite",
    category: "fullstack",
    tier: "flagship",
    badge: "Perfect Prototype",
    badgeColor: "success",
    tagline: "Comprehensive multi-role educational administration and student telemetry portal.",
    desc: "Battle-tested academic management prototype enabling attendance tracking, exam scheduling, grade calculation, and parent-teacher communication channels with high role-based security.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "TailwindCSS"],
    metrics: [
      { label: "Roles", val: "Admin • Teacher • Student" },
      { label: "Readiness", val: "Production Prototype" },
      { label: "Security", val: "RBAC + Encrypted Sessions" }
    ],
    github: "https://github.com/Samrajg/My-School-app",
    demo: null,
    featured: false,
    highlights: "Multi-tenant role permissions, report card generation pipeline, clean UX."
  },

  // ================= TIER 3: PRODUCTION UTILITIES & VERIFIED LIVE TOOLS =================
  {
    id: "treetocli",
    title: "TreeToCLI — Command-Line Generator & Tree Parser",
    category: "tools",
    tier: "utility",
    badge: "Live Web App • 100% Working",
    badgeColor: "success",
    tagline: "Converts indented visual ASCII/folder trees directly into shell & bash commands.",
    desc: "High-productivity developer utility that instantly compiles folder directory tree diagrams into one-shot executable bash scripts, PowerShell mkdir commands, and CMD batch instructions.",
    tech: ["JavaScript", "HTML5", "CSS3", "Regex Parser", "GitHub Pages"],
    metrics: [
      { label: "Shells", val: "Bash • PowerShell • CMD" },
      { label: "Status", val: "Deployed Live" },
      { label: "Performance", val: "Instant Client-side" }
    ],
    github: "https://github.com/Samrajg/treetocli",
    demo: "https://samrajg.github.io/treetocli/",
    featured: true,
    highlights: "Zero external dependencies, instant clipboard copy, handles nested unicode paths flawlessly."
  },
  {
    id: "speed-math-tester",
    title: "Speed Math Tester — Neuro-Cognitive Arithmetic Engine",
    category: "tools",
    tier: "utility",
    badge: "Perfect Working",
    badgeColor: "success",
    tagline: "Rapid mental arithmetic benchmarking tool measuring cognitive processing times.",
    desc: "Interactive gamified web tool engineered for brain training and rapid mental computation. Tracks reaction speeds, calculation accuracy percentiles, and provides detailed cognitive performance breakdowns.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS Animations", "LocalStorage API"],
    metrics: [
      { label: "Precision", val: "Millisecond Timer" },
      { label: "Status", val: "Working Flawlessly" },
      { label: "Gamification", val: "Streak & Speed Ratings" }
    ],
    github: "https://github.com/Samrajg/Speed-math-tester",
    demo: "https://github.com/Samrajg/Speed-math-tester",
    featured: false,
    highlights: "Dynamic difficulty ramping, keystroke listeners, reaction speed analytics."
  },
  {
    id: "mind-oracle",
    title: "MindOracle — Mathematical Mind Reader & Number Predictor",
    category: "tools",
    tier: "utility",
    badge: "Completed",
    badgeColor: "success",
    tagline: "Binary matrix mathematical perception engine predicting chosen mental values.",
    desc: "A clever mathematical algorithm packaged in an interactive sci-fi UI that isolates and predicts the exact number held in the user's mind using base-2 discrete subset evaluation.",
    tech: ["JavaScript", "Discrete Math", "CSS3 Cyberpunk", "HTML5"],
    metrics: [
      { label: "Math Logic", val: "Binary Set Partition" },
      { label: "Accuracy", val: "100% Deterministic" },
      { label: "Status", val: "Completed" }
    ],
    github: "https://github.com/Samrajg/MindOracle",
    demo: null,
    featured: false,
    highlights: "Intriguing psychological trick, responsive card grid, instant matrix recalculations."
  },
  {
    id: "security-rounds-tracking",
    title: "Security Rounds Digital Verifier & Audit Trail",
    category: "fullstack",
    tier: "utility",
    badge: "Public • Deployed",
    badgeColor: "success",
    tagline: "Tamper-proof digital physical patrol verification with cryptographic audit timestamps.",
    desc: "Enterprise checkpoint log verifying security guard patrol rounds. Prevents falsified patrol logs through time-fenced checkpoint scans, geolocation tagging, and incident logging.",
    tech: ["FastAPI", "JavaScript", "PostgreSQL", "JWT", "REST API"],
    metrics: [
      { label: "API Speed", val: "40% Faster Query" },
      { label: "Audit Log", val: "Immutable Records" },
      { label: "Status", val: "Public Deployment" }
    ],
    github: "https://github.com/Samrajg/security-rounds-tracking",
    demo: null,
    featured: false,
    highlights: "Multi-facility routing, tamper-evident checkpoint timestamps, automated incident notifications."
  },
  {
    id: "asset-management-system",
    title: "Enterprise Asset Management & Lifecycle Tracker",
    category: "fullstack",
    tier: "utility",
    badge: "Perfect Working Clone",
    badgeColor: "success",
    tagline: "Corporate IT equipment and hardware lifecycle management with QR tracking.",
    desc: "Complete asset inventory system overseeing requisition, depreciation schedules, maintenance logs, and personnel assignments with real-time barcode/QR indexing.",
    tech: ["Python / Django", "SQLite / PostgreSQL", "Bootstrap", "QR Engine"],
    metrics: [
      { label: "Functionality", val: "Full Asset Lifecycle" },
      { label: "Status", val: "Flawlessly Working" },
      { label: "Feature", val: "Audit Export" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: false,
    highlights: "Depreciation calculators, automated vendor alerts, batch hardware import/export."
  },
  {
    id: "bible-quiz-challenge",
    title: "Bible Quiz Challenge — Interactive Scripture Trivia MVP",
    category: "tools",
    tier: "utility",
    badge: "MVP Completed",
    badgeColor: "success",
    tagline: "Interactive multi-round thematic biblical trivia game with instantaneous score evaluation.",
    desc: "Engaging quiz application built with curated scriptural questionnaires, timed response modes, live score accumulation, and celebratory particle animations upon completion.",
    tech: ["JavaScript", "HTML5", "CSS3 Flex/Grid", "DOM API"],
    metrics: [
      { label: "Stage", val: "MVP Completed" },
      { label: "Mode", val: "Timed Trivia" },
      { label: "UX", val: "Engaging Feedback" }
    ],
    github: "https://github.com/Samrajg/BIBLE-QUIZ-CHALLENGE",
    demo: null,
    featured: false,
    highlights: "Score tallying engine, category selection, zero latency local question sets."
  },
  {
    id: "jwt-token-generator",
    title: "JWT Security Key Vault & Token Inspector",
    category: "tools",
    tier: "utility",
    badge: "Code Ready • UI Target",
    badgeColor: "cyan",
    tagline: "Cryptographic JSON Web Token encoder, signature debugger, and expiration inspector.",
    desc: "Python cryptographic token issuance backend being outfitted with a sleek modern cybernetic developer UI for generating HMAC/RSA signed tokens with customizable payload claims.",
    tech: ["Python", "PyJWT", "Cryptography", "HTML5", "Modern CSS"],
    metrics: [
      { label: "Encryption", val: "HS256 / RS256" },
      { label: "Security", val: "RFC 7519 Compliant" },
      { label: "Status", val: "Backend Complete" }
    ],
    github: "https://github.com/Samrajg/jwt-tocken-generator",
    demo: null,
    featured: false,
    highlights: "Payload claim validation, expired token simulation, tamper-detection testing."
  },

  // ================= TIER 4: FULL-STACK & LAB RESEARCH INCUBATOR =================
  {
    id: "question-paper-prediction",
    title: "University Question Paper Pattern Predictor",
    category: "ai",
    tier: "incubator",
    badge: "In Development",
    badgeColor: "warning",
    tagline: "NLP historical frequency and Markov topic trend modeling for semester examinations.",
    desc: "Analyzes decade-long historical university test question papers to discover recurring unit weightage distributions, question recurrence probability, and topic shifts over time.",
    tech: ["Python", "NLP", "TF-IDF", "NLTK", "Scikit-Learn"],
    metrics: [
      { label: "Data Source", val: "Historical Exam Sets" },
      { label: "Approach", val: "Probabilistic NLP" },
      { label: "Status", val: "Active Build" }
    ],
    github: "https://github.com/Samrajg/question_paper_prediction",
    demo: null,
    featured: false,
    highlights: "Topic modeling via LDA, question similarity clustering, probability heatmap."
  },
  {
    id: "taskflow",
    title: "TaskFlow — Collaborative Kanban & Sprint Orchestrator",
    category: "fullstack",
    tier: "incubator",
    badge: "In Development",
    badgeColor: "warning",
    tagline: "High-productivity project boards with real-time lane transitions and task metrics.",
    desc: "Modern agile sprint board designed for developer squads. Implements draggable task lanes, dependency graphs, subtask progress meters, and milestone burndown charts.",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "Drag-Drop API"],
    metrics: [
      { label: "Design", val: "Agile Workflow" },
      { label: "Target", val: "Developer Productivity" },
      { label: "Status", val: "WIP" }
    ],
    github: "https://github.com/Samrajg/TaskFlow",
    demo: null,
    featured: false,
    highlights: "Fluid drag-and-drop mechanics, priority matrices, sprint analytics."
  },
  {
    id: "digital-entry-log",
    title: "Digital Entry & Visitor Gatekeeping System",
    category: "fullstack",
    tier: "incubator",
    badge: "Partially Completed",
    badgeColor: "warning",
    tagline: "Secure visitor registration terminal with digital badge generation and host alerts.",
    desc: "Eliminates messy physical paper gate registers. Visitors log entry details via touch tablet, automated SMS/email alerts ping host employees, and security verifies checkouts digitally.",
    tech: ["Python / FastAPI", "SQLite", "HTML/JS", "QR Check-in"],
    metrics: [
      { label: "Stage", val: "Partially Completed" },
      { label: "Security", val: "Digital Logs" },
      { label: "Hardware", val: "Tablet Gate Kiosk" }
    ],
    github: "https://github.com/Samrajg/digital-entry",
    demo: null,
    featured: false,
    highlights: "Contactless pass issuance, visitor duration counters, blacklist alerts."
  },
  {
    id: "factory-production-mgmt",
    title: "Factory Production & Assembly Line Orchestrator",
    category: "fullstack",
    tier: "incubator",
    badge: "In Development",
    badgeColor: "warning",
    tagline: "Shop-floor batch tracking, machine uptime logs, and defect rate monitors.",
    desc: "Industrial telemetry system connecting plant operators with workstation throughput. Records assembly bottlenecks, operator shifts, and batch dispatch logs in real-time.",
    tech: ["Node.js", "React", "PostgreSQL", "WebSockets"],
    metrics: [
      { label: "Domain", val: "Manufacturing" },
      { label: "Uptime Focus", val: "OEE Tracking" },
      { label: "Status", val: "Active Roadmap" }
    ],
    github: "https://github.com/Samrajg/factory-production-management",
    demo: null,
    featured: false,
    highlights: "Batch cycle timing, raw material inventory buffers, downtime cause categorizer."
  },
  {
    id: "lost-and-found",
    title: "Campus Lost & Found Matchmaking Portal",
    category: "fullstack",
    tier: "incubator",
    badge: "Functional Prototype",
    badgeColor: "cyan",
    tagline: "Dual-repo system pairing lost possessions with found reports via fuzzy similarity.",
    desc: "Community recovery portal consisting of separate backend API and frontend client. Users report missing personal items with images; system runs fuzzy text and image category matching.",
    tech: ["React.js", "Node.js", "Express", "Multer Cloudinary", "MongoDB"],
    metrics: [
      { label: "Repos", val: "lost-found-frontend & backend" },
      { label: "Status", val: "Functional Prototype" },
      { label: "Feature", val: "Visual Verification" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: false,
    highlights: "Location-based tagging, claim verification flow, automated resolution archiving."
  },
  {
    id: "urban-groom-suite",
    title: "UrbanGroom & GroomVault E-Commerce Ecosystem",
    category: "fullstack",
    tier: "incubator",
    badge: "Enterprise Training Suite",
    badgeColor: "purple",
    tagline: "Complete multi-repo commerce stack (GroomVault + UrbanGroom) with order pipelines.",
    desc: "Multi-repository commercial full-stack architecture built during intensive enterprise training. Features dedicated customer storefronts, admin catalog management, cart persistence, and payment mocks.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe Mock"],
    metrics: [
      { label: "Repositories", val: "5 Interconnected Repos" },
      { label: "Architecture", val: "Storefront + Admin CMS" },
      { label: "Scope", val: "Enterprise E-Commerce" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: false,
    highlights: "State-managed shopping cart, inventory decrementing, modular REST micro-routes."
  },
  {
    id: "medico-pilot",
    title: "Medico-Pilot Clinical Assistant",
    category: "ai",
    tier: "incubator",
    badge: "TypeScript AI Project",
    badgeColor: "cyan",
    tagline: "TypeScript medical record summarizer and pharmaceutical interaction checker.",
    desc: "Modern TypeScript medical assistant created to parse clinical summaries and surface potential pharmaceutical counter-indications for healthcare workers.",
    tech: ["TypeScript", "Next.js", "Clinical NLP", "TailwindCSS"],
    metrics: [
      { label: "Language", val: "TypeScript" },
      { label: "Safety", val: "Interaction Warning" },
      { label: "Updated", val: "Recent Push" }
    ],
    github: "https://github.com/Samrajg/medico-pilot",
    demo: null,
    featured: false,
    highlights: "Strong typing with TypeScript, rapid UI rendering, safety advisory outputs."
  },
  {
    id: "ai-ml-research-labs",
    title: "Deep Learning, CNN & NLP Experimental Laboratory",
    category: "ai",
    tier: "incubator",
    badge: "Research Notes & Models",
    badgeColor: "cyan",
    tagline: "Hands-on implementation of K-Means, CNN architectures, NLP embeddings, and Generative AI.",
    desc: "Curated research compendium containing practical experiments in convolutional neural networks (image classification), clustering unsupervised algorithms, tokenization pipelines, and LLM tuning notes.",
    tech: ["PyTorch", "TensorFlow", "K-Means", "CNN", "NLTK", "Gen-AI"],
    metrics: [
      { label: "Disciplines", val: "Vision • NLP • Clust" },
      { label: "Notebooks", val: "Multiple Core Labs" },
      { label: "Repository Cluster", val: "kmeans • nlp • CNN" }
    ],
    github: "https://github.com/Samrajg",
    demo: null,
    featured: false,
    highlights: "Custom convolution layers, loss convergence graphs, distance clustering benchmarks."
  }
];

// Helper: Filter & render logic
if (typeof window !== "undefined") {
  window.portfolioProjects = portfolioProjects;
}
