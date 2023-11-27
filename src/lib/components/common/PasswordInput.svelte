<script lang="ts">
	type Props = {
		label: string
		value: string
	}

	let { label, value, ...rest } = $props<Props>()
</script>

<div class="flex flex-col text-chiffon-main">
	<label for={label}>{label}</label>
	<input
		class="w-64 focus:outline-none border border-black/25 focus:border-black rounded-md h-8 px-2"
		type="text"
		id={label}
		bind:value
		{...rest}
	/>
</div>
