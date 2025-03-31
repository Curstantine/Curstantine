/**
 * # Credits
 * - React Aria ColorPicker: https://react-spectrum.adobe.com/react-aria/ColorPicker.html
 * - solid-color: https://github.com/xbmlz/solid-color
 * - Math behind colorspace coversions by Nikolai Waldman: https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
 */
import { TinyColor } from "@ctrl/tinycolor";
import { type Accessor, createSignal, type Setter, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

import styles from "./ColorPicker.module.css";

export type ColorRGB = [number, number, number];
type Props = { color: Accessor<TinyColor>; setColor: Setter<TinyColor> };

export default function ColorPicker(props: Props) {
	const [opened, open] = createSignal();

	const backgroundColor = () => props.color().toHslString();
	const label = () => props.color().toName() || props.color().toHexShortString();

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
	const rgb = () => props.color().toRgbString();
	const hsl = () => props.color().toHslString();
	const hex = () => props.color().toHexString(true);

	return (
		<div class="absolute top-8 grid grid-cols-[13rem_1fr] w-88 gap-2 border border-text-3 bg-background p-2 shadow-lg">
			<div class="grid grid-cols-[1fr_1rem] gap-2">
				<ColorSpace color={props.color} setColor={props.setColor} />
				<AlphaSpace color={props.color} setColor={props.setColor} />
				<HueSpace color={props.color} setColor={props.setColor} />
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

type ColorSpaceProps = Props;
function ColorSpace(props: ColorSpaceProps) {
	const hsl = () => props.color().toHsl();
	// const saturation =
	const hueBg = () => `hsl(${hsl().h}, 100%, 50%)`;

	return (
		<div
			class="relative h-42"
			style={{
				background:
					`linear-gradient(to top, black, transparent, white), linear-gradient(to right, rgb(128, 128, 128), transparent), ${hueBg()}`,
			}}
		>
			<div
				role="presentation"
				class="absolute z-10 size-2 bg-transparent outline-1 outline-white outline-solid ring-2 ring-black -translate-1/2"
				style={{ left: `${hsl().s * 100}%`, bottom: `${hsl().l * 100}%` }}
				onMouseDown={(e) => console.log(e)}
				onMouseUp={(e) => console.log(e)}
			>
				<input
					type="range"
					min={0}
					max={100}
					value={hsl().s}
					class={`${styles.display_selector} absolute sr-only`}
				/>
				<input
					type="range"
					min={0}
					max={100}
					value={hsl().l}
					class={`${styles.display_selector} absolute sr-only`}
				/>
			</div>
		</div>
	);
}

function HueSpace(props: ColorSpaceProps) {
	const hue = () => props.color().toHsl().h;
	const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
		const newColor = props.color().toHsl();
		props.setColor(new TinyColor({ ...newColor, h: e.currentTarget.valueAsNumber }));
	};

	return (
		<div class="relative">
			<div
				class="col-span-full h-4"
				style={{
					background:
						"linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
				}}
			/>

			<input
				type="range"
				min={0}
				max={359}
				value={hue()}
				onInput={onInput}
				class={`${styles.selector} absolute top-0 inset-0 bg-transparent`}
			/>
		</div>
	);
}

function AlphaSpace(props: ColorSpaceProps) {
	const alpha = () => props.color().a * 100;
	const hueBg = () => `hsl(${props.color().toHsl().h}, 100%, 50%)`;

	const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
		const targetValue = e.currentTarget.valueAsNumber / 100;
		const color = props.color().clone();

		if (color.a === targetValue) return;

		color.setAlpha(targetValue);
		props.setColor(color);
	};

	return (
		<div class="relative">
			<div
				class="h-full w-4"
				style={{
					background: `linear-gradient(to bottom, ${hueBg()}, transparent)`,
				}}
			/>

			<input
				type="range"
				min={0}
				max={100}
				value={alpha()}
				aria-label="Increase transparency"
				onInput={onInput}
				class={`${styles.vertical_selector} absolute top-0 inset-0 bg-transparent rotate-180`}
			/>
		</div>
	);
}
