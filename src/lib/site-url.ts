const absoluteUrlPattern = /^https?:\/\//i;

export function normalizeSiteUrl(siteUrl: string): string {
	const trimmed = siteUrl.trim();
	if (!trimmed) {
		throw new Error("siteConfig.siteUrl must not be empty");
	}

	return trimmed.replace(/\/+$/, "");
}

export function withTrailingSlash(siteUrl: string): string {
	return `${normalizeSiteUrl(siteUrl)}/`;
}

export function buildAbsoluteUrl(pathOrUrl: string, siteUrl: string): string {
	const value = pathOrUrl.trim();
	if (absoluteUrlPattern.test(value)) {
		return value;
	}

	const normalizedSiteUrl = normalizeSiteUrl(siteUrl);
	const normalizedPath = value.startsWith("/") ? value : `/${value}`;
	return `${normalizedSiteUrl}${normalizedPath}`;
}
