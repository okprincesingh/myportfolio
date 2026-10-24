export const profile = {
  name: "Prince Singh",
  role: "Full Stack Developer",
  email: "okprincesingh@gmail.com",
  phone: "+91 88538 15439",
  phoneHref: "tel:+918853815439",
  city: "Noida",
  region: "Uttar Pradesh, India",
  linkedin: "https://www.linkedin.com/in/prince-singh-5b5577281/",
  linkedinShort: "in/prince-singh",
  resume: "/prince-singh-resume.pdf",
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/** Contents strip under the masthead — the page as a spec sheet. */
export const index = [
  { id: "about", n: "01", t: "Profile", meta: "Who is writing the code" },
  { id: "work", n: "02", t: "Selected work", meta: "2 case studies + client work" },
  { id: "stack", n: "03", t: "Capabilities", meta: "Frontend · backend · data · commerce" },
  { id: "experience", n: "04", t: "Experience", meta: "Nov 2023 — present" },
  { id: "contact", n: "05", t: "Contact", meta: "Replies within 24 hours" },
];

/** Real syntax-highlighted snippet shown in the masthead panel. */
export const snippet = [
  [{ t: "// ", c: "t-com" }, { t: "prince-singh · full stack", c: "t-com" }],
  [{ t: "const", c: "t-kw" }, { t: " stack = {" }],
  [{ t: "  frontend", c: "t-prop" }, { t: ": [" }, { t: "'react'", c: "t-str" }, { t: ", " }, { t: "'next.js'", c: "t-str" }, { t: ", " }, { t: "'tailwind'", c: "t-str" }, { t: "]," }],
  [{ t: "  backend", c: "t-prop" }, { t: ":  [" }, { t: "'node'", c: "t-str" }, { t: ", " }, { t: "'php'", c: "t-str" }, { t: ", " }, { t: "'laravel'", c: "t-str" }, { t: "]," }],
  [{ t: "  cms", c: "t-prop" }, { t: ":      [" }, { t: "'wordpress'", c: "t-str" }, { t: ", " }, { t: "'woocommerce'", c: "t-str" }, { t: "]," }],
  [{ t: "  data", c: "t-prop" }, { t: ":     [" }, { t: "'mysql'", c: "t-str" }, { t: ", " }, { t: "'postgresql'", c: "t-str" }, { t: "]," }],
  [{ t: "}" }],
  [{ t: "" }],
  [{ t: "export async function", c: "t-kw" }, { t: " " }, { t: "ship", c: "t-fn" }, { t: "(project) {" }],
  [{ t: "  const", c: "t-kw" }, { t: " api = " }, { t: "await", c: "t-kw" }, { t: " " }, { t: "buildRestApi", c: "t-fn" }, { t: "(project.schema)" }],
  [{ t: "  const", c: "t-kw" }, { t: " ui  = " }, { t: "await", c: "t-kw" }, { t: " " }, { t: "render", c: "t-fn" }, { t: "(project.design)" }],
  [{ t: "" }],
  [{ t: "  return", c: "t-kw" }, { t: " " }, { t: "deploy", c: "t-fn" }, { t: "({ api, ui, ssl: " }, { t: "true", c: "t-num" }, { t: ", cache: " }, { t: "true", c: "t-num" }, { t: " })" }],
  [{ t: "}" }],
];

export const tickerItems = [
  "React.js",
  "Next.js",
  "Node.js",
  "PHP 8",
  "WordPress",
  "Laravel",
  "WooCommerce",
  "Shopify",
  "MySQL",
  "PostgreSQL",
  "REST APIs",
  "Tailwind CSS",
  "Bootstrap 5",
];

export const about = {
  heading: ["Builds that", "hold up", "under real use."],
  lede: "I'm a full stack developer in Noida with 2+ years spent shipping web applications and CMS platforms — the kind that still work after the launch post goes out.",
  body: [
    "My work sits where a product has to be both maintainable and quick to change: dashboards behind role-based access, CMS-driven sites, WooCommerce flows with custom checkout, and React or Next.js interfaces talking to REST APIs.",
    "I came up through PHP and WordPress agency work, which taught me to ship against real deadlines for real clients, then moved into full-stack product development. That mix means I can pick up a legacy PHP codebase or start a clean Next.js app without friction.",
    "I also handle the unglamorous work that keeps a site alive — hosting, domains, DNS, SSL, migrations, email services and production troubleshooting.",
  ],
};

/** Rendered as a ledger, not a row of cards. */
export const ledger = [
  { k: "Based in", v: "Noida, India" },
  { k: "Experience", v: "2+ years" },
  { k: "Currently", v: "Jaikvik Technology" },
  { k: "Availability", v: "Full-time & freelance" },
  { k: "Works across", v: "Front → back → deploy" },
  { k: "Timezone", v: "IST (UTC+5:30)" },
];

export const principles = [
  { n: "01", t: "Clean by default", b: "Readable, modular code and MVC-friendly structure, so the next developer can move fast." },
  { n: "02", t: "Performance first", b: "Caching strategies, lean queries and light front ends. Speed is a feature, not a phase two." },
  { n: "03", t: "Security built in", b: "Authentication, authorisation, validation and sanitisation designed in from the first commit." },
  { n: "04", t: "Owned end to end", b: "From DNS and SSL to the last responsive breakpoint — accountable well after launch." },
];

export const stats = [
  { v: 2, suffix: "+", k: "Years shipping", d: "since Nov 2023" },
  { v: 5, suffix: "+", k: "WordPress builds", d: "themes & plugins" },
  { v: 3, suffix: "", k: "Product teams", d: "all in Noida" },
  { v: 20, suffix: "+", k: "Tools in rotation", d: "front to back" },
];

export type Project = {
  id: "care" | "biz";
  n: string;
  title: string;
  category: string;
  tag: string;
  body: string;
  role: string;
  year: string;
  highlights: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "care",
    n: "01",
    title: "Care Management Platform",
    category: "Web application",
    tag: "Two panels, one source of truth.",
    body: "A care management platform with separate admin and user panels built around role-based access. I handled complete frontend development and partial backend integration — responsive dashboards, structured forms and the data-management views that tie them together.",
    role: "Frontend lead · partial backend",
    year: "2025",
    highlights: [
      "Admin and user panels with role-based access control",
      "Responsive dashboards, forms and data management features",
      "Complete frontend development with partial backend integration",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "MySQL"],
  },
  {
    id: "biz",
    n: "02",
    title: "Responsive Business Website",
    category: "Frontend build",
    tag: "Pixel-faithful, mobile-first.",
    body: "A mobile-first business website delivered as a PSD-to-HTML conversion using Tailwind CSS and Bootstrap. The brief was fidelity: every breakpoint matching the design, with a front end light enough to load quickly on modest connections.",
    role: "Frontend developer",
    year: "2024",
    highlights: [
      "Mobile-first PSD-to-HTML conversion",
      "Tailwind CSS and Bootstrap used side by side",
      "Consistent reproduction across every breakpoint",
    ],
    stack: ["HTML", "CSS", "Bootstrap", "Tailwind CSS"],
  },
];

