import { createSignal, Show } from "solid-js";

import { GITHUB, GITLAB, LASTFM, LINKEDIN, PROFILE_IMAGE_SOURCE, TWITTER } from "~/utils/constants";

export default function InfoContainer() {
	const [isFigureHovered, setFigureHovered] = createSignal(false);

	return (
		<div
			class="flex flex-col items-center sm:(w-72 min-w-72) md:(w-xs min-w-xs) py-4 px-8 my-4"
			border="r-0 sm:r-1 r-solid r-text-3"
		>
			<figure
				onMouseEnter={() => setFigureHovered(true)}
				onMouseLeave={() => setFigureHovered(false)}
			>
				<img
					src="/images/profile.png"
					alt="Profile image"
					aria-hidden="true"
					class="w-48 h-48 rounded-xl"
				/>
				<Show when={PROFILE_IMAGE_SOURCE}>
					{(imageSource) => (
						<figcaption
							class="text-xs text-center text-text-2 transition-opacity duration-standard ease-standard"
							classList={{ "opacity-100": isFigureHovered(), "opacity-0": !isFigureHovered() }}
						>
							Original image by <a target="_blank" href={imageSource()}>@octrick</a>
						</figcaption>
					)}
				</Show>
			</figure>
			<div class="flex-1 flex flex-col items-center pt-1 pb-8 sm:pb-0">
				<h1 class="font-bold text-3xl leading-8 tracking-tight">Curstantine</h1>
				<span class="text-sm text-text-2">UI Designer, Developer</span>
			</div>
			<div class="grid grid-cols-5 justify-items-center gap-4 w-full">
				<a
					target="_blank"
					aria-label="GitHub"
					href={GITHUB}
					class="i-logos-github-icon dark:invert w-6 h-6"
				/>
				<a
					target="_blank"
					aria-label="GitLab"
					href={GITLAB}
					class="i-logos-gitlab w-6 h-6"
				/>
				<a
					target="_blank"
					aria-label="Twitter"
					href={TWITTER}
					class="i-logos-twitter w-6 h-6"
				/>
				<a
					target="_blank"
					aria-label="LinkedIn"
					href={LINKEDIN}
					class="i-logos-linkedin-icon w-6 h-6"
				/>
				<a
					target="_blank"
					aria-label="Last.fm"
					href={LASTFM}
					class="i-pref-lastfm text-[#D41107] w-6 h-6"
				/>
			</div>
		</div>
	);
}
