<script lang="ts">
	import { getContext } from "svelte";

	import Button from "../../common/input/Button.svelte";
	import DropdownOne from "../../common/input/DropdownOne.svelte";
	import DropdownMany from "../../common/input/DropdownMany.svelte";
	import Flex from "../../common/layout/Flex.svelte";

	import { abilityTypes, abilityModifiers } from "$lib/build_types";

	export let eIndex: number;
	export let aIndex: number;

	let build = getContext('build');
	let options = getContext('options');

</script>

<style>
	.ability_modifier:not(:last-child):after {
		content: ', ';
	}
	.ability_modifier:last-child:after {
		content: ')';
	}
</style>

<Flex align="center" css="font-size: 0.9rem; color: var(--text-none)">
	<Flex align="center" spacing="var(--mini-m)" inline>
		{#if $options.editing}
			<DropdownOne
				list={abilityTypes}
				bind:selected={$build.essences[eIndex].abilities[aIndex].ability_type}
				let:dropdownClickHandler
				let:currentListItem
				maxWidth={128}
			>
				<Button slot="button" onClick={dropdownClickHandler} transparent>
					<i class="fa-solid fa-stop"></i>
				</Button>
				<span slot="content">
					{#if currentListItem}
						{currentListItem}
					{:else}
						<span style="color: var(--text-none)">No Type</span>
					{/if}
				</span>
			</DropdownOne>
			<DropdownMany
				list={abilityModifiers}
				bind:selected={$build.essences[eIndex].abilities[aIndex].modifiers}
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
			<div></div>
		{/if}
	</Flex>
	{#if ![undefined, null, ""].includes($build.essences[eIndex].abilities[aIndex].ability_type)}
		{$build.essences[eIndex].abilities[aIndex].ability_type}
	{:else}
		No Type
	{/if}
	<span>&nbsp;(</span>
	<span style="display: contents">
		{#each $build.essences[eIndex].abilities[aIndex].modifiers as _, mIndex}
			<span class="ability_modifier">{$build.essences[eIndex].abilities[aIndex].modifiers[mIndex]}</span>
		{:else}
			<span>&nbsp;-&nbsp;)</span>
		{/each}
	</span>
</Flex>