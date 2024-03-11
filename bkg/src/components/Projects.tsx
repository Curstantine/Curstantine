import { For, Show } from "solid-js";

export default function Projects() {
	const projects: { name: string; description: string; points: string[]; link: string }[] = [
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

	return (
		<div id="projects" class="prose">
			<h2>#projects</h2>
			<ul class="space-y-2">
				<For each={projects}>
					{(project) => (
						<li>
							<a href={project.link}>{project.name}</a>
							<span>{": "}{project.description}</span>
							<Show when={project.points.length > 0}>
								<ul class="text-sm text-text-2">
									<For each={project.points}>{(point) => <li>{point}</li>}</For>
								</ul>
							</Show>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}
