import type { Project } from "~/types";

export const LAST_FM_API_URL = "https://ws.audioscrobbler.com/2.0/";
export const LISTENBRAINZ_NOW_PLAYING_API = "https://api.listenbrainz.org/1/user/curstantine/playing-now";

export const GITHUB = "https://github.com/Curstantine";
export const GITLAB = "https://gitlab.com/Curstantine";
export const LINKEDIN = "https://www.linkedin.com/in/Curstantine/";
export const LASTFM = "https://www.last.fm/user/Curstantine";
export const TWITTER = "https://twitter.com/Curstantine";
export const CV = "https://www.figma.com/file/yBfIcWSe0pXQmMD3S3StYZ";

export const PROFILE_IMAGE_SOURCE: string | null = null;
export const PROFILE_IMAGE_SOURCE_LABEL: string | null = null;

export const SONOKAI_ATTR = "https://github.com/sainnhe/sonokai";
export const REALTIME_ATTR = "https://www.realtimecolors.com/?colors=200326-f0f0f0-c348d8-efb9f9-b612d3";
export const FONT_SANS_ATTR = "https://fonts.google.com/specimen/Inter";
export const FONT_MONO_ATTR = "https://www.jetbrains.com/lp/mono/";
export const ICON_BXL_ATTR = "https://github.com/atisawd/boxicons";

export const SKILLS: [string, string[]][] = [
	["Rust", []],
	["JavaScript/TypeScript", ["SolidJS", "Astro", "Svelte", "Vue", "React"]],
	["Dart", ["Flutter"]],
	["Kotlin", ["Jetpack Compose"]],
];

export const PROJECTS: Project[] = [
	{
		name: "Melody",
		link: "https://www.github.com/Curstantine/melody",
		description: "Fast, lightweight and feature-rich cross-platform music player [WIP]",
		points: [
			"Theming support",
			"Extensible plugin system",
			"Artist credit splitting",
		],
	},
	{
		name: "tsync",
		link: "https://www.github.com/Curstantine/tsync",
		description: "CLI music library sync utility with on-the-fly transcode support",
		points: [
			"ADB and MTP backend support",
		],
	},
	{
		name: "osu_helper_script",
		link: "https://www.github.com/Curstantine/osu_helper_script",
		description: "CLI utility to manage osu!lazer with ease",
		points: [
			"Install, remove, and update lazer easily",
			".desktop file creating following the XDG-Desktop specification",
		],
	},
	{
		name: "Riba",
		link: "https://www.github.com/Curstantine/Riba",
		description: "MD3 compliant MangaDex client written with Flutter [WIP]",
		points: [
			"Explore and read titles available on MangaDex",
		],
	},
];

export const TOOLS = ["Visual Studio Code", "IntelliJ IDEA", "Android Studio", "Figma"];
