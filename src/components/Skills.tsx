import { For, Show } from "solid-js";

import { SKILLS } from "~/utils/constants";

export default function Skills() {
	return (
		<div id="skills" class="prose">
			<h2>#skills</h2>
			<ul>
				<For each={SKILLS}>
					{([language, frameworks]) => (
						<li>
							{language}
							<Show when={frameworks.length > 0}>
								<ul class="my-1">
									<For each={frameworks}>
										{(framework) => <li class="text-text-2 text-sm">{framework}</li>}
									</For>
								</ul>
							</Show>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}
