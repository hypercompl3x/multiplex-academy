<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
	import Avatar from '$lib/components/common/Avatar.svelte'
	import Button from '$lib/components/common/Button.svelte'
	import Input from '$lib/components/common/Input.svelte'
	import Bin from '$lib/components/svgs/Bin.svelte'
	import Pen from '$lib/components/svgs/Pen.svelte'
	import { getImageURL } from '$lib/utils.js'

	let { data } = $props()
	const { collectionId, id, avatar } = data.user

	let selectedAvatar = $state<File | string | undefined>(avatar === '' ? undefined : avatar)
	let src = $derived(
		!selectedAvatar
			? undefined
			: typeof selectedAvatar === 'string'
			  ? getImageURL(collectionId, id, selectedAvatar)
			  : URL.createObjectURL(selectedAvatar),
	)

	const { form, errors, constraints, enhance, submitting, message } = superForm(data.form, {
		taintedMessage: null,
	})

	function onFileUpload(e: { target: EventTarget | null }) {
		const target = e.target as HTMLInputElement
		if (!target?.files) return

		selectedAvatar = target.files[0]
		form.update($form => {
			$form.fileExists = 'yes'
			return $form
		})
	}

	function removeImage() {
		selectedAvatar = undefined
		form.update($form => {
			$form.fileExists = 'no'
			return $form
		})
	}
</script>

<div class="flex flex-col md:items-center md:flex-row gap-x-7">
	<h1 class="text-2xl font-bold">Profile Settings</h1>
	<p class="text-lg font-semibold text-green-main">{$message}</p>
</div>
<div class="w-full h-px my-3 bg-blue-dark/30" />
<form
	method="POST"
	use:enhance
	novalidate
	enctype="multipart/form-data"
	class="flex flex-col sm:flex-row gap-x-8 gap-y-4"
>
	<div>
		<label for="avatar" class="block sm:mx-auto w-fit">Profile Picture</label>
		<div class="relative w-fit">
			<Avatar {src} size={28} username={$form.username} />
			<label
				for="avatar"
				class="box-content absolute w-4 p-2 rounded-full -left-0.5 -bottom-0.5 bg-green-main cursor-pointer"
			>
				<Pen />
			</label>
			{#if selectedAvatar}
				<button
					type="button"
					class="box-content absolute w-4 p-2 rounded-full -right-0.5 -bottom-0.5 bg-red-main cursor-pointer"
					onclick={removeImage}
				>
					<Bin />
				</button>
			{/if}
			<input
				type="file"
				id="avatar"
				name="avatar"
				accept="image/png, image/jpeg, image/jpg"
				onchange={onFileUpload}
				hidden
				disabled={$submitting}
			/>
			<input name="fileExists" type="hidden" bind:value={$form.fileExists} />
		</div>
	</div>
	<div class="flex flex-col justify-center gap-y-6">
		<Input
			name="username"
			label="Username"
			bind:value={$form.username}
			error={$errors.username?.[0]}
			{...$constraints.username}
		/>
		<Button type="submit" label="Update Profile" color="darkblue" submitting={$submitting} disabled={$submitting} />
	</div>
</form>
