import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel";
import { defineConfig, envField } from "astro/config";
import unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
	site: import.meta.env.PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? "https://riamu.lol",
	integrations: [
		sitemap(),
		unocss({ injectReset: true }),
		solidJs(),
	],
	adapter: vercel({ webAnalytics: { enabled: true } }),
	env: {
		schema: {
			LISTENBRAINZ_API_TOKEN: envField.string({ context: "server", access: "secret" }),
			PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: envField.string({
				context: "server",
				access: "public",
				optional: true,
			}),
		},
	},
});
