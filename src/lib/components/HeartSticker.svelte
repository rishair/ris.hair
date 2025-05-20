<script lang="ts">
	export let rotation: number = 20;
	export let position: 'sticker-top-right' | 'inline' = 'sticker-top-right';
	export let size: 'small' | 'medium' | 'large' = 'medium';
	export let borderColor: string = '#fff'; // Default white border
	export let borderWidth: number = 4; // Default border width

	const sizeClass = size === 'small' ? 'w-6 h-6' : size === 'medium' ? 'w-8 h-8' : 'w-10 h-10';
	const shadowClass =
		size === 'small' ? 'drop-shadow-sm' : size === 'medium' ? 'drop-shadow-md' : 'drop-shadow-lg';
</script>

<span
	class={position === 'sticker-top-right'
		? 'absolute -top-4 -right-4 z-20'
		: 'inline-block align-middle'}
	style="rotate: {rotation}deg;"
>
	<svg
		class="{sizeClass} text-red-500 {shadowClass}"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		style="stroke: {borderColor}; stroke-width: {borderWidth}; paint-order: stroke; background: none;"
	>
		<path
			d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
		/>
	</svg>
</span>
