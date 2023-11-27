<script lang="ts">
	type Props = {
		label: string
	}
	let { label } = $props<Props>()
</script>

<button class="bg-blue-dark text-white font-semibold text-xl w-64 h-10 rounded-md" onclick={() => {}}>
	{label}
</button>
