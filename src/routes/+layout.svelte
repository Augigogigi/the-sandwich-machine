<script>
	import { supabase } from "$lib/supabase.js";
	import { user } from "$lib/stores/authStore.js";
	import { goto } from "$app/navigation";

	import Area from "$lib/components/common/layout/Area.svelte";
	import Button from "$lib/components/common/input/Button.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import Pad from "$lib/components/common/layout/Pad.svelte";
	import Split from "$lib/components/common/layout/Split.svelte";

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
	});
</script>

<style>
	i {
		font-size: 1rem;
	}
</style>

<Area>
	<Split split="auto">
		<Area slot="1" css="background-color: var(--main); border-right: solid 1px var(--line-d); box-shadow: 0.16rem 0 0.6rem 0 #00000022; z-index: 1;">
			<Pad padding="var(--xs)">
				<Flex justify="space-between" column wide tall>
					<Flex justify="left" spacing="var(--mini-m)" column wide>
						<Button onClick={() => {goto("/browse/")}} css="padding: var(--xs)" transparent>
							<i class="fa-solid fa-grip"></i>
						</Button>
						<Button onClick={() => {goto("/create/")}} css="padding: var(--xs)" transparent>
							<i class="fa-solid fa-plus"></i>
						</Button>
					</Flex>
					<Flex justify="right" column wide>
						{#if $user !== undefined}
							<Button onClick={() => {goto("/account/")}} css="padding: var(--xs)" transparent>
								<i class="fa-solid fa-user"></i>
							</Button>
						{:else}
							<Button onClick={() => {goto("/login/")}} css="padding: var(--xs)" transparent>
								<i class="fa-solid fa-arrow-right-to-bracket"></i>
							</Button>
						{/if}
					</Flex>
				</Flex>
			</Pad>
		</Area>
		<Area slot="2" css="background-color: var(--main-d);">
			<Pad padding="var(--m)">
				<slot></slot>
			</Pad>
		</Area>
	</Split>
</Area>