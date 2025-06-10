import { createContext, type ParentProps, useContext } from "solid-js";
import { createStore, type SetStoreFunction, type Store } from "solid-js/store";

import type { HSLA } from "~/utils/colors";

type State = { file: File | null; bgColor: HSLA };

type FaviconContextValue = {
	state: Store<State>;
	setState: SetStoreFunction<State>;
};

const FaviconContext = createContext<FaviconContextValue>();

export function FaviconFormProvider(props: ParentProps) {
	const [state, setState] = createStore<State>({ file: null, bgColor: { h: 349, s: 0.95, l: 0.68, a: 1 } });

	return (
		<FaviconContext.Provider value={{ state, setState }}>
			{props.children}
		</FaviconContext.Provider>
	);
}

export function useFaviconForm() {
	const context = useContext(FaviconContext);
	if (!context) throw new Error("useFavicon must be used within a FaviconProvider");
	return context;
}
