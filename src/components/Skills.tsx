import { For } from "solid-js";

import { SKILLS } from "~/utils/constants";

export default function Skills() {
	return (
		<div id="skills">
			<h2>#skills</h2>
			<ul class="list-disc list-inside pl-0 mb-0 mt-2 space-y-3">
				<For each={SKILLS}>
					{([language, frameworks]) => (
						<li>
							{language}
							<ul>
								<For each={frameworks}>
									{(framework) => <li class="text-text-2 mt-2">{framework}</li>}
								</For>
							</ul>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}
