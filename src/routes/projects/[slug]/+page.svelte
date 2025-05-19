<script lang="ts">
	import { processMarkdown } from '$lib/utils';
	import { onMount } from 'svelte';
	import TagPill from '$lib/components/TagPill.svelte';
	import HeartSticker from '$lib/components/HeartSticker.svelte';
	import { fade, fly } from 'svelte/transition';

	export let data: { project: any; prevProject: any; nextProject: any };

	// Make these reactive to data changes
	$: project = data.project;
	$: prevProject = data.prevProject;
	$: nextProject = data.nextProject;
	$: processedDescription = processMarkdown(project.fullDescription);
	$: tagsNoFavorite = project?.tags
		? (project.tags as string[]).filter((t) => t !== 'favorite')
		: [];
	$: atAGlanceHtml = processMarkdown(project.atAGlance.map((p: string) => `-> ${p}`).join('\n'));

	// Function to format date range for projects
	function formatDateRange(startDate: string, endDate: string | undefined) {
		if (!endDate) {
			return `${startDate} - Current`;
		}
		if (startDate === endDate) {
			return startDate;
		}
		return `${startDate} - ${endDate}`;
	}

	// Define image interface
	interface GalleryImage {
		src: string;
		caption?: string;
		type: string;
	}

	// State variables for the lightbox
	let isLightboxOpen = false;
	let currentImageIndex = 0;
	let currentImageSrc = '';
	let currentImageCaption = '';

	// Combined gallery of project gallery images and inline markdown images
	let allImages: GalleryImage[] = [];

	// Function to handle keyboard events
	function handleKeydown(event: KeyboardEvent): void {
		if (!isLightboxOpen) return;

		switch (event.key) {
			case 'Escape':
				closeLightbox();
				break;
			case 'ArrowLeft':
				showPrevImage();
				break;
			case 'ArrowRight':
				showNextImage();
				break;
		}
	}

	// Function to open the lightbox for gallery images
	function openLightbox(index: number): void {
		currentImageIndex = index;
		currentImageSrc = allImages[index].src;
		currentImageCaption = allImages[index].caption || '';
		isLightboxOpen = true;
		// Add keyboard event listener when lightbox opens
		window.addEventListener('keydown', handleKeydown);
	}

	// Function to open the lightbox for inline markdown images
	function openLightboxForMarkdownImage(src: string, caption: string): void {
		// Find the index of this image in the allImages array
		const index = allImages.findIndex((img) => img.src === src);
		if (index !== -1) {
			openLightbox(index);
		} else {
			// If not found in the array (shouldn't happen), just show the image directly
			currentImageSrc = src;
			currentImageCaption = caption || '';
			currentImageIndex = -1; // Special value to indicate it's not in the gallery
			isLightboxOpen = true;
			// Add keyboard event listener when lightbox opens
			window.addEventListener('keydown', handleKeydown);
		}
	}

	// Function to close the lightbox
	function closeLightbox(): void {
		isLightboxOpen = false;
		// Remove keyboard event listener when lightbox closes
		window.removeEventListener('keydown', handleKeydown);
	}

	// Functions to navigate between images
	function showPrevImage(): void {
		if (allImages.length > 0) {
			currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
			currentImageSrc = allImages[currentImageIndex].src;
			currentImageCaption = allImages[currentImageIndex].caption || '';
		}
	}

	function showNextImage(): void {
		if (allImages.length > 0) {
			currentImageIndex = (currentImageIndex + 1) % allImages.length;
			currentImageSrc = allImages[currentImageIndex].src;
			currentImageCaption = allImages[currentImageIndex].caption || '';
		}
	}

	// After the component is mounted, set up click handlers for markdown images
	onMount(() => {
		// Create the combined gallery
		allImages = [
			...(project.gallery || []),
			// Add any markdown images that aren't already in the gallery
			...Array.from(document.querySelectorAll('.markdown-image, .markdown-video')).map((el) => {
				const isVideo = el.classList.contains('markdown-video');
				const caption = el.getAttribute('data-caption');
				if (isVideo) {
					return {
						src: el.querySelector('source')?.getAttribute('src'),
						caption: caption,
						type: 'video'
					};
				} else {
					return {
						src: el.getAttribute('src'),
						type: 'image',
						caption: el.getAttribute('data-caption')
					};
				}
			})
		];

		// Add click handlers to all markdown images
		document.querySelectorAll('.markdown-image, .markdown-video').forEach((img) => {
			img.addEventListener('click', () => {
				openLightboxForMarkdownImage(
					img.getAttribute('src') || img.querySelector('source')?.getAttribute('src') || '',
					img.getAttribute('data-caption') || ''
				);
			});
		});
	});

	// Update gallery when project changes
	$: if (typeof window !== 'undefined' && project) {
		// Only run this in the browser
		setTimeout(() => {
			allImages = [
				...(project.gallery || []),
				...Array.from(document.querySelectorAll('.markdown-image, .markdown-video')).map((el) => {
					const isVideo = el.classList.contains('markdown-video');
					const caption = el.getAttribute('data-caption');
					if (isVideo) {
						return {
							src: el.querySelector('source')?.getAttribute('src'),
							caption: caption,
							type: 'video'
						};
					} else {
						return {
							src: el.getAttribute('src'),
							type: 'image',
							caption: el.getAttribute('data-caption')
						};
					}
				})
			];

			// Add click handlers to all markdown images
			document.querySelectorAll('.markdown-image, .markdown-video').forEach((img) => {
				img.addEventListener('click', () => {
					openLightboxForMarkdownImage(
						img.getAttribute('src') || img.querySelector('source')?.getAttribute('src') || '',
						img.getAttribute('data-caption') || ''
					);
				});
			});
		}, 0);
	}
