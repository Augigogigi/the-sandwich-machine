<script lang="ts">
	export let justify: String = "";
	export let align: String = "";
	export let spacing: String = "";
	export let column: boolean = false;
	export let reverse: boolean = false;
	export let wide: boolean = false;
	export let tall: boolean = false;
	export let noWrap: boolean = false;
	export let inline: boolean = false;
	export let css: String = "";
</script>

<div style={
	("display: " + (inline ? "inline-flex" : "flex") + ";") +
	(wide ? "width: 100%;" : "") +
	(tall ? "height: 100%;" : "") +
	("flex-direction: " + (column ? "column" : "row") + (reverse ? "-reverse" : "") + ";") +
	("justify-content: " + justify + ";") +
	("align-items: " + align + ";") +
	("flex-wrap: " + (noWrap ? "nowrap" : "wrap") + ";") +
	("gap: " + spacing + ";") +
	css
}>
	<slot></slot>
</div>