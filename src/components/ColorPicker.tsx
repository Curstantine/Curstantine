/**
 * # Credits
 * - React Aria ColorPicker: https://react-spectrum.adobe.com/react-aria/ColorPicker.html
 * - solid-color: https://github.com/xbmlz/solid-color
 */
import { TinyColor } from "@ctrl/tinycolor";
import { type Accessor, createSignal, type Setter, Show } from "solid-js";

export type ColorRGB = [number, number, number];
type Props = { color: Accessor<TinyColor>; setColor: Setter<TinyColor> };

export default function ColorPicker(props: Props) {
	const [opened, open] = createSignal();

	const backgroundColor = () => props.color().toHslString();
	const label = () => props.color().toName();

	return (
		<div class="relative flex items-end gap-1">
			<button
				type="button"
				onClick={() => open(!opened())}
				class="h-6 w-24 border border-text-3"
				style={{ "background-color": backgroundColor() }}
			/>
			<span class="text-xs text-text-2">({label()})</span>

			<Show when={!opened()}>
				<Sheet color={props.color} setColor={props.setColor} />
			</Show>
		</div>
	);
}

function Sheet(props: Props) {
	const [hue, setHue] = createSignal(0);

	const rgb = () => props.color().toRgbString();
	const hsl = () => props.color().toHslString();
	const hex = () => props.color().toHexString(true);

	return (
		<div class="absolute top-8 grid grid-cols-[13rem_1fr] w-88 gap-2 border border-text-3 bg-background p-2 shadow-lg">
			<div class="grid grid-cols-[1fr_1rem] gap-2">
				<ColorSpace hue={hue} color={props.color} setColor={props.setColor} />
				<AlphaSpace hue={hue} />
				<div
					class="col-span-full h-4"
					style={{
						background:
							"linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
					}}
				/>
			</div>
			<ul class="flex flex-col gap-2 text-xs">
				<li class="space-y-0.5">
					<label>Hex</label>
					<input type="text" value={hex()} class="w-full" />
				</li>

				<li class="space-y-0.5">
					<label>HSL</label>
					<input type="text" value={hsl()} class="w-full" />
				</li>

				<li class="space-y-0.5">
					<label>RGB</label>
					<input type="text" value={rgb()} class="w-full" />
				</li>
			</ul>
		</div>
	);
}

type ColorSpaceProps = Props & { hue: Accessor<number> };
function ColorSpace(props: ColorSpaceProps) {
	const hueBg = () => "black";

	return (
		<div class="relative h-36" style={{ "background-color": hueBg() }}>
			<div class="absolute size-full bg-gradient-from-white bg-gradient-to-r" />
			<div class="absolute size-full bg-gradient-from-black bg-gradient-to-t" />
		</div>
	);
}

function AlphaSpace(props: Pick<ColorSpaceProps, "hue">) {
	const hueBg = () => `rgb(${props.hue()[0]}, ${props.hue()[1]}, ${props.hue()[2]})`;

	return (
		<div
			class="w-4"
			style={{
				background: `linear-gradient(to bottom, ${hueBg()}, transparent)`,
			}}
		/>
	);
}
