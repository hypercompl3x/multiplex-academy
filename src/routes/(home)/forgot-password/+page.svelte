<script lang="ts">
	import { goto } from '$app/navigation'
	import { superForm } from 'sveltekit-superforms/client'
	import Button from '$lib/components/common/Button.svelte'
	import Input from '$lib/components/common/Input.svelte'
	import { message } from '$lib/state/runes.svelte'
	import { SUCCESS_MESSAGES } from '$lib/constants/constants.js'

	let { data } = $props()

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, {
		taintedMessage: null,
		onUpdated({ form }) {
			if (form.valid) {
				message.value = SUCCESS_MESSAGES.AUTH.PASSWORD_REST
				goto('/login')
			}
		},
	})
</script>

<form method="POST" class="space-y-9" use:enhance novalidate>
	<Input name="email" label="Email" bind:value={$form.email} error={$errors.email?.[0]} {...$constraints.email} />
	<div class="mt-5 space-y-2">
		<Button type="submit" label="Request Password Reset" color="darkblue" submitting={$submitting} />
		<div class="flex flex-row justify-center w-full text-sm gap-x-2 md:text-base">
			<p>Already reset your password?</p>
			<a
				href="/login"
				class="text-blue-main hover:cursor-pointer hover:underline decoration-blue-main underline-offset-1"
			>
				Sign in here!
			</a>
		</div>
	</div>
</form>
