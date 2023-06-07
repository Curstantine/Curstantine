import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	presetTypography,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";
import type { Theme } from "unocss/preset-uno";

export default defineConfig<Theme>({
	presets: [
		presetAttributify(),
		presetUno({
			dark: "media",
		}),
		presetIcons({
			collections: {
				// @ts-ignore
				material: () =>
					import("@iconify-json/material-symbols/icons.json").then((i) => i.default),
				// @ts-ignore
				logos: () => import("@iconify-json/logos/icons.json").then((i) => i.default),
			},
		}),
		presetTypography(),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	extendTheme: (theme) => ({
		...theme,
		breakpoints: {
			xs: "375px",
			...theme.breakpoints,
		},
	}),
	theme: {
		fontFamily: {
			mono: "JetBrains Mono, monospace",
			sans: "Nunito Sans, sans-serif",
		},
		easing: {
			DEFAULT: "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
			standard: "cubic-bezier(0.2, 0.0, 0, 1.0)",
			"standard-decelerate": "cubic-bezier(0, 0, 0, 1)",
			"standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
		},
		colors: {
			background: "var(--background)",
			text: {
				1: "var(--text-1)",
				2: "var(--text-2)",
				3: "var(--text-3)",
				accent: {
					1: "var(--text-accent-1)",
					2: "var(--text-accent-2)",
				},
			},
		},
	},
});
