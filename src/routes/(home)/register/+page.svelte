<script lang="ts">
	import { goto } from '$app/navigation'
	import { superForm } from 'sveltekit-superforms/client'
	import Button from '$lib/components/common/Button.svelte'
	import Input from '$lib/components/common/Input.svelte'
	import PasswordInput from '$lib/components/common/PasswordInput.svelte'
	import { message } from '$lib/state/runes.svelte'
	import { SUCCESS_MESSAGES } from '$lib/constants/constants'

	let { data } = $props()

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, {
		taintedMessage: null,
		onUpdated({ form }) {
			if (form.valid) {
				message.value = SUCCESS_MESSAGES.AUTH.NEW_ACCOUNT
				goto('/login')
			}
		},
	})
</script>

<form method="POST" class="space-y-8" use:enhance novalidate>
	<div class="space-y-6">
		<Input
			name="username"
			label="Username"
			bind:value={$form.username}
			error={$errors.username?.[0]}
			{...$constraints.username}
		/>
		<Input name="email" label="Email" bind:value={$form.email} error={$errors.email?.[0]} {...$constraints.email} />
		<PasswordInput
			name="password"
			label="Password"
			bind:value={$form.password}
			error={$errors.password?.[0]}
			{...$constraints.password}
		/>
	</div>
	<div class="space-y-2">
		<Button type="submit" label="Register" color="darkblue" submitting={$submitting} disabled={$submitting} />
		<div class="flex flex-row justify-center w-full text-sm gap-x-2 md:text-base">
			<p>Already have an account?</p>
			<a
				href="/login"
				class="text-blue-main hover:cursor-pointer hover:underline decoration-blue-main underline-offset-1"
			>
				Sign in here!
			</a>
		</div>
	</div>
</form>
