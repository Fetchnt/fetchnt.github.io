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
	author: "Miguel Lopez",
	siteUrl: "https://fetchnt.github.io",
	hero: {
		headline: "Programador competitivo | C++ & desarrollo de software",
		subheadline:
			"Compito en ICPC , escribo C++ y Python para programación competitiva y también trabajo en proyectos de desarrollo en Java.",
		profileImage: "/avatar.jpg", // sube tu foto a public/avatar.jpg y reemplaza este nombre si usas otro
		statusBadge: "Estudiante", // TODO: ajusta si aplica (ej. "Disponible para prácticas")
		videoId: "OMSuc9pLCso", // Video de presentación (YouTube) — se muestra en el inicio
	},

	// Common profile and discovery settings.
	description:
		"Portafolio de Misguel Lopez: programación competitiva (ICPC), C++17 y proyectos de desarrollo en Java.",
	keywords: [
		"programación competitiva",
		"ICPC",
		"C++",
		"Java",
		"algoritmos",
	],
	// Optional social-preview overrides:
	language: "es",
	locale: "es_ES",
	// ogImage: "/social-card.png", // Prefer a 1200 × 630 raster image.
	// ogImageAlt: "Miguel Lopez — portafolio",

	// Sin afiliaciones académicas: se deja vacío para que no se muestre esa franja.
	affiliations: [],

	researchInterests: [
		"Programación competitiva",
		"Estructuras de datos y algoritmos",
		"C++17",
		"Desarrollo en Java",
	],

	socialLinks: [
		{
			label: "GitHub",
			href: "https://github.com/Fetchnt",
			icon: "i-mdi:github",
		},
		{
			label: "Repositorio del proyecto",
			href: "https://github.com/Fetchnt/Investigacion-DB", // TODO: reemplaza cuando crees el repo
			icon: "i-mdi:database",
		},
		{
			label: "Email",
			href: "fetchnt@proton.me", // TODO: pon tu correo real
			icon: "i-mdi:email-outline",
		},
	],

	// Menú de navegación: sin Publicaciones ni Docencia.
	navLinks: [
		{ href: "/about", label: "Sobre mí" },
		{ href: "/projects", label: "Proyectos" },
		{ href: "/posts", label: "Blog" },
	],

	// Optional: omit any entry to use the concise academic default copy.
	pageTitles: {
		about: {
			title: "Sobre mí",
			description:
				"Programador competitivo (ICPC) y desarrollador en C++ y Java.",
		},
		projects: {
			title: "Proyectos",
			description:
				"Proyectos de desarrollo de software.",
		},
		posts: {
			title: "Blog",
			description: "Notas sobre programación competitiva y desarrollo.",
		},
	},

	// Homepage composition: sin bloque de publicaciones académicas.
	homeBlocks: {
		hero: { enabled: true },
		publications: { enabled: false },
		posts: { enabled: true },
	},
});

export default siteConfig;