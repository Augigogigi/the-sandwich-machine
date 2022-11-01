<script lang="ts">
	export let css: String = "";
</script>

<style>
	div {
		background-color: var(--main);

		width: max-content;
		height: max-content;

		padding: var(--xs);

		display: grid;

		border: solid 1px var(--line-d);
		border-radius: var(--mini-l);

		box-shadow: 0 0.16rem 0.4rem 0 #00000044;
	}
</style>

<div style={css}>
	<slot></slot>
</div>