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

export function renderSizedCanvas(source: HTMLCanvasElement, size: number) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = size;
	canvas.height = size;

	ctx?.drawImage(source, 0, 0, size, size);

	return canvas;
}

export function promisifyToBlob(canvas: HTMLCanvasElement, type?: string, quality?: number): Promise<Blob | null> {
	return new Promise((resolve) => {
		canvas.toBlob(resolve, type, quality);
	});
}
