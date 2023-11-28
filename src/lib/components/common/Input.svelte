<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import ErrorBlock from './ErrorBlock.svelte'
	import { INPUT_STYLES } from '../../constants/stylingConstants'

	const { BASE, BORDER_BASE, BORDER_ERROR } = INPUT_STYLES

	type Props = {
		label: string
		value: string
		error?: string
	} & HTMLInputAttributes

	let { label, value, error, ...rest } = $props<Props>()
</script>

<div class="flex flex-col">
	<label for={label}>{label}</label>
	<input class="{BASE} {error ? BORDER_ERROR : BORDER_BASE}" type="text" id={label} bind:value {...rest} />
	<ErrorBlock {error} />
</div>
