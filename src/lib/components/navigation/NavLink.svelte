<script lang="ts">
	type ConditionalProps =
		| {
				type: 'button'
				onclick: () => void
		  }
		| {
				type: 'link'
				href: string
		  }

	type Props = {
		label: string
	} & ConditionalProps

	let { ...props } = $props<Props>()
	const p = { ...props }
</script>

{#if p.type === 'button'}
	<button type="button" onclick={p.onclick} class="text-lg hover:text-blue-main">{p.label}</button>
{:else}
	<a href={p.href} class="text-lg hover:text-blue-main">{p.label}</a>
{/if}
