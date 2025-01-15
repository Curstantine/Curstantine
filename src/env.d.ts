/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { AttributifyAttributes } from "unocss/preset-attributify";

interface ImportMetaEnv {
	readonly LISTENBRAINZ_API_TOKEN: string;
	readonly PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "solid-js" {
	namespace JSX {
		interface HTMLAttributes<T> extends AttributifyAttributes {}
	}
}

declare global {
	namespace astroHTML.JSX {
		interface HTMLAttributes extends AttributifyAttributes {}
	}
}
