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
	<div
		class="flex flex-col items-center w-full mt-8 md:items-start md:max-w-3xl lg:max-w-4xl md:flex-row md:gap-x-6 gap-y-5"
	>
		<div class="flex flex-col items-center p-4 bg-white border rounded-md w-44 md:w-32 gap-y-6 h-fit">
			{#each tabs as { href, label } (`tab-${label}`)}
				{@const active = $page.url.pathname === href}
				<a {href} class="text-lg hover:text-blue-main {active ? 'font-semibold' : ''}">{label}</a>
			{/each}
		</div>
		<div class="w-full max-w-lg px-5 md:px-0 md:max-w-none">
			<div class="w-full p-5 bg-white border rounded-md"><slot /></div>
		</div>
	</div>
</div>
