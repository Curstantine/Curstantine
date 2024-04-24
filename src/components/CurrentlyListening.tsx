import { createResource, Match, onCleanup, Switch } from "solid-js";

import type { NowPlayingResponse } from "~/pages/api/currently-listening";

async function getData(): Promise<NowPlayingResponse> {
	const url = new URL("/api/currently-listening", window.location.toString());
	const request = await fetch(url);
	const body = await request.json();
	return body;
}

export default function CurrentlyListening() {
	const [resource, { refetch }] = createResource(getData);

	const interval = setInterval(() => refetch(), 90000);
	onCleanup(() => clearInterval(interval));

	return (
		<div class="flex flex-col p-6 lg:col-start-2 xl:(col-start-auto px-0 pb-0)">
			<div class="mb-1 inline-flex items-center text-text-2">
				<div class="i-gravity-music-note mr-2 size-4" />
				<span class="select-none text-sm">Currently Listening</span>
			</div>

			<Switch>
				<Match when={resource.loading}>
					<span class="text-sm">Loading...</span>
				</Match>
				<Match when={resource()?.type === "error" && resource()}>
					{(error) => <span>{error().message}</span>}
				</Match>
				<Match when={resource()?.type === "ok" && resource()?.data}>
					{(data) => {
						return (
							<>
								<span class="text-sm text-text-1">{data().artist} - {data().track}</span>
								<a
									target="_blank"
									href={data().links.release_mbz}
									class="w-fit text-sm text-accent-1"
								>
									{data().release}
								</a>
								<div class="inline-flex gap-2 text-xs text-text-2">
									<a href={data().links.track_apple} target="_blank">Apple Music</a>
									<a href={data().links.track_youtube} target="_blank">YouTube</a>
								</div>
							</>
						);
					}}
				</Match>
			</Switch>
		</div>
	);
}
