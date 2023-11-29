<script>
	import Particles from '$lib/components/particles/Particles.svelte'
	import Logo from '$lib/components/svgs/Logo.svelte'
</script>

<div class="flex flex-row h-screen">
	<div class="flex flex-col items-center justify-center w-full h-full md:max-w-xl">
		<div class="relative flex flex-col items-center gap-y-8">
			<div class="md:w-96 sm:w-80 w-72">
				<Logo />
			</div>
			<slot />
		</div>
	</div>
	<Particles />
</div>
