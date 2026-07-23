[简体中文](./README.zh-CN.md)

# Scholar Pages Theme for Astro

A modern, elegant academic portfolio theme for Astro. Build your professional research homepage with beautiful card-based designs, automatic BibTeX parsing, and seamless dark mode support.

![Desktop and Mobile Previews of Scholar Pages Theme](https://r2imga.jxpeng.dev/2025/10/9dfa4106fa05badc9f5e80b4694c9309.png)

## ✨ Features

- **⚡ Astro Powered** - Lightning-fast static site generation with zero JavaScript by default
- **🎨 Modern Card Design** - Elegant card-based UI with hover effects, gradients, and micro-animations
- **📚 BibTeX Integration** - Automatic parsing of publications with category filtering
- **🌙 Dark Mode** - Seamless light/dark theme switching with system preference detection
- **📱 Fully Responsive** - Mobile-first design with adaptive navigation
- **🎯 SEO Optimized** - Canonicals, social cards, JSON-LD, sitemap, and generated robots.txt
- **🔧 Easy Configuration** - One root TypeScript entry with focused content files
- **📝 YAML Data Sources** - Simple content management through YAML files
- **🏷️ Filter System** - Interactive category filters on Research, Projects, and Teaching pages
- **🎭 UnoCSS Styling** - Utility-first CSS with customizable accent colors

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.13+ required; v24 LTS recommended)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/jxpeng98/astro-theme-scholars.git
cd astro-theme-scholars

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Your site will be running at `http://localhost:4321`

### Available Commands

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `pnpm dev`      | Start development server with hot reload       |
| `pnpm build`    | Build production site to `./dist/`             |
| `pnpm preview`  | Preview production build locally               |
| `pnpm astro ...`| Run Astro CLI commands (e.g., `astro check`)   |
| `pnpm test`     | Run unit tests                                 |
| `pnpm verify`   | Run tests, Astro checks, build, and HTML checks|

---

## Personalization Checklist

Before publishing, replace every placeholder in:

- `site.config.ts`: name, affiliation, social links, research focus, status badge, and profile image.
- `src/data/publications.bib`: publication metadata, URLs, abstracts, and `public` category.
- `src/data/about.yml`: profile, education, experience, service, and awards.
- `src/data/projects.yml`: project title, status, period, description, technology tags, and URL.
- `src/data/teaching.yml`: current and past course records.
- `src/content/posts`: remove sample posts or mark drafts with `draft: true`.

Run `pnpm verify` before deployment.
`siteUrl` is the single source for canonical URLs, Open Graph image URLs,
`robots.txt`, and the Astro sitemap integration. Update it before publishing a
copied site.

---

## Versioned Template Updates

This template is tracked with SemVer release tags such as `v0.5.0`.
`package.json`, `.template-version`, and the latest `CHANGELOG.md` entry should
always describe the same version.

Maintainers can check a release before tagging:

```bash
node scripts/check-release.mjs --tag v0.5.0
pnpm verify
git tag -a v0.5.0 -m "Release v0.5.0"
git push origin main --tags
```

Repositories created from this GitHub template can keep the copied
`.github/workflows/template-update.yml` workflow. It checks the upstream template
for newer release tags and opens a pull request that overlays template-owned
files while preserving personal content paths from `.template-sync.json`, such
as `site.config.ts`, `src/data/**`, `src/content/posts/**`, and
`public/profile.*`.

The npm package path can coexist later: this repository can keep serving GitHub
template users while a future package exports reusable layouts and components
that Dependabot can bump in package-based sites.

---

## 📖 Configuration Guide

Start with the smallest file that owns the information you want to change:

| Goal | Edit |
| --- | --- |
| Identity, profile, links, SEO, page introductions | `site.config.ts` |
| Publications | `src/data/publications.bib` |
| About, projects, and teaching records | `src/data/*.yml` |
| Blog posts | `src/content/posts/*.md` |
| Advanced color and type tokens | `uno.config.ts` |

### Site Configuration (`site.config.ts`)

This root file is the primary configuration entry. `defineSiteConfig` supplies stable
defaults for navigation, the footer, page titles, image dimensions, and home-section copy,
so routine personalization only needs the fields relevant to your site.

