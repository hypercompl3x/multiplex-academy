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
		children: any
	} & ConditionalProps

	let { children, ...props } = $props<Props>()
	const p = { ...props }
</script>

{#if p.type === 'button'}
	<button type="button" onclick={p.onclick} class="flex items-center text-lg hover:text-blue-main group gap-x-1.5">{@render children()}</button>
{:else}
	<a href={p.href} class="flex items-center text-lg hover:text-blue-main group gap-x-1.5">{@render children()}</a>
{/if}
