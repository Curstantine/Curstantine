import { DISCORD, GITLAB, LINKEDIN, TWITTER } from "../constants";
import ProfilePicture from "../assets/profile.png";

export default function InfoContainer() {
	return (
		<div
			class="flex flex-col items-center gap-4 sm:(w-72 min-w-72) md:(w-xs min-w-xs) py-4 px-8 my-4"
			border="r-0 sm:r-1 r-solid r-text-3"
		>
			<img
				src={ProfilePicture}
				alt="Profile picture"
				class="w-48 h-48 transition-box-shadow,border-radius duration-300 ease-standard rounded-xl hover:(shadow-md rounded-lg) "
			/>
			<div class="flex flex-col">
				<h1 class="font-bold text-2xl leading-tight">Rachala Ovin</h1>
				<p class="text-center">
					<span class="text-xs mr-2 ">AKA</span>
					<span class="text-base">Curstantine</span>
				</p>
				<span class="text-sm text-text-2">UI Designer, Developer</span>
			</div>
			<div class="flex-1 flex w-full items-end justify-evenly">
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
			</div>
		</div>
	);
}
