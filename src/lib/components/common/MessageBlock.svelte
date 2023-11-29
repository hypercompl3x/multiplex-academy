<script lang="ts">
	type Props = {
		message?: string
	}

	let { message } = $props<Props>()
</script>

<div>
	{#if message}
		<div class="h-4 text-sm leading-4 md:leading-4 md:text-base whitespace-nowrap text-green-main mt-0.5 absolute">
			{message}
		</div>
	{/if}
</div>
