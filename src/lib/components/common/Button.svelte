<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'
	import Spinner from './Spinner.svelte'

	const COLORS = {
		darkblue: 'bg-blue-dark',
		blue: 'bg-blue-main',
		orange: 'bg-orange-main',
		red: 'bg-red-main',
		ice: 'bg-ice-main',
		green: 'bg-green-main',
		darkgreen: 'bg-green-dark',
	}

	type Props = {
		label: string
		color: keyof typeof COLORS
		submitting?: boolean
	} & HTMLButtonAttributes

	let { label, color, submitting = false, ...rest } = $props<Props>()
</script>

<button
	class="{COLORS[color]} flex items-center justify-center h-10 text-xl font-semibold text-white rounded-md w-72"
	{...rest}
>
	{#if submitting}
		<Spinner />
	{:else}
		{label}
	{/if}
</button>
