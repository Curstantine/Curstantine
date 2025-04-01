import { TinyColor } from "@ctrl/tinycolor";
import { createSignal } from "solid-js";

import ColorPicker from "~/components/ColorPicker";
import FaviconSelector from "~/components/FaviconForm/Selector";

export default function FaviconForm() {
	const [file, setFile] = createSignal<File | null>(null);
	const [bgColor, setBgColor] = createSignal<TinyColor>(new TinyColor("red"));

	return (
		<form class="grid mt-2 justify-items-center gap-6 sm:(grid-cols-[11rem_1fr] justify-items-initial)">
			<FaviconSelector file={file} setFile={setFile} />

			<ul class="grid h-fit gap-2 text-sm">
				<li class="inline-flex items-center gap-2">
					<input id="include-extras" type="checkbox" class="size-4 min-w-4" />
					<label for="include-extras">Include app-icon and icon extras</label>
				</li>
				<li class="inline-flex items-center gap-2">
					<input id="generate-size-variants" type="checkbox" class="size-4 min-w-4" />
					<label for="generate-size-variants">
						Generate size variants (16px, 64px, 96px, 128px)
						<span class="ml-1 text-xs text-text-2">[by default only 32px will be created]</span>
					</label>
				</li>
				<li class="flex flex-col justify-center gap-1">
					<label>Background Color</label>
					<ColorPicker color={bgColor} setColor={setBgColor} />
				</li>
			</ul>
		</form>
	);
}
