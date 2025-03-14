import { type Accessor, type Setter, Show } from "solid-js";

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
						class="absolute right-1 top-1 grid size-8 place-items-center bg-background/75 opacity-0 transition-opacity group-hover:opacity-100"
						onClick={() => props.setFile(null)}
					>
						<div class="i-symbols-close-small size-6" />
					</button>
				</div>
			)}
		</Show>
	);
}

function Input(props: Pick<Props, "setFile">) {
	return (
		<label
			onDragOver={(e) => e.preventDefault()}
			onDragLeave={(e) => e.preventDefault()}
			onDrop={(e) => {
				e.preventDefault();
				const file = e.dataTransfer?.files?.[0];
				if (file) props.setFile(file);
			}}
			class="size-44 inline-flex flex-col items-center justify-center gap-1 border border-text-3 border-dashed transition-colors hover:bg-text-3/10"
		>
			<span class="i-symbols-upload-file-outline-sharp pointer-events-none size-10" />
			<span class="pointer-events-none text-center text-sm text-text-1">
				Pick or drag-n-drop image here
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
