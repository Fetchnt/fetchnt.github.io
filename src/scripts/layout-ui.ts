const STORAGE_KEY = "site-theme";

type ThemeMode = "dark" | "light";

export function getBackToTopScrollBehavior(prefersReducedMotion: boolean): ScrollBehavior {
	return prefersReducedMotion ? "auto" : "smooth";
}

function getStoredTheme(): ThemeMode | null {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		return value === "dark" || value === "light" ? value : null;
	} catch {
		return null;
	}
}

function applyTheme(mode: ThemeMode) {
	document.documentElement.classList.toggle("dark", mode === "dark");
}

function setupThemeToggles(root: ParentNode = document) {
	root.querySelectorAll("[data-theme-toggle]").forEach((button) => {
		button.addEventListener("click", () => {
			const isDark = document.documentElement.classList.toggle("dark");
			try {
				localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
			} catch {
				return;
			}
		});
	});
}

function setupSystemThemeListener() {
	if (!window.matchMedia) return;

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
		if (!getStoredTheme()) {
			applyTheme(event.matches ? "dark" : "light");
		}
	});
}

function setupMobileMenu() {
	const menuBtn = document.getElementById("mobile-menu-toggle");
	const menu = document.getElementById("mobile-menu");
	const iconMenu = document.getElementById("icon-menu");
	const iconClose = document.getElementById("icon-close");

	if (!menuBtn || !menu || !iconMenu || !iconClose) return;

	const closeMenu = () => {
		menuBtn.setAttribute("aria-expanded", "false");
		menu.hidden = true;
		menu.classList.add("opacity-0", "scale-95", "invisible");
		menu.classList.remove("opacity-100", "scale-100", "visible");
		iconMenu.classList.remove("hidden");
		iconClose.classList.add("hidden");
	};

	const openMenu = () => {
		menuBtn.setAttribute("aria-expanded", "true");
		menu.hidden = false;
		menu.classList.remove("opacity-0", "scale-95", "invisible");
		menu.classList.add("opacity-100", "scale-100", "visible");
		iconMenu.classList.add("hidden");
		iconClose.classList.remove("hidden");
	};

	menuBtn.addEventListener("click", (event) => {
		event.stopPropagation();
		menuBtn.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
	});

	document.addEventListener("click", (event) => {
		const target = event.target;
		if (!(target instanceof Node)) return;

		if (
			menuBtn.getAttribute("aria-expanded") === "true" &&
			!menu.contains(target) &&
			!menuBtn.contains(target)
		) {
			closeMenu();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
			closeMenu();
			menuBtn.focus();
		}
	});
}

function setupBackToTop() {
	const backToTopBtn = document.getElementById("back-to-top");
	if (!backToTopBtn) return;

	const toggleBackToTop = () => {
		backToTopBtn.setAttribute("data-visible", String(window.scrollY > 300));
	};

	window.addEventListener("scroll", toggleBackToTop, { passive: true });
	backToTopBtn.addEventListener("click", () => {
		const prefersReducedMotion =
			window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
		window.scrollTo({
			top: 0,
			behavior: getBackToTopScrollBehavior(prefersReducedMotion),
		});
	});
	toggleBackToTop();
}

export function setupLayoutUi() {
	document.addEventListener("DOMContentLoaded", () => {
		setupMobileMenu();
		setupThemeToggles();
		setupSystemThemeListener();
		setupBackToTop();
	});
}
