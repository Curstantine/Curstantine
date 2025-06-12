import type { TarFileInput } from "nanotar";

import { convertRawToIco } from "~/utils/ico";

export function contain(
	parentWidth: number,
	parentHeight: number,
	childWidth: number,
	childHeight: number,
) {
	const childRatio = childWidth / childHeight;
	const parentRatio = parentWidth / parentHeight;
	let width = parentWidth;
	let height = parentHeight;

	if (childRatio > parentRatio) {
		height = width / childRatio;
	} else {
		width = height * childRatio;
	}

	return {
		width,
		height,
		offsetX: (parentWidth - width) / 2,
		offsetY: (parentHeight - height) / 2,
	};
}

export function isTransparencySupported(mimeType: string): boolean {
	const transparentFormats = ["image/png", "image/gif", "image/webp", "image/svg+xml"];
	return transparentFormats.includes(mimeType.toLowerCase());
}

function renderSizedCanvas(source: HTMLCanvasElement, size: number) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = size;
	canvas.height = size;

	ctx?.drawImage(source, 0, 0, size, size);

	return canvas;
}

function getImageData(canvas: HTMLCanvasElement) {
	const ctx = canvas.getContext("2d");
	return ctx?.getImageData(0, 0, canvas.width, canvas.height);
}

function promisifyToBlob(canvas: HTMLCanvasElement, type?: string, quality?: number): Promise<Blob | null> {
	return new Promise((resolve) => {
		canvas.toBlob(resolve, type, quality);
	});
}

export async function getIconData(
	canvasRef: HTMLCanvasElement,
	size: number,
	name: string,
	type = "image/x-icon",
): Promise<TarFileInput> {
	const cn = renderSizedCanvas(canvasRef, size);

	if (type === "image/x-icon") {
		const imageData = getImageData(cn);
		if (imageData?.data === undefined) throw new Error("Failed to get image data from canvas");

		return {
			name,
			data: convertRawToIco({ data: imageData?.data, info: { height: size, width: size } }),
		};
	}

	const blob = await promisifyToBlob(cn, type);
	if (!blob) throw new Error("Blob not found");

	return { name, data: await blob.arrayBuffer() };
}