</script>

<svelte:head>
	<title>{project.title} / Rishi</title>
	<meta name="description" content={project.description} />
</svelte:head>

<section class="text-default px-6">
	<h1 class="name mb-2 relative">
		<em class="shadow px-2 py-1">{project.title}</em>
		{#if project.tags && project.tags.includes('favorite')}
			<HeartSticker />
		{/if}
	</h1>

	<!-- Display date -->
	<p class="my-2">
		{formatDateRange(project.startDate, project.endDate)}
	</p>

	<!-- Display tags -->
	<div class="mb-6">
		{#if tagsNoFavorite.length > 0}
			{#each tagsNoFavorite as tag}
				<TagPill {tag} variant="green" />
			{/each}
		{/if}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-12">
		<div class="lg:col-span-3">
			<h2 class="text-xl font-bold mb-4">At a Glance</h2>
			<div class="prose">
				{@html atAGlanceHtml}
			</div>
		</div>

		<div class="lg:col-span-1">
			<img src={project.image} alt={project.title} class="w-full rounded-lg shadow mb-4" />
			{#if project.link}
				<div class="flex justify-center">
					<a
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						class="bg-link-color text-white px-4 py-2 rounded hover:opacity-90"
					>
						Visit
					</a>
				</div>
			{/if}
		</div>
	</div>

	<div class="prose max-w-none">
		<h2 class="text-xl font-bold mb-4">About this Project</h2>
		<div class="mb-8">
			{@html processedDescription}
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
				{#if allImages.length > 1}
					<button
						class="absolute left-0 top-1/2 -translate-y-1/2 text-white text-5xl focus:outline-none hover:text-gray-300"
						on:click|stopPropagation={showPrevImage}
					>
						&lsaquo;
					</button>
					<button
						class="absolute right-0 top-1/2 -translate-y-1/2 text-white text-5xl focus:outline-none hover:text-gray-300"
						on:click|stopPropagation={showNextImage}
					>
						&rsaquo;
					</button>
				{/if}

				<!-- Image and caption container -->
				<div class="w-full">
					{#if allImages[currentImageIndex]?.type === 'video'}
						<video
							src={currentImageSrc}
							class="w-full rounded-lg"
							autoplay
							muted
							loop
							playsinline
							controls
							poster="/video/fallback.jpg"
						>
							<source src="${allImages[currentImageIndex]?.src}" type="video/mp4" />
							${allImages[currentImageIndex]?.caption ||
								'Your browser does not support the video tag.'}
						</video>
					{:else}
						<img src={currentImageSrc} alt={currentImageCaption} class="w-full rounded-lg" />
					{/if}

					{#if currentImageCaption}
						<p class="text-center text-white mt-4">
							{currentImageCaption}
						</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<hr class="my-8" />
	<div class="flex justify-between">
		{#if prevProject}
			<a
				href="/projects/{prevProject.slug}"
				class="text-link-color hover:underline"
				data-sveltekit-preload-data
			>
				← {prevProject.title}
			</a>
		{/if}
		{#if nextProject}
			<a
				href="/projects/{nextProject.slug}"
				class="text-link-color hover:underline ml-auto"
				data-sveltekit-preload-data
			>
				{nextProject.title} →
			</a>
		{/if}
	</div>
</section>

<style>
	/* Optional styling for smooth transitions */
	img {
		max-height: 80vh;
		object-fit: contain;
	}
</style>
