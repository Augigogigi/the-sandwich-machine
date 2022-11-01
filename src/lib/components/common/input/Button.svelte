<script lang="ts">
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import {onMount} from "svelte";

	export let transparent: boolean = false;
	export let onClick = () => {};
	export let css: String = "";
	export let wide: boolean = false;
	export let tall: boolean = false;
	export let grow: boolean = false;

	let button;

	onMount(() => {
		if (button.scrollWidth < button.scrollHeight) {
			button.style.width = button.scrollHeight + "px";
		}
	})
</script>

<style>
	div {
		background: linear-gradient(135deg, var(--accent), var(--accent-d));

		padding: var(--mini-l);

		border-radius: var(--mini-m);

		cursor: pointer;

		transition: filter 0.1s;
	}

	div:hover {
		filter: brightness(120%) saturate(110%);
	}

	.transparent {
		background: #00000000 none;

		transition: background-color 0.1s;
	}

	.transparent:hover {
		background-color: #00000044;
	}

	.transparent:active {
		background-color: #00000088;
	}
</style>

<div
	class:transparent={transparent}
	on:click={onClick}
	bind:this={button}
	style={
		(wide ? "width: 100%;" : "") +
		(tall ? "height: 100%;" : "") +
		(grow ? "flex-grow: 1;" : "") +
		css
	}
>
	<Flex justify="center" align="center" spacing="var(--mini-xl)" wide tall>
		<slot></slot>
	</Flex>
</div>