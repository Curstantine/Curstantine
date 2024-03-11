import { inject as injectAnalytics } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { onMount } from "solid-js";

import About from "~/components/About";
import Attributions from "~/components/Attributions";
import InfoContainer from "~/components/InfoContainer";
import Projects from "~/components/Projects";
import Skills from "~/components/Skills";
import Tools from "~/components/Tools";

export default function Home() {
	onMount(() => {
		injectSpeedInsights();
		injectAnalytics();
	});

	return (
		<>
			<InfoContainer />
			<div class="flex flex-1 flex-col gap-2 px-6">
				<About />
				<Projects />
				<Skills />
				<Tools />
				<Attributions />
			</div>
		</>
	);
}
