<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import ErrorBlock from './ErrorBlock.svelte'
	import { INPUT_STYLES } from '../../constants/stylingConstants'
	import Eye from '../svgs/Eye.svelte'
	import SlashedEye from '../svgs/SlashedEye.svelte'

	const { BASE, BORDER_BASE, BORDER_ERROR } = INPUT_STYLES

	type Props = {
		label: string
		value: string
		error?: string
	} & HTMLInputAttributes

	let { label, value, error, ...rest } = $props<Props>()

	let passwordVisible = $state(false)

	function onEyeClick() {
		passwordVisible = !passwordVisible
	}
</script>

<div class="flex flex-col">
	<label for={label}>{label}</label>
	<div class="relative w-fit">
		{#if passwordVisible}
			<input id={label} bind:value type="text" {...rest} class="{BASE} {error ? BORDER_ERROR : BORDER_BASE} pr-10" />
		{:else}
			<input
				id={label}
				bind:value
				type="password"
				{...rest}
				class="{BASE} {error ? BORDER_ERROR : BORDER_BASE} pr-10"
			/>
		{/if}
		<button type="button" class="absolute inset-y-0 w-6 my-auto right-3" onclick={onEyeClick}>
			{#if passwordVisible}
				<Eye />
			{:else}
				<SlashedEye />
			{/if}
		</button>
	</div>
	<ErrorBlock {error} />
</div>
