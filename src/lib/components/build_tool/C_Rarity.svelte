<script lang="ts">
	import Flex from "$lib/components/common/layout/Flex.svelte";

	export let rarity: String;

	let span_class;
	let rarity_text;
	$: switch (rarity) {
		case "Common":
			span_class = "color_common";
			rarity_text = "Common";
			break;
		case "Uncommon":
			span_class = "color_uncommon";
			rarity_text = "Uncommon";
			break;
		case "Rare":
			span_class = "color_rare";
			rarity_text = "Rare";
			break;
		case "Epic":
			span_class = "color_epic";
			rarity_text = "Epic";
			break;
		case "Legendary":
			span_class = "color_legendary";
			rarity_text = "Legendary";
			break;
		case "Confluence":
			span_class = "color_confluence";
			rarity_text = "Confluence";
			break;
		case "Transcendent":
			span_class = "color_transcendent";
			rarity_text = "Transcendent";
			break;
		case "Divine":
			span_class = "color_divine";
			rarity_text = "Divine";
			break;
		default:
			span_class = "color_none";
			rarity_text = "Unknown";
			break;
	}
</script>

<Flex inline>
	<span>(</span>
	<span class={span_class}>{rarity_text}</span>
	<span>)</span>
</Flex>