import { CV } from "~/utils/constants";

export default function About() {
	return (
		<div id="about">
			<h2>#about</h2>
			<p class="leading-relaxed">
				Hello! I'm Rachala Ovin, a developer from Sri Lanka. <br />
				I'm currently pursuing a Software Engineering degree at the University of Westminster.
			</p>
			<p>
				I enjoy doing open source projects like <a href="https://github.com/Curstantine/melody">these</a>{" "}
				while engaging with the FOSS community. Especially the{" "}
				<a href="https://mozilla-iit.org/">Mozilla Campus Club</a>.
			</p>
			<p class="mt-1">
				You can check my CV <a target="_blank" href={CV}>here</a>.
			</p>
		</div>
	);
}
