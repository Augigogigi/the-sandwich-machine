<script lang="ts">
	import { getContext, onMount } from "svelte";

	import { Buff } from "$lib/build_types.js";
	import { apply_markdown } from "./text_markdown";

	import Area from "$lib/components/common/layout/Area.svelte";
	import Button from "$lib/components/common/input/Button.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import InputText from "$lib/components/common/input/InputText.svelte";
	import Split from "$lib/components/common/layout/Split.svelte";

	import C_Buff from "./ability/C_Buff.svelte";

	export let eIndex: number;
	export let aIndex: number;
	export let effIndex: number;

	let build = getContext('build');
	let options = getContext('options');

	const ranks = [
		["Iron", "color_iron"],
		["Bronze", "color_bronze"],
		["Silver", "color_silver"],
		["Gold", "color_gold"],
		["Diamond", "color_diamond"],
	];

	let editingText = false;

	let loaded = false;
	let effect_text;

	onMount(async () => {
		loaded = true;
	});

	$: {
		if (loaded) {
			if (effect_text !== undefined && effect_text !== null) {
				effect_text.innerHTML = apply_markdown($build.essences[eIndex].abilities[aIndex].effects[effIndex].text);
			}
		}
	}
</script>

<span style="font-size: 0.9rem;">
	<Flex align="center" spacing="var(--mini-m)" inline>
		{#if $options.editing}
			<Button onClick={() => {editingText = !editingText}} transparent>
				{#if editingText}
					<i class="fa-solid fa-check"></i>
				{:else}
					<i class="fa-solid fa-pen"></i>
				{/if}
			</Button>
			<Button onClick={() => {
				$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs.push(new Buff());
				$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs = $build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs;
			}} transparent>
				<i class="fa-solid fa-plus"></i>
			</Button>
		{/if}
		<Flex align="center" inline>
			<span>Effect [</span>
			<span class={ranks[effIndex][1]}>{ranks[effIndex][0]}</span>
			<span>]: </span>
		</Flex>
	</Flex>
	{#if editingText}
		<div style="height: var(--mini-m);"></div>
		<InputText bind:value={$build.essences[eIndex].abilities[aIndex].effects[effIndex].text}></InputText>
	{:else}
		{#if ![undefined, null, ""].includes($build.essences[eIndex].abilities[aIndex].effects[effIndex].text)}
			<span style="color: var(--text-d); line-height: 1.4rem;" bind:this={effect_text}></span>
		{:else}
			<span style="color: var(--text-none)">Unknown Effect</span>
		{/if}
	{/if}
	<Area css="padding-left: 0.8rem;">
		<Flex column>
			{#each $build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs as _, bIndex}
				<C_Buff {eIndex} {aIndex} {effIndex} {bIndex} />
			{/each}
		</Flex>
	</Area>
</span>