<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { libraryItems, type LibraryItem } from '$lib/library';
	import TagPill from '$lib/components/TagPill.svelte';

	gsap.registerPlugin(ScrollTrigger);

	function typeLabel(type: LibraryItem['type']) {
		const labels: Record<string, string> = {
			article: 'Article',
			book: 'Book',
			essay: 'Essay',
			podcast: 'Podcast',
			video: 'Video'
		};
		return labels[type] ?? type;
	}

	onMount(() => {
		gsap.utils.toArray('.library-card').forEach((card, index) => {
			gsap.fromTo(
				card as Element,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					delay: 0.1 * index,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: card as Element,
						start: 'top 85%',
						toggleActions: 'play none none none'
					}
				}
			);
		});
	});
</script>

<svelte:head>
	<title>Library - Rishi Ishairzay</title>
	<meta
		name="description"
		content="Books, articles, and other content that have really landed with me."
	/>
</svelte:head>

<section class="text-default px-6 mb-16">
	<h1 class="name mb-16 inline-block">
		<em class="shadow px-2 py-1">Library</em>
	</h1>
	<p>
		Content that has really landed with me — books, articles, essays, and other things
		that have shaped how I think.
	</p>
</section>

<section class="text-default px-6 mb-32">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each libraryItems as item}
			<a
				href={item.url}
				target="_blank"
				rel="noopener noreferrer"
				class="no-underline group block library-card"
			>
				<div
					class="shadow rounded-lg overflow-hidden transition-all duration-200 bg-white/40 border-8 border-white/40 relative h-full flex flex-col"
				>
					<div class="p-5 flex flex-col flex-1">
						<div class="flex items-start justify-between gap-3 mb-3">
							<TagPill tag={typeLabel(item.type)} variant="green" />
						</div>
						<h3 class="text-lg font-bold mb-1 leading-snug">{item.title}</h3>
						<p class="text-sm text-gray-500 mb-3">
							{item.author}{#if item.publication}<span class="mx-1">·</span>{item.publication}{/if}
						</p>
						<p class="text-base text-gray-600 mb-0 mt-auto">{item.note}</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	.library-card {
		transition: transform 0.2s ease;
	}

	.library-card:hover > div {
		transform: rotate(1.5deg);
	}

	.library-card > div::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 3px;
		background-color: #006b56;
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 0.2s ease;
	}

	.library-card:hover > div::after {
		transform: scaleY(1);
	}
</style>
