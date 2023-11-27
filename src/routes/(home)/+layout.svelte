<script>
	import Particles from '$lib/components/particles/Particles.svelte'
	import Logo from '$lib/components/svgs/Logo.svelte'
</script>

<div class="h-screen flex flex-row">
	<div class="h-full sm:max-w-xl w-full flex flex-col items-center justify-center gap-y-4">
		<Logo />
		<slot />
	</div>
	<Particles />
</div>
