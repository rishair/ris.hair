<script lang="ts">
	import { processMarkdown, formatDate } from '$lib/utils';
	import DocumentHeader from '$lib/components/DocumentHeader.svelte';
	export let data: { post: import('$lib/types').Post };
	$: post = data.post;
	$: contentHtml = processMarkdown(post.body);
</script>

<svelte:head>
	<title>{post.title} / Rishi</title>
	<meta name="description" content={post.description} />
</svelte:head>

<section class="text-default px-6">
	<div class="mb-4">
		<a href="/" class="text-sm text-gray-500 hover:text-gray-700">&larr; Back</a>
	</div>
	<DocumentHeader
		title={post.title}
		date={formatDate(post.date)}
		tags={post.tags}
		tagVariant="green"
	/>
	{#if post.image}
		<figure class="mb-6 md:mb-10">
			<img src={post.image} alt={post.title} class="w-full rounded-lg shadow" />
		</figure>
	{/if}
	<div class="prose max-w-none serif">
		{@html contentHtml}
	</div>
</section>
