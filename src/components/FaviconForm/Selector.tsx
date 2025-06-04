import type { JSX } from "solid-js";
import { createSignal, Show } from "solid-js";

import { useFaviconForm } from "~/components/FaviconForm/context";

export default function FaviconSelector() {
	const { state, setState } = useFaviconForm();

	return (
		<Show
			when={state.file}
			fallback={<Input />}
		>
			{(file) => (
				<div class="group relative size-44 inline-flex flex-col items-center justify-center border border-text-3 border-dashed">
					<img
						class="size-full object-cover"
						src={URL.createObjectURL(file())}
						alt="Preview"
					/>

					<button
						type="button"
						class="absolute right-1 top-1 grid size-6 place-items-center bg-background/75 opacity-0 transition-opacity group-hover:opacity-100"
						onClick={() => setState("file", null)}
					>
						<div class="iconify material-symbols--close-small size-5" />
					</button>
				</div>
			)}
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
