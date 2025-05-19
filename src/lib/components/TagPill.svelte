<script lang="ts">
	export let tag: string;
	export let variant: 'orange' | 'green' = 'orange';
</script>

<span
	class="inline-block px-2 py-1 rounded-full text-xs font-medium mr-2 mb-2 {variant === 'orange'
		? 'bg-orange bg-opacity-10 text-orange'
		: 'bg-forest-green bg-opacity-10 text-forest-green'}"
>
	{tag}
</span>
