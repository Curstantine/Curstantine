import { createResource, Match, onCleanup, Switch } from "solid-js";

import type { NowPlayingResponse } from "~/pages/api/currently-listening";

async function getData(): Promise<NowPlayingResponse> {
	const request = await fetch("./api/currently-listening");
	return await request.json();
}

export default function CurrentlyListening() {
	const [resource, { refetch }] = createResource(getData);

	const interval = setInterval(() => refetch(), 90000);
	onCleanup(() => clearInterval(interval));

	return (
		<div class="flex flex-col">
			<div class="mb-1 inline-flex items-center text-text-2">
				<div class="iconify gravity-ui--music-note mr-2 size-4" />
				<span class="select-none text-sm">Currently Listening</span>
			</div>

			<Switch>
				<Match when={resource.loading}>
					<span class="text-sm text-text-2">Loading...</span>
				</Match>
				<Match when={resource()?.type === "error" && resource()}>
					{(error) => <span class="text-sm">{error().message}</span>}
				</Match>
				<Match when={resource()?.type === "ok" && !resource()?.data}>
					<span class="text-sm">Not listening to anything...</span>
				</Match>
				<Match when={resource()?.type === "ok" && resource()?.data}>
					{(data) => (
						<>
							<span class="text-sm text-text-1">{data().artist} - {data().track}</span>
							<a
								target="_blank"
								href={data().links.release_mbz}
								class="text-sm text-accent-1"
							>
								{data().release}
							</a>
							<div class="inline-flex gap-2 text-xs text-text-2">
								<a href={data().links.track_apple} target="_blank">Apple Music</a>
								<a href={data().links.track_youtube} target="_blank">YouTube</a>
							</div>
						</>
					)}
				</Match>
			</Switch>
		</div>
	);
}
