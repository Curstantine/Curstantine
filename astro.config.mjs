import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

import mdx from "@astrojs/mdx";

export default defineConfig({
	site: import.meta.env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
		?? "https://riamu.lol",
	integrations: [
		sitemap(),
		solidJs(),
		mdx({
			syntaxHighlight: "shiki",
			shikiConfig: { theme: "github-dark-high-contrast" },
		}),
	],
	adapter: vercel({ webAnalytics: { enabled: true } }),
	vite: {
		plugins: [tailwindcss()],
	},
	env: {
		schema: {
			LISTENBRAINZ_API_TOKEN: envField.string({
				context: "server",
				access: "secret",
			}),
			PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: envField.string({
				context: "server",
				access: "public",
				optional: true,
			}),
		},
	},
});