```typescript
import { defineSiteConfig } from './src/config/site';

export default defineSiteConfig({
  // ─────────────────────────────────────────────────────────────
  // 🏠 BASIC INFORMATION
  // ─────────────────────────────────────────────────────────────
  
  /** Browser tab title */
  title: 'Your Name | Academic Portfolio',
  
  /** Your full name (displayed in header and footer) */
  author: 'Your Name',
  
  /** SEO description (appears in search results) */
  description: 'Your research focus and expertise...',

  /** Production URL used for canonical, Open Graph, and sitemap URLs */
  siteUrl: 'https://your-site.example',

  /** Document language and Open Graph locale */
  language: 'en',
  locale: 'en_US',

  /** Social preview image; a 1200 × 630 raster image is recommended */
  ogImage: '/social-card.png',
  ogImageAlt: 'Your Name — academic portfolio',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  
  /** Favicon path (relative to /public) */
  favicon: '/favicon.svg',
  
  /** SEO keywords */
  keywords: ['learning analytics', 'HCI', 'research'],

  // ─────────────────────────────────────────────────────────────
  // 🎓 ACADEMIC PROFILE
  // ─────────────────────────────────────────────────────────────
  
  /** Your institutional affiliations (displayed on home page) */
  affiliations: [
    {
      role: 'Assistant Professor',
      department: 'School of Information',  // optional
      institution: 'University Name',
      url: 'https://example.edu',           // optional, makes it a link
    },
  ],

  /** Research interests (displayed as tags on home page) */
  researchInterests: [
    'Learning Analytics',
    'Human-Computer Interaction',
  ],

  // ─────────────────────────────────────────────────────────────
  // 🔗 SOCIAL LINKS
  // Icons: https://icones.js.org (use 'academicons' or 'mdi' collections)
  // ─────────────────────────────────────────────────────────────
  
  socialLinks: [
    { label: 'Google Scholar', href: 'https://scholar.google.com/...', icon: 'i-academicons:google-scholar' },
    { label: 'ORCID', href: 'https://orcid.org/...', icon: 'i-academicons:orcid' },
    { label: 'GitHub', href: 'https://github.com/...', icon: 'i-mdi:github' },
    { label: 'Email', href: 'mailto:you@example.edu', icon: 'i-mdi:email-outline' },
    { label: 'Twitter', href: 'https://twitter.com/...', icon: 'i-mdi:twitter' },
  ],

  // ─────────────────────────────────────────────────────────────
  // 🧭 NAVIGATION
  // ─────────────────────────────────────────────────────────────
  
  navLinks: [
    { href: '/about', label: 'About' },
    { href: '/researches', label: 'Research' },
    { href: '/teaching', label: 'Teaching' },
    { href: '/projects', label: 'Projects' },
    { href: '/posts', label: 'Blog' },
  ],

  // ─────────────────────────────────────────────────────────────
  // 📝 FOOTER
  // ─────────────────────────────────────────────────────────────
  
  footer: {
    copyright: 'All rights reserved.',
  },

  // ─────────────────────────────────────────────────────────────
  // 🏠 HERO SECTION (Home Page)
  // ─────────────────────────────────────────────────────────────
  
  hero: {
    headline: 'Your research focus in one sentence.',
    subheadline: 'A longer bio describing your work and interests...',
    profileAlt: 'Portrait of Your Name',
    profileImage: '/profile.svg',  // or full URL
    statusBadge: 'Open to collaboration',  // optional
  },

  // ─────────────────────────────────────────────────────────────
  // 📄 PAGE TITLES AND DESCRIPTIONS (SEO & subtitles)
  // ─────────────────────────────────────────────────────────────
  
  pageTitles: {
    about: {
      title: 'About',
      description: 'Your brief bio for the About page...',
    },
    researches: {
      title: 'Publications',
      description: 'Description of your research focus...',
    },
    projects: {
      title: 'Projects',
      description: 'Description of your projects...',
    },
    teaching: {
      title: 'Teaching',
      description: 'Description of your teaching philosophy...',
    },
    posts: {
      title: 'Blog',
      description: 'Description of your blog...',
    },
  },
});
```

---

## 📄 Page Documentation

### 🏠 Home Page (`/`)

The home page displays:

- **Hero Section**: Profile image, name, affiliations, status badge, bio, research interests, and social links
- **Selected Publications**: Top 3 featured papers from your BibTeX file (papers with `public = {yes}`)
- **Latest Posts**: 3 most recent blog posts

**Card Design Features:**
- Hover effect with accent-colored left border gradient
- Expandable abstract with quote icon styling
- Action buttons for Abstract and PDF links

### 👤 About Page (`/about`)

**Data Source:** `src/data/about.yml`

