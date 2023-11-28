<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import Spinner from './Spinner.svelte'

	type Props = {
		label: string
		submitting?: boolean
	} & HTMLButtonAttributes

	let { label, submitting = false } = $props<Props>()
</script>

<button class="flex items-center justify-center h-10 text-xl font-semibold text-white rounded-md bg-blue-dark w-72">
	{#if submitting}
		<Spinner />
	{:else}
		{label}
	{/if}
</button>
