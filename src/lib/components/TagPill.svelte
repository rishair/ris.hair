<script lang="ts">
	export let tag: string;
	export let variant: 'orange' | 'green' | 'grey' = 'orange';
</script>

{#if variant === 'orange'}
	<span
		class="inline-block px-2 py-1 rounded-full text-xs font-medium mr-2 mb-2 bg-orange bg-opacity-10 text-orange"
	>
		{tag}
	</span>
{:else if variant === 'green'}
	<span
		class="inline-block px-2 py-1 rounded-full text-xs font-medium mr-2 mb-2 bg-forest-green bg-opacity-10 text-forest-green"
	>
		{tag}
	</span>
{:else}
	<span
		class="inline-block px-2 py-1 rounded-full text-xs font-medium mr-2 mb-2 bg-gray-500 bg-opacity-10 text-gray-600"
	>
		{tag}
	</span>
{/if}