```yaml
hero:
  title: About
  description: Your brief introduction...

education:
  - degree: Ph.D., Human-Computer Interaction
    institution: University Name
    year: 2021
  - degree: M.S., Learning Sciences
    institution: Institute Name
    year: 2016

experience:
  - role: Assistant Professor
    organization: School of Information
    period: 2022 — Present
    bullets:
      - Lead the Learning Signals Lab
      - Teach graduate seminars on human-centered AI

service:
  # Structured format
  - role: Program Chair
    organization: ACM Conference
    period: 2023 — 2024
  # Simple string format
  - Editorial Board — Journal Name

# Custom sections (Awards, Talks, etc.)
sections:
  - title: Awards
    items:
      # Detailed item
      - title: Best Paper Award
        subtitle: ACM CHI 2023
        date: 2023
        description: For the paper "..."
        link: https://example.com/award
      # Simple item
      - Dean's List (2010-2014)
```

**Card Design Features:**
- Education cards with school icon and year badge
- Experience cards with timeline dot indicator
- Service items in 2-column grid with star icons
- Awards with trophy icon and gradient background

### 📚 Research Page (`/researches`)

**Data Source:** `src/data/publications.bib`

**BibTeX Fields:**

```bibtex
@inproceedings{key2024paper,
  title = {Your Paper Title},
  author = {Last, First and Other, Author},
  booktitle = {Conference Name},        % or journal = {...}
  year = {2024},
  url = {https://doi.org/...},          % optional, adds PDF link
  abstract = {Paper abstract...},       % optional, adds expandable abstract
  public = {yes},                       % yes = Publication, wp = Working Paper, wip = Work in Progress
  keywords = {keyword1, keyword2}       % optional
}
```

**Category Classification:**
| `public` value | Category |
|----------------|----------|
| `yes` | Publication |
| `wp` | Working Paper |
| `wip` | Work in Progress |
| (other/missing) | Other |

**Page Features:**
- **Filter Bar**: Click to filter by category (all / publication / working paper / work in progress)
- **Numbered Cards**: Each paper has an accent-colored index badge
- **Meta Badges**: Venue badge with bookmark icon, year badge with calendar icon
- **Action Buttons**: Expandable abstract with quote styling, PDF link
- **Conditional Display**: Empty fields (authors, venue) are automatically hidden

### 💼 Projects Page (`/projects`)

**Data Source:** `src/data/projects.yml`

```yaml
- title: Project Name
  subtitle: Optional short context
  period: 2023 — Present    # Include "Present" for active projects
  description: What this project does...
  badges:
    - Featured
  highlights:
    - Optional short achievement or responsibility.
  metadata:
    - label: Role
      value: Maintainer
  tech:
    - Astro
    - TypeScript
    - PostgreSQL
  url: https://github.com/...   # optional fallback link
  links:                        # optional; takes precedence over url
    - label: Repository
      href: https://github.com/...
    - label: Demo
      href: https://example.com
```

**Page Features:**
- **Auto-grouping**: Projects with "Present" in period → Active; others → Past
- **Filter Bar**: All / Active / Past filters
- **Active Indicator**: Green pulsing dot + "Active" label
- **Tech Stack Tags**: Code icon + technology name
- **Hover Action**: "View Project →" appears on hover (if URL exists)

### 📖 Teaching Page (`/teaching`)

**Data Source:** `src/data/teaching.yml`

```yaml
current:
  - term: Spring 2025
    modules:
      - title: Course Title
        code: INFO 742
        summary: Course description...
        badges:                 # optional
          - Graduate
        highlights:             # optional
          - Students build a reproducible final project.
        tags:                    # optional
          - graduate
          - seminar
        link:                    # optional single link
          label: Course Site
          href: https://...
        links:                   # optional multiple links; takes precedence over link
          - label: Syllabus
            href: https://...
          - label: Readings
            href: https://...

past:
  - term: Fall 2024
    modules:
      - title: Past Course
        code: INFO 511
        summary: What was covered...
```

**Page Features:**
- **Filter Bar**: All / Current / Past filters
- **Term Grouping**: Courses grouped by semester
- **Active Indicator**: Left gradient bar for current courses
- **Course Code Badge**: School icon + course code
- **Tag Pills**: Hashtag-prefixed category tags
- **Link Button**: Opens course site in new tab

### ✍️ Blog Page (`/posts`)

**Data Source:** `src/content/posts/*.md`

**Frontmatter Schema:**

```yaml
---
title: Post Title
description: Brief summary...   # optional
publishedAt: 2024-01-15
draft: false                    # set true to hide
---
```

**Page Features:**
- **Year Grouping**: Posts organized by year with gradient divider
- **Post Count**: Badge showing posts per year
- **Reading Time**: Estimated based on content length
- **Card Design**: Full-width clickable cards
- **Hover Action**: "Read more →" appears on hover

---

## 🎨 Design System

### Card Components

All pages use a unified card design system:

