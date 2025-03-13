import { type Accessor, Match, Switch } from "solid-js";

type Props = {
	file: Accessor<File | null>;
	setFile: (file: File | null) => void;
};

export default function FaviconSelector(props: Props) {
	return (
		<div class="w-40 flex flex-col gap-2">
			<label class="size-44 inline-flex flex-col items-center justify-center border border-text-3 border-dashed">
				<Switch>
					<Match when={props.file()}>
						{(file) => (
							<img
								class="size-full object-cover"
								src={URL.createObjectURL(file())}
								alt="Preview"
							/>
						)}
					</Match>

					<Match when={props.file() === null}>
						<span class="text-4xl">↥↥</span>
						<span class="text-center text-sm text-text-1">
							Pick or drag-n-drop image here
						</span>
					</Match>
				</Switch>

				<input
					type="file"
					class="hidden"
					accept="image/*"
					onInput={(e) => {
						const file = e.target.files?.[0];
						if (file) props.setFile(file);
					}}
				/>
			</label>
		</div>
	);
}
