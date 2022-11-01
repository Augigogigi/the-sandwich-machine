<script>
	import { supabase } from "$lib/supabase.js";
	import { user } from "$lib/stores/authStore.js";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";

	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";

	import Area from "$lib/components/common/layout/Area.svelte";
	import Button from "$lib/components/common/input/Button.svelte";
	import Card from "$lib/components/common/misc/Card.svelte";
	import Center from "$lib/components/common/layout/Center.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import Loader from "$lib/components/common/misc/Loader.svelte";
	import Split from "$lib/components/common/layout/Split.svelte";

	let cardCSS = "width: 14rem; height: 18rem;";

	let username = "[...]";
	let builds = undefined;

	async function loadBuilds() {
		if ($user) {
			supabase.from("profiles")
				.select()
				.eq("user_id", $user.id)
				.then((response) => {
					if (response.error) {
						console.log(response.error);
					} else {
						username = response.data[0].username;
					}
				});
			supabase.from("builds")
				.select()
				.eq("owner", $user.id)
				.then((response) => {
					if (response.error) {
						console.log(response.error);
					} else {
						builds = response.data;
						builds = builds.sort((a, b) => {return new Date(b.last_modified) - new Date(a.last_modified);});
					}
				});
		} else {
			if (browser) {
				goto("/login/");
			}
		}
	}

	function depublishBuild(build) {
		supabase.from("builds")
			.update({
				public: false,
			})
			.eq("id", build)
			.then((response) => {
				if (response.error) {
					console.log(response.error);
				} else {
					loadBuilds();
				}
			});
	}

	function publishBuild(build) {
		supabase.from("builds")
			.update({
				public: true,
			})
			.eq("id", build)
			.then((response) => {
				if (response.error) {
					console.log(response.error);
				} else {
					loadBuilds();
				}
			});
	}

	function deleteBuild(build) {
		if (confirm("Are you sure you want to delete this build?")) {
			builds = builds.filter((e) => {return e.id !== build.id});
			supabase.from("builds")
				.delete()
				.eq("id", build)
				.then((response) => {
					if (response.error) {
						console.log(response.error);
					} else {
						loadBuilds();
					}
				});
		}
	}

	loadBuilds();
</script>

<Split split="8rem" gap="var(--l)" column>
	<Area slot="1">
		<Center>
			<span style="font-size: 3rem">Hello, {username}!</span>
		</Center>
	</Area>
	<Area slot="2">
		<Split split="2rem" gap="var(--xs)" column>
			<Area slot="1">
				<Center>
					<span style="font-size: 1.2rem;">Your Builds:</span>
				</Center>
			</Area>
			<Area slot="2" css="overflow-y: scroll;">
				<Flex justify="center" spacing="var(--s)" wide>
					{#if builds !== undefined}
						{#each builds as build (build.id)}
							<div transition:fade={{duration: 100}} animate:flip={{delay: 50, duration: 200}}>
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
														<span style="color: var(--text-none);">No Essence</span>&nbsp;
													{/if}
												</span>
												{#if i === 1}
													<br/>
												{/if}
											{/each}
										</span>
											<Flex spacing="var(--xs)" wide>
												<Button onClick={() => {goto("/build/" + build.id);}} grow>
													<i class="fa-solid fa-pen"></i>
												</Button>
												{#if build.public}
													<Button onClick={() => {depublishBuild(build.id)}} grow>
														<i class="fa-solid fa-eye-slash"></i>
													</Button>
												{:else}
													<Button onClick={() => {publishBuild(build.id)}} grow>
														<i class="fa-solid fa-share"></i>
													</Button>
												{/if}
												<Button onClick={() => {deleteBuild(build.id)}} grow>
													<i class="fa-solid fa-trash"></i>
												</Button>
											</Flex>
										</Flex>
									</Flex>
								</Card>
							</div>
						{:else}
							<span style="color: var(--text-none)">You have no builds!</span>
						{/each}
					{:else}
						<Loader />
					{/if}
				</Flex>
			</Area>
		</Split>
	</Area>
</Split>