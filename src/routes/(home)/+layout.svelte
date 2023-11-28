<script>
	import Particles from '$lib/components/particles/Particles.svelte'
	import Logo from '$lib/components/svgs/Logo.svelte'
</script>

<div class="flex flex-row h-screen">
	<div class="flex flex-col items-center justify-center w-full h-full sm:max-w-xl gap-y-8">
		<Logo />
		<slot />
	</div>
	<Particles />
</div>
