<script lang="ts">
	import '../styles/app.css';
	import { page } from '$app/stores';

	interface NavItem {
		href: string;
		label: string;
	}

	const navItems: NavItem[] = [];
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content={$page.data.description || "I'm an AI product engineer in Brooklyn, NY."} />
	<meta property="og:title" content={$page.data.title || 'Rishi Ishairzay'} />
	<meta property="og:description" content={$page.data.description || "I'm an AI product engineer in Brooklyn, NY."} />

	<title>{$page.data.title || 'Rishi Ishairzay'}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,500;1,400&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen flex flex-col">
	<nav class="p-6">
		<ul class="flex gap-6">
			{#each navItems as item}
				<li>
					<a href={item.href} class="hover:text-link-color transition-colors duration-200">
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<main class="container mx-auto max-w-3xl py-4 md:py-20 flex-1">
		<slot />
	</main>

	<div class="wave-top"></div>

	<footer class="text-center text-base relative pb-8 pt-14">
		<p class="mb-2">
			Thanks for reading. Also, <a href={`mailto:hello@ris.hair`} class="text-orange-50 email-link"
				>say hi!</a
			>
		</p>
		<p class="text-white/50 text-sm">
			© {new Date().getFullYear()} Rishi Ishairzay ✌️
		</p>
	</footer>
</div>

<style>
	@import '../styles/app.css';

	footer {
		color: #fff;
		background: linear-gradient(to bottom, #c1655c, #cb685f);
	}

	.email-link {
		position: relative;
		text-decoration: none;
		display: inline-block;
		@apply text-white;
		transition: all 0.2s ease-in-out;
	}

	.email-link::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 3px;
		bottom: -2px;
		left: 0;
		@apply bg-forest-green;
		transition: all 0.2s ease-in-out;
	}

	.email-link:hover {
		transform: rotate(2deg);
	}

	.email-link:hover::after {
		height: 1px;
	}

	.wave-top {
		width: 100%;
		height: 48px;
		margin-bottom: -5px;
		background: none;
	}
	.wave-top::before {
		content: '';
		display: block;
		width: 100%;
		height: 48px;
		background: url("data:image/svg+xml,%3Csvg width='100%' height='48' viewBox='0 0 1200 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 24 Q 75 0 150 24 T 300 24 T 450 24 T 600 24 T 750 24 T 900 24 T 1050 24 T 1200 24 V48 H0 V24Z' fill='%23C1655C'/%3E%3C/svg%3E");
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
