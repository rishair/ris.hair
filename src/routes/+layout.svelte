<script>
	import "../styles/app.css";
</script>

<style>
	@import "../styles/app.css";
</style>

<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta property='og:title' content='Rishi Ishairzay' />
	<meta property='og:description' content="I'm a product manager and software developer in Brooklyn, NY."/>

	<title>Rishi Ishairzay</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,500;1,400&family=Work+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">    
</svelte:head>


<main class="container mx-auto max-w-3xl py-20 bg-page-background">
	<slot />	
</main>