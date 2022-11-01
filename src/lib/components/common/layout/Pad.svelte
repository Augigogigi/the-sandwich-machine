<script lang="ts">
	export let padding: String = "";
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div style={
	"padding: " + padding + ";"
}>
	<slot></slot>
</div>