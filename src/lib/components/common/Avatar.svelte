<script lang="ts">
	const SIZES = {
		12: { avatar: 'w-12 h-12', initial: 'text-3xl' },
		28: { avatar: 'w-28 h-28', initial: 'text-8xl' },
	}

	type Props = {
		src: string
		username: string
		size: keyof typeof SIZES
	}

	let { src, username, size } = $props<Props>()
</script>

<div
	class="{SIZES[size]
		.avatar} flex items-center justify-center overflow-hidden rounded-full right-20 bg-blue-dark select-none"
>
	{#if src}
		<img {src} alt="Avatar" class="object-cover w-full h-full rounded-full" />
	{:else}
		<span class="{SIZES[size].initial} font-medium text-white">{username[0].toUpperCase()}</span>
	{/if}
</div>
