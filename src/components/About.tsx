import { getAge } from "../utils";

export default function About() {
	return (
		<div id="about">
			<h2>#about</h2>
			<p class="leading-relaxed">
				I'm Rachala Ovin, a {getAge()} years old developer from Sri Lanka. <br />{" "}
				I'm currently pursuing a Software Engineering degree at the Informatics Institute of Technology.
				<br />
				My forte is in frontend web and mobile development, but I do regularly dabble in UI/UX designing and
				systems programming.
			</p>
		</div>
	);
}
