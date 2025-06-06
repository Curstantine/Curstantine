import type { AttributifyAttributes } from "unocss/preset-attributify";

declare module "solid-js" {
	namespace JSX {
		type BoundEventHandlerFn<D, El extends Element, E extends Event> = (
			data: D,
			...event: Parameters<JSX.EventHandler<El, E>>
		) => void;

		type BoundChangeEventHandlerFn<D, El extends Element, E extends Event = Event> = (
			data: D,
			...event: Parameters<JSX.ChangeEventHandler<El, E>>
		) => void;

		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface HTMLAttributes extends AttributifyAttributes {
		}
	}
}

declare global {
	namespace astroHTML.JSX {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface HTMLAttributes extends AttributifyAttributes {
		}
	}
}
