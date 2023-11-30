<script lang="ts">
	import { page } from '$app/stores'

	const tabs = [
		{
			href: '/settings/profile',
			label: 'Profile',
		},
		{
			href: '/settings/account',
			label: 'Account',
		},
		{
			href: '/settings/security',
			label: 'Security',
		},
	]
</script>

<div class="flex justify-center">
	<div class="flex flex-col w-full max-w-4xl mt-8 md:flex-row md:gap-x-4">
		<div class="flex flex-col w-32 p-4 bg-white border rounded-md gap-y-6 h-fit">
			{#each tabs as { href, label } (`tab-${label}`)}
				{@const active = $page.url.pathname === href}
				<a {href} class="text-lg hover:text-blue-main {active ? 'font-semibold' : ''}">{label}</a>
			{/each}
		</div>
		<div class="w-full p-5 bg-white border rounded-md"><slot /></div>
	</div>
</div>
