import { createSignal } from "solid-js";

import ProfilePicture from "../assets/profile.jpg";
import { DISCORD, GITLAB, LINKEDIN, PROFILE_IMAGE_SOURCE, TWITTER } from "../constants";

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
					src={ProfilePicture}
					alt="Profile image"
					aria-hidden="true"
					class="w-48 h-48 transition-box-shadow,border-radius duration-300 ease-standard rounded-xl hover:(shadow-md rounded-lg) "
				/>
				<figcaption
					class="text-xs text-center text-text-2 transition-opacity duration-standard ease-standard"
					classList={{ "opacity-100": isFigureHovered(), "opacity-0": !isFigureHovered() }}
				>
					Original image by <a target="_blank" href={PROFILE_IMAGE_SOURCE}>@octrick</a>
				</figcaption>
			</figure>
			<div class="flex-1 flex flex-col items-center pt-1 pb-8 sm:pb-0">
				<h1 class="font-bold text-3xl leading-8 tracking-tight">Curstantine</h1>
				<span class="text-sm text-text-2">UI Designer, Developer</span>
			</div>
			<div class="grid grid-cols-5 justify-items-center gap-4 w-full">
				<a
					target="_blank"
					aria-label="Gitlab"
					href={GITLAB}
					class="i-logos-gitlab w-6 h-6"
				/>
				<a
					target="_blank"
					aria-label="Discord"
					href={DISCORD}
					class="i-logos-discord-icon w-6 h-6"
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
					ara-label="ListenBrainz"
					href="https://listenbrainz.org/user/Curstantine"
					class="i-pref-listenbrainz w-6 h-6"
				/>
			</div>
		</div>
	);
}
