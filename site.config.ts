/**
 * Scholar Pages — primary configuration
 *
 * Start here for identity, profile, links, and page introductions.
 * Publications, CV records, projects, courses, and posts live in src/data
 * and src/content so this file stays quick to scan.
 */
import { defineSiteConfig } from "./src/config/site";

export const siteConfig = defineSiteConfig({
	// Required: the four values most sites should personalize first.
	author: "Your Name",
	siteUrl: "https://astro-theme-scholars.pages.dev",
	hero: {
		headline:
			"Scholarship at the intersection of learning analytics and web infrastructure.",
		subheadline:
			"I am a researcher focused on building equitable tooling for open scholarship. My group studies how learning signals travel across platforms, and we ship practical infrastructure for sharing data, publications, and code.",
		profileImage: "/profile.svg",
		statusBadge: "Open to collaboration",
	},

	// Common profile and discovery settings.
	description:
		"Scholarship at the intersection of learning analytics and web infrastructure, building equitable tooling for open scholarship.",
	keywords: [
		"learning analytics",
		"open scholarship",
		"web infrastructure",
		"academic website",
		"research",
	],
	// Optional social-preview overrides:
	// language: "en",
	// locale: "en_US",
	// ogImage: "/social-card.png", // Prefer a 1200 × 630 raster image.
	// ogImageAlt: "Your Name — academic portfolio",
	// ogImageWidth: 1200,
	// ogImageHeight: 630,
	affiliations: [
		{
			role: "Assistant Professor",
			department: "School of Information",
			institution: "University Name",
			url: "https://example.edu/info",
		},
	],
	researchInterests: [
		"Learning Analytics",
		"Human-Computer Interaction",
		"Open Scholarship",
		"Civic Technology",
	],
	socialLinks: [
		{
			label: "Google Scholar",
			href: "https://scholar.google.com/citations?user=YOUR_ID",
			icon: "i-academicons:google-scholar",
		},
		{
			label: "ORCID",
			href: "https://orcid.org/0000-0000-0000-0000",
			icon: "i-academicons:orcid",
		},
		{
			label: "GitHub",
			href: "https://github.com/your-handle",
			icon: "i-mdi:github",
		},
		{
			label: "Email",
			href: "mailto:you@example.edu",
			icon: "i-mdi:email-outline",
		},
		{
			label: "Twitter",
			href: "https://twitter.com/your-handle",
			icon: "i-mdi:twitter",
		},
	],

	// Optional: omit any entry to use the concise academic default copy.
	pageTitles: {
		about: {
			description:
				"Scholar, educator, and builder focused on learning analytics, humane computing, and tools that support open collaboration.",
		},
		researches: {
			description:
				"Peer-reviewed publications, working papers, and essays on learning analytics, open scholarship, and civic technology.",
		},
		projects: {
			description:
				"Open-source tools and research infrastructure projects for the academic community.",
		},
		teaching: {
			description:
				"Courses designed to bridge technical skills with critical inquiry in learning sciences and information studies.",
		},
		posts: {
			description:
				"Thoughts on academia, research methods, technology, and the spaces in between.",
		},
	},

	// Homepage composition: switch off any block you do not want to display.
	homeBlocks: {
		hero: { enabled: true },
		publications: { enabled: true },
		posts: { enabled: true },
	},
});

export default siteConfig;
