import { useFaviconForm } from "~/components/FaviconForm/context";

export default function GenerateButton() {
	const { state } = useFaviconForm();

	return (
		<button type="submit" disabled={state.file === null} class="h-8 w-44 button-accent-1 sm:h-7">Generate</button>
	);
}
