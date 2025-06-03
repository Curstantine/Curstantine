import type { JSX } from "solid-js";
import { type Accessor, createSignal, type Setter, Show } from "solid-js";

type Props = {
	file: Accessor<File | null>;
	setFile: Setter<File | null>;
};

export default function FaviconSelector(props: Props) {
	return (
		<Show
			when={props.file()}
			fallback={<Input setFile={props.setFile} />}
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
						onClick={() => props.setFile(null)}
					>
						<div class="iconify material-symbols--close-small size-5" />
					</button>
				</div>
			)}
		</Show>
	);
}

function Input(props: Pick<Props, "setFile">) {
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
				if (file) props.setFile(file);
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
					if (file) props.setFile(file);
				}}
			/>
		</label>
	);
}
