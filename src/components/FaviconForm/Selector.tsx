import type { JSX } from "solid-js";
import { createEffect, createSignal, onCleanup, Show } from "solid-js";

import { contain } from "~/utils/canvas";
import { type HSLA, toHSLAString } from "~/utils/colors";

import { useFaviconForm } from "~/components/FaviconForm/context";

export default function FaviconSelector() {
	const { state, setState } = useFaviconForm();

	let canvasRef!: HTMLCanvasElement;
	let offscreen!: HTMLCanvasElement;

	const init = (e: HTMLCanvasElement) => {
		canvasRef = e;

		if (!offscreen) {
			offscreen = document.createElement("canvas");
			offscreen.width = canvasRef.width;
			offscreen.height = canvasRef.height;
		}

		if (!state.file) return;
		const ctx = offscreen.getContext("2d")!;

		const img = new Image();
		img.src = URL.createObjectURL(state.file);
		img.onload = () => {
			const {
				offsetX,
				offsetY,
				width,
				height,
			} = contain(canvasRef.width, canvasRef.height, img.width, img.height);
			ctx.drawImage(img, offsetX, offsetY, width, height);
			render(state.bgColor);
		};
	};

	const closeFile = () => {
		const ctx = offscreen.getContext("2d")!;
		ctx.clearRect(0, 0, offscreen.width, offscreen.height);
		setState("file", null);
	};

	const render = (bgColor: HSLA) => {
		if (!canvasRef) return;
		const ctx = canvasRef.getContext("2d")!;

		ctx.fillStyle = toHSLAString(bgColor);
		ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);
		ctx.drawImage(offscreen, 0, 0);
	};

	createEffect(() => {
		// Note: state is a proxied store. The tracking scope only knows to fire when
		// a nested property like bgColor.h is changed. So we need to defined all of the
		// acceptable changes like this
		render({ h: state.bgColor.h, s: state.bgColor.s, l: state.bgColor.l, a: state.bgColor.a });

		onCleanup(() => {
			if (!canvasRef) return;
			const ctx = canvasRef.getContext("2d")!;
			ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
		});
	});

	return (
		<Show when={state.file} fallback={<Input />}>
			<div class="group relative size-44 inline-flex flex-col items-center justify-center border border-text-3 border-dashed">
				<canvas ref={(e) => init(e)} width={300} height={300} class="size-full" />

				<button
					type="button"
					class="absolute right-1 top-1 grid size-6 place-items-center bg-background/75 opacity-0 transition-opacity group-hover:opacity-100"
					onClick={closeFile}
				>
					<div class="iconify material-symbols--close-small size-5" />
				</button>
			</div>
		</Show>
	);
}

function Input() {
	const { setState } = useFaviconForm();
	const [dragging, setDragging] = createSignal(false);

	const onDragEvent: JSX.BoundEventHandlerFn<boolean, HTMLLabelElement, DragEvent> = (data, event) => {
		event.preventDefault();
		setDragging(data);
	};

	return (
		<label
			onDragOver={[onDragEvent, true]}
			onDragLeave={[onDragEvent, false]}
			onDrop={(e) => {
				e.preventDefault();
				const file = e.dataTransfer?.files?.[0];
				if (file) setState("file", file);
			}}
			class="size-44 inline-flex flex-col items-center justify-center gap-1 border border-text-3 border-dashed transition-colors hover:bg-text-3/10 px-4"
			classList={{ "bg-text-3/10": dragging() }}
		>
			<span class="iconify material-symbols--upload-file-outline-sharp pointer-events-none size-10" />
			<span class="pointer-events-none text-center text-sm text-text-1">
				{dragging() ? "Drop right here!" : "Pick or drag-n-drop image here"}
			</span>

			<input
				hidden
				type="file"
				accept="image/*"
				onInput={(e) => {
					const file = e.target.files?.[0];
					if (file) setState("file", file);
				}}
			/>
		</label>
	);
}
