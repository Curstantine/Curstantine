import { createSignal, Show } from "solid-js";

import {
	GITHUB,
	GITLAB,
	LASTFM,
	LINKEDIN,
	PROFILE_IMAGE_SOURCE,
	PROFILE_IMAGE_SOURCE_LABEL,
	TWITTER,
} from "~/utils/constants";

export default function InfoContainer() {
	const [isFigureHovered, setFigureHovered] = createSignal(false);

	return (
		<div
			class="my-4 flex flex-col items-center px-8 py-4 md:(sticky inset-y-4 left-0 min-w-xs w-xs) sm:(min-w-72 w-72)"
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
					class="h-48 w-48 rounded-xl"
				/>
				<Show when={PROFILE_IMAGE_SOURCE}>
					{(imageSource) => (
						<figcaption
							class="text-center text-xs text-text-2 transition-opacity duration-standard ease-standard"
							classList={{ "opacity-100": isFigureHovered(), "opacity-0": !isFigureHovered() }}
						>
							Original image by{" "}
							<a target="_blank" href={imageSource()}>{PROFILE_IMAGE_SOURCE_LABEL ?? "N/A"}</a>
						</figcaption>
					)}
				</Show>
			</figure>
			<div class="flex flex-1 flex-col items-center pb-8 pt-4 sm:pb-0">
				<h1 class="text-3xl font-medium leading-8 tracking-tight">Curstantine</h1>
				<span class="text-sm text-text-2">UI Designer, Developer</span>
			</div>
			<div class="grid grid-cols-5 w-full justify-items-center gap-4">
				<a
					target="_blank"
					aria-label="GitHub"
					href={GITHUB}
					class="i-logos-github-icon h-6 w-6 dark:invert"
				/>
				<a
					target="_blank"
					aria-label="GitLab"
					href={GITLAB}
					class="i-logos-gitlab h-6 w-6"
				/>
				<a
					target="_blank"
					aria-label="Twitter"
					href={TWITTER}
					class="i-logos-twitter h-6 w-6"
				/>
				<a
					target="_blank"
					aria-label="LinkedIn"
					href={LINKEDIN}
					class="i-logos-linkedin-icon h-6 w-6"
				/>
				<a
					target="_blank"
					aria-label="Last.fm"
					href={LASTFM}
					class="i-pref-lastfm h-6 w-6 text-[#D41107]"
				/>
			</div>
		</div>
	);
}
