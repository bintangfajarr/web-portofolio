export const defaultExperience = [
  {
    company: "LG Sinarmas",
    role: "IT System Engineer",
    period: "Nov 2025 – Present",
    location: "Karawang, Indonesia",
    bullets: [
      "Ensure smooth operation of Smart Factory systems in the battery manufacturing industry",
      "Manage and monitor MES (Manufacturing Execution System) to align production with work orders",
      "Perform root cause analysis; troubleshoot using SQL Server, Oracle SQL, and BizActor",
      "Support remote MES projects for four battery plants in the USA (Ultium Cells, Nexstar Energy, ESHD, ESMI)",
      "Completed battery manufacturing training at HLI (LG Energy Solution & Hyundai Motors JV)",
    ],
    sort_order: 0,
  },
  {
    company: "Direktorat Jenderal Pendidikan Tinggi, Kemdikbudristek",
    role: "Data Scientist Intern",
    period: "Sep – Dec 2024",
    location: "Jakarta, Indonesia",
    bullets: [
      "Implemented RAG with LLM and vector-based search for PDDIKTI's Recommendation System",
      "Evaluated PDDIKTI's Question Answering system performance",
    ],
    sort_order: 1,
  },
  {
    company: "Direktorat Jenderal EBTKE, Kementerian ESDM",
    role: "Admin Data Operator",
    period: "Aug – Dec 2024",
    location: "Bandung, Indonesia",
    bullets: [
      "Input and validated ECA recipient data across 36 provinces (150,000+ households)",
      "Collaborated with a team of 80+ people",
    ],
    sort_order: 2,
  },
  {
    company: "Data Science Research Group",
    role: "Researcher",
    period: "Nov 2023 – Aug 2024",
    location: "Bandung, Indonesia",
    bullets: [
      "Developed SmartPsychAssist: psychometric test evaluation using ML",
      "Submitted proposals to Kedaireka (RSport IoT app, LibriVerse AI library platform)",
      "Researched light pollution changes using time series analysis",
    ],
    sort_order: 3,
  },
  {
    company: "Universitas Pendidikan Indonesia",
    role: "Assistant Lecturer",
    period: "Sep 2022 – Aug 2024",
    location: "Bandung, Indonesia",
    bullets: [
      "Taught Basic Programming Algorithms 1 & 2, Data Structures, OOP to ~80 students",
      "Developed course materials, facilitated labs, evaluated assignments (20% of final grade)",
    ],
    sort_order: 4,
  },
  {
    company: "PT Bio Farma (Persero)",
    role: "Software Developer Intern",
    period: "Feb – Jul 2024",
    location: "Bandung, Indonesia",
    bullets: [
      "Developed WordPress sites for BUMN Muda and Fordigi BUMN",
      "Built Innovation Management System using Laravel",
      "Researched chatbot innovations for vaccination",
    ],
    sort_order: 5,
  },
  {
    company: "PT Artristik Studio Bandung",
    role: "Admin Data Operator",
    period: "Dec 2023 – Mar 2024",
    location: "Bandung, Indonesia",
    bullets: [
      "Validated data for 500,000+ households for ECA distribution across 36 provinces",
      "Collaborated with 60+ team members",
    ],
    sort_order: 6,
  },
];

export const defaultEducation = [
  {
    institution: "Universitas Pendidikan Indonesia",
    degree: "Bachelor of Computer Science",
    period: "Sep 2021 – Sep 2025",
    gpa: "3.95 / 4.00",
    notes: [
      "Active committee for 30+ campus events (student union, faculty, university-wide)",
    ],
    sort_order: 0,
  },
  {
    institution: "Bangkit Academy (Google, GoTo, Traveloka)",
    degree: "Machine Learning Path",
    period: "Aug 2023 – Jan 2024",
    gpa: null,
    notes: [
      "Studied ML with TensorFlow, real-world applications",
      "Collaborated on activity prediction and recommendation projects",
    ],
    sort_order: 1,
  },
];

