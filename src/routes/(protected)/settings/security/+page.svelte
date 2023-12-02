<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import Button from '$lib/components/common/Button.svelte'
	import PasswordInput from '$lib/components/common/PasswordInput.svelte'
	import { message } from '$lib/state/runes.svelte.js'
	import { SUCCESS_MESSAGES } from '$lib/constants/constants.js'

	let { data } = $props()

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, {
		taintedMessage: null,
	})
</script>

<h1 class="text-2xl font-bold">Security Settings</h1>
<div class="w-full h-px my-3 bg-blue-dark/30" />
<form method="POST" use:enhance novalidate enctype="multipart/form-data" class="space-y-7">
	<PasswordInput
		name="oldPassword"
		label="Old Password"
		bind:value={$form.oldPassword}
		error={$errors.oldPassword?.[0]}
		{...$constraints.oldPassword}
	/>
	<PasswordInput
		name="password"
		label="New Password"
		bind:value={$form.password}
		error={$errors.password?.[0]}
		{...$constraints.password}
	/>
	<PasswordInput
		name="passwordConfirm"
		label="New Confirm Password"
		bind:value={$form.passwordConfirm}
		error={$errors.passwordConfirm?.[0]}
		{...$constraints.passwordConfirm}
	/>
	<Button type="submit" label="Update Password" color="darkblue" submitting={$submitting} disabled={$submitting} />
</form>
