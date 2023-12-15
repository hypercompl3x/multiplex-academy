<script lang="ts">
	const totalBarWidth = 222

	type Props = {
		name: string
		progress: number
	}

	let { name, progress } = $props<Props>()

	const progressWidth = (progress / 100) * totalBarWidth
</script>

<div
	class="flex flex-col items-center w-64 px-4 pt-1.5 pb-3 bg-white border rounded-md border-blue-dark gap-y-2 text-xl font-semibold"
>
	<div class="flex items-center gap-x-2">
		<a href="/my-courses/{name}" class="hover:text-blue-main">{name} </a>
		<div>{progress}%</div>
	</div>
	<div class="w-full h-5 overflow-hidden rounded-md bg-blue-dark">
		<div class="h-full bg-red-main" style="width: {progressWidth}px" />
	</div>
</div>
