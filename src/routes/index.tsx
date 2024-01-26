import About from "~/components/About";
import Attributions from "~/components/Attributions";
import InfoContainer from "~/components/InfoContainer";
import Skills from "~/components/Skills";
import Tools from "~/components/Tools";

export default function Home() {
	return (
		<>
			<InfoContainer />
			<div class="w-full flex flex-col gap-2 px-6">
				<About />
				<Skills />
				<Tools />
				<Attributions />
			</div>
		</>
	);
}
