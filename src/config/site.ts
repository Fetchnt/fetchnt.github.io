import type { SiteConfig } from "../types/config";

type HeroInput = Pick<SiteConfig["hero"], "headline" | "subheadline"> &
	Partial<Omit<SiteConfig["hero"], "headline" | "subheadline">>;

type SectionCopy = {
	title?: string;
	description?: string;
};

type PageTitlesInput = Partial<
	Record<keyof SiteConfig["pageTitles"], SectionCopy>
>;

export interface SiteConfigInput
	extends Partial<
		Omit<
			SiteConfig,
			"author" | "siteUrl" | "hero" | "footer" | "pageTitles" | "homeBlocks"
		>
	> {
	author: string;
	siteUrl: string;
	hero: HeroInput;
	footer?: Partial<SiteConfig["footer"]>;
	pageTitles?: PageTitlesInput;
	homeBlocks?: {
		publications?: SectionCopy;
		posts?: SectionCopy;
	};
}

const defaultNavLinks: SiteConfig["navLinks"] = [
	{ href: "/about", label: "About" },
	{ href: "/researches", label: "Research" },
	{ href: "/teaching", label: "Teaching" },
	{ href: "/projects", label: "Projects" },
	{ href: "/posts", label: "Blog" },
];

const defaultPageTitles: SiteConfig["pageTitles"] = {
	about: {
		title: "About",
		description: "Academic background, appointments, and service.",
	},
	researches: {
		title: "Publications",
		description: "Peer-reviewed publications, working papers, and essays.",
	},
	projects: {
		title: "Projects",
		description: "Selected research, infrastructure, and community projects.",
	},
	teaching: {
		title: "Teaching",
		description: "Current and past courses, materials, and teaching highlights.",
	},
	posts: {
		title: "Blog",
		description: "Research notes, methods, and updates.",
	},
};

const defaultHomeBlocks: SiteConfig["homeBlocks"] = {
	publications: {
		title: "Selected Publications",
		description: "Recent peer-reviewed work",
	},
	posts: {
		title: "Latest Posts",
		description: "Thoughts and updates",
	},
};

/**
 * Completes the concise public configuration with stable template defaults.
 * Keep user-facing choices in the root site.config.ts file and framework
 * defaults here so routine personalization stays short and type-safe.
 */
export function defineSiteConfig(input: SiteConfigInput): SiteConfig {
	const profileImage = input.hero.profileImage ?? "/profile.svg";

	return {
		title: input.title ?? `${input.author} | Academic Portfolio`,
		author: input.author,
		description: input.description ?? input.hero.subheadline,
		siteUrl: input.siteUrl,
		ogImage: input.ogImage ?? profileImage,
		favicon: input.favicon ?? "/favicon.svg",
		keywords: input.keywords ?? [],
		affiliations: input.affiliations ?? [],
		researchInterests: input.researchInterests ?? [],
		socialLinks: input.socialLinks ?? [],
		navLinks: input.navLinks ?? defaultNavLinks.map((link) => ({ ...link })),
		footer: {
			copyright: input.footer?.copyright ?? "All rights reserved.",
		},
		hero: {
			headline: input.hero.headline,
			subheadline: input.hero.subheadline,
			profileAlt: input.hero.profileAlt ?? `Portrait of ${input.author}`,
			profileImage,
			profileImageHeight: input.hero.profileImageHeight ?? 160,
			profileImageWidth: input.hero.profileImageWidth ?? 160,
			...(input.hero.statusBadge !== undefined
				? { statusBadge: input.hero.statusBadge }
				: {}),
		},
		pageTitles: {
			about: { ...defaultPageTitles.about, ...input.pageTitles?.about },
			researches: {
				...defaultPageTitles.researches,
				...input.pageTitles?.researches,
			},
			projects: {
				...defaultPageTitles.projects,
				...input.pageTitles?.projects,
			},
			teaching: {
				...defaultPageTitles.teaching,
				...input.pageTitles?.teaching,
			},
			posts: { ...defaultPageTitles.posts, ...input.pageTitles?.posts },
		},
		homeBlocks: {
			publications: {
				...defaultHomeBlocks.publications,
				...input.homeBlocks?.publications,
			},
			posts: {
				...defaultHomeBlocks.posts,
				...input.homeBlocks?.posts,
			},
		},
	};
}
