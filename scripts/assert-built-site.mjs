import { access, readdir, readFile } from "node:fs/promises";

const root = new URL("../dist/", import.meta.url);

async function readDist(path) {
	return readFile(new URL(path, root), "utf8");
}

async function existsInDist(path) {
	try {
		await access(new URL(path, root));
		return true;
	} catch (error) {
		if (error.code === "ENOENT") return false;
		throw error;
	}
}

async function readDistCss() {
	const assetRoot = new URL("_astro/", root);
	const entries = await readdir(assetRoot);
	const cssFiles = entries.filter((entry) => entry.endsWith(".css"));
	const contents = await Promise.all(
		cssFiles.map((file) => readFile(new URL(file, assetRoot), "utf8")),
	);
	return contents.join("\n");
}

async function readDistJs() {
	const assetRoot = new URL("_astro/", root);
	const entries = await readdir(assetRoot);
	const jsFiles = entries.filter((entry) => entry.endsWith(".js"));
	const contents = await Promise.all(
		jsFiles.map((file) => readFile(new URL(file, assetRoot), "utf8")),
	);
	return contents.join("\n");
}

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function titles(html) {
	return [...html.matchAll(/<title>(.*?)<\/title>/g)].map((match) => match[1]);
}

function countMatches(html, value) {
	return html.split(value).length - 1;
}

function assertFilterToolbar(html, pageName, filters) {
	assert(
		html.includes('role="toolbar"') && html.includes('aria-label="Filter sections"'),
		`${pageName} page should render filter controls as an accessible toolbar`,
	);
	assert(
		countMatches(html, 'data-filter="all"') === 1 &&
			html.includes('data-active="true"') &&
			html.includes('aria-pressed="true"'),
		`${pageName} page should render one active all filter button`,
	);
	assert(
		html.includes("data-filter-icon") &&
			html.includes("data-filter-count") &&
			html.includes("data-filter-label"),
		`${pageName} page should render semantic filter button markers`,
	);

	for (const filter of filters) {
		assert(
			html.includes(`data-filter="${filter}"`),
			`${pageName} page should render the ${filter} filter button`,
		);
	}
}

const index = await readDist("index.html");
assert(
	index.includes('link rel="canonical" href="https://astro-theme-scholars.pages.dev/"'),
	"home page canonical should use the configured production URL",
);
assert(
	index.includes('property="og:image" content="https://astro-theme-scholars.pages.dev/profile.svg"'),
	"home page OG image should be absolute",
);

const research = await readDist("researches/index.html");
assert(titles(research).length === 1, "research page should emit one <title>");
assert(
	titles(research)[0] === "Publications | Your Name | Academic Portfolio",
	"research page title should include page title",
);
assertFilterToolbar(research, "research", [
	"publication",
	"working-paper",
	"work-in-progress",
]);
assert(
	research.includes('aria-label="Page sections"') &&
		research.includes('href="#publication"') &&
		research.includes('id="publication"') &&
		research.includes('href="#working-paper"') &&
		research.includes('id="working-paper"'),
	"research page should render section jump links with matching anchors",
);

const post = await readDist("posts/astro-overview/index.html");
assert(titles(post).length === 1, "post page should emit one <title>");
assert(
	titles(post)[0] === "Launching the Scholars Site | Your Name | Academic Portfolio",
	"post page title should use post title",
);
assert(
	post.includes(
		'meta name="description" content="Lessons learned while bootstrapping a personal academic website with Astro.',
	),
	"post page should use post description metadata",
);

try {
	await access(new URL("posts/draft-only/index.html", root));
	throw new Error("draft post route should not be generated");
} catch (error) {
	if (error.code !== "ENOENT") throw error;
}

const about = await readDist("about/index.html");
assert(about.includes("Current Role"), "about page should render profile data");
assert(
	about.includes("Research Areas"),
	"about page should render research areas profile data",
);
assert(
	about.includes('aria-label="Page sections"') &&
		about.includes('href="#profile"') &&
		about.includes('id="profile"'),
	"about page should render section jump links with matching anchors",
);

const aboutCanonical = 'link rel="canonical" href="https://astro-theme-scholars.pages.dev/about/"';
const researchCanonical = 'link rel="canonical" href="https://astro-theme-scholars.pages.dev/researches/"';

assert(about.includes(aboutCanonical), "about page canonical should use siteConfig.siteUrl");
assert(research.includes(researchCanonical), "research page canonical should use siteConfig.siteUrl");

const projects = await readDist("projects/index.html");
const projectStatusFilters = ["active", "past", "unspecified"];
const visibleProjectStatusFilters = projectStatusFilters.filter((filter) =>
	projects.includes(`data-filter-section="${filter}"`),
);
if (visibleProjectStatusFilters.length > 1) {
	assertFilterToolbar(projects, "projects", visibleProjectStatusFilters);
} else {
	assert(
		!projects.includes('role="toolbar"') && !projects.includes('data-filter="all"'),
		"projects page should hide filter controls when only one status group has items",
	);
}

const teaching = await readDist("teaching/index.html");
assertFilterToolbar(teaching, "teaching", ["current", "past"]);
assert(
	teaching.includes('aria-label="Page sections"') &&
		teaching.includes('href="#current"') &&
		teaching.includes('id="current"'),
	"teaching page should render section jump links with matching anchors",
);

const sitemap = await readDist("sitemap-0.xml");
assert(
	sitemap.includes("https://astro-theme-scholars.pages.dev/about/"),
	"sitemap should use the configured production URL",
);

assert(await existsInDist("profile.svg"), "default profile image should exist in dist");

const css = await readDistCss();
assert(
	css.includes(".min-h-10{min-height:2.5rem}"),
	"filter button touch target utility should be generated in CSS",
);
assert(
	css.includes("@media(prefers-reduced-motion:reduce)") &&
		css.includes("animation-duration:.01ms!important") &&
		css.includes("animation-iteration-count:1!important") &&
		css.includes("scroll-behavior:auto!important") &&
		css.includes("transition-duration:.01ms!important"),
	"layout should include global reduced-motion overrides",
);

const js = await readDistJs();
assert(
	js.includes("mobile-menu-toggle") &&
		js.includes("back-to-top") &&
		js.includes("prefers-reduced-motion: reduce"),
	"layout browser behavior should be bundled in generated JavaScript",
);
