<script lang="ts">
	import { onMount } from "svelte";

	import Area from "$lib/components/common/layout/Area.svelte";
	import Pad from "$lib/components/common/layout/Pad.svelte";
	import VirtualList from "$lib/components/common/misc/VirtualList (skayo)/VirtualList.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";

	export let list: unknown[] = [];
	export let selected: unknown[] = [];
	export let maxWidth: number = 64;

	let isListActive: boolean = false;

	function focusoutHandler() {
		isListActive = false;
	}
</script>

<style>
	.dropdown_positioner_rel {
		position: relative;
		left: 0;
		top: 0;

		display: flex;
		flex-direction: column;
	}

	.dropdown_positioner_abs {
		width: max-content;
		height: max-content;

		margin-top: var(--mini-l);

		position: absolute;
		left: 0;
		top: 100%;

		display: flex;
		flex-direction: column;

		z-index: 1;
	}

	.dropdown_item {
		font-size: 0.9rem;
		width: 100%;
		height: 28px;

		display: block;
	}

	.dropdown_item:hover {
		background-color: var(--main-d);

		cursor: pointer;
	}

	.hidden {
		display: none;
	}
</style>

<span on:focusout={focusoutHandler} tabindex=-1>
	<slot name="button" dropdownClickHandler={() => {isListActive = !isListActive}}></slot>
	<div class="dropdown_positioner_rel">
		<div class="dropdown_positioner_abs" class:hidden={!isListActive}>
			<Area css="background-color: var(--main); border: solid 1px var(--line-d); border-radius: var(--mini-m); overflow: hidden;">
				<Area css="max-height: 16rem; overflow-y: auto">
					<div style={"width: " + maxWidth + "px;"}></div>
					<VirtualList
						width="100%"
						height={Math.min(28 * list.length, 256)}
						itemCount={list.length}
						itemSize={28}
						overscanCount={2}
					>
						<span slot="item" let:index let:style {style} class="dropdown_item" on:click={() => {
							if (selected.includes(list[index])) {
								selected = selected.filter(e => e !== list[index]);
								selected = selected;
							} else {
								selected.push(list[index]);
								selected = selected;
							}
						}}>
							<Pad padding="var(--mini-l)">
								<Flex align="center">
									<slot name="content" currentListItem={list[index]}></slot>
								</Flex>
							</Pad>
						</span>
					</VirtualList>
				</Area>
			</Area>
		</div>
	</div>
</span>