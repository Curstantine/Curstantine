import { For } from "solid-js";
import { LASTFM } from "../constants";
import { getAge } from "../utils";

export default function About() {
	return (
		<div id="about">
			<h2>#about</h2>
			<p class="leading-relaxed">
				I'm Rachala Ovin, a {getAge()} years old developer from Sri Lanka. <br /> I'm
				currently pursuing a Software Engineering degree at the Informatics Institute of
				Technology.
				<br />
				My forte is in frontend web and mobile development, but I do regularly dabble in
				UI/UX designing and systems programming.
			</p>
			<p class="leading-relaxed mt-4">
				Though, unrelated, I love listening to music. Which you can check here:{" "}
				<a target="_blank" href={LASTFM}>
					last.fm
				</a>
			</p>
		</div>
	);
}
