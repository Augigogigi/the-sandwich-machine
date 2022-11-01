<script>
	import { supabase } from "$lib/supabase.js";
	import { user } from "$lib/stores/authStore.js";
	import { goto } from "$app/navigation";

	import Button from "$lib/components/common/input/Button.svelte";
	import Card from "$lib/components/common/misc/Card.svelte";
	import Center from "$lib/components/common/layout/Center.svelte";
	import Flex from "$lib/components/common/layout/Flex.svelte";
	import InputLine from "$lib/components/common/input/InputLine.svelte";
	import Pad from "$lib/components/common/layout/Pad.svelte";

	let loginEmail = "";
	let loginPassword = "";
	let signupUsername = "";
	let signupEmail = "";
	let signupPassword = "";

	async function handleLogin() {
		supabase.auth.signInWithPassword({
			email: loginEmail,
			password: loginPassword,
		}).then((response) => {
			if (response.error) {
				console.log(response.error);
			} else {
				user.set(response.data.user);
				goto("/account/");
			}
		});
	}

	async function handleSignup() {
		supabase.auth.signUp({
			email: signupEmail,
			password: signupPassword,
		}).then((response) => {
			if (response.error) {
				console.log(response.error);
			} else {
				console.log(response.data.user.id);
				supabase.from("profiles")
					.select()
					.then((result) => {
						console.log(result);
					})
				supabase.from("profiles")
					.insert({
						user_id: response.data.user.id,
						username: signupUsername,
					})
					.select()
					.then((result) => {
						user.set(response.data.user);
						goto("/account/");
					})
			}
		});
	}
</script>

<Center>
	<Card css={"width: 32rem;"}>
		<Pad padding="var(--xs)">
			<Flex spacing="var(--m)" column>
				<Flex align="center" spacing="var(--xs)" column>
					<span style="font-size: 1.2rem;">Login</span>
					<form name="loginForm" on:submit|preventDefault={handleLogin} style="width: 100%">
						<Flex spacing="var(--xs)" column>
							<InputLine placeholder="Email" bind:value={loginEmail}/>
							<InputLine placeholder="Password" bind:value={loginPassword} hide/>
							<Button onClick={() => {document.forms['loginForm'].requestSubmit()}}>
								<i class="fa-solid fa-arrow-right-to-bracket"></i>
								Login
							</Button>
						</Flex>
					</form>
				</Flex>
				<div style="border-bottom: solid 1px var(--line-d)"></div>
				<Flex align="center" spacing="var(--xs)" column>
					<span style="font-size: 1.2rem;">Sign Up</span>
					<form name="signupForm" on:submit|preventDefault={handleSignup} style="width: 100%">
						<Flex spacing="var(--xs)" column>
							<InputLine placeholder="Username" bind:value={signupUsername}/>
							<InputLine placeholder="Email" bind:value={signupEmail}/>
							<InputLine placeholder="Password" bind:value={signupPassword} hide/>
							<Button onClick={() => {document.forms['signupForm'].requestSubmit()}}>
								<i class="fa-solid fa-user-plus"></i>
								Sign Up
							</Button>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</Pad>
	</Card>
</Center>