import { JETBRAINS_MONO_ATTR, NUNITO_SANS_ATTR, SONOKAI_ATTR } from "../constants";

export default function Attributions() {
	return (
		<div id="attributions">
			<h2>#attributions</h2>
			<p class="leading-relaxed">
				Fonts: <a href={NUNITO_SANS_ATTR}>Nunito Sans</a>, <a href={JETBRAINS_MONO_ATTR}>JetBrains Mono</a>
				<br />
				Dark color palette: <a href={SONOKAI_ATTR}>Sonokai Shusia</a>
				<br />
				Light color palette: Solarized Light
				<br />
				Scaffolded with Vite, written in SolidJS.
			</p>
		</div>
	);
}
