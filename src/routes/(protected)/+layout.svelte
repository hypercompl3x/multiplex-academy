<script lang="ts">
	import AvatarDropdown from '$lib/components/navigation/AvatarDropdown.svelte'
	import NavLink from '$lib/components/navigation/NavLink.svelte'
	import Logo from '$lib/components/svgs/Logo.svelte'
	import { getImageURL } from '$lib/utils.js'

	const navigationLinks = [
		{ href: '/my-courses', label: 'My Courses' },
		{ href: '/browse-courses', label: 'Browse Courses' },
	]

	let { data } = $props()
	let { collectionId, id, avatar, username } = $derived(data.user)

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

<nav class="box-content fixed flex items-center w-full h-20 bg-white border-b justify-evenly gap-x-8">
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
	<AvatarDropdown src={avatar ? getImageURL(collectionId, id, avatar) : undefined} {username} />
</nav>
<div class="flex flex-col pt-20 grow bg-grey-light">
	<slot />
</div>
