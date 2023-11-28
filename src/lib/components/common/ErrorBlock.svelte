<script lang="ts">
	type Props = {
		error?: string
	}

	let { error } = $props<Props>()
</script>

<div>
	{#if error}
		<div class="h-4 md:leading-4 text-sm leading-4 md:text-base whitespace-nowrap text-red-main mt-0.5 absolute">
			{error}
		</div>
	{/if}
</div>
