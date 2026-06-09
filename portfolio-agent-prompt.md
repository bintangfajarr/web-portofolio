# Portfolio CMS — Agent Build Specification (Next.js)

## Overview

Build a **multi-page portfolio website** for Muhammad Cahyana Bintang Fajar, a Software & Data Engineer. The site uses Next.js App Router, supports two modes (public + admin), dark/light mode, and deploys to Netlify.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL) for persistent CMS data
- **Auth:** Simple hardcoded password stored in env var (no auth library needed)
- **Deployment:** Netlify via `@netlify/plugin-nextjs`

---

## File Structure

```
/
├── app/
│   ├── layout.tsx              ← Root layout (font, theme provider)
│   ├── page.tsx                ← CV / portfolio page
│   ├── projects/
│   │   └── page.tsx            ← Projects page
│   └── api/
│       ├── auth/route.ts       ← Admin login (password check)
│       ├── experience/route.ts
│       ├── education/route.ts
│       ├── projects/route.ts
│       ├── skills/route.ts
│       ├── certifications/route.ts
│       └── awards/route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── Skills.tsx
│   ├── Certifications.tsx
│   ├── Awards.tsx
│   ├── ProjectCard.tsx
│   ├── AdminModal.tsx          ← Reusable add/edit modal form
│   └── ThemeToggle.tsx
├── lib/
│   ├── supabase.ts             ← Supabase client
│   └── data.ts                 ← Default seed data
├── .env.local                  ← SUPABASE_URL, SUPABASE_ANON_KEY, ADMIN_PASSWORD
├── netlify.toml
└── next.config.js
```

---

## Pages & Sections

### `/` — CV / Portfolio (`app/page.tsx`)

Sections (in order):

1. **Navbar** — name/logo, nav links (smooth scroll), link to `/projects`, dark/light toggle, Admin login button
2. **Hero** — full name, animated typing title, short bio, contact icon links (email, phone, LinkedIn, GitHub)
3. **Experience** — vertical timeline
4. **Education** — vertical timeline
5. **Skills** — grouped tag pills: Programming Languages / Technologies / Tools
6. **Certifications** — card list
7. **Awards** — list
8. **Footer** — name, links, hidden admin trigger

### `/projects` — Projects Page (`app/projects/page.tsx`)

- Separate page, same navbar
- Responsive card grid
- Each card: name, description, tech stack pill tags, optional GitHub + demo links
- Add / Edit / Delete buttons visible only in admin mode

---

## Two Modes

### Public Mode (default)

- Clean portfolio, no edit controls visible
- No admin UI anywhere

### Admin Mode

- Triggered by clicking **"Admin"** button in navbar
- Password prompt (modal): verified against `ADMIN_PASSWORD` env var via `/api/auth`
- On success: `isAdmin` flag stored in `sessionStorage`
- Admin badge appears in navbar, Logout button shown
- **Edit** (pencil) and **Delete** (trash) icon buttons appear on every entry across both pages
- **"+ Add"** button appears at the top of each section
- All mutations hit the relevant API route → Supabase → UI re-fetches and re-renders

---

## Dark / Light Mode

- Toggle button in navbar (sun/moon icon via `lucide-react`)
- Implemented with `next-themes`
- Default: **dark**
- Preference persisted in localStorage via `next-themes`

**Tailwind dark mode config:** `darkMode: 'class'`

**Color tokens (Tailwind custom theme):**

```js
// Dark
background: '#0d1117'
surface:    '#161b22'
border:     '#30363d'
textPrimary:'#e6edf3'
textMuted:  '#8b949e'
accent:     '#58a6ff'

// Light
background: '#ffffff'
surface:    '#f6f8fa'
border:     '#d0d7de'
textPrimary:'#1f2328'
textMuted:  '#636c76'
accent:     '#0969da'
```

---

## Database — Supabase Schema

Run these SQL statements in Supabase SQL editor to create all tables:

```sql
create table experience (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  period text not null,
  location text,
  bullets text[],
  sort_order int default 0
);

create table education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text not null,
  period text not null,
  gpa text,
  notes text[],
  sort_order int default 0
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  stack text[],
  github text,
  demo text,
  sort_order int default 0
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  items text[],
  sort_order int default 0
);

create table certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text,
  date text,
  credential_id text,
  sort_order int default 0
);

create table awards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organizer text,
  date text,
  sort_order int default 0
);
```

