import { For } from "solid-js";

import { TOOLS } from "~/utils/constants";

export default function Tools() {
	return (
		<div id="tools" class="prose">
			<h2>#tools</h2>
			<ul>
				<For each={TOOLS}>{(tool) => <li>{tool}</li>}</For>
			</ul>
		</div>
	);
}
