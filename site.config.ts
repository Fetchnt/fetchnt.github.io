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
	author: "Fetchzinho", // TODO: pon tu nombre real si prefieres mostrarlo en vez del handle
	siteUrl: "https://fetchnt.github.io",
	hero: {
		headline: "Programador competitivo | C++ & desarrollo de software",
		subheadline:
			"Compito en ICPC con el equipo EroMergeSort, escribo C++17 para programación competitiva y también trabajo en proyectos de desarrollo en Java. Migré mi entorno de trabajo a CachyOS (Arch) con Hyprland.",
		profileImage: "/avatar.jpg", // sube tu foto a public/avatar.jpg y reemplaza este nombre si usas otro
		statusBadge: "Estudiante", // TODO: ajusta si aplica (ej. "Disponible para prácticas")
	},

	// Common profile and discovery settings.
	description:
		"Portafolio de Miguel Lopez: programador competitivo (ICPC)",
	keywords: [
		"programación competitiva",
		"ICPC",
		"C++",
		"Python",
		"estructuras de datos",
		"algoritmos",
	],
	// Optional social-preview overrides:
	language: "es",
	locale: "es_ES",
	// ogImage: "/social-card.png", // Prefer a 1200 × 630 raster image.
	// ogImageAlt: "Fetchzinho — portafolio",

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
			href: "https://github.com/Fetchnt/NOMBRE-DEL-REPO-NUEVO", // TODO: reemplaza cuando crees el repo
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
				"Programador competitivo (ICPC) y desarrollador en C++, Java y Python.",
		},
		projects: {
			title: "Proyectos",
			description:
				"Proyectos sobre desarrollo de software.",
		},
		posts: {
			title: "Blog",
			description: "Notas sobre desarrollo.",
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