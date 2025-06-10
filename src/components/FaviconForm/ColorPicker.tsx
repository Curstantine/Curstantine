/**
 * # Credits
 * - React Aria ColorPicker: https://react-spectrum.adobe.com/react-aria/ColorPicker.html
 * - solid-color: https://github.com/xbmlz/solid-color
 * - Math behind colorspace conversion by Nikolai Waldman: https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
 */
import { type ColorFormats, TinyColor } from "@ctrl/tinycolor";
import { type Accessor, createMemo, createSignal, type JSX, Show } from "solid-js";

import { useFaviconForm } from "~/components/FaviconForm/context";

import styles from "~/styles/ColorPicker.module.css";

export default function ColorPicker() {
	const [opened, open] = createSignal(false);
	const { state } = useFaviconForm();

	const tiny = createMemo(() =>
		new TinyColor({ h: state.bgColor.h, s: state.bgColor.s, l: state.bgColor.l, a: state.bgColor.a }, {
			format: "hsl",
		})
	);

	const backgroundColor = () => tiny().toHslString();
	const label = () => tiny().toName() || tiny().toHexString();

	return (
		<div class="relative flex items-end gap-1">
			<button
				type="button"
				id="picker-button"
				onClick={() => open(!opened())}
				class="h-6 w-24 border border-text-3"
				style={{ "background-color": backgroundColor() }}
			/>
			<span class="text-xs text-text-2">({label()})</span>

			<Show when={opened()}>
				<Sheet tiny={tiny} close={() => open(!false)} />
			</Show>
		</div>
	);
}

type SheetProps = { tiny: Accessor<TinyColor>; close: () => void };
function Sheet(props: SheetProps) {
	const { setState } = useFaviconForm();

	const rgb = () => props.tiny().toRgbString();
	const hsl = () => props.tiny().toHslString();
	const hex = () => props.tiny().toHexShortString(true);

	const onColorInput: JSX.BoundChangeEventHandlerFn<ColorFormats, HTMLInputElement> = (type, e) => {
		const base = new TinyColor(e.target.value, { format: type });
		setState("bgColor", base.toHsl());
	};

	return (
		<div class="absolute top-8 grid w-72 gap-2 border border-text-3 bg-background p-2 shadow-lg sm:grid-cols-[13rem_1fr] sm:w-108">
			<div class="grid grid-cols-[1fr_1rem] gap-2">
				<ColorSpace />
				<AlphaSpace />
				<HueSpace />
			</div>
			<ul class="flex flex-col gap-2 text-xs">
				<li class="space-y-0.5">
					<label>Hex</label>
					<input
						type="text"
						value={hex()}
						class="w-full font-mono"
						onChange={[onColorInput, "hex"]}
					/>
				</li>

				<li class="space-y-0.5">
					<label>HSL</label>
					<input
						type="text"
						value={hsl()}
						class="w-full font-mono"
						onChange={[onColorInput, "hsl"]}
					/>
				</li>

				<li class="space-y-0.5">
					<label>RGB</label>
					<input
						type="text"
						value={rgb()}
						class="w-full font-mono"
						onChange={[onColorInput, "rgb"]}
					/>
				</li>

				<button type="button" class="button-accent-1 mt-1 h-6" onClick={() => props.close()}>
					Apply
				</button>
			</ul>
		</div>
	);
}

export function calculateColorEvent<T extends Event & Pick<MouseEvent, "offsetX" | "offsetY">>(e: T) {
	const { clientHeight, clientWidth } = e.target as Element;

	const x = (e.offsetX / clientWidth) * 100;
	const y = (e.offsetY / clientHeight) * 100;

	const saturation = Math.trunc(Math.max(0, Math.min(x, 100)));
	const lightness = Math.trunc(100 - Math.max(0, Math.min(y, 100)));

	return { saturation: saturation / 100, lightness: lightness / 100 };
}

function ColorSpace() {
	const { state, setState } = useFaviconForm();

	const hueBg = () => `hsl(${state.bgColor.h}, 100%, 50%)`;
	const bottom = () => `${state.bgColor.l * 100}%`;
	const left = () => `${state.bgColor.s * 100}%`;

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
		const color = calculateColorEvent(e);
		console.log(color);

		setState("bgColor", { s: color.saturation, l: color.lightness });
	};

	const onClick = (e: MouseEvent) => {
		const color = calculateColorEvent(e);
		setState("bgColor", { s: color.saturation, l: color.lightness });
	};

	const onKeyDown = (e: KeyboardEvent) => {
		switch (e.key) {
			case "ArrowDown":
				if (state.bgColor.l > 0) setState("bgColor", "l", (x) => x - 0.01);
				break;
			case "ArrowUp":
				if (state.bgColor.l < 100) setState("bgColor", "l", (x) => x + 0.01);
				break;
			case "ArrowRight":
				if (state.bgColor.s < 100) setState("bgColor", "s", (x) => x + 0.01);
				break;
			case "ArrowLeft":
				if (state.bgColor.s > 0) setState("bgColor", "s", (x) => x - 0.01);
				break;
			default:
				return;
		}
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
				class="absolute z-10 size-2 translate-y-1/2 select-none bg-transparent outline-1 outline-white ring-2 ring-black -translate-x-1/2 touch-pan-y touch-pan-x"
				style={{ left: left(), bottom: bottom() }}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onKeyDown={onKeyDown}
				tabIndex={-1}
			>
				<input
					id="color-range-s"
					type="range"
					min={0}
					max={100}
					value={state.bgColor.s}
					class={`${styles.display_selector} absolute sr-only`}
				/>
				<input
					id="color-range-l"
					type="range"
					min={0}
					max={100}
					value={state.bgColor.l}
					class={`${styles.display_selector} absolute sr-only`}
				/>
			</div>
		</div>
	);
}

function HueSpace() {
	const { state, setState } = useFaviconForm();

	const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
		setState("bgColor", "h", e.currentTarget.valueAsNumber);
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
				value={state.bgColor.h}
				onInput={onInput}
				class={`${styles.selector} absolute top-0 inset-0 bg-transparent`}
			/>
		</div>
	);
}

function AlphaSpace() {
	const { state, setState } = useFaviconForm();

	const alpha = () => state.bgColor.a * 100;
	const hueBg = () => `hsl(${state.bgColor.h}, 100%, 50%)`;

	const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
		const targetValue = e.currentTarget.valueAsNumber / 100;
		if (state.bgColor.a === targetValue) return;
		setState("bgColor", "a", targetValue);
	};

	return (
		<div class="relative">
			<div
				class="h-full w-4"
				style={{ background: `linear-gradient(to bottom, ${hueBg()}, transparent)` }}
			/>

			<input
				type="range"
				min={0}
				max={100}
				value={alpha()}
				onInput={onInput}
				aria-label="Adjust alpha channel"
				class={`${styles.vertical_selector} absolute top-0 inset-0 bg-transparent`}
			/>
		</div>
	);
}