export const alsoBuilt = [
  { n: "03", t: "Custom WordPress solutions", b: "CMS-driven sites with secure admin panels, custom themes and plugins for more than five aligned client projects." },
  { n: "04", t: "WooCommerce storefronts", b: "Customised checkout workflows and payment gateway integrations that remove friction between cart and confirmation." },
  { n: "05", t: "Performance & SEO passes", b: "Caching strategies, asset discipline and SEO best practices applied to existing sites to lift speed and visibility." },
  { n: "06", t: "Hosting & operations", b: "Domains, DNS, SSL certificates, migrations, email services, server maintenance and production troubleshooting." },
];

export type Level = "core" | "advanced" | "practised";

export const levelWidth: Record<Level, string> = {
  core: "94%",
  advanced: "78%",
  practised: "62%",
};

export const skillGroups: { id: string; label: string; note: string; items: { name: string; level: Level; detail: string }[] }[] = [
  {
    id: "frontend",
    label: "Frontend",
    note: "Interfaces that stay responsive under real content.",
    items: [
      { name: "React.js", level: "core", detail: "Component architecture, state, hooks" },
      { name: "Next.js", level: "advanced", detail: "Routing, rendering, project structure" },
      { name: "JavaScript (ES6+)", level: "core", detail: "Async, modules, DOM, fetch" },
      { name: "Tailwind CSS", level: "core", detail: "Design systems, responsive layout" },
      { name: "Bootstrap 5", level: "core", detail: "Rapid, consistent interface builds" },
      { name: "HTML5 / CSS3", level: "core", detail: "Semantics, accessibility, motion" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    note: "APIs, admin panels and the logic behind them.",
    items: [
      { name: "PHP", level: "core", detail: "Custom applications, OOP, MVC basics" },
      { name: "Node.js", level: "advanced", detail: "REST services and integrations" },
      { name: "WordPress", level: "core", detail: "Custom themes, plugins, hooks" },
      { name: "Laravel", level: "practised", detail: "Routing, Eloquent, framework structure" },
      { name: "REST APIs", level: "core", detail: "Design, consumption, authentication" },
      { name: "Custom admin panels", level: "core", detail: "Role-based dashboards, CRUD" },
    ],
  },
  {
    id: "data",
    label: "Data",
    note: "Modelling data so queries stay cheap.",
    items: [
      { name: "MySQL", level: "core", detail: "Schema design, joins, indexing" },
      { name: "PostgreSQL", level: "advanced", detail: "Relational modelling, query tuning" },
      { name: "Auth & authorisation", level: "core", detail: "Sessions, roles, permissions" },
      { name: "Security practices", level: "core", detail: "Validation, sanitisation, hardening" },
    ],
  },
  {
    id: "commerce",
    label: "Commerce",
    note: "Stores that convert and checkouts that cooperate.",
    items: [
      { name: "WooCommerce", level: "core", detail: "Catalogue, cart, orders" },
      { name: "Shopify", level: "core", detail: "Store setup, theme customisation, apps" },
      { name: "Payment gateways", level: "advanced", detail: "Providers, webhooks, failure paths" },
      { name: "Custom checkout", level: "core", detail: "Streamlined multi-step flows" },
      { name: "SEO & performance", level: "core", detail: "Caching, markup, Core Web Vitals" },
    ],
  },
  {
    id: "workflow",
    label: "Workflow",
    note: "Tooling that keeps delivery predictable.",
    items: [
      { name: "Git & GitHub", level: "core", detail: "Branching, review, releases" },
      { name: "VS Code / XAMPP", level: "core", detail: "Local environments, debugging" },
      { name: "Hosting, DNS & SSL", level: "core", detail: "Domains, certificates, migrations" },
      { name: "Cursor AI", level: "advanced", detail: "AI-assisted implementation" },
      { name: "GitHub Copilot", level: "advanced", detail: "Pair programming, refactors" },
      { name: "Cline", level: "practised", detail: "Agentic coding workflows" },
      { name: "Antigravity", level: "advanced", detail: "Autonomous agentic coding workflows" },
      { name: "Codex", level: "advanced", detail: "AI code generation & assistance" },
    ],
  },
];

export const engagements = [
  "Full-stack web applications",
  "WordPress themes & plugins",
  "WooCommerce & payments",
  "REST API integration",
  "Performance & SEO work",
  "Hosting, DNS & SSL",
  "Migrations & maintenance",
  "React / Next.js frontends",
];

export const experience = [
  {
    years: "Jan 2026 — Present",
    role: "Fullstack Developer",
    company: "Jaikvik Technology India Pvt Ltd",
    location: "Noida",
    current: true,
    points: [
      "Developed and optimised full-stack web applications using React.js, Next.js, Node.js, PHP, JavaScript, HTML and CSS, improving overall application performance.",
      "Customised WordPress themes and plugins to meet client requirements across multiple projects.",
      "Integrated third-party APIs and services to enhance application functionality, security and scalability.",
      "Managed web hosting, domains, DNS, SSL certificates and website migrations.",
      "Administered email services, server maintenance, security and troubleshooting.",
    ],
    stack: ["React.js", "Next.js", "Node.js", "PHP", "WordPress", "MySQL"],
  },
  {
    years: "Jan 2025 — Dec 2025",
    role: "PHP Developer",
    company: "Worklooper Consultant Pvt. Ltd.",
    location: "Noida",
    current: false,
    points: [
      "Enhanced application performance by developing full-stack solutions with PHP and JavaScript.",
      "Customised WordPress themes and plugins for over five aligned client projects.",
      "Integrated third-party APIs to boost application security, scalability and performance.",
      "Collaborated with UI/UX teams to implement responsive designs, improving mobile user engagement.",
    ],
    stack: ["PHP", "JavaScript", "WordPress", "REST APIs", "MySQL"],
  },
  {
    years: "Nov 2023 — Dec 2024",
    role: "PHP & WordPress Developer",
    company: "Ibrandizer Infotech Pvt. Ltd.",
    location: "Noida",
    current: false,
    points: [
      "Enhanced website functionality by building CMS-driven sites with secure admin panels.",
      "Implemented customised WooCommerce solutions, streamlining checkout workflows effectively.",
      "Boosted website performance through caching strategies and SEO best practices.",
    ],
    stack: ["PHP", "WordPress", "WooCommerce", "Caching", "SEO"],
  },
];

export const education = [
  { years: "Jun 2022 — Jun 2023", title: "Web Design & Development", school: "Arena Animation, Noida", detail: "Design fundamentals, front-end development and production workflows." },
  { years: "2019 — 2022", title: "BSc Mathematics", school: "Siddharth University", detail: "Analytical problem solving — the habit behind debugging and data modelling." },
];

export const projectTypes = [
  "Full-stack web application",
  "WordPress / CMS build",
  "WooCommerce store",
  "React or Next.js frontend",
  "Performance, SEO or security work",
  "Full-time role",
  "Something else",
];
