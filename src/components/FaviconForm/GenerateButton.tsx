import { useFaviconForm } from "~/components/FaviconForm/context";

export default function GenerateButton() {
	const { state } = useFaviconForm();
	return <button type="submit" disabled={state.file === null} class="h-7 w-44 button-accent-2">Generate</button>;
}
