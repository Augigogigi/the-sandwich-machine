<script lang="ts">
	export let value: String = "";
	export let placeholder: String = "";
	export let hide: boolean = false;
</script>

<style>
	textarea {
		background-color: var(--main-d);

		font-size: 0.8rem;

		min-width: 100%;
		max-width: 100%;

		padding: var(--mini-l);

		border: solid 1px var(--line-d);
		border-radius: var(--mini-m);

		user-select: text;

		resize: none;
	}
</style>

<textarea bind:value={value} placeholder={placeholder}></textarea>