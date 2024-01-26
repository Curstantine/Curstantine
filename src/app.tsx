// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";

import "./app.css";
import "virtual:uno.css";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>Curstantine</Title>
					<Suspense>{props.children}</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
