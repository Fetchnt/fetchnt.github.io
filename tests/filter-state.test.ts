import { describe, expect, it } from "vitest";
import { buildFilterSearch, readFilterFromSearch } from "../src/lib/filter-state";

describe("filter state helpers", () => {
	it("reads only allowed filters from the search params", () => {
		expect(readFilterFromSearch("?filter=working-paper", ["working-paper"])).toBe(
			"working-paper",
		);
		expect(readFilterFromSearch("?filter=<script>", ["working-paper"])).toBeUndefined();
		expect(readFilterFromSearch("?page=2", ["working-paper"])).toBeUndefined();
	});

	it("updates the filter param while preserving unrelated params", () => {
		expect(buildFilterSearch("?page=2", "working-paper")).toBe(
			"?page=2&filter=working-paper",
		);
		expect(buildFilterSearch("?page=2&filter=working-paper", "all")).toBe("?page=2");
	});
});
