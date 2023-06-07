import InfoContainer from "./components/InfoContainer";
import About from "./components/About";
import Attributions from "./components/Attributions";
import Skills from "./components/Skills";
import Tools from "./components/Tools";

export default function App() {
	return (
		<>
			<InfoContainer />
			<div class="flex flex-col overflow-y-auto w-full px-6 py-4 mt-2 gap-6">
				<About />
				<Skills />
				<Tools />
				<Attributions />
			</div>
		</>
	);
}