```
┌─────────────────────────────────────────┐
│  • Title with hover color transition    │
│  📍 Meta info with icons                │
│  Description text (line-clamped)        │
│  [Tag] [Tag] [Tag]                      │
│  🔗 Action link (appears on hover)      │
└─────────────────────────────────────────┘
```

**Common Card Styles:**
- `rounded-xl` corners
- White background (dark: gray-900/50)
- Border that changes to accent color on hover
- Subtle shadow on hover (`shadow-accent-500/5`)
- 300ms transition for smooth animations

### Color Palette

The theme uses a semantic color system:

| Color | Usage |
|-------|-------|
| `accent-*` | Primary brand color, links, active states |
| `gray-*` | Text, backgrounds, borders |
| `emerald-*` | Active/success states (status badges) |
| `amber-*` | Awards and achievements |

### Icons

Icons are provided via UnoCSS icon presets:

- **Academic**: `i-academicons:*` (Google Scholar, ORCID, ResearchGate)
- **General**: `i-mdi:*` (GitHub, Email, Calendar, etc.)
- **UI**: `i-ph:*` (Theme toggle, menu icons)

Find icons at: [icones.js.org](https://icones.js.org)

---

## 📁 Project Structure

```
/
├── public/                    # Static assets
│   ├── favicon.svg
│   └── profile.svg
├── site.config.ts             # ⭐ Primary user configuration
├── src/
│   ├── assets/                # Processed images
│   ├── components/            # Shared components
│   │   └── projects.ts        # Projects data loader
│   ├── content/               # Blog posts (Astro Content Collections)
│   │   └── posts/             # Markdown posts
│   ├── content.config.ts      # Astro Content Layer schema
│   ├── data/                  # YAML & BibTeX data
│   │   ├── about.yml          # About page content
│   │   ├── projects.yml       # Projects list
│   │   ├── publications.bib   # Academic publications
│   │   └── teaching.yml       # Teaching modules
│   ├── layouts/
│   │   └── Layout.astro       # Main layout (header, footer, theme)
│   ├── lib/                   # Utility functions
│   │   ├── bibtex.ts          # BibTeX parser
│   │   └── papers.ts          # Paper data helpers
│   ├── pages/                 # Route pages
│   │   ├── index.astro        # Home
│   │   ├── about.astro        # About
│   │   ├── researches.astro   # Publications
│   │   ├── robots.txt.ts      # Generated crawl directives
│   │   ├── projects.astro     # Projects
│   │   ├── teaching.astro     # Teaching
│   │   └── posts/
│   │       ├── index.astro    # Blog listing
│   │       └── [slug].astro   # Individual post
│   ├── types/
│   │   └── config.ts          # TypeScript interfaces
│   ├── config/
│   │   └── site.ts            # Defaults and configuration helper
│   └── side.config.ts         # Compatibility import; do not edit
├── uno.config.ts              # UnoCSS configuration
├── astro.config.ts            # Astro configuration
└── package.json
```

---

## 🚀 Deployment

Build and deploy to any static hosting provider:

```bash
pnpm build
```

Upload the `dist/` folder to:

- [Vercel](https://vercel.com/) - Zero config, auto-deploys
- [Netlify](https://netlify.com/) - Drag & drop deployment
- [Cloudflare Pages](https://pages.cloudflare.com/) - Global CDN
- [GitHub Pages](https://pages.github.com/) - Free hosting

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command: pnpm build
# Publish directory: dist
```

---

## 🔧 Customization Tips

### Changing Accent Color

Edit `uno.config.ts` to modify the accent color palette:

```typescript
theme: {
  colors: {
    accent: {
      50: '#f0f9ff',
      // ... customize shades
      600: '#0284c7',
    }
  }
}
```

### Adding New Social Links

1. Find icon class at [icones.js.org](https://icones.js.org)
2. Add to `socialLinks` in `site.config.ts`
3. Add icon to safelist in `uno.config.ts` if needed

### Custom Page Sections

For the About page, add new sections in `about.yml`:

```yaml
sections:
  - title: Your Section Title
    icon: i-mdi:trophy-award
    items:
      - title: Detailed item
        subtitle: Optional subtitle
        date: 2026
        description: Optional longer description
        badges:
          - Award
        highlights:
          - Optional short detail.
        links:
          - label: Related page
            href: https://example.com
      - Simple text item
```

If you use custom icon class names in YAML fields, add them to the `uno.config.ts`
safelist so UnoCSS includes them in the generated CSS.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs via [Issues](https://github.com/jxpeng98/astro-theme-scholars/issues)
- 💡 Suggest features
- 🔧 Submit pull requests

---

## 📄 License

[MIT License](./LICENSE) - Free to use, modify, and distribute.