export const defaultProjects = [
  {
    name: "Transjakarta ETL Pipeline",
    description:
      "ETL pipeline for Transjakarta transaction data, runs daily at 07:00 WIB, generates insights by card type, route, and fare",
    stack: ["Apache Airflow", "Python", "PostgreSQL"],
    github: null,
    demo: null,
    image_urls: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1494518590228-591c0f7311ba?w=800&auto=format&fit=crop&q=60"
    ],
    sort_order: 0,
  },
  {
    name: "AI CV Evaluator",
    description:
      "Backend service evaluating CVs against job descriptions; supports PDF/DOCX uploads, async pipeline, LLM prompt chaining, RAG with vector DB",
    stack: ["FastAPI", "Python", "LLM", "RAG", "Vector DB"],
    github: null,
    demo: null,
    image_urls: [
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
    ],
    sort_order: 1,
  },
  {
    name: "Youtube ELT",
    description:
      "Automated ELT pipeline extracting YouTube channel stats via YouTube Data API, with containerization, automated testing, and CI/CD",
    stack: ["Apache Airflow", "PostgreSQL", "Docker", "Python", "CI/CD"],
    github: null,
    demo: null,
    image_urls: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60"
    ],
    sort_order: 2,
  },
  {
    name: "E-Commerce Data Pipeline",
    description:
      "End-to-end batch data engineering pipeline for e-commerce data using Prefect orchestration and AWS S3 as data lake",
    stack: ["Prefect", "AWS S3", "Python"],
    github: null,
    demo: null,
    image_urls: [
      "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
    ],
    sort_order: 3,
  },
];

export const defaultSkills = [
  {
    category: "Programming Languages",
    items: ["C++", "JavaScript", "Java", "Python", "Go", "PHP", "R", "C#"],
    sort_order: 0,
  },
  {
    category: "Technologies",
    items: [
      "TensorFlow",
      "Flask",
      "FastAPI",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Airflow",
      "Spark",
      "BizActor",
      "SSMS",
      "Oracle",
      "Snowflake",
      "Azure",
      "AWS",
    ],
    sort_order: 1,
  },
  {
    category: "Tools",
    items: [
      "PowerBI",
      "Looker",
      "Tableau",
      "Microsoft Excel",
      "Google Spreadsheet",
      "Docker",
      "Git",
      "Postman",
      "Databricks",
    ],
    sort_order: 2,
  },
];

export const defaultCertifications = [
  {
    name: "Snowpro Associate",
    issuer: "Snowflake",
    date: "Jan 2026",
    credential_id: "170864375",
    sort_order: 0,
  },
  {
    name: "Certified Developer",
    issuer: "Alibaba Cloud",
    date: "May 2024",
    credential_id: "ACCD0119700100011147",
    sort_order: 1,
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "Apr 2024",
    credential_id: "100386087",
    sort_order: 2,
  },
];

export const defaultAwards = [
  {
    title: "4th Place Programming DIMAS TI AMLI",
    organizer: "Universitas Negeri Semarang",
    date: "Dec 2023",
    sort_order: 0,
  },
  {
    title: "Finalist Joints Programming Contest",
    organizer: "Universitas Gadjah Mada",
    date: "May 2023",
    sort_order: 1,
  },
  {
    title: "Finalist Pemrograman GemasTIK XV",
    organizer: "Puspresnas Kemendikbudristek",
    date: "Nov 2022",
    sort_order: 2,
  },
  {
    title: "Finalist National Programming Contest",
    organizer: "Institut Teknologi Sepuluh Nopember",
    date: "Oct 2022",
    sort_order: 3,
  },
  {
    title: "Finalist Competitive Programming Hology",
    organizer: "Universitas Brawijaya",
    date: "Oct 2022",
    sort_order: 4,
  },
  {
    title: "5th Place Programming DIMAS TI AMLI",
    organizer: "Universitas Negeri Semarang",
    date: "Jun 2022",
    sort_order: 5,
  },
];

export const personalInfo = {
  name: "Muhammad Cahyana Bintang Fajar",
  shortName: "Bintang Fajar",
  title: "Software & Data Engineer",
  bio: "Passionate Software & Data Engineer with expertise in building scalable data pipelines, machine learning systems, and modern web applications. Currently working as an IT System Engineer at LG Sinarmas, managing Smart Factory MES systems.",
  email: "bintangfazr@gmail.com",
  phone: "+62 82130471838",
  linkedin: "https://linkedin.com/in/mcbintangfajar",
  github: "https://github.com/bintangfajarr",
  languages: ["Indonesian (Native)", "English (Professional)"],
};
