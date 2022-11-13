<script>
	import { supabase } from "$lib/supabase.js";
	import { goto } from "$app/navigation";
	import { writable } from "svelte/store";

	import { fade } from "svelte/transition";

	import Button from "$lib/components/common/input/Button.svelte";
	import Card from "$lib/components/common/misc/Card.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import Loader from "$lib/components/common/misc/Loader.svelte";
	import {Build} from "$lib/build_types.ts";
	import Area from "$lib/components/common/layout/Area.svelte";

	let cardCSS = "width: 14rem; height: 18rem;";

	let usernames = writable(new Map());
	let builds = undefined;

	supabase.from("profiles")
		.select()
		.then((response) => {
			if (response.error) {
				console.log(response.error);
			} else {
				for (let i = 0; i < response.data.length; i++) {
					$usernames.set(response.data[i].user_id, response.data[i].username);
				}
				$usernames = $usernames;
			}
		});

	supabase.from("builds")
		.select()
		.eq("public", true)
		.then((response) => {
			if (response.error) {
				console.log(response.error);
			} else {
				builds = response.data;
				builds = builds.sort((a, b) => {return new Date(b.created_on) - new Date(a.created_on);});
			}
		});
</script>

<Area css="overflow-y: auto;">
	<Flex justify="center" spacing="var(--s)">
		{#if builds !== undefined}
			{#each builds as build (build.id)}
				<div in:fade={{duration: 100}}>
					<Card css={cardCSS}>
						<Flex justify="space-between" column tall>
							<Flex spacing="var(--s)" column wide>
								<span style="font-size: 0.72rem;">
									<Flex justify="space-between" wide>
										<span>ID: {build.id}</span>
										<a href={"/account/" + $usernames.get(build.owner)}>{$usernames.get(build.owner)}</a>
									</Flex>
								</span>
								<Flex align="center" spacing="var(--mini-l)" css={"height: 9rem;"} column wide>
									<span style="font-size: 1.2rem; font-weight: bold; text-align: center; width: 100%;">
										{#if [undefined, null, ""].includes(build.data.name)}
											<span style="color: var(--text-none);">Unnamed Build</span>
										{:else}
											{build.data.name}
										{/if}
									</span>
									<Flex css="color: var(--text-d); font-size: 0.9rem; text-align: center; flex-grow: 1;" column wide>
										{#if [undefined, null, ""].includes(build.data.description)}
											<i><span style="color: var(--text-none);">No Description Provided.</span></i>
										{:else}
											<div style="max-height: 7rem; overflow: hidden; flex-grow: 1;">{build.data.description}</div>
											<div style="position: relative; left: 0; top: -1rem;">
												<div style="background: linear-gradient(0deg, var(--main), #00000000); position: absolute; width: 100%; height: 1rem"></div>
											</div>
										{/if}
									</Flex>
								</Flex>
							</Flex>
							<Flex align="center" spacing="var(--xs)" column>
								<span style="font-size: 0.8rem; text-align: center;">
									{#each build.data.essences as essence, i}
										<span style="font-size: 0.7rem; text-align: center;">
											{#if essence.name !== undefined}
												<span>{essence.name}</span>
											{:else}
												<span style="color: var(--text-none);">No Essence</span>
											{/if}
										</span>
										{#if i === 1}
											<br/>
										{/if}
									{/each}
								</span>
								<Button onClick={() => {goto("/build/" + build.id);}} wide>
									View Build
								</Button>
							</Flex>
						</Flex>
					</Card>
				</div>
			{:else}
				<span style="color: var(--text-none)">No builds published...</span>
			{/each}
		{:else}
			<Loader />
		{/if}
	</Flex>
</Area>