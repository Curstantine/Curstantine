/**
 * Initial extract from https://github.com/itgalaxy/favicons/blob/master/src/ico.ts
 */

const HEADER_SIZE = 6;
const DIRECTORY_SIZE = 16;
const COLOR_MODE = 0;
const BITMAP_SIZE = 40;

type RawImage = { data: Uint8Array | Uint8ClampedArray; info: { width: number; height: number } };

function createHeader(n: number) {
	const buf = new ArrayBuffer(HEADER_SIZE);
	const view = new DataView(buf);

	view.setUint16(0, 0, true);
	view.setUint16(2, 1, true);
	view.setUint16(4, n, true);

	return new Uint8Array(buf);
}

function createDirectory(image: RawImage, offset: number) {
	const buf = new ArrayBuffer(DIRECTORY_SIZE);
	const view = new DataView(buf);
	const { width, height } = image.info;
	const size = width * height * 4 + BITMAP_SIZE;
	const bpp = 32;

	view.setUint8(0, width === 256 ? 0 : width);
	view.setUint8(1, height === 256 ? 0 : height);
	view.setUint8(2, 0);
	view.setUint8(3, 0);
	view.setUint16(4, 1, true);
	view.setUint16(6, bpp, true);
	view.setUint32(8, size, true);
	view.setUint32(12, offset, true);

	return new Uint8Array(buf);
}

function createBitmap(image: RawImage, compression: number) {
	const buf = new ArrayBuffer(BITMAP_SIZE);
	const view = new DataView(buf);
	const { width, height } = image.info;

	view.setUint32(0, BITMAP_SIZE, true);
	view.setInt32(4, width, true);
	view.setInt32(8, height * 2, true);
	view.setUint16(12, 1, true);
	view.setUint16(14, 32, true);
	view.setUint32(16, compression, true);
	view.setUint32(20, width * height, true);
	view.setInt32(24, 0, true);
	view.setInt32(28, 0, true);
	view.setUint32(32, 0, true);
	view.setUint32(36, 0, true);

	return new Uint8Array(buf);
}

function createDib(image: RawImage) {
	const { width, height } = image.info;
	const imageData = image.data;
	const buf = new Uint8Array(width * height * 4);

	for (let y = 0; y < height; ++y) {
		for (let x = 0; x < width; ++x) {
			const offset = (y * width + x) * 4;
			const r = imageData[offset];
			const g = imageData[offset + 1];
			const b = imageData[offset + 2];
			const a = imageData[offset + 3];
			const pos = (height - y - 1) * width + x;

			if (r === undefined || g === undefined || b === undefined || a === undefined) {
				throw new Error(`Invalid pixel data at position (${x}, ${y}): RGBA values cannot be undefined`);
			}

			buf[pos * 4] = b;
			buf[pos * 4 + 1] = g;
			buf[pos * 4 + 2] = r;
			buf[pos * 4 + 3] = a;
		}
	}

	return buf;
}

export function convertRawToIco(image: RawImage) {
	const header = createHeader(1);
	const offset = HEADER_SIZE + DIRECTORY_SIZE;

	const bitmapHeader = createBitmap(image, COLOR_MODE);
	const dib = createDib(image);

	const bitmap = new Uint8Array(bitmapHeader.length + dib.length);
	bitmap.set(bitmapHeader, 0);
	bitmap.set(dib, bitmapHeader.length);

	const directory = createDirectory(image, offset);

	const totalLength = header.length + directory.length + bitmap.length;
	const result = new Uint8Array(totalLength);

	let pos = 0;
	result.set(header, pos);
	pos += header.length;
	result.set(directory, pos);
	pos += directory.length;
	result.set(bitmap, pos);

	return result;
}
