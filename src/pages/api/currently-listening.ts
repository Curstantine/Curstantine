import type { APIRoute } from "astro";

import { LISTENBRAINZ_API_TOKEN } from "astro:env/server";
import { LISTENBRAINZ_NOW_PLAYING_API } from "~/utils/constants";

type NowPlaying = Record<"artist" | "release" | "track", string> & {
	links: Record<"release_mbz" | `track_${"apple" | "youtube"}`, string>;
};

export type NowPlayingResponse = {
	type: "error" | "ok";
	data?: NowPlaying | null;
	message?: string;
};

export const prerender = false;

const DEFAULT_HEADERS: HeadersInit = {
	"Content-Type": "application/json",
	"Cache-Control": "s-maxage=60, stale-while-revalidate=86400",
};

export const GET: APIRoute = async () => {
	const req = await fetch(LISTENBRAINZ_NOW_PLAYING_API, {
		headers: {
			Authorization: `Token ${LISTENBRAINZ_API_TOKEN}`,
		},
	}).catch((e) => console.error(e));

	if (req === undefined) {
		return new Response(
			JSON.stringify({ type: "error", message: "ListenBrainz seems to be down..." }),
			{ status: 500, headers: { ...DEFAULT_HEADERS, "Cache-Control": "no-store" } },
		);
	}

	if (!req.ok) {
		console.error(`Failed to fetch currently listening data: ${req.statusText} (${req.status})`);
		return new Response(
			JSON.stringify({ type: "error", message: "Failed to fetch currently listening data!" }),
			{ status: 500, headers: { ...DEFAULT_HEADERS, "Cache-Control": "no-store" } },
		);
	}

	const data = await req.json();
	const np = data["payload"]["listens"][0];

	if (np === null || np === undefined) {
		return new Response(
			JSON.stringify({ type: "ok", data: null }),
			{ headers: DEFAULT_HEADERS },
		);
	}

	const trackMeta = np["track_metadata"];
	const info = trackMeta["additional_info"];
	const artist = trackMeta["artist_name"];
	const track = trackMeta["track_name"];

	const parsed = encodeURIComponent(`${artist} - ${track}`);

	const response: NowPlayingResponse = {
		type: "ok",
		data: {
			artist,
			track,
			release: trackMeta["release_name"],
			links: {
				release_mbz: `https://musicbrainz.org/release/${info["release_mbid"]}`,
				track_apple: `https://music.apple.com/us/search?term=${parsed}`,
				track_youtube: `https://www.youtube.com/results?search_query=${parsed}`,
			},
		},
	};

	return new Response(
		JSON.stringify(response),
		{ headers: DEFAULT_HEADERS },
	);
};
