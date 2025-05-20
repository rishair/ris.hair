<script lang="ts">
	import TagPill from './TagPill.svelte';
	import HeartSticker from './HeartSticker.svelte';

	export let title: string;
	export let date: string | undefined = undefined;
	export let tags: string[] | undefined = undefined;
	export let tagVariant: 'orange' | 'green' | 'grey' = 'green';

	$: tagsWithoutFavorite = (tags || []).filter((t) => t !== 'favorite');
</script>

<h1 class="name mb-2 relative">
	<em class="shadow px-2 py-1">{title}</em>
	{#if tags && tags.includes('favorite')}
		<HeartSticker />
	{/if}
</h1>

{#if date}
	<p class="my-2">{date}</p>
{/if}

{#if tagsWithoutFavorite.length > 0}
	<div class="mb-6">
		{#each tagsWithoutFavorite as tag}
			<TagPill {tag} variant={tagVariant} />
		{/each}
	</div>
{/if}
