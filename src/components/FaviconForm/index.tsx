import { createSignal } from "solid-js";
import FaviconSelector from "~/components/FaviconForm/Selector";

export default function FaviconForm() {
	const [file, setFile] = createSignal<File | null>(null);

	return (
		<form class="grid grid-cols-[11rem_1fr] mt-8 gap-6">
			<FaviconSelector file={file} setFile={setFile} />

			<div class="flex flex-col gap-1">
				<span>Remove Transparency</span>
				<span>Background Color</span>
				<span>Export to app-icon</span>
			</div>
		</form>
	);
}
