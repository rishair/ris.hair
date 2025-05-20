<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const SHOW_DELAY = 1000; // Time before showing the hint
	const HIDE_DELAY = 5000; // Time before hiding the hint
	const FADE_DURATION = 300; // Duration of fade transition
	const BOUNCE_DURATION = 1000; // Duration of one bounce cycle

	let visible = false;
	let showTimeout: ReturnType<typeof setTimeout>;
	let hideTimeout: ReturnType<typeof setTimeout>;

	onMount(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				visible = false;
				clearTimeout(showTimeout);
				clearTimeout(hideTimeout);
				window.removeEventListener('scroll', handleScroll);
			}
		};

		window.addEventListener('scroll', handleScroll);
		if (window.scrollY === 0) {
			showTimeout = setTimeout(() => {
				if (window.scrollY === 0) {
					visible = true;
					hideTimeout = setTimeout(() => {
						visible = false;
					}, HIDE_DELAY);
				}
			}, SHOW_DELAY);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(showTimeout);
			clearTimeout(hideTimeout);
		};
	});
</script>

{#if visible}
	<div transition:fade={{ duration: FADE_DURATION }}>
		<div class="scroll-hint text-default" style="animation-duration: {BOUNCE_DURATION}ms">
			<svg viewBox="0 0 24 24" class="w-8 h-8" aria-hidden="true">
				<path
					d="M4 8l8 8 8-8"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</div>
{/if}

<style>
	.scroll-hint {
		position: fixed;
		left: 50%;
		bottom: 2rem;
		transform: translate(-50%, 0);
		animation: scroll-bounce infinite;
		pointer-events: none;
		opacity: 0.7;
	}

	@keyframes scroll-bounce {
		0%,
		100% {
			transform: translate(-50%, 0);
		}
		50% {
			transform: translate(-50%, 8px);
		}
	}
</style>
