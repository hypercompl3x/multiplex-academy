<script>
	import { goto } from '$app/navigation'
	import Button from '$lib/components/common/Button.svelte'
</script>

<div class="code-image">
	<div class="flex flex-col mx-12 lg:flex-row lg:mx-24 xl:mx-36 mt-60 gap-x-8 gap-y-4">
		<div class="w-full text-3xl font-semibold text-white lg:w-1/2 sm:text-5xl xl:text-6xl 2xl:text-7xl">
			Unlock your coding potential at Multiplex Academy
		</div>
		<div class="flex flex-col justify-center w-full lg:w-1/2 gap-y-4">
			<div class="text-base font-semibold text-white lg:text-lg xl:text-xl 2xl:text-2xl">
				Embark on a coding journey and gain valuable skills to thrive in the digital age.
			</div>
			<Button label="Find a course now" type="button" color="blue" onclick={() => goto('/browse-courses')} />
		</div>
	</div>
</div>

<style>
	.code-image {
		flex: 1;
		background-color: black;
		background-size: cover;
		background-repeat: no-repeat;
		background-image: url('$lib/assets/code.jpg');
	}
</style>
