<script lang="ts">
	import {getContext, onMount} from "svelte";

	import { attributes } from "$lib/build_types";

	import Area from "$lib/components/common/layout/Area.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import Pad from "$lib/components/common/layout/Pad.svelte";

	import C_Ability from "./ability/C_Ability.svelte";
	import C_Rarity from "$lib/components/build_tool/C_Rarity.svelte";
	import Button from "$lib/components/common/input/Button.svelte";
	import DropdownOne from "$lib/components/common/input/DropdownOne.svelte";
	import {writable} from "svelte/store";

	export let eIndex: number;

	let build = getContext('build');
	let options = getContext('options');

	let showConfluenceList = false;

	let essences = [];
	let confluences = [];
	let eInfo: {
		name: String,
		rarity: String,
		restricted: boolean,
		info: String,
	} = {
		name: undefined,
		rarity: undefined,
		restricted: undefined,
		info: undefined,
	};

	onMount(async () => {
		fetch("/json/story_essences.json")
			.then((response) => response.json())
			.then((data) => {essences = data.essences});

		fetch("/json/story_confluences.json")
			.then((response) => response.json())
			.then((data) => {confluences = data.confluences});
	})

	$: {
		if (eInfo.name !== undefined) {
			$build.essences[eIndex].name = eInfo.name;
			eInfo.name = undefined;
		}
		if (eInfo.rarity !== undefined) {
			$build.essences[eIndex].rarity = eInfo.rarity;
			eInfo.rarity = undefined;
		}
		if (eInfo.restricted !== undefined) {
			$build.essences[eIndex].restricted = eInfo.restricted;
			eInfo.restricted = undefined;
		}
		if (eInfo.info !== undefined) {
			$build.essences[eIndex].info = eInfo.info;
			eInfo.info = undefined;
		}
	}
</script>

<Area css="background-color: var(--main-l); border: solid 1px var(--line-d); border-radius: var(--mini-m); overflow: hidden">
	<Area css="overflow-y: auto">
		<Pad padding="var(--xs)">
			<Flex spacing="var(--xs)" column wide tall noWrap>
				{#if $options.editing}
					<Area css="height: auto; background-color: var(--main); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
						<Pad padding="var(--mini-l)">
							<Flex justify="left" spacing="var(--mini-m)" wide>
								{#if eIndex > 0}
									<Button onClick={() => {
										[$build.essences[eIndex], $build.essences[eIndex - 1]] = [$build.essences[eIndex - 1], $build.essences[eIndex]];
										eInfo.name = $build.essences[eIndex].name;
										eInfo.rarity = $build.essences[eIndex].rarity;
										eInfo.restricted = $build.essences[eIndex].restricted;
										eInfo.info = $build.essences[eIndex].info;
									}} transparent>
										<i class="fa-solid fa-arrow-left"></i>
									</Button>
								{/if}
								{#if eIndex < 3}
									<Button onClick={() => {
										[$build.essences[eIndex], $build.essences[eIndex + 1]] = [$build.essences[eIndex + 1], $build.essences[eIndex]];
										eInfo.name = $build.essences[eIndex].name;
										eInfo.rarity = $build.essences[eIndex].rarity;
										eInfo.restricted = $build.essences[eIndex].restricted;
										eInfo.info = $build.essences[eIndex].info;
									}} transparent>
										<i class="fa-solid fa-arrow-right"></i>
									</Button>
								{/if}
							</Flex>
						</Pad>
					</Area>
				{/if}
				<span style="font-size: 1.2rem;">
					<Flex align="center" spacing="var(--mini-m)">
						{#if $options.editing}
							<Button slot="button" onClick={() => {showConfluenceList = !showConfluenceList}} transparent>
								<i class="fa-solid fa-repeat"></i>
							</Button>
							{#if showConfluenceList}
								<DropdownOne
									list={confluences}
									bind:selected={eInfo}
									let:dropdownClickHandler
									let:currentListItem
									maxWidth={222}
								>
									<Button slot="button" onClick={dropdownClickHandler} transparent>
										<i class="fa-solid fa-bars-staggered"></i>
									</Button>
									<span slot="content">
										<Flex align="center" spacing="var(--mini-m)">
											{#if [undefined, null, ""].includes(currentListItem.name)}
												<span class="color_none">No Essence</span>
											{:else}
												{#if currentListItem.restricted}
													<span style="color: red; font-style: italic;">!!</span>
												{/if}
												{currentListItem.name}
												<C_Rarity rarity="Confluence"/>
											{/if}
										</Flex>
									</span>
								</DropdownOne>
							{:else}
								<DropdownOne
									list={essences}
									bind:selected={eInfo}
									let:dropdownClickHandler
									let:currentListItem
									maxWidth={222}
								>
									<Button slot="button" onClick={dropdownClickHandler} transparent>
										<i class="fa-solid fa-bars"></i>
									</Button>
									<span slot="content">
										<Flex align="center" spacing="var(--mini-m)">
											{#if [undefined, null, ""].includes(currentListItem.name)}
												<span class="color_none">No Essence</span>
											{:else}
												{#if currentListItem.restricted}
													<span style="color: red; font-style: italic;">!!</span>
												{/if}
												{currentListItem.name}
												<C_Rarity rarity="{currentListItem.rarity}"/>
											{/if}
										</Flex>
									</span>
								</DropdownOne>
							{/if}
						{/if}
						<Flex>
							<span>[</span>
							<span class="color_attribute" style="vertical-align: middle">{attributes[eIndex]}</span>
							<span>]</span>
						</Flex>
						<span>-</span>
						{#if ![undefined, null, ""].includes($build.essences[eIndex].name)}
							{$build.essences[eIndex].name}
						{:else}
							No Essence
						{/if}
						<C_Rarity rarity={$build.essences[eIndex].rarity} />
						{#if $build.essences[eIndex].restricted}
							<span style="color: red; font-style: italic;">!!</span>
						{/if}
					</Flex>
				</span>
				{#each $build.essences[eIndex].abilities as _, aIndex}
					<C_Ability {eIndex} {aIndex} />
				{/each}
			</Flex>
		</Pad>
	</Area>
</Area>