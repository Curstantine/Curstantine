export type HSLA = { h: number; s: number; l: number; a: number };

export function toHSLAString(hsla: HSLA): string {
	return `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;
}
