<script lang="ts">
	import { fade } from 'svelte/transition'
	import { superForm } from 'sveltekit-superforms/client'
	import Button from '$lib/components/common/Button.svelte'
	import Input from '$lib/components/common/Input.svelte'
	import PasswordInput from '$lib/components/common/PasswordInput.svelte'
	import { message } from '$lib/state/runes.svelte'
	import { untrack } from 'svelte'
	import X from '$lib/components/svgs/X.svelte'

	let { data } = $props()

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, { taintedMessage: null })

	$effect(() => {
		untrack(() => {
			setTimeout(() => {
				message.remove()
			}, 3500)
		})

		return () => message.remove()
	})
</script>

{#if message.value}
	<div
		transition:fade={{ duration: 300 }}
		class="absolute flex flex-row items-center p-2 rounded-md bg-green-light/20 -top-12 whitespace-nowrap gap-x-2"
	>
		<div class="text-lg text-green-main">{message.value}</div>
		<button type="button" class="w-3.5" onclick={() => message.remove()}><X /></button>
	</div>
{/if}
<form method="POST" use:enhance novalidate>
	<div class="space-y-6">
		<Input name="email" label="Email" bind:value={$form.email} error={$errors.email?.[0]} {...$constraints.email} />
		<PasswordInput
			name="password"
			label="Password"
			bind:value={$form.password}
			error={$errors.password?.[0]}
			{...$constraints.password}
		/>
	</div>
	<a
		href="/forgot-password"
		class="block ml-auto md:leading-4 leading-4 text-blue-main hover:cursor-pointer hover:underline decoration-blue-main underline-offset-1 w-fit mt-0.5 md:text-base text-sm"
	>
		Forgot password?
	</a>
	<div class="mt-5 space-y-2">
		<Button type="submit" label="Sign In" color="darkblue" submitting={$submitting} disabled={$submitting} />
		<div class="flex flex-row justify-center w-full text-sm gap-x-2 md:text-base">
			<p>Don't have an account?</p>
			<a
				href="/register"
				class="text-blue-main hover:cursor-pointer hover:underline decoration-blue-main underline-offset-1"
			>
				Register here!
			</a>
		</div>
	</div>
</form>
