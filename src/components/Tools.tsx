import { For } from "solid-js";
import { TOOLS } from "../constants";

export default function Tools() {
	return (
		<div id="tools">
			<h2>#tools</h2>
			<ul class="list-disc list-inside pl-0 mb-0 mt-2 space-y-3">
				<For each={TOOLS}>{(tool) => <li>{tool}</li>}</For>
			</ul>
		</div>
	);
}
