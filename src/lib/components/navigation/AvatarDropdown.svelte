<script lang="ts">
	import { fly } from 'svelte/transition'
	import Avatar from '../common/Avatar.svelte'
	import NavLink from './NavLink.svelte'
	import { clickOutside } from '$lib/utils'
	import { goto } from '$app/navigation'

	const dropdownLinks = [
		{
			onclick: () => {
				goto('/settings/profile')
				dropdownOpen = false
			},
			label: 'Settings',
		},
	]

	type Props = {
		username: string
		src: string
	}

	let { username, src } = $props<Props>()

	let dropdownOpen = $state(false)
</script>

<div class="relative flex justify-center w-36">
	<button type="button" on:click|stopPropagation={() => (dropdownOpen = !dropdownOpen)}>
		<Avatar size={12} {src} {username} />
	</button>
	{#if dropdownOpen}
		<div
			class="absolute inset-x-0 flex flex-col items-center mx-auto bg-white border rounded-md top-14 w-fit p-3 gap-y-1.5"
			transition:fly={{ y: -10, duration: 200 }}
			use:clickOutside={() => (dropdownOpen = false)}
		>
			{#each dropdownLinks as { onclick, label } (`dropdown-${label}`)}
				<NavLink type="button" {label} {onclick} />
			{/each}
			<form action="/logout" method="POST">
				<button type="submit" class="text-lg hover:text-blue-main">Sign Out</button>
			</form>
		</div>
	{/if}
</div>
