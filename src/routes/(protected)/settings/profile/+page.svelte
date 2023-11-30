<script lang="ts">
	import Avatar from '$lib/components/common/Avatar.svelte'
	import Button from '$lib/components/common/Button.svelte'
	import Input from '$lib/components/common/Input.svelte'
	import Pen from '$lib/components/svgs/Pen.svelte'
	import { superForm } from 'sveltekit-superforms/client'

	let { data } = $props()

	const { form, errors, constraints, enhance, submitting } = superForm(data.form, { taintedMessage: null })
</script>

<h1 class="text-2xl font-bold">Profile Settings</h1>
<div class="w-full h-px my-3 bg-blue-dark/30" />
<form method="POST" use:enhance novalidate class="flex gap-x-8">
	<div>
		<label for="avatar" class="block mx-auto w-fit">Profile Picture</label>
		<div class="relative">
			<Avatar size={28} src="" username={$form.username} />
			<label
				for="avatar"
				class="box-content absolute w-4 p-2 rounded-full -right-0.5 -bottom-0.5 bg-green-main cursor-pointer"
			>
				<Pen />
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				onchange={() => {}}
				disabled={false}
			/>
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
		<Button type="submit" label="Update Profile" color="darkblue" />
	</div>
</form>
