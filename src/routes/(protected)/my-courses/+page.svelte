<script>
	import Course from '$lib/components/common/Course.svelte'

	const courses = [{ name: 'React', progress: 27 }]
</script>

<div class="w-full mx-16 mt-6">
	{#each courses as { name, progress } (`course-${name}`)}
		<Course {name} {progress} />
	{/each}
</div>
