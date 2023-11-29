<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import ErrorBlock from './ErrorBlock.svelte'
	import MessageBlock from './MessageBlock.svelte'
	import { INPUT_STYLES } from '../../constants/stylingConstants'

	const { BASE, BORDER_BASE, BORDER_ERROR } = INPUT_STYLES

	type Props = {
		label: string
		value: string
		error?: string
		message?: string
	} & HTMLInputAttributes

	let { label, value, error, message, ...rest } = $props<Props>()
</script>

<div class="flex flex-col">
	<label for={label}>{label}</label>
	<input class="{BASE} {error ? BORDER_ERROR : BORDER_BASE}" type="text" id={label} bind:value {...rest} />
	<ErrorBlock {error} />
	<MessageBlock {message} />
</div>
