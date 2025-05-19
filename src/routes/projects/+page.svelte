<script>
	export let data;

	function formatDateRange(startDate, endDate) {
		if (!endDate) {
			return `${startDate} - Current`;
		}
		if (startDate === endDate) {
			return startDate;
		}
		return `${startDate} - ${endDate}`;
	}
</script>

<svelte:head>
	<title>Projects / Rishi</title>
	<meta name="description" content="Projects and work by Rishi Ishairzay" />
</svelte:head>

<section class="text-default px-6">
	<h1 class="name mb-16 inline-block">
		<em class="shadow px-2 py-1">Projects</em>
	</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		{#each data.projects as project}
			<a href="/projects/{project.slug}" class="group block">
				<div class="shadow hover rounded-lg overflow-hidden transition-all duration-200">
					<img src={project.image} alt={project.title} class="w-full h-48 object-cover" />
					<div class="p-6">
						<h2 class="text-xl font-bold mb-2">{project.title}</h2>
						<p class="text-gray-600 mb-2">{project.description}</p>
						<p class="text-sm text-gray-500">
							{formatDateRange(project.startDate, project.endDate)}
						</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>
