<script lang="ts">
	export let tag: string;
	export let variant: 'orange' | 'green' | 'grey' = 'orange';

	const baseClasses =
		'inline-block px-2 py-1 rounded-full text-xs font-medium mr-2 mb-2 bg-opacity-10';

	const variantClasses = {
		orange: 'bg-orange text-orange',
		green: 'bg-forest-green text-forest-green',
		grey: 'bg-gray-500 text-gray-600'
	};
</script>

<span class={`${baseClasses} ${variantClasses[variant]}`}>
	{tag}
</span>
