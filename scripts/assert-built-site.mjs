import { access, readFile } from "node:fs/promises";

const root = new URL("../dist/", import.meta.url);

async function readDist(path) {
	return readFile(new URL(path, root), "utf8");
}

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

function titles(html) {
	return [...html.matchAll(/<title>(.*?)<\/title>/g)].map((match) => match[1]);
}

const research = await readDist("researches/index.html");
assert(titles(research).length === 1, "research page should emit one <title>");
assert(
	titles(research)[0] === "Publications | Your Name | Academic Portfolio",
	"research page title should include page title",
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
