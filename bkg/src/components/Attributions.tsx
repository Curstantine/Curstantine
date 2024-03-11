import { FONT_MONO_ATTR, FONT_SANS_ATTR, REALTIME_ATTR, SONOKAI_ATTR } from "~/utils/constants";

export default function Attributions() {
	return (
		<div id="attributions" class="prose">
			<h2>#attributions</h2>
			<ul>
				<li>
					Fonts: <a href={FONT_SANS_ATTR}>Inter</a>, <a href={FONT_MONO_ATTR}>JetBrains Mono</a>
				</li>
				<li>
					Dark color palette: <a href={SONOKAI_ATTR}>Sonokai Shusia</a>
				</li>
				<li>
					Light color palette: <a href={REALTIME_ATTR}>Realtime Colors</a>
				</li>
			</ul>
			<p class="mt-8 pb-4 text-sm text-text-2">
				Written in Solid, styled with UnoCSS, and scaffolded with SolidStart.
			</p>
		</div>
	);
}
