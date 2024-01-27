import { defineConfig } from "@solidjs/start/config";
import unocss from "unocss/vite";

export default defineConfig({
	plugins: [unocss()],
	start: {
		server: {
			preset: "vercel",
		},
	},
});
