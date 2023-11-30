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

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, { taintedMessage: null })

	$effect(() => {
		console.log('avatar', avatar)
		console.log($form)
	})

	function onFileUpload(e: { target: EventTarget | null }) {
		const target = e.target as HTMLInputElement
		form.update($form => {
			if (!target?.files) return $form
			$form.avatar = target.files[0]
			$form.fileExists = 'yes'
			return $form
		})
	}

	function removeImage() {
		form.update($form => {
			$form.avatar = ''
			$form.fileExists = 'no'
			return $form
		})
	}
</script>

<h1 class="text-2xl font-bold">Profile Settings</h1>
<div class="w-full h-px my-3 bg-blue-dark/30" />
<form method="POST" use:enhance novalidate enctype="multipart/form-data" class="flex gap-x-8">
	<div>
		<label for="avatar" class="block mx-auto w-fit">Profile Picture</label>
		<div class="relative">
			<Avatar
				size={28}
				src={$form.avatar && typeof $form.avatar !== 'string'
					? URL.createObjectURL($form.avatar)
					: avatar && $form.fileExists === 'yes'
					  ? getImageURL(collectionId, id, avatar)
					  : undefined}
				username={$form.username}
			/>
			<label
				for="avatar"
				class="box-content absolute w-4 p-2 rounded-full -left-0.5 -bottom-0.5 bg-green-main cursor-pointer"
			>
				<Pen />
			</label>
			{#if $form.fileExists === 'yes'}
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
	<div class="flex flex-col justify-between py-2">
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
