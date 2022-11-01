<script lang="ts">
	export let value: String = "";
	export let placeholder: String = "";
	export let hide: boolean = false;
</script>

<style>
	input {
		background-color: var(--main-d);

		width: 100%;

		padding: var(--mini-l);

		border: solid 1px var(--line-d);
		border-radius: var(--mini-m);

		user-select: text;
	}
</style>

{#if hide}
	<input type="password" bind:value={value} placeholder={placeholder}>
{:else}
	<input type="text" bind:value={value} placeholder={placeholder}>
{/if}