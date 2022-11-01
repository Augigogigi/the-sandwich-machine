<script lang="ts">
	import Area from "$lib/components/common/layout/Area.svelte";

	export let split: String = "";
	export let gap: String = "";
	export let second: boolean = false;
	export let column: boolean = false;
	export let overflow: boolean = false;
</script>

<style>
	div {
		width: 100%;
		height: 100%;

		display: flex;

		overflow: hidden;
	}
</style>

<div style={
	("flex-direction: " + (column ? "column" : "row") + ";") +
	("gap: " + gap + ";")
}>
	<div style={
		(!second ? (column ? ("width: 100%; height: " + split) : ("height: 100%; width: " + split)) : "") +
		(second ? "flex-grow: 1;" : "")
	}>
		<slot name="1"></slot>
	</div>
	<div style={
		(second ? (column ? ("width: 100%; height: " + split) : ("height: 100%; width: " + split)) : "") +
		(!second ? "flex-grow: 1;" : "")
	}>
		<slot name="2"></slot>
	</div>
</div>