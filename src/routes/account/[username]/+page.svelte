<script>
	import { supabase } from "$lib/supabase.js";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	import { fade } from "svelte/transition";

	import Button from "$lib/components/common/input/Button.svelte";
	import Card from "$lib/components/common/misc/Card.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import Loader from "$lib/components/common/misc/Loader.svelte";
	import Split from "$lib/components/common/layout/Split.svelte";
	import Area from "$lib/components/common/layout/Area.svelte";
	import Center from "$lib/components/common/layout/Center.svelte";

	let cardCSS = "width: 14rem; height: 18rem;";

	let isUserValid;
	let builds = undefined;

	supabase.from("profiles")
		.select()
		.eq("username", $page.params.username)
		.then((response) => {
			if (response.error) {
				console.log(response.error);
			} else {
				console.log(response.data);
				if (response.data.length > 0) {
					isUserValid = true;
					supabase.from("builds")
						.select()
						.eq("owner", response.data[0].user_id)
						.eq("public", true)
						.then((response) => {
							if (response.error) {
								console.log(response.error);
							} else {
								builds = response.data;
								builds = builds.sort((a, b) => {return new Date(b.created_on) - new Date(a.created_on);});
							}
						});
				} else {
					isUserValid = false;
				}
			}
		});
</script>

{#if isUserValid === true}
	<Split split="8rem" gap="var(--l)" column>
		<Area slot="1">
			<Center>
				<span style="font-size: 3rem">{$page.params.username}'s Builds</span>
			</Center>
		</Area>
		<Area slot="2" css="overflow-y: scroll">
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
											</Flex>
										</span>
										<Flex align="center" spacing="var(--mini-l)" column wide>
											<span style="font-size: 1.2rem; font-weight: bold; text-align: center;">
												{#if [undefined, null, ""].includes(build.data.name)}
													<span style="color: var(--text-none);">Unnamed Build</span>
												{:else}
													{build.data.name}
												{/if}
											</span>
											<span style="color: var(--text-d); font-size: 0.9rem; text-align: center;">
												{#if [undefined, null, ""].includes(build.data.description)}
													<i><span style="color: var(--text-none);">No Description Provided.</span></i>
												{:else}
													{build.data.description}
												{/if}
											</span>
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
						<span style="color: var(--text-none)">This user has no builds...</span>
					{/each}
				{:else}
					<Loader />
				{/if}
			</Flex>
		</Area>
	</Split>
{:else if isUserValid === false}
	<Center>
		<h2>Invalid User!</h2>
	</Center>
{:else}
	<Center>
		<Loader />
	</Center>
{/if}