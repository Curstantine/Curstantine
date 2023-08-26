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
import type { IconifyJSON } from "@iconify/types";

const importIconCollection = (name: string) => {
	return () => import(`@iconify-json/${name}/icons.json`).then((i) => i.default) as Promise<IconifyJSON>;
};

export default defineConfig<Theme>({
	presets: [
		presetAttributify(),
		presetUno({
			dark: "media",
		}),
		presetIcons({
			collections: {
				material: importIconCollection("material-symbols"),
				logos: importIconCollection("logos"),
				pref: () => {
					const icons: IconifyJSON = {
						prefix: "pref",
						icons: {
							listenbrainz: {
								body: `<defs><style>.b{fill:#353070;}.c{fill:#eb743b;}</style></defs><polygon class="b" points="13 1 1 8 1 22 13 29 13 1"/><polygon class="c" points="14 1 26 8 26 22 14 29 14 1"/>`,
								height: 30,
								width: 27,
							},
						},
					};

					return icons;
				},
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
