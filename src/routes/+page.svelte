<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import TagPill from '$lib/components/TagPill.svelte';

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
		I'm an independent <strong>AI product engineer</strong> in Brooklyn, NY.
	</h2>

	<p>
		Nowadays I'm building a hyper-local event discovery platform at <a href="https://juice.com"
			>Juice</a
		>. See my previous exploits <a href="#side-quests">below</a>.
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
		Say hi at <a href="mailto:hello@ris.hair">hello@ris.hair</a>.
	</p>

	<div class="flex gap-6 items-center justify-center mt-12">
		<a
			href="https://twitter.com/rishair"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Twitter"
		>
			<svg class="w-6 h-6 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
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
			<svg class="w-6 h-6 hover:text-orange-500" fill="currentColor" viewBox="0 0 24 24">
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
			<svg class="w-6 h-6 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
				<path
					d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
				/>
			</svg>
		</a>
	</div>
</section>

<!-- Side Quests Section -->
<section id="side-quests" class="text-default px-6 mb-32 pt-16">
	<h2 class="section-title mb-16 inline-block">
		<em class="shadow px-2 py-1">Side Quests</em>
	</h2>

	<div class="section-content">
		<p class="mb-8">Recent passion projects I've worked on.</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			{#each data.projects as project, i}
				<a href="/projects/{project.slug}" class="group block project-card">
					<div
						class="shadow hover rounded-lg overflow-hidden transition-all duration-200 bg-white/40 border-8 border-white/40"
					>
						<img
							src={project.image}
							alt={project.title}
							class="w-full h-48 object-cover rounded-lg"
						/>
						<div class="p-4">
							<h3 class="text-xl font-bold mb-2">{project.title}</h3>
							<p class="text-gray-600 mb-2">{project.description}</p>

							<!-- Display tags -->
							<div class="mb-2">
								{#if project.tags && project.tags.length > 0}
									{#each project.tags as tag}
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

<!-- Learning Journey Section -->
<!-- <section id="learning-journey" class="text-default px-6 mb-32 pt-16">
	<h2 class="section-title mb-16 inline-block">
		<em class="shadow px-2 py-1">Learning Journey</em>
	</h2>

	<div class="section-content">
		<p class="mb-8">
			I believe in continuous learning and growth. Here are some of the transformative learning
			experiences that have shaped my perspective and skills.
		</p>

		<div class="space-y-4">
			<a
				href="https://productintuition.com"
				target="_blank"
				rel="noopener noreferrer"
				class="block hover:bg-gray-50 transition-colors"
			>
				<div
					class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b border-gray-100 pb-4"
				>
					<div class="flex-1">
						<h3 class="text-lg font-bold">Product Intuition Course</h3>
						<p class="text-gray-600 text-sm">
							A deep dive into product thinking, user psychology, and building products that people
							love.
						</p>
					</div>
					<div class="text-sm text-gray-500 md:text-right whitespace-nowrap">2023</div>
				</div>
			</a>

			<a
				href="https://www.deeplearning.ai"
				target="_blank"
				rel="noopener noreferrer"
				class="block hover:bg-gray-50 transition-colors"
			>
				<div
					class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b border-gray-100 pb-4"
				>
					<div class="flex-1">
						<h3 class="text-lg font-bold">AI & Machine Learning Course</h3>
						<p class="text-gray-600 text-sm">
							Comprehensive study of modern AI systems, focusing on practical applications and
							ethical considerations.
						</p>
					</div>
					<div class="text-sm text-gray-500 md:text-right whitespace-nowrap">2023</div>
				</div>
			</a>

			<a
				href="https://artofaccomplishment.com"
				target="_blank"
				rel="noopener noreferrer"
				class="block hover:bg-gray-50 transition-colors"
			>
				<div
					class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b border-gray-100 pb-4"
				>
					<div class="flex-1">
						<h3 class="text-lg font-bold">Art of Accomplishment (AoA)</h3>
						<p class="text-gray-600 text-sm">
							A transformative program focused on personal growth, leadership, and creating
							meaningful impact.
						</p>
					</div>
					<div class="text-sm text-gray-500 md:text-right whitespace-nowrap">2022</div>
				</div>
			</a>

			<a
				href="https://www.ucbtheatre.com"
				target="_blank"
				rel="noopener noreferrer"
				class="block hover:bg-gray-50 transition-colors"
			>
				<div
					class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b border-gray-100 pb-4"
				>
					<div class="flex-1">
						<h3 class="text-lg font-bold">Improv Comedy Classes</h3>
						<p class="text-gray-600 text-sm">
							Studied improvisational comedy to enhance creativity, spontaneity, and collaborative
							skills.
						</p>
					</div>
					<div class="text-sm text-gray-500 md:text-right whitespace-nowrap">2022</div>
				</div>
			</a>

			<a
				href="https://www.masterclass.com"
				target="_blank"
				rel="noopener noreferrer"
				class="block hover:bg-gray-50 transition-colors"
			>
				<div
					class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b border-gray-100 pb-4"
				>
					<div class="flex-1">
						<h3 class="text-lg font-bold">Writing & Storytelling Courses</h3>
						<p class="text-gray-600 text-sm">
							Developed skills in narrative structure, creative writing, and effective
							communication.
						</p>
					</div>
					<div class="text-sm text-gray-500 md:text-right whitespace-nowrap">2021</div>
				</div>
			</a>

			<a
				href="https://www.nols.edu"
				target="_blank"
				rel="noopener noreferrer"
				class="block hover:bg-gray-50 transition-colors"
			>
				<div
					class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 border-b border-gray-100 pb-4"
				>
					<div class="flex-1">
						<h3 class="text-lg font-bold">Nature Survival & Wilderness Course</h3>
						<p class="text-gray-600 text-sm">
							Learned essential survival skills, wilderness navigation, and deepened connection with
							nature.
						</p>
					</div>
					<div class="text-sm text-gray-500 md:text-right whitespace-nowrap">2021</div>
				</div>
			</a>
		</div>
	</div>
</section> -->

<!-- Things that have Shaped me Section -->
<!-- <section id="shaped-me" class="text-default px-6 mb-32 pt-16">
	<h2 class="section-title mb-16 inline-block">
		<em class="shadow px-2 py-1">Things that have Shaped me</em>
	</h2>

	<div class="section-content">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
			<div>
				<h3 class="text-xl font-bold mb-4">Books & Ideas</h3>
				<ul class="important-list space-y-3">
					<li>The Righteous Mind by Jonathan Haidt</li>
					<li>Thinking in Systems by Donella Meadows</li>
					<li>Gödel, Escher, Bach by Douglas Hofstadter</li>
					<li>The Elephant in the Brain by Kevin Simler & Robin Hanson</li>
					<li>Impro by Keith Johnstone</li>
				</ul>
			</div>

			<div>
				<h3 class="text-xl font-bold mb-4">Experiences</h3>
				<ul class="important-list space-y-3">
					<li>Building products from scratch</li>
					<li>Living in different cities</li>
					<li>Improv comedy classes</li>
					<li>Long bike rides through nature</li>
					<li>Deep conversations with friends</li>
				</ul>
			</div>
		</div>

		<div class="mt-12">
			<h3 class="text-xl font-bold mb-4">Philosophies</h3>
			<p>
				I believe in building things that matter, prioritizing relationships over achievements, and
				maintaining a healthy sense of curiosity about the world. I try to approach life with a
				balance of ambition and contentment, always seeking to learn and grow while appreciating
				what I already have.
			</p>
		</div>
	</div>
</section> -->

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
</style>
