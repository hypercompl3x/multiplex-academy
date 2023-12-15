<script lang="ts">
	import { fly } from 'svelte/transition'
	import Avatar from '../common/Avatar.svelte'
	import NavLink from './NavLink.svelte'
	import { clickOutside } from '$lib/utils'
	import { goto } from '$app/navigation'
	import Logout from '../svgs/Logout.svelte'
	import Settings from '../svgs/Settings.svelte'

	const dropdownLinks = [
		{
			onclick: () => {
				goto('/settings/profile')
				dropdownOpen = false
			},
			label: 'Settings',
			icon: Settings,
		},
	]

	type Props = {
		username: string
		src?: string
	}

	let { username, src } = $props<Props>()

	let dropdownOpen = $state(false)

	function onAvatarClick(e: MouseEvent) {
		e.stopPropagation()
		dropdownOpen = !dropdownOpen
	}
</script>

<div class="relative flex justify-center w-36">
	<button type="button" onclick={onAvatarClick}>
		<Avatar size={12} {src} {username} />
	</button>
	{#if dropdownOpen}
		<div
			class="absolute inset-x-0 flex flex-col mx-auto bg-white border rounded-md top-14 w-fit p-3 gap-y-1.5"
			transition:fly={{ y: -10, duration: 200 }}
			use:clickOutside={() => (dropdownOpen = false)}
		>
			{#each dropdownLinks as { onclick, label, icon: Icon } (`dropdown-${label}`)}
				<NavLink type="button" {onclick}
					><div class="w-5"><Icon /></div>
					{label}</NavLink
				>
			{/each}
			<form action="/logout" method="POST">
				<button type="submit" class="flex items-center text-lg group gap-x-1.5 hover:text-blue-main"
					><div class="w-5"><Logout /></div>
					Sign Out</button
				>
			</form>
		</div>
	{/if}
</div>
