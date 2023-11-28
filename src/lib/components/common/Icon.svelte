<script lang="ts">
	import Eye from '../svgs/Eye.svelte'
	import SlashedEye from '../svgs/SlashedEye.svelte'

	const icons = {
		eye: Eye,
		slashedEye: SlashedEye,
	}

	type Props = {
		icon: keyof typeof icons
	}

	let { icon } = $props<Props>()
</script>

<svelte:component this={icons[icon]} />
