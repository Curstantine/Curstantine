import { CV } from "~/utils/constants";

export default function About() {
	return (
		<div id="about">
			<h2>#about</h2>
			<p class="leading-relaxed">
				I'm Rachala Ovin, a frontend developer, and a designer of sorts. <br />
				I'm currently pursuing a Software Engineering degree at University of Westminster (Informatics Institute
				of Technology, LK).
			</p>
			<p>
				I enjoy doing open source projects like <a href="https://github.com/Curstantine/melody">these</a>{" "}
				while engaging with the FOSS community, especially with my university's{" "}
				<a href="https://mozilla-iit.org/">Mozilla Campus Club</a>.
			</p>
			<p class="mt-1">
				Check my CV <a target="_blank" href={CV}>here</a>.
			</p>
		</div>
	);
}
