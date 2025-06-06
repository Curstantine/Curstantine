export type HSLA = {
	/** Hue Range: `0 - 359` */
	h: number;
	/** Range: `0 - 1` */
	s: number;
	/** Range: `0 - 1` */
	l: number;
	/** Range: `0 - 1` */
	a: number;
};

export function toHSLAString(hsla: HSLA): string {
	return `hsla(${hsla.h}, ${hsla.s * 100}%, ${hsla.l * 100}%, ${hsla.a})`;
}
