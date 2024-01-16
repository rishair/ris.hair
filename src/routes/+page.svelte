<script>
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="text-default">
	<div class="flex items-center justify-center mb-14">
		<div class="namebadge shadow inner-outer-shadow hover bg-primary-color text-center">
			<div class="pt-3">
				<p class="p-0 mb-2 font-bold text-base">HELLO MY NAME IS</p>
			</div>
			<h1 class="font-source-serif font-normal bg-white text-gray-500 p-5 mb-8">Rishi Ishairzay</h1>
		</div>
	</div>

	<h2>I'm a <strong> product manager</strong> and <strong>software developer</strong> in Brooklyn, NY. </h2>

	<p>
		I'm a product manager and software developer building an AI x tool for thinking at <a href="https://goodword.ing">Good Wording</a>.
	<p>

	<p>
		In my <strong>personal life</strong> I'm into psychology, evolution, nature, cycling, space, improv, yoga, and probably other things by now. I have roots in Virginia, San Francisco, and now Brooklyn. My friends and family mean everything to me.
	</p>
		
	<p>
		In my <strong>career</strong>, I've been a founder (3x), product manager, distributed systems engineer, front-end engineer (web & ios), and many things in between. My more notable accomplishments have been a 9-year stint at Twitter, bootstrapping a profitable startup with ~200K users, and ignoring a cease-and-desist from Activision.
	</p>
		
	<p>
		I'm a big fan of building beautiful products that help people understand themselves, connect with others, explore their curiosities, and have fun along the way. In other words, the products I wish existed.
	</p>
		
	<p>
		Please reach out if you want to connect or collaborate. My email is rishi.ishairzay@gmail.com.
	</p>
</section>

<style>

	h1 {
		width: 100%;
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
</style>
