<script lang="ts">
	import {getContext, onMount} from "svelte";

	import Area from "$lib/components/common/layout/Area.svelte";
	import Button from "../../common/input/Button.svelte";
	import DropdownMany from "../../common/input/DropdownMany.svelte";
	import Flex from "../../common/layout/Flex.svelte";
	import InputText from "$lib/components/common/input/InputText.svelte";
	import InputLine from "$lib/components/common/input/InputLine.svelte";
	import Split from "$lib/components/common/layout/Split.svelte";

	import {Build, debuffModifiers} from "$lib/build_types";
	import { apply_markdown } from "../text_markdown";
	import { Buff } from "$lib/build_types.js";

	export let eIndex: number;
	export let aIndex: number;
	export let effIndex: number;
	export let bIndex: number;

	let build = getContext('build');
	let options = getContext('options');

	let editingText;

	let loaded = false;
	let buffText;

	onMount(async () => {
		loaded = true;
	});

	function deleteBuff() {
		build.update((b) => {
			console.log(b.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex]);
			b.essences[eIndex].abilities[aIndex].effects[effIndex].buffs = undefined;
			console.log(b.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex]);
			return b;
		});
	}

	$: {
		if (loaded) {
			if (buffText !== undefined && buffText !== null) {
				buffText.innerHTML = apply_markdown($build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].text);
			}
		}
	}
</script>

<style>
	.ability_modifier:not(:last-child):after {
		content: ', ';
	}
	.ability_modifier:last-child:after {
		content: ')';
	}
</style>

<span>
	<Flex align="center" css="font-size: 0.8rem;" inline wide={editingText} noWrap>
		{#if $options.editing}
			<Button onClick={() => {editingText = !editingText}} transparent>
				{#if editingText}
					<i class="fa-solid fa-check"></i>
				{:else}
					<i class="fa-solid fa-pen"></i>
				{/if}
			</Button>
			<Button onClick={() => {
				if ($build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction === true) {
					$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction = false;
				} else if ($build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction === false) {
					$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction = undefined;
				} else {
					$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction = true;
				}
			}} transparent>
				{#if $build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction === true}
					<i class="fa-solid fa-skull"></i>
				{:else if $build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction === false}
					<i class="fa-solid fa-heart"></i>
				{:else}
					<i class="fa-regular fa-square"></i>
				{/if}
			</Button>
			<DropdownMany
				list={debuffModifiers}
				bind:selected={$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].modifiers}
				let:dropdownClickHandler
				let:currentListItem
				maxWidth={160}
			>
				<Button slot="button" onClick={dropdownClickHandler} transparent>
					<i class="fa-solid fa-boxes-stacked"></i>
				</Button>
				<span slot="content">
					{currentListItem}
				</span>
			</DropdownMany>
		{:else}
			•&nbsp;
		{/if}
		{#if editingText}
			<InputLine bind:value={$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].name} placeholder="Unnamed Condition" />
		{:else}
			<Flex css={"vertical-align: revert;"}>
				{#if ![undefined, null, ""].includes($build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].name)}
					[<span
					class:color_affliction={$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction === true}
					class:color_boon={$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction === false}
					class:color_none={$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].affliction === undefined}
					>{$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].name}</span>]
				{:else}
					[<span style="color: var(--text-none); vertical-align: revert;">Unnamed Condition</span>]
				{/if}
			</Flex>
		{/if}
	</Flex>
	{#if editingText}
		<div style="height: var(--mini-m);"></div>
		<InputText bind:value={$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].text}></InputText>
	{:else}
		<span style="color: var(--text-none); vertical-align: revert;">
			<span>(</span><!-- Cheating to avoid whitespace lol
			--><span style="display: contents;">
				{#each $build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].modifiers as _, mIndex}
					<span class="ability_modifier">{$build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].modifiers[mIndex]}</span>
				{:else}
					<span>&nbsp;-&nbsp;)</span>
				{/each}
			</span>
		</span>
		<Area>
			<Split split="1.6rem">
				<Area slot="1"></Area>
				<Area slot="2">
					{#if ![undefined, null, ""].includes($build.essences[eIndex].abilities[aIndex].effects[effIndex].buffs[bIndex].text)}
						<span style="color: var(--text-d); font-size: 0.8rem; line-height: 1.4rem;" bind:this={buffText}></span>
					{:else}
						<span style="color: var(--text-none); font-size: 0.8rem; line-height: 1.4rem;">Unknown Effect</span>
					{/if}
				</Area>
			</Split>
		</Area>
	{/if}
</span>