import {
	buildFilterSearch,
	isFilterSectionVisible,
	readFilterFromSearch,
} from "../lib/filter-state";

function toggleClasses(element: Element, enabled: boolean, classes: string[]) {
	for (const className of classes) {
		element.classList.toggle(className, enabled);
	}
}

function setActiveButton(buttons: NodeListOf<HTMLElement>, activeButton: HTMLElement) {
	buttons.forEach((button) => {
		const isActive = button === activeButton;
		const icon = button.querySelector("[data-filter-icon]");
		const count = button.querySelector("[data-filter-count]");
		const label = button.querySelector("[data-filter-label]");

		button.dataset.active = String(isActive);
		button.setAttribute("aria-pressed", String(isActive));
		button.classList.toggle("active", isActive);
		toggleClasses(button, isActive, ["bg-accent-100", "dark:bg-accent-900/30"]);
		toggleClasses(button, !isActive, ["bg-gray-100", "dark:bg-gray-800"]);

		if (icon) {
			toggleClasses(icon, isActive, ["text-accent-600", "dark:text-accent-400"]);
			toggleClasses(icon, !isActive, ["text-gray-500", "dark:text-gray-400"]);
		}
		if (count) {
			toggleClasses(count, isActive, ["text-accent-700", "dark:text-accent-300"]);
			toggleClasses(count, !isActive, ["text-gray-700", "dark:text-gray-300"]);
		}
		if (label) {
			toggleClasses(label, isActive, ["text-accent-600", "dark:text-accent-400"]);
			toggleClasses(label, !isActive, ["text-gray-500", "dark:text-gray-400"]);
		}
	});
}

export function setupFilterControls(root: ParentNode = document) {
	const buttons = root.querySelectorAll<HTMLElement>("[data-filter]");
	const sections = root.querySelectorAll<HTMLElement>("[data-filter-section]");
	const allowedFilters = Array.from(buttons)
		.map((button) => button.dataset.filter)
		.filter((filter): filter is string => Boolean(filter));
	const requestedFilter = readFilterFromSearch(window.location.search, allowedFilters);
	const requestedButton = requestedFilter
		? Array.from(buttons).find((button) => button.dataset.filter === requestedFilter)
		: undefined;
	const initialButton =
		requestedButton ??
		root.querySelector<HTMLElement>("[data-filter][data-active='true']") ??
		root.querySelector<HTMLElement>("[data-filter][aria-pressed='true']") ??
		root.querySelector<HTMLElement>("[data-filter].active");

	if (initialButton) {
		setActiveButton(buttons, initialButton);
		const initialFilter = initialButton.dataset.filter;

		sections.forEach((section) => {
			const visible = isFilterSectionVisible(initialFilter ?? "all", section.dataset.filterSection);
			section.hidden = !visible;
			section.classList.toggle("hidden", !visible);
		});
	}

	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			const filter = button.dataset.filter;
			if (!filter) return;

			setActiveButton(buttons, button);

			sections.forEach((section) => {
				const visible = isFilterSectionVisible(filter, section.dataset.filterSection);
				section.hidden = !visible;
				section.classList.toggle("hidden", !visible);
			});

			const nextSearch = buildFilterSearch(window.location.search, filter);
			const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
			window.history.replaceState({}, "", nextUrl);
		});
	});
}

export function setupAbstractToggles(root: ParentNode = document) {
	root.querySelectorAll<HTMLButtonElement>("[data-abstract-toggle]").forEach((toggle) => {
		toggle.addEventListener("click", () => {
			const targetId = toggle.dataset.target;
			if (!targetId) return;

			const abstract = document.getElementById(targetId);
			if (!abstract) return;

			const expanded = toggle.getAttribute("aria-expanded") === "true";
			const nextExpanded = !expanded;
			toggle.setAttribute("aria-expanded", String(nextExpanded));
			abstract.hidden = !nextExpanded;
			abstract.classList.toggle("hidden", !nextExpanded);
			toggle
				.querySelector("[data-abstract-icon]")
				?.classList.toggle("rotate-180", nextExpanded);
		});
	});
}
