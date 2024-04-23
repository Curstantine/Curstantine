import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";
import unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
	integrations: [
		unocss({ injectReset: "@unocss/reset/tailwind-compat.css" }),
	],
	output: "hybrid",
	adapter: vercel({ webAnalytics: { enabled: true } }),
});
