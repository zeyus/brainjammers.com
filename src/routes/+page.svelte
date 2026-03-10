<script lang="ts">
	import Scene from '../components/Scene.svelte';
	import { Canvas } from '@threlte/core';
	import { Tween } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import { fromStore } from 'svelte/store';
	import { useProgress } from '@threlte/extras';

	const { progress, item, loaded, total } = useProgress();
	const p = fromStore(progress);
	const i = fromStore(item);
	const l = fromStore(loaded);
	const t = fromStore(total);

	const tweenedProgress = Tween.of(() => p.current, {
		duration: 150
	});

	const progressWidth = $derived(100 * tweenedProgress.current);
	const progressLessThanOne = $derived(tweenedProgress.current < 1);
</script>

<svelte:head>
	<title>Neurowang: Neurodisruptors 4 U</title>
</svelte:head>
{#if progressLessThanOne}
	<div
		transition:fade={{
			duration: 200
		}}
		class="wrapper"
	>
		<p class="loading">Loading {i ? i.current : ''} ({l.current}/{t.current})...</p>
		<div class="bar-wrapper">
			<div class="bar" style="width: {progressWidth}%"></div>
		</div>
	</div>
{/if}

<div class="main">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	div.main {
		height: 100vh;
	}
	.wrapper {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: #100010;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.loading {
		font-size: 2rem;
		line-height: 4rem;
		font-family:
			'SF Mono',
			SF Mono,
			SFMono-Regular,
			Consolas,
			'Liberation Mono',
			Menlo,
			Courier,
			monospace;
	}

	.bar-wrapper {
		width: 33.333333%;
		height: 20px;
		border: 1px solid white;
		position: relative;
	}

	.bar {
		height: 100vh;
		background-color: teal;
	}
</style>
