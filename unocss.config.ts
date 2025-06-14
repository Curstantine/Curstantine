import type { IconifyJSON } from "@iconify/types";
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWebFonts,
	presetWind3,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

const importIconCollection = (name: string) => {
	return () =>
		import(`@iconify-json/${name}/icons.json`)
			.then((i) => i.default) as Promise<IconifyJSON>;
};

const colorDefinitions = {
	background: "hsl(var(--background) / <alpha-value>)",
	text: {
		1: "hsl(var(--text-1) / <alpha-value>)",
		2: "hsl(var(--text-2) / <alpha-value>)",
		3: "hsl(var(--text-3) / <alpha-value>)",
	},
	accent: {
		1: "hsl(var(--accent-1) / <alpha-value>)",
		2: "hsl(var(--accent-2) / <alpha-value>)",
	},
} as const;

export default defineConfig({
	presets: [
		presetAttributify(),
		presetWind3({ dark: "media" }),
		presetWebFonts({
			fonts: {
				sans: "IBM Plex Sans:400,500",
				mono: "JetBrains Mono:400",
			},
		}),
		presetIcons({
			collections: {
				bxl: importIconCollection("bxl"),
				gravity: importIconCollection("gravity-ui"),
				symbols: importIconCollection("material-symbols"),
				pref: (): IconifyJSON => ({
					prefix: "pref",
					icons: {
						lastfm: {
							body:
								`<path fill="currentColor" d="m225.8 367.1l-18.8-51s-30.5 34-76.2 34c-40.5 0-69.2-35.2-69.2-91.5c0-72.1 36.4-97.9 72.1-97.9c66.5 0 74.8 53.3 100.9 134.9c18.8 56.9 54 102.6 155.4 102.6c72.7 0 122-22.3 122-80.9c0-72.9-62.7-80.6-115-92.1c-25.8-5.9-33.4-16.4-33.4-34c0-19.9 15.8-31.7 41.6-31.7c28.2 0 43.4 10.6 45.7 35.8l58.6-7c-4.7-52.8-41.1-74.5-100.9-74.5c-52.8 0-104.4 19.9-104.4 83.9c0 39.9 19.4 65.1 68 76.8c44.9 10.6 79.8 13.8 79.8 45.7c0 21.7-21.1 30.5-61 30.5c-59.2 0-83.9-31.1-97.9-73.9c-32-96.8-43.6-163-161.3-163C45.7 113.8 0 168.3 0 261c0 89.1 45.7 137.2 127.9 137.2c66.2 0 97.9-31.1 97.9-31.1z"/>`,
							height: 512,
							width: 512,
						},
					},
				}),
			},
		}),
		presetTypography({
			cssExtend: (theme) => {
				const colors = theme.colors as typeof colorDefinitions;
				const fonts = theme.fontFamily as Record<
					"sans" | "mono",
					string
				>;
				const fontSizes = theme.fontSize as Record<
					"xs" | "sm" | "base" | "lg" | "xl" | `${number}xl`,
					[string, string]
				>;

				const textOpPatch = (val: string) => val.replace("<alpha-value>", "var(--un-text-opacity)");
				const [fontHeaderSize] = fontSizes["base"];

				return {
					a: {
						color: textOpPatch(colors.text[1]),
						"font-weight": 400,
						"text-decoration-thickness": "from-font",
						"text-decoration": "underline",
						"text-decoration-color": textOpPatch(colors.text[3]),
					},
					"a:hover": {
						"text-decoration-color": textOpPatch(colors.accent[1]),
					},
					h2: {
						color: textOpPatch(colors.accent[1]),
						"font-family": fonts.mono,
						"font-weight": 400,
						"font-size": fontHeaderSize,
						"margin-top": "2rem",
					},
					"p:last-child": {
						"margin-bottom": "0rem",
					},
					"h2 + p": {
						"margin-top": "0rem",
					},
					ul: {
						"margin-top": "0rem",
						"margin-bottom": "0rem",
					},
				};
			},
		}),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	extendTheme: (theme) => ({
		...theme,
		breakpoint: {
			xs: "375px",
			...theme.breakpoint,
		},
	}),
	theme: {
		container: { center: "true" },
		ease: {
			DEFAULT: "cubic-bezier(0.4, 0.0, 0.2, 1.0)",
			standard: "cubic-bezier(0.2, 0.0, 0, 1.0)",
			"standard-decelerate": "cubic-bezier(0, 0, 0, 1)",
			"standard-accelerate": "cubic-bezier(0.3, 0, 1, 1)",
		},
		duration: {
			standard: "150ms",
			emphasized: "300ms",
		},
		colors: colorDefinitions,
	},
	shortcuts: [
		[/^use-transition-(.*)$/, ([, c]) => `duration-${c} ease-${c}`],
		[/^button-accent-(.*)$/, ([, c]) => `bg-accent-${c} text-background hover:bg-accent-${c}/90 transition-colors`],
	],
});
