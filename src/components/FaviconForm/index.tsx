import type { TarFileInput } from "nanotar";
import type { JSX } from "solid-js";

import { promisifyToBlob, renderSizedCanvas } from "~/utils/canvas";

import ColorPicker from "~/components/FaviconForm/ColorPicker";
import { FaviconFormProvider } from "~/components/FaviconForm/context";
import GenerateButton from "~/components/FaviconForm/GenerateButton";
import FaviconSelector from "~/components/FaviconForm/Selector";

export default function FaviconForm() {
	let canvasRef!: HTMLCanvasElement;

	const onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const generateSizeVariants = formData.get("generate-size-variants") === "on";

		const downloadFavicon = async (size: number, type = "image/png"): Promise<TarFileInput> => {
			const cn = renderSizedCanvas(canvasRef, size);
			const blob = await promisifyToBlob(cn, type);
			if (!blob) throw new Error("Blob not found");

			return {
				name: `favicon@${size}.ico`,
				data: await blob.arrayBuffer(),
			};
		};

		const files: Array<TarFileInput> = [await downloadFavicon(32)];
		if (generateSizeVariants) {
			files.push(
				...await Promise.all([
					downloadFavicon(16),
					downloadFavicon(64),
					downloadFavicon(96),
					downloadFavicon(128),
				]),
			);
		}

		const { createTar } = await import("nanotar");
		const tarBuffer = createTar(files);

		const tarBlob = new Blob([tarBuffer], { type: "application/x-tar" });
		const url = URL.createObjectURL(tarBlob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "favicons.tar";
		link.click();

		URL.revokeObjectURL(url);
	};

	return (
		<FaviconFormProvider>
			<form
				on:submit={onSubmit}
				class="mt-2 grid justify-items-center gap-y-4 gap-x-6 sm:grid-cols-[11rem_1fr] sm:justify-items-start"
			>
				<FaviconSelector ref={canvasRef} />

				<ul class="grid h-fit gap-2 text-sm">
					<li class="inline-flex items-center gap-2">
						<input id="include-extras" name="include-extras" type="checkbox" class="size-4 min-w-4" />
						<label for="include-extras">Include app-icon and icon extras</label>
					</li>
					<li class="inline-flex items-center gap-2">
						<input
							id="generate-size-variants"
							name="generate-size-variants"
							type="checkbox"
							class="size-4 min-w-4"
						/>
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
