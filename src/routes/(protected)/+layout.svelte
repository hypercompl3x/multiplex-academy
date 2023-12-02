<script lang="ts">
	import AvatarDropdown from '$lib/components/navigation/AvatarDropdown.svelte'
	import NavLink from '$lib/components/navigation/NavLink.svelte'
	import Logo from '$lib/components/svgs/Logo.svelte'

	const navigationLinks = [
		{ href: '/my-courses', label: 'My Courses' },
		{ href: '/browse-courses', label: 'Browse Courses' },
	]

	let { data } = $props()

	let scrollbarAtTop = $state(true)

	function handleScroll() {
		scrollbarAtTop = window.scrollY === 0
	}

	$effect(() => {
		handleScroll()
		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	})
</script>

<nav
	class="box-content fixed flex items-center justify-evenly w-full h-20 gap-x-8 {scrollbarAtTop
		? ''
		: 'bg-white animate-border'} nav"
>
	<div class="flex items-center gap-x-8">
		<a href="/" class="group w-fit">
			<div class="w-60">
				<Logo />
			</div>
		</a>
		{#each navigationLinks as { href, label } (`nav-${label}`)}
			<NavLink type="link" {label} {href} />
		{/each}
	</div>
	<AvatarDropdown src={''} username={data.user.username} />
</nav>
<div class="flex-1 pt-20 bg-grey-light">
	<slot />
</div>

<style>
	.nav {
		border-bottom: solid 1px transparent;
		transition:
			border-bottom 0.25s ease,
			background-color 0.25s ease;
	}

	.animate-border {
		border-bottom-color: #050819;
	}
</style>