Enable **Row Level Security (RLS)** on all tables.
Add policy: allow `SELECT` for everyone (public read).
Add policy: allow `INSERT`, `UPDATE`, `DELETE` only from server-side (service role key used in API routes only).

---

## API Routes Pattern

Each API route handles GET (public) and POST/PUT/DELETE (admin-only, verified via session):

```ts
// GET /api/experience → fetch all, ordered by sort_order
// POST /api/experience → insert new entry
// PUT /api/experience → update entry by id
// DELETE /api/experience → delete entry by id
```

Admin check in each mutating route:
```ts
const adminToken = request.headers.get('x-admin-token')
if (adminToken !== process.env.ADMIN_PASSWORD) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

---

## CMS — Admin UI Pattern

For each section in admin mode:

- **"+ Add [Item]"** button at top of section
- Each entry has **Edit** (pencil icon) and **Delete** (trash icon) buttons
- Clicking either opens `<AdminModal>` — a centered overlay form
- Modal is pre-filled for edit, empty for add
- On Save: calls API route → on success, re-fetches section data
- On Delete: confirm dialog → calls DELETE API route → re-fetches

`AdminModal` props:
```ts
{
  isOpen: boolean
  onClose: () => void
  onSave: (data: any) => Promise<void>
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'array' }[]
  initialData?: any
  title: string
}
```

---

## Default Seed Data

Seed this data into Supabase after running the SQL schema above (can be done via Supabase dashboard or a seed script at `lib/seed.ts`).

### Experience

1. **LG Sinarmas** — IT System Engineer · Nov 2025–Present · Karawang, Indonesia
   - Ensure smooth operation of Smart Factory systems in the battery manufacturing industry
   - Manage and monitor MES (Manufacturing Execution System) to align production with work orders
   - Perform root cause analysis; troubleshoot using SQL Server, Oracle SQL, and BizActor
   - Support remote MES projects for four battery plants in the USA (Ultium Cells, Nexstar Energy, ESHD, ESMI)
   - Completed battery manufacturing training at HLI (LG Energy Solution & Hyundai Motors JV)

2. **Direktorat Jenderal Pendidikan Tinggi, Kemdikbudristek** — Data Scientist Intern · Sep–Dec 2024 · Jakarta
   - Implemented RAG with LLM and vector-based search for PDDIKTI's Recommendation System
   - Evaluated PDDIKTI's Question Answering system performance

3. **Direktorat Jenderal EBTKE, Kementerian ESDM** — Admin Data Operator · Aug–Dec 2024 · Bandung
   - Input and validated ECA recipient data across 36 provinces (150,000+ households)
   - Collaborated with a team of 80+ people

4. **Data Science Research Group** — Researcher · Nov 2023–Aug 2024 · Bandung
   - Developed SmartPsychAssist: psychometric test evaluation using ML
   - Submitted proposals to Kedaireka (RSport IoT app, LibriVerse AI library platform)
   - Researched light pollution changes using time series analysis

5. **Universitas Pendidikan Indonesia** — Assistant Lecturer · Sep 2022–Aug 2024 · Bandung
   - Taught Basic Programming Algorithms 1 & 2, Data Structures, OOP to ~80 students
   - Developed course materials, facilitated labs, evaluated assignments (20% of final grade)

6. **PT Bio Farma (Persero)** — Software Developer Intern · Feb–Jul 2024 · Bandung
   - Developed WordPress sites for BUMN Muda and Fordigi BUMN
   - Built Innovation Management System using Laravel
   - Researched chatbot innovations for vaccination

7. **PT Artristik Studio Bandung** — Admin Data Operator · Dec 2023–Mar 2024 · Bandung
   - Validated data for 500,000+ households for ECA distribution across 36 provinces
   - Collaborated with 60+ team members

### Education

1. **Universitas Pendidikan Indonesia** — Bachelor of Computer Science · Sep 2021–Sep 2025
   - GPA: 3.95 / 4.00
   - Active committee for 30+ campus events (student union, faculty, university-wide)

2. **Bangkit Academy** (Google, GoTo, Traveloka) — Machine Learning · Aug 2023–Jan 2024
   - Studied ML with TensorFlow, real-world applications
   - Collaborated on activity prediction and recommendation projects

### Projects

1. **Transjakarta ETL Pipeline** — Apache Airflow, Python, PostgreSQL
   - ETL pipeline for Transjakarta transaction data, runs daily at 07:00 WIB, generates insights by card type, route, and fare

2. **AI CV Evaluator** — FastAPI, Python, LLM, RAG, Vector DB
   - Backend service evaluating CVs against job descriptions; supports PDF/DOCX uploads, async pipeline, LLM prompt chaining, RAG with vector DB

3. **Youtube ELT** — Apache Airflow, PostgreSQL, Docker, Python, CI/CD
   - Automated ELT pipeline extracting YouTube channel stats via YouTube Data API, with containerization, automated testing, and CI/CD

4. **E-Commerce Data Pipeline** — Prefect, AWS S3, Python
   - End-to-end batch data engineering pipeline for e-commerce data using Prefect orchestration and AWS S3 as data lake

### Skills

- **Programming Languages:** C++, JavaScript, Java, Python, Go, PHP, R, C#
- **Technologies:** TensorFlow, Flask, FastAPI, MySQL, PostgreSQL, MongoDB, Airflow, Spark, BizActor, SSMS, Oracle, Snowflake, Azure, AWS
- **Tools:** PowerBI, Looker, Tableau, Microsoft Excel, Google Spreadsheet, Docker, Git, Postman, Databricks

### Certifications

1. Snowpro Associate — Snowflake · Jan 2026 · ID: 170864375
2. Certified Developer — Alibaba Cloud · May 2024 · ID: ACCD0119700100011147
3. TensorFlow Developer Certificate — Google · Apr 2024 · ID: 100386087

### Awards

1. 4th Place Programming DIMAS TI AMLI — Universitas Negeri Semarang · Dec 2023
2. Finalist Joints Programming Contest — Universitas Gadjah Mada · May 2023
3. Finalist Pemrograman GemasTIK XV — Puspresnas Kemendikbudristek · Nov 2022
4. Finalist National Programming Contest — Institut Teknologi Sepuluh Nopember · Oct 2022
5. Finalist Competitive Programming Hology — Universitas Brawijaya · Oct 2022
6. 5th Place Programming DIMAS TI AMLI — Universitas Negeri Semarang · Jun 2022

---

## Design Specification

- **Font:** Inter (next/font/google)
- **Style:** Professional, minimal, GitHub-inspired dark theme
- **Navbar:** sticky top, backdrop blur, responsive hamburger on mobile
- **Hero:** centered layout, animated typing effect on job title (use `typed.js` or CSS animation)
- **Timeline:** left-border vertical timeline for Experience and Education
- **Project cards:** responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), hover lift, stack as colored pill tags
- **Transitions:** `transition-all duration-200` on hover states and theme toggle
- **Mobile:** fully responsive, hamburger menu below `md` breakpoint

---

## Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_PASSWORD=bintang2025
```

