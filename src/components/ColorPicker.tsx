import { type Accessor, createSignal, type Setter, Show } from "solid-js";

export type ColorRGB = [number, number, number];
type Props = { color: Accessor<ColorRGB>; setColor: Setter<ColorRGB> };

export default function ColorPicker(props: Props) {
	const [opened, open] = createSignal();

	const rgb = () => `rgb(${props.color()[0]}, ${props.color()[1]}, ${props.color()[2]})`;
	const label = () => {
		const cx = props.color();
		return cx.some((x) => x === -1) ? "Transparent" : rgb();
	};

	return (
		<div class="relative flex items-end gap-1">
			<button
				type="button"
				onClick={() => open(!opened())}
				class="h-6 w-24 border border-text-3"
				style={{ "background-color": rgb() }}
			/>
			<span class="text-xs text-text-2">({label()})</span>

			<Show when={!opened()}>
				<Sheet color={props.color} setColor={props.setColor} />
			</Show>
		</div>
	);
}

function Sheet(props: Props) {
	const [hue, setHue] = createSignal<ColorRGB>([256, 0, 127]);

	return (
		<div class="absolute top-8 grid grid-cols-[12rem_1fr] w-78 gap-2 border border-text-3 bg-background p-2 shadow-lg">
			<div class="flex flex-col gap-2">
				<ColorSpace hue={hue} setHue={setHue} color={props.color} setColor={props.setColor} />
				<div
					class="h-4 w-full"
					style={{
						background:
							"linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
					}}
				/>
			</div>
			<ul class="flex flex-col gap-2 text-xs">
				<li class="space-y-0.5">
					<label>Hex</label>
					<input type="text" class="w-full" />
				</li>

				<li class="space-y-0.5">
					<label>hsl</label>
					<input type="text" class="w-full" />
				</li>

				<li class="grid grid-cols-3 gap-1">
					<div>
						<label>R</label>
						<input type="text" class="w-full" />
					</div>
					<div>
						<label>G</label>
						<input type="text" class="w-full" />
					</div>
					<div>
						<label>B</label>
						<input type="text" class="w-full" />
					</div>
				</li>
			</ul>
		</div>
	);
}

type ColorSpaceProps = Props & { hue: Accessor<ColorRGB>; setHue: Setter<ColorRGB> };
function ColorSpace(props: ColorSpaceProps) {
	const hueBg = () => `rgb(${props.hue()[0]}, ${props.hue()[1]}, ${props.hue()[2]})`;

	return (
		<div class="relative h-36" style={{ "background-color": hueBg() }}>
			<div class="absolute size-full bg-gradient-from-white bg-gradient-to-r" />
			<div class="absolute size-full bg-gradient-from-black bg-gradient-to-t" />
		</div>
	);
}
