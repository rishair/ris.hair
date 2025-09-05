<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import TagPill from '$lib/components/TagPill.svelte';
	import HeartSticker from '$lib/components/HeartSticker.svelte';
	import { formatDate } from '$lib/utils';
	import ScrollHint from '$lib/components/ScrollHint.svelte';

	function withoutFavorite(tags: string[] = []) {
		return tags.filter((t) => t !== 'favorite');
	}

	export let data;

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

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

	// Initialize animations after component is mounted
	onMount(() => {
		// Animate section titles
		gsap.utils.toArray('.section-title').forEach((title) => {
			gsap.fromTo(
				title as Element,
				{
					opacity: 0,
					y: 50
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: title as Element,
						start: 'top 80%',
						toggleActions: 'play none none none'
					}
				}
			);
		});

		// Animate section content
		gsap.utils.toArray('.section-content').forEach((content) => {
			gsap.fromTo(
				content as Element,
				{
					opacity: 0,
					y: 30
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					delay: 0.2,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: content as Element,
						start: 'top 80%',
						toggleActions: 'play none none none'
					}
				}
			);
		});

		// Animate projects with staggered effect
		gsap.utils.toArray('.project-card').forEach((card, index) => {
			gsap.fromTo(
				card as Element,
				{
					opacity: 0,
					y: 30
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					delay: 0.1 * index, // Staggered delay
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
	<title>Rishi Ishairzay</title>
	<meta
		name="description"
		content="I'm a product manager and software developer in Brooklyn, NY."
	/>
</svelte:head>

<!-- Introduction Section -->
<section id="intro" class="text-default px-6 mb-32">
	<h1 class="name mb-16 inline-block">
		Hey there, I'm <em class="shadow px-2 py-1">Rishi Ishairzay</em>
	</h1>
	<h2>
		I'm a <strong>creative AI product engineer</strong> in Brooklyn, NY.
	</h2>

	<p>
		Nowadays, I'm building hyper-local products that connect you to your city (like <a href="/projects/juice">Juice</a> and <a href="https://hopscotchlabs.co/">Beebot</a>). 
	</p>
	<p>
		In my <strong>personal life</strong>, I'm drawn to psychology, evolution, nature, cycling,
		space, improv, yoga, and likely other things by now. I have roots in Virginia, San Francisco,
		and now Brooklyn. My friends and family mean everything to me.
	</p>

	<p>
		In my <strong>career</strong>, I've been a founder (3x), product manager, distributed systems
		engineer, front-end engineer (web & iOS), and many things in between. My more notable
		accomplishments are a 9-year stint at Twitter, bootstrapping a profitable startup with ~200K
		users, and ignoring a cease-and-desist from Activision.
	</p>

	<p>
		I build beautiful products that help people understand themselves, connect with others, explore
		their curiosity, and have fun along the way. In other words, the products I wish existed.
	</p>
	<p>
		Below are some fruits from how I've spent my time. Personal favorites are marked with a
		<HeartSticker rotation={20} position="inline" size="small" />.
	</p>

	<p>
		Say hi at <a href="mailto:hello@ris.hair">hello@ris.hair</a>.
	</p>

	<div class="flex gap-6 items-center justify-center mt-12">
		<a
			href="https://twitter.com/rishair"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Twitter"
		>
			<svg class="w-6 h-6 hover:text-blue-400" fill="#006b56" viewBox="0 0 24 24">
				<path
					d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
				/>
			</svg>
		</a>

		<a
			href="https://clickityclack.substack.com"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Substack"
		>
			<svg class="w-6 h-6 hover:text-orange-500" fill="#006b56" viewBox="0 0 24 24">
				<path
					d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"
				/>
			</svg>
		</a>

		<a
			href="https://linkedin.com/in/rishair"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="LinkedIn"
		>
			<svg class="w-6 h-6 hover:text-blue-600" fill="#006b56" viewBox="0 0 24 24">
				<path
					d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
				/>
			</svg>
		</a>
	</div>
</section>

<ScrollHint />

<!-- Side Quests Section -->
<section id="side-quests" class="text-default px-6 mb-32 pt-16">
	<h2 class="section-title inline-block">
		<em class="shadow px-2 py-1">Projects</em>
	</h2>

	<div class="section-content">
		<p class="mb-8">Collection of personal projects, ranging from prototypes to live products.</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each data.projects as project, i}
				<a href={'/projects/' + project.slug} class="no-underline group block project-card">
					<div
						class="shadow rounded-lg overflow-visible transition-all duration-200 bg-white/40 border-8 border-white/40 relative"
					>
						{#if project.tags && project.tags.includes('favorite')}
							<HeartSticker
								rotation={20}
								position="sticker-top-right"
								size="large"
								borderWidth={3}
							/>
						{/if}
						<img
							src={project.image}
							alt={project.title}
							class="w-full h-48 object-cover rounded-lg"
						/>
						<div class="p-4">
							<h3 class="text-xl font-bold mb-2">{project.title}</h3>
							<p class="text-gray-600 text-base mb-3">{project.description}</p>

							<!-- Display tags -->
							<div class="mb-2">
								{#if project.tags && project.tags.length > 0}
									{#each withoutFavorite(project.tags) as tag}
										<TagPill {tag} variant="grey" />
									{/each}
								{/if}
							</div>

							<p class="text-sm text-gray-500 mb-0">
								{formatDateRange(project.startDate, project.endDate)}
							</p>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Writings Section -->
<section id="writings" class="text-default px-6 mb-32 pt-16">
	<h2 class="section-title inline-block">
		<em class="shadow px-2 py-1">Writings</em>
	</h2>

	<div class="section-content">
		<ul class="space-y-3">
			{#each data.posts as post}
				<li>
					<a
						href={'/posts/' + post.slug}
						class="no-underline block border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white/50 shadow-sm relative"
					>
						<div class="p-4">
							{#if post.tags && post.tags.includes('favorite')}
								<HeartSticker
									rotation={20}
									position="sticker-top-right"
									size="medium"
									borderWidth={3}
								/>
							{/if}
							<div class="flex justify-between items-baseline">
								<h3 class="text-xlg font-medium">{post.title}</h3>
								<span class="text-sm text-gray-500">{formatDate(post.date)}</span>
							</div>
							<p class="text-gray-600 text-base mt-1 mb-1">{post.description}</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	h1 {
		width: 100%;
	}

	/* Make section titles use the same font as the name */
	.section-title {
		font-family: 'Work Sans', sans-serif;
		letter-spacing: -0.03em;
		font-weight: bold;
		font-size: 2em;
	}

	/* Add subtle dividers between sections */
	section:not(:first-child) {
		border-top: 1px solid rgba(0, 107, 86, 0.1); /* Light forest-green */
		position: relative;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	/* Add smooth scrolling behavior */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Project card hover effect */
	.project-card {
		transition: transform 0.2s ease;
	}

	.project-card:hover > div {
		transform: rotate(2deg);
	}

	/* Animated bottom border for project cards */
	.project-card > div::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 3px;
		background-color: theme('colors.orange');
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
		transform: scaleY(0);
		transform-origin: bottom;
		transition: transform 0.2s ease;
	}
	/* 
	.project-card:hover > div::after {
		transform: scaleY(1);
	} */

	/* Writing hover effect */
	#writings li a {
		transition: transform 0.2s ease;
	}

	#writings li a:hover {
		transform: rotate(0.5deg);
	}

	/* Animated bottom border for writings */
	#writings li a::after {
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

	#writings li a:hover::after {
		transform: scaleY(1);
	}
</style>
