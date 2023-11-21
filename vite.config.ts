import vercel from "solid-start-vercel";
import solid from "solid-start/vite";
import unocss from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [unocss(), solid({ adapter: vercel() })],
});
