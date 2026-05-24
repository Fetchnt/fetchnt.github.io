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
- **🎯 SEO Optimized** - Built-in meta tags, sitemap, and semantic HTML
- **🔧 Easy Configuration** - Single TypeScript config file for all site settings
- **📝 YAML Data Sources** - Simple content management through YAML files
- **🏷️ Filter System** - Interactive category filters on Research, Projects, and Teaching pages
- **🎭 UnoCSS Styling** - Utility-first CSS with customizable accent colors

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Bun](https://bun.sh/) (recommended) or npm/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/jxpeng98/astro-scholars.git
cd astro-scholars

# Install dependencies
bun install

# Start development server
bun dev
```

Your site will be running at `http://localhost:4321`

### Available Commands

| Command         | Description                                    |
| --------------- | ---------------------------------------------- |
| `bun dev`       | Start development server with hot reload       |
| `bun build`     | Build production site to `./dist/`             |
| `bun preview`   | Preview production build locally               |
| `bun astro ...` | Run Astro CLI commands (e.g., `astro check`)   |
| `bun test`      | Run unit tests                                 |
| `bun run verify`| Run tests, Astro checks, build, and HTML checks|

---

## Personalization Checklist

Before publishing, replace every placeholder in:

- `src/side.config.ts`: name, title, affiliation, social links, keywords, status badge, profile image.
- `src/data/publications.bib`: publication metadata, URLs, abstracts, and `public` category.
- `src/data/about.yml`: profile, education, experience, service, and awards.
- `src/data/projects.yml`: project title, status, period, description, technology tags, and URL.
- `src/data/teaching.yml`: current and past course records.
- `src/content/posts`: remove sample posts or mark drafts with `draft: true`.

Run `bun run verify` before deployment.

---

## 📖 Configuration Guide

### Site Configuration (`src/side.config.ts`)

This is the central configuration file for your entire site. Here's a complete breakdown:

```typescript
export const siteConfig: SiteConfig = {
  // ─────────────────────────────────────────────────────────────
  // 🏠 BASIC INFORMATION
  // ─────────────────────────────────────────────────────────────
  
  /** Browser tab title */
  title: 'Your Name | Academic Portfolio',
  
  /** Your full name (displayed in header and footer) */
  author: 'Your Name',
  
  /** SEO description (appears in search results) */
  description: 'Your research focus and expertise...',
  
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
  // 📄 PAGE DESCRIPTIONS (SEO & subtitles)
  // ─────────────────────────────────────────────────────────────
  
  pageDescriptions: {
    about: 'Your brief bio for the About page...',
    researches: 'Description of your research focus...',
    projects: 'Description of your projects...',
    teaching: 'Description of your teaching philosophy...',
    posts: 'Description of your blog...',
  },
};
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
  period: 2023 — Present    # Include "Present" for active projects
  description: What this project does...
  tech:
    - Astro
    - TypeScript
    - PostgreSQL
  url: https://github.com/...   # optional
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
        tags:                    # optional
          - graduate
          - seminar
        link:                    # optional
          label: Course Site
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
│   ├── profile.svg
│   └── robots.txt
├── src/
│   ├── assets/                # Processed images
│   ├── components/            # Shared components
│   │   └── projects.ts        # Projects data loader
│   ├── content/               # Blog posts (Astro Content Collections)
│   │   ├── config.ts          # Content schema
│   │   └── posts/             # Markdown posts
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
│   │   ├── projects.astro     # Projects
│   │   ├── teaching.astro     # Teaching
│   │   └── posts/
│   │       ├── index.astro    # Blog listing
│   │       └── [slug].astro   # Individual post
│   ├── types/
│   │   └── config.ts          # TypeScript interfaces
│   └── side.config.ts         # ⭐ Main configuration
├── uno.config.ts              # UnoCSS configuration
├── astro.config.mjs           # Astro configuration
└── package.json
```

---

## 🚀 Deployment

Build and deploy to any static hosting provider:

```bash
bun build
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
# Build command: bun build
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
2. Add to `socialLinks` in `side.config.ts`
3. Add icon to safelist in `uno.config.ts` if needed

### Custom Page Sections

For the About page, add new sections in `about.yml`:

```yaml
sections:
  - title: Your Section Title
    items:
      - Your item content
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs via [Issues](https://github.com/jxpeng98/astro-scholars/issues)
- 💡 Suggest features
- 🔧 Submit pull requests

---

## 📄 License

[MIT License](./LICENSE) - Free to use, modify, and distribute.
