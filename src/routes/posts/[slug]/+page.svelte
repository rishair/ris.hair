<script lang="ts">
	import { processMarkdown, formatDate } from '$lib/utils';
	import TagPill from '$lib/components/TagPill.svelte';
	export let data: { post: import('$lib/types').Post };
	$: post = data.post;
	$: contentHtml = processMarkdown(post.body);
</script>

<svelte:head>
	<title>{post.title} / Rishi</title>
	<meta name="description" content={post.description} />
</svelte:head>

<section class="text-default px-6">
	<h1 class="name mb-2"><em class="shadow px-2 py-1">{post.title}</em></h1>
	<p class="my-2">{formatDate(post.date)}</p>
	{#if post.tags?.length}
		<div class="mb-6">
			{#each post.tags as tag}
				<TagPill {tag} variant="green" />
			{/each}
		</div>
	{/if}
	{#if post.image}
		<figure class="mb-6 md:mb-10">
			<img src={post.image} alt={post.title} class="w-full rounded-lg shadow" />
		</figure>
	{/if}
	<div class="prose max-w-none serif">
		{@html contentHtml}
	</div>
</section>
