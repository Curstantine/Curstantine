import { CV } from "~/utils/constants";

export default function About() {
	return (
		<div id="about" class="prose md:max-w-2xl">
			<h2>#about</h2>
			<p>
				I am Rachala Ovin, a frontend developer, and a designer of sorts. <br />{" "}
				Currently pursuing a Software Engineering degree at University of Westminster. (IIT, LK)
			</p>
			<p>
				I enjoy doing open source projects like <a href="https://github.com/Curstantine/melody">these</a>{" "}
				while engaging with the FOSS community, especially with my university's{" "}
				<a href="https://mozilla-iit.org/">Mozilla Campus Club</a>.
			</p>
			<p>
				Check my CV <a target="_blank" href={CV}>here</a>.
			</p>
		</div>
	);
}
