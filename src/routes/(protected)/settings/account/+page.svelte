<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import Button from '$lib/components/common/Button.svelte'
	import Input from '$lib/components/common/Input.svelte'

	let { data } = $props()

	const { form, errors, constraints, enhance, submitting, message } = superForm(data.form, { taintedMessage: null })
</script>

<div class="flex flex-col md:items-center md:flex-row gap-x-7">
	<h1 class="text-2xl font-bold">Account Settings</h1>
	<p class="text-lg font-semibold text-green-main">{$message}</p>
</div>
<div class="w-full h-px my-3 bg-blue-dark/30" />
<form method="POST" use:enhance novalidate enctype="multipart/form-data" class="space-y-7">
	<Input name="email" label="Email" bind:value={$form.email} error={$errors.email?.[0]} {...$constraints.email} />
	<Button type="submit" label="Update Email" color="darkblue" submitting={$submitting} disabled={$submitting} />
</form>
