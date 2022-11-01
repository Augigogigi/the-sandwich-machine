<script lang="ts">
	import { getContext } from "svelte";

	import Area from "../../common/layout/Area.svelte";
	import Button from "../../common/input/Button.svelte";
	import Flex from "../../common/layout/Flex.svelte";
	import Pad from "../../common/layout/Pad.svelte";

	import C_Effect from "../C_Effect.svelte";
	import C_AbilityModifiers from "./C_AbilityModifiers.svelte";
	import C_AbilityTitle from "$lib/components/build_tool/ability/C_AbilityTitle.svelte";
	import Split from "$lib/components/common/layout/Split.svelte";

	export let eIndex: number;
	export let aIndex: number;

	let build = getContext('build');
	let options = getContext('options');
</script>

<Area css="width: auto; height: auto; background-color: var(--main); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
	<Pad padding="var(--xs)">
		<Flex spacing="var(--mini-l)" column>
			{#if $options.editing}
				<Area css="height: auto; background-color: var(--main-d); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
					<Pad padding="var(--mini-l)">
						<Flex justify="left" spacing="var(--mini-m)" wide>
							{#if aIndex > 0}
								<Button onClick={() => {
									[$build.essences[eIndex].abilities[aIndex], $build.essences[eIndex].abilities[aIndex - 1]] = [$build.essences[eIndex].abilities[aIndex - 1], $build.essences[eIndex].abilities[aIndex]];
								}} transparent>
									<i class="fa-solid fa-arrow-up"></i>
								</Button>
							{/if}
							{#if aIndex < 4}
								<Button onClick={() => {
									[$build.essences[eIndex].abilities[aIndex], $build.essences[eIndex].abilities[aIndex + 1]] = [$build.essences[eIndex].abilities[aIndex + 1], $build.essences[eIndex].abilities[aIndex]];
								}} transparent>
									<i class="fa-solid fa-arrow-down"></i>
								</Button>
							{/if}
						</Flex>
					</Pad>
				</Area>
			{/if}
			<C_AbilityTitle {eIndex} {aIndex} />
			<C_AbilityModifiers {eIndex} {aIndex} />
			<Area css="padding-left: 0.8rem;">
				<Flex spacing="var(--mini-l)" wide column noWrap>
					{#each $build.essences[eIndex].abilities[aIndex].effects as _, effIndex}
						<C_Effect {eIndex} {aIndex} {effIndex} />
					{/each}
				</Flex>
			</Area>
		</Flex>
	</Pad>
</Area>