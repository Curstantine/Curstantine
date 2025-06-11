import ColorPicker from "~/components/FaviconForm/ColorPicker";
import { FaviconFormProvider } from "~/components/FaviconForm/context";
import GenerateButton from "~/components/FaviconForm/GenerateButton";
import FaviconSelector from "~/components/FaviconForm/Selector";

export default function FaviconForm() {
	return (
		<FaviconFormProvider>
			<form class="mt-2 grid justify-items-center gap-y-4 gap-x-6 sm:grid-cols-[11rem_1fr] sm:justify-items-start">
				<FaviconSelector />

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
						<label for="picker-button">Background Color</label>
						<ColorPicker />
					</li>
				</ul>

				<GenerateButton />
			</form>
		</FaviconFormProvider>
	);
}
