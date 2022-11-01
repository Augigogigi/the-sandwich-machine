<script>
	import { supabase } from "$lib/supabase.js";
	import { user } from "$lib/stores/authStore.js";
	import { goto } from "$app/navigation";
	import Center from "$lib/components/common/layout/Center.svelte";

	if ($user) {
		supabase.from("builds")
			.insert({
				owner: $user.id,
			})
			.select()
			.then((response) => {
				if (response.error) {
					console.log(response.error);
				} else {
					console.log(response.data);
					goto("/build/" + response.data[0].id);
				}
			});
	}
</script>

{#if !$user}
	<Center>
		<h2>You must be logged in to create a build!</h2>
	</Center>
{/if}