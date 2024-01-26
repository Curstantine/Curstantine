import About from "~/components/About";
import Attributions from "~/components/Attributions";
import InfoContainer from "~/components/InfoContainer";
import Skills from "~/components/Skills";
import Tools from "~/components/Tools";

export default function Home() {
	return (
		<>
			<InfoContainer />
			<div class="flex flex-col w-full px-6 gap-2">
				<About />
				<Skills />
				<Tools />
				<Attributions />
			</div>
		</>
	);
}
