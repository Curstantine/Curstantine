import type { Blog, Company, Project } from "~/types";

export const LAST_FM_API_URL = "https://ws.audioscrobbler.com/2.0/";
export const LISTENBRAINZ_NOW_PLAYING_API = "https://api.listenbrainz.org/1/user/curstantine/playing-now";
export const MUSICBRAINZ_RELEASE_API = "https://musicbrainz.org/ws/2/release";

export const GITHUB = "https://github.com/Curstantine";
export const GITLAB = "https://gitlab.com/Curstantine";
export const LINKEDIN = "https://www.linkedin.com/in/Curstantine/";
export const LASTFM = "https://www.last.fm/user/Curstantine";
export const TWITTER = "https://twitter.com/Curstantine";
export const CV = "https://www.figma.com/file/yBfIcWSe0pXQmMD3S3StYZ";
export const EMAIL = "curstantine@riamu.lol";

export const PROFILE_IMAGE_SOURCE: string | null = null;
export const PROFILE_IMAGE_SOURCE_LABEL: string | null = null;

export const SONOKAI_ATTR = "https://github.com/sainnhe/sonokai";
export const REALTIME_ATTR = "https://www.realtimecolors.com/?colors=200326-f0f0f0-c348d8-efb9f9-b612d3";
export const FONT_SANS_ATTR = "https://fonts.google.com/specimen/IBM+Plex+Sans";
export const FONT_MONO_ATTR = "https://www.jetbrains.com/lp/mono/";
export const ICON_BXL_ATTR = "https://github.com/atisawd/boxicons";
export const ICON_SYMBOLS_ATTR = "https://github.com/google/material-design-icons";
export const ICON_GRAVITY_ATTR = "https://github.com/gravity-ui/icons/";

export const PROJECTS: Project[] = [
	{
		name: "Aggregato",
		link: "https://aggregato.riamu.lol",
		description: "Music aggregation, and release delivery platform",
		points: [
			"Written in SvelteKit, with usable no-js enhancements",
			"SEC-CH based color scheme preference resolution",
			"Background sync support with service workers",
		],
	},
	{
		name: "Melody",
		link: "https://www.github.com/Curstantine/melody",
		description: "Fast, lightweight and feature-rich cross-platform music player",
		points: [
			"Theming support",
			"Extensible plugin system",
			"Artist credit splitting",
		],
	},
	{
		name: "jabascript",
		link: "https://www.github.com/Curstantine/jabascript",
		description: "Simple yet delightfully created javascript utilities and mix-ins",
		points: [
			"Utilities useful for different environments and frameworks (e.g. node, browsers, react)",
			"Easily tree-shakeable, with a focus on package lightness and performance",
			"No dependencies",
			"Typed with JSDocs, targeted at modern ESM",
		],
	},
	{
		name: "tsync",
		link: "https://www.github.com/Curstantine/tsync",
		description: "CLI music library sync utility with on-the-fly transcode support",
		points: [
			"Uses Android Debug Bridge to sync between devices",
			"Sync-list support",
			"Re-encode files on the fly using ffmpeg or opusenc",
		],
	},
	{
		name: "osu_helper_script",
		link: "https://www.github.com/Curstantine/osu_helper_script",
		description: "CLI utility to manage osu!lazer with ease",
		points: [
			"Install, remove, and update osu!lazer easily",
			".desktop file creation following the XDG-Desktop specification",
		],
	},
	{
		name: "Riba",
		link: "https://www.github.com/Curstantine/Riba",
		description: "MD3 compliant MangaDex client written with Flutter",
		points: [
			"Explore and read titles available on MangaDex",
		],
	},
];

const COMPANY_THRIVE: Company = { name: "Thrive Solutions", link: "https://thrive-solutions.com" };
const COMPANY_CREATIVO: Company = { name: "CreativoCode", link: "http://creativo-code.com/" };

export const WORK: Project[] = [
	{
		name: "Unique Accessories International - Web Store",
		link: "https://uniqueacc.lk",
		points: [
			"Made with SvelteKit, BetterAuth and Drizzle",
			"Dynamic content system with user ordering and admin item management",
		],
	},
	{
		name: "Echo Daft",
		link: "https://echodaft.com",
		asPartOf: COMPANY_THRIVE,
		points: [
			"Made with Next.js and TailwindCSS v4",
			"Server actions with arktype validation for form submission",
			"Static optimized, with basic nojs optimization (forms)",
			"Build time integration with Spotify API, and ripped embed previews",
		],
	},
	{
		name: "Prasanna Baddewithana",
		link: "https://pb.lk",
		asPartOf: COMPANY_CREATIVO,
		points: [
			"Made with Next.js, TailwindCSS, motion, and prismic",
			"Integration with prismic.io for a seamless CMS experience",
			"Optimizations to frame rates, load times, and bundle sizes",
			"WAI-ARIA compliance (modals, dialogs and navigation)",
		],
	},
	{
		name: "Techxeed",
		asPartOf: COMPANY_THRIVE,
		link: "https://techxeed.com",
		points: [
			"Made with Next.js, TailwindCSS, react-redux and RTK query",
			"Maintained and delivered feature implementations",
			"Optimized page load-times, reduced max bundle sizes and improved WAI-ARIA conditions",
		],
	},
	{
		name: "Time After Time - In Circles, 24",
		link: "https://wearetimeless.live/in-circles-24",
		asPartOf: COMPANY_THRIVE,
		points: [
			"Made with Next.js, UnoCSS and motion",
			"Optimizations to LCP, load times and bundle sizes",
		],
	},
	{
		name: "Mozilla Campus Club - Site",
		link: "https://mozilla-iit.org/",
		points: [
			"Made with Next.js and UnoCSS",
			"Product of collaboration with designers and developers",
		],
	},
	{
		name: "Mozilla Campus Club - OpenHack 2.0",
		link: "https://openhack.live",
		points: [
			"Made with Next.js, TailwindCSS, framer-motion and firebase",
			"Collaborated with multiple developers and designers",
		],
	},
];

export const BLOGS: Blog[] = [
	{
		external: true,
		name: "Zustand: The Bear Necessities of Reactive State Management",
		link: "https://mozilla-iit.org/blogs/zustand-the-bear-necessities-for-reactive-state-management",
		description:
			"In-depth explanation on how to use zustand, and how it handles performant reactive changes internally.",
	},
];
