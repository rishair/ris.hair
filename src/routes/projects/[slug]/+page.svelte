<script>
	export let data;
	const project = data.project;

	// State variables for the lightbox
	let isLightboxOpen = false;
	let currentImageIndex = 0;

	// Function to open the lightbox
	function openLightbox(index) {
		currentImageIndex = index;
		isLightboxOpen = true;
	}

	// Function to close the lightbox
	function closeLightbox() {
		isLightboxOpen = false;
	}

	// Functions to navigate between images
	function showPrevImage() {
		currentImageIndex = (currentImageIndex - 1 + project.gallery.length) % project.gallery.length;
	}

	function showNextImage() {
		currentImageIndex = (currentImageIndex + 1) % project.gallery.length;
	}
</script>

<svelte:head>
	<title>{project.title} | Rishi Ishairzay</title>
	<meta name="description" content={project.description} />
</svelte:head>

<section class="text-default px-6">
	<h1 class="name mb-8">
		<em class="shadow px-2 py-1">{project.title}</em>
	</h1>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
		<div class="lg:col-span-3">
			<h2 class="text-xl font-bold mb-4">At a Glance</h2>
			<ul class="important-list mb-6">
				{#each project.atAGlance as point}
					<li class="mb-2">{point}</li>
				{/each}
			</ul>
		</div>

		<div class="lg:col-span-1">
			<img src={project.image} alt={project.title} class="w-full rounded-lg shadow mb-4" />
			<div class="flex justify-center">
				<a
					href={project.link}
					target="_blank"
					rel="noopener noreferrer"
					class="bg-link-color text-white px-4 py-2 rounded hover:opacity-90"
				>
					Visit Project
				</a>
			</div>
		</div>
	</div>

	<div class="prose max-w-none">
		<h2 class="text-xl font-bold mb-4">About this Project</h2>
		<div class="mb-8">
			{@html project.fullDescription}
		</div>

		{#if project.gallery?.length}
			<h2 class="text-xl font-bold mb-4">Gallery</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				{#each project.gallery as image, index}
					<figure class="mb-4">
						<!-- Make images clickable to open the lightbox -->
						<button
							on:click={() => openLightbox(index)}
							class="focus:outline-none bg-transparent border-none"
						>
							<img
								src={image.src}
								alt={image.caption}
								class="w-full rounded-lg shadow transform hover:scale-105 transition-transform duration-200"
							/>
						</button>
						{#if image.caption}
							<figcaption class="text-sm text-gray-500 mt-2">{image.caption}</figcaption>
						{/if}
					</figure>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Lightbox Modal -->
	{#if isLightboxOpen}
		<div
			class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
			on:click={closeLightbox}
		>
			<!-- Container with space for outside navigation -->
			<div class="relative max-w-5xl w-full px-16" on:click|stopPropagation>
				<!-- Navigation buttons - now outside the image -->
				<button
					class="absolute left-0 top-1/2 -translate-y-1/2 text-white text-5xl focus:outline-none hover:text-gray-300"
					on:click={showPrevImage}
				>
					&lsaquo;
				</button>
				<button
					class="absolute right-0 top-1/2 -translate-y-1/2 text-white text-5xl focus:outline-none hover:text-gray-300"
					on:click={showNextImage}
				>
					&rsaquo;
				</button>

				<!-- Image and caption container -->
				<div class="w-full">
					<img
						src={project.gallery[currentImageIndex].src}
						alt={project.gallery[currentImageIndex].caption}
						class="w-full rounded-lg"
					/>

					{#if project.gallery[currentImageIndex].caption}
						<p class="text-center text-white mt-4">
							{project.gallery[currentImageIndex].caption}
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	/* Optional styling for smooth transitions */
	img {
		max-height: 80vh;
		object-fit: contain;
	}
</style>
