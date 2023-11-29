<script lang="ts">
	import Logo from '$lib/components/svgs/Logo.svelte'
	import { untrack } from 'svelte'

	const navigationItems = [{ href: '/browse-courses', label: 'Browse Courses' }]

	let scrollbarAtTop = $state(true)

	function handleScroll() {
		scrollbarAtTop = window.scrollY === 0
	}

	$effect(() => {
		untrack(() => {
			scrollbarAtTop = window.scrollY === 0
			window.addEventListener('scroll', handleScroll)
		})

		return () => window.removeEventListener('scroll', handleScroll)
	})
</script>

<nav
	class="box-content fixed flex items-center justify-center w-full h-20 gap-x-8 {scrollbarAtTop
		? 'bg-ice-light'
		: 'bg-white border-visible'} nav"
>
	<a href="/" class="group w-fit">
		<div class="w-60">
			<Logo />
		</div>
	</a>
	{#each navigationItems as { href, label }}
		<a {href} class="text-lg hover:text-blue-main">{label}</a>
	{/each}
</nav>
<div class="flex-1 mt-20 bg-ice-light">
	<slot />
</div>

<style>
	.nav {
		border-bottom: solid 1px transparent;
		transition:
			border-bottom 0.25s ease,
			background-color 0.25s ease;
	}

	.border-visible {
		border-bottom-color: #050819;
	}
</style>
