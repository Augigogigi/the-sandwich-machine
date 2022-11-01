<script lang="ts">
	export let css: String = "";
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div style={css}>
	<slot></slot>
</div>