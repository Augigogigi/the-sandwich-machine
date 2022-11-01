<script lang="ts">
	import { getContext } from "svelte";

	import Button from "../../common/input/Button.svelte";
	import Flex from "../../common/layout/Flex.svelte";
	import InputLine from "../../common/input/InputLine.svelte";

	export let eIndex: number;
	export let aIndex: number;

	let build = getContext('build');
	let options = getContext('options');

	let editing_title = false;
</script>

<Flex align="center" spacing="var(--mini-l)" noWrap>
	{#if $options.editing}
		<Button onClick={() => {editing_title = !editing_title}} transparent>
			{#if editing_title}
				<i class="fa-solid fa-check"></i>
			{:else}
				<i class="fa-solid fa-pen"></i>
			{/if}
		</Button>
	{/if}
	{#if $options.editing && editing_title}
		<InputLine bind:value={$build.essences[eIndex].abilities[aIndex].name} placeholder="Unnamed Ability" />
	{:else}
		{#if ![undefined, null, ""].includes($build.essences[eIndex].abilities[aIndex].name)}
			{$build.essences[eIndex].abilities[aIndex].name}
		{:else}
			Unnamed Ability
		{/if}
	{/if}
</Flex>