import type { Accessor, Setter } from "solid-js";

export type ColorRGB = [number, number, number];
type Props = { color: Accessor<ColorRGB>; setColor: Setter<ColorRGB> };

export default function ColorPicker(props: Props) {
	const rgb = () => `rgb(${props.color()[0]}, ${props.color()[1]}, ${props.color()[2]})`;
	const label = () => {
		const cx = props.color();
		return cx.some((x) => x === -1) ? "Transparent" : rgb();
	};

	return (
		<div class="flex items-end gap-1">
			<div class="h-6 w-24 border border-text-3" style={{ "background-color": rgb() }} />
			<span class="text-xs text-text-2">({label()})</span>
		</div>
	);
}
