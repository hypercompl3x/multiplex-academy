<script lang="ts">
	import { untrack } from 'svelte'
	import particlesConfig from './particleOptions'

	$effect(() => {
		untrack(() => {
			const script = document.createElement('script')
			script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
			script.onload = () => particlesJS('particles', particlesConfig)
			document.head.appendChild(script)
		})
	})
</script>

<div id="particles" class="hidden w-full h-full bg-blue-dark sm:block" />
