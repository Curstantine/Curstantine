import type { APIRoute } from "astro";

import { LISTENBRAINZ_NOW_PLAY_API } from "~/utils/constants";

type NowPlaying = Record<"artist" | "release" | "track", string> & {
	links: Record<"release_mbz" | `track_${"apple" | "youtube"}`, string | null>;
};

export type NowPlayingResponse = {
	type: "error" | "ok";
	data?: NowPlaying;
};

export const GET: APIRoute = async () => {
	const req = await fetch(LISTENBRAINZ_NOW_PLAY_API);
	const data = await req.json();
	const np = data["payload"]["listens"][0];

	if (np === null || np === undefined) {
		return new Response(JSON.stringify({ type: "error" }), { status: 404 });
	}

	const trackMeta = np["track_metadata"];
	const info = trackMeta["additional_info"];

	const artist = trackMeta["artist_name"];
	const track = trackMeta["track_name"];

	const parsed = encodeURIComponent(`${artist} - ${track}`);

	return new Response(JSON.stringify(
		{
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
		} satisfies NowPlayingResponse,
	));
};