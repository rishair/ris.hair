<script>
	import '../styles/app.css';

	const navItems = [
		{ href: '/', label: 'Home' }
		// { href: '/projects', label: 'Projects' }
	];
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta property="og:title" content="Rishi Ishairzay" />
	<meta
		property="og:description"
		content="I'm an AI product engineer in Brooklyn, NY."
	/>

	<title>Rishi Ishairzay</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,500;1,400&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

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

<main class="container mx-auto max-w-3xl py-20 bg-page-background">
	<slot />
</main>

<style>
	@import '../styles/app.css';
</style>
