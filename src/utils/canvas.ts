export function contain(
	parentWidth: number,
	parentHeight: number,
	childWidth: number,
	childHeight: number,
) {
	const childRatio = childWidth / childHeight;
	const parentRatio = parentWidth / parentHeight;
	let width = parentWidth;
	let height = parentHeight;

	if (childRatio > parentRatio) {
		height = width / childRatio;
	} else {
		width = height * childRatio;
	}

	return {
		width,
		height,
		offsetX: (parentWidth - width) / 2,
		offsetY: (parentHeight - height) / 2,
	};
}
