import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/static";
import unocss from "unocss/astro";

// https://astro.build/config
export default defineConfig({
	integrations: [unocss({ injectReset: "@unocss/reset/tailwind-compat.css" }), solidJs()],
	output: "static",
	adapter: vercel({ webAnalytics: { enabled: true } }),
});
