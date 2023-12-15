<script lang="ts">
	import { fly } from 'svelte/transition'
	import AvatarDropdown from '$lib/components/navigation/AvatarDropdown.svelte'
	import NavLink from '$lib/components/navigation/NavLink.svelte'
	import Logo from '$lib/components/svgs/Logo.svelte'
	import Menu from '$lib/components/svgs/Menu.svelte'
	import { getImageURL } from '$lib/utils.js'

	const navigationLinks = [
		{ href: '/my-courses', label: 'My Courses' },
		{ href: '/browse-courses', label: 'Browse Courses' },
	]

	let { data } = $props()
	const { collectionId, id, avatar, username } = $derived(data.user)

	let mobileNavOpen = $state(false)
</script>

<nav class="box-border fixed items-center hidden w-full h-20 bg-white border-b md:flex justify-evenly gap-x-8">
	<div class="flex items-center gap-x-8">
		<a href="/" class="group w-60">
			<Logo />
		</a>
		{#each navigationLinks as { href, label } (`nav-${label}`)}
			<NavLink type="link" {href}>{label}</NavLink>
		{/each}
	</div>
	<AvatarDropdown src={avatar ? getImageURL(collectionId, id, avatar) : undefined} {username} />
</nav>
<nav class="box-border fixed z-20 w-full h-16 bg-white border-b md:hidden">
	<div class="flex items-center justify-between h-full px-6">
		<a href="/" class="group w-52">
			<Logo />
		</a>
		<button type="button" class="z-20 w-5" onclick={() => (mobileNavOpen = !mobileNavOpen)}>
			<Menu />
		</button>
	</div>
</nav>
{#if mobileNavOpen}
	<div class="absolute flex w-full h-full" transition:fly={{ y: -10, duration: 200 }}>
		<div class="flex-1 mt-16 bg-white">HEY</div>
	</div>
{/if}
<div class="flex flex-col pt-16 md:pt-20 grow bg-grey-light">
	<slot />
</div>
