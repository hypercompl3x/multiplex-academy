<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import Button from '$lib/components/common/Button.svelte'
	import Input from '$lib/components/common/Input.svelte'
	import PasswordInput from '$lib/components/common/PasswordInput.svelte'
	import { goto } from '$app/navigation'

	let { data } = $props()

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, {
		taintedMessage: null,
		onUpdated({ form }) {
			if (form.valid) {
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
		<Button type="submit" label="Register" submitting={$submitting} />
		<div class="flex flex-row justify-center w-full gap-x-2">
			<p>Already created an account?</p>
			<a
				href="/login"
				class="text-blue-main hover:cursor-pointer hover:underline decoration-blue-main underline-offset-1"
			>
				Sign in here!
			</a>
		</div>
	</div>
</form>
