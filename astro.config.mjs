import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
	site: import.meta.env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? "https://riamu.lol",
	integrations: [
		sitemap(),
		unocss({ injectReset: "@unocss/reset/tailwind-compat.css" }),
		solidJs(),
	],
	adapter: vercel({ webAnalytics: { enabled: true } }),
});