---

## Netlify Deployment

### `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Steps

1. Push code to GitHub
2. Connect repo to Netlify
3. Add all env vars in Netlify dashboard → Site Settings → Environment Variables
4. Deploy — Netlify auto-detects Next.js via the plugin

---

## Personal Info

| Field | Value |
|---|---|
| Name | Muhammad Cahyana Bintang Fajar |
| Email | bintangfazr@gmail.com |
| Phone | +62 82130471838 |
| LinkedIn | linkedin.com/in/mcbintangfajar |
| GitHub | github.com/bintangfajarr |
| Languages | Indonesian (Native), English (Professional) |

---

## Agent Checklist

- [ ] Next.js 14 App Router project initialized with Tailwind CSS
- [ ] Supabase client configured (`lib/supabase.ts`)
- [ ] All 6 database tables created with RLS policies
- [ ] Default seed data inserted into Supabase
- [ ] `app/page.tsx` — CV page with all sections (Hero, Experience, Education, Skills, Certifications, Awards)
- [ ] `app/projects/page.tsx` — Projects page with card grid
- [ ] Navbar with links between both pages
- [ ] `next-themes` dark/light mode toggle (default: dark)
- [ ] Admin mode: password auth via `/api/auth`, sessionStorage token
- [ ] CMS: Add / Edit / Delete for all sections via API routes
- [ ] `AdminModal` reusable component
- [ ] Fully responsive (mobile + desktop)
- [ ] `netlify.toml` with `@netlify/plugin-nextjs`
- [ ] `.env.local` template with all required vars
