<script lang="ts">
	import { supabase } from "$lib/supabase.js";
	import { page } from "$app/stores";
	import { user } from "$lib/stores/authStore.js";
	import {getContext, onMount, setContext} from "svelte";
	import { writable } from "svelte/store";

	import { Build, BuildToolOptions } from "../../../lib/build_types";
	import { prettyDate } from "$lib/components/common/misc/prettyDate.js"

	import Area from "$lib/components/common/layout/Area.svelte";
	import Center from "$lib/components/common/layout/Center.svelte";
	import Loader from "$lib/components/common/misc/Loader.svelte";
	import Split from "$lib/components/common/layout/Split.svelte";
	import Pad from "$lib/components/common/layout/Pad.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import Button from "$lib/components/common/input/Button.svelte";
	import InputLine from "$lib/components/common/input/InputLine.svelte";
	import InputText from "$lib/components/common/input/InputText.svelte";
	import C_Essence from "$lib/components/build_tool/C_Essence.svelte";

	let isValidBuild = undefined;
	let isPublicBuild = undefined;
	let isOwnedBuild = undefined;

	setContext('build', writable(new Build()));
	setContext('options', writable(new BuildToolOptions()));
	let build = getContext('build');
	let options = getContext('options');

	let build_data;

	let timeSinceSave = "Loading...";
	let refreshTime;

	async function loadBuild() {
		supabase.from("builds")
			.select()
			.eq("id", $page.params.id)
			.then((response) => {
				if (response.error) {
					console.log(response.error);
				} else {
					if (response.data.length > 0) {
						build_data = response.data[0];
						isValidBuild = true;
						isPublicBuild = build_data.public;
						if ($user) {
							isOwnedBuild = ($user.id === build_data.owner);
						}
						build.set(build_data.data);
						timeSinceSave = prettyDate(new Date(), new Date(build_data.last_modified));
					} else {
						isValidBuild = false;
					}
				}
			});
	}

	async function saveBuild() {
		supabase.from("builds")
			.update({
				data: $build,
				last_modified: new Date(),
			})
			.eq("id", $page.params.id)
			.then((response) => {
				if (response.error) {
					console.log(response.error);
				} else {
					loadBuild();
					clearInterval(refreshTime);
					refreshTime = setInterval(() => {
						timeSinceSave = prettyDate(new Date(), new Date(build_data.last_modified));
					}, 5000);
				}
			});
	}

	onMount(() => {
		loadBuild();
	})
</script>

<Area>
	{#if isValidBuild}
		{#if isPublicBuild && !isOwnedBuild}
			<Area css="background-color: var(--main); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
				<Pad padding="var(--xs)">
					<Flex spacing="var(--xs)" wide tall noWrap>
						<Area>
							<Split split="15%" gap="var(--xs)" column>
								<Area slot="1" css="background-color: var(--main-l); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
									<Pad padding="var(--xs)">
										<Flex spacing="var(--xs)" column>
											<Area>
												<span style="font-size: 1.1rem; font-weight: bold;">
													{#if [undefined, null, ""].includes($build.name)}
														<span style="color: var(--text-none);">Unnamed Build</span>
													{:else}
														{$build.name}
													{/if}
												</span>
											</Area>
											<Area css="color: var(--text-d)">
												<span style="font-size: 0.9rem">
													{#if [undefined, null, ""].includes($build.description)}
														<i><span style="color: var(--text-none);">No Description Provided.</span></i>
													{:else}
														{$build.description}
													{/if}
												</span>
											</Area>
										</Flex>
									</Pad>
								</Area>
								<Area slot="2" css="background-color: var(--main-l); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
									<Center>
										Racials
									</Center>
								</Area>
							</Split>
						</Area>
						{#each $build.essences as _, eIndex}
							<C_Essence {eIndex}/>
						{/each}
					</Flex>
				</Pad>
			</Area>
		{:else if isOwnedBuild}
			<Split split="auto" gap="var(--xs)" column>
				<Area slot="1" css="background-color: var(--main); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
					<Pad padding="var(--mini-xl)">
						<Flex justify="left" align="center" spacing="var(--mini-m)" wide>
							<Button onClick={() => {$options.editing = !$options.editing}} transparent>
								{#if $options.editing}
									<i class="fa-solid fa-check"></i>
									Done
								{:else}
									<i class="fa-solid fa-pencil"></i>
									Edit
								{/if}
							</Button>
							<Button onClick={saveBuild} transparent>
								<i class="fa-solid fa-cloud-arrow-up"></i>
								Save
							</Button>
							<span style="color: var(--text-none); font-size: 0.9rem;">Last Modified: {timeSinceSave}</span>
						</Flex>
					</Pad>
				</Area>
				<Area slot="2" css="background-color: var(--main); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
					<Pad padding="var(--xs)">
						<Flex spacing="var(--xs)" wide tall noWrap>
							<Area>
								<Split split="15%" gap="var(--xs)" column>
									<Area slot="1" css="background-color: var(--main-l); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
										<Pad padding="var(--xs)">
											<Flex spacing="var(--xs)" column>
												<Area>
													{#if $options.editing}
														<InputLine bind:value={$build.name} placeholder="Build Name"/>
													{:else}
														<span style="font-size: 1.1rem; font-weight: bold;">
															{#if [undefined, null, ""].includes($build.name)}
																<span style="color: var(--text-none);">Unnamed Build</span>
															{:else}
																{$build.name}
															{/if}
														</span>
													{/if}
												</Area>
												<Area css="color: var(--text-d)">
													{#if $options.editing}
														<InputText bind:value={$build.description} placeholder="Build Description"></InputText>
													{:else}
														<span style="font-size: 0.9rem">
															{#if [undefined, null, ""].includes($build.description)}
																<i><span style="color: var(--text-none);">No Description Provided.</span></i>
															{:else}
																{$build.description}
															{/if}
														</span>
													{/if}
												</Area>
											</Flex>
										</Pad>
									</Area>
									<Area slot="2" css="background-color: var(--main-l); border: solid 1px var(--line-d); border-radius: var(--mini-m);">
										<Center>
											Racials
										</Center>
									</Area>
								</Split>
							</Area>
							{#each $build.essences as _, eIndex}
								<C_Essence {eIndex}/>
							{/each}
						</Flex>
					</Pad>
				</Area>
			</Split>
		{:else}
			<Center>
				<h2>This build is not published!</h2>
			</Center>
		{/if}
	{:else if isValidBuild === false}
		<Center>
			<h2>This build is not valid! (How are you seeing this? dm me TGR#8815)</h2>
		</Center>
	{:else}
		<Center>
			<Loader />
		</Center>
	{/if}
</Area>