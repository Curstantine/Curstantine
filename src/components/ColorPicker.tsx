/**
 * # Credits
 * - React Aria ColorPicker: https://react-spectrum.adobe.com/react-aria/ColorPicker.html
 * - solid-color: https://github.com/xbmlz/solid-color
 * - Math behind colorspace coversions by Nikolai Waldman: https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
 */
import { TinyColor } from "@ctrl/tinycolor";
import { type Accessor, createSignal, type Setter, Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

import styles from "~/styles/ColorPicker.module.css";

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
				<Sheet color={props.color} setColor={props.setColor} close={() => open(!false)} />
			</Show>
		</div>
	);
}

function Sheet(props: Props & { close: () => void }) {
	const rgb = () => props.color().toRgbString();
	const hsl = () => props.color().toHslString();
	const hex = () => props.color().toHexShortString(true);

	const onColorInput = (
		type: "RGB" | "HEX" | "HSL",
		e: Parameters<JSX.ChangeEventHandler<HTMLInputElement, Event>>[0],
	) => {
		props.setColor(new TinyColor(e.target.value, { format: type }));
	};

	return (
		<div class="absolute top-8 grid w-72 gap-2 border border-text-3 bg-background p-2 shadow-lg sm:grid-cols-[13rem_1fr] sm:w-94">
			<div class="grid grid-cols-[1fr_1rem] gap-2">
				<ColorSpace color={props.color} setColor={props.setColor} />
				<AlphaSpace color={props.color} setColor={props.setColor} />
				<HueSpace color={props.color} setColor={props.setColor} />
			</div>
			<ul class="flex flex-col gap-2 text-xs">
				<li class="space-y-0.5">
					<label>Hex</label>
					<input
						type="text"
						value={hex()}
						class="w-full"
						onChange={[onColorInput, "HEX"]}
					/>
				</li>

				<li class="space-y-0.5">
					<label>HSL</label>
					<input
						type="text"
						value={hsl()}
						class="w-full"
						onChange={[onColorInput, "HSL"]}
					/>
				</li>

				<li class="space-y-0.5">
					<label>RGB</label>
					<input
						type="text"
						value={rgb()}
						class="w-full"
						onChange={[onColorInput, "RGB"]}
					/>
				</li>

				<button type="button" class="button-accent-1 mt-1 h-6" onClick={() => props.close()}>
					Apply
				</button>
			</ul>
		</div>
	);
}

export function calculateColorEvent<T extends Event & Pick<MouseEvent, "offsetX" | "offsetY">>(e: T, base: TinyColor) {
	const { clientHeight, clientWidth } = e.target as Element;

	const x = (e.offsetX / clientWidth) * 100;
	const y = (e.offsetY / clientHeight) * 100;

	const saturation = Math.round(Math.max(0, Math.min(x, 100)));
	const lightness = 100 - Math.round(Math.max(0, Math.min(y, 100)));
	const color = base.toHsl();

	return new TinyColor({ ...color, s: saturation, l: lightness });
}

type ColorSpaceProps = Props;
function ColorSpace(props: ColorSpaceProps) {
	const hsl = () => props.color().toHsl();
	const hueBg = () => `hsl(${hsl().h}, 100%, 50%)`;
	const bottom = () => `${hsl().l * 100}%`;
	const left = () => `${hsl().s * 100}%`;

	let isElementDragging = false;

	const onDragStart = (e: DragEvent) => {
		isElementDragging = true;
		e.dataTransfer?.setDragImage(new Image(), 0, 0);
	};

	const onDragEnd = () => {
		isElementDragging = false;
	};

	const onDragOver = (e: DragEvent) => {
		if (!isElementDragging || !e.target || e.target !== e.currentTarget) return;
		const color = calculateColorEvent(e, props.color());
		props.setColor(color);
	};

	const onClick = (e: MouseEvent) => {
		const color = calculateColorEvent(e, props.color());
		props.setColor(color);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		const color = props.color().toHsl();

		switch (e.key) {
			case "ArrowDown":
				if (color.l > 0) color.l -= 0.01;
				break;
			case "ArrowUp":
				if (color.l < 100) color.l += 0.01;
				break;
			case "ArrowRight":
				if (color.s < 100) color.s += 0.01;
				break;
			case "ArrowLeft":
				if (color.s > 0) color.s -= 0.01;
				break;
			default:
				return;
		}

		props.setColor(new TinyColor(color));
	};

	return (
		<div
			class="relative h-42"
			onDragOver={onDragOver}
			onClick={onClick}
			style={{
				background:
					`linear-gradient(to top, black, transparent, white), linear-gradient(to right, rgb(128, 128, 128), transparent), ${hueBg()}`,
			}}
		>
			<div
				draggable="true"
				role="presentation"
				class="absolute z-10 size-2 translate-y-1/2 select-none bg-transparent outline-1 outline-white ring-2 ring-black -translate-x-1/2"
				style={{ left: left(), bottom: bottom() }}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onKeyDown={onKeyDown}
				tabIndex={-1}
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
