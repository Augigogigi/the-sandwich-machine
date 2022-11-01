
export function apply_markdown(text: any) {
	if (text !== undefined) {
		let txt = text;
		txt = txt.replace(/(\[\[)/g, '[<span style="vertical-align: baseline;" class="color_boon">');
		txt = txt.replace(/(\[!\[)/g, '[<span style="vertical-align: baseline;" class="color_affliction">');
		txt = txt.replace(/({)/g, '<span style="vertical-align: baseline;" class="color_none">');
		txt = txt.replace(/(\[Power])/g, '[<span style="vertical-align: baseline;" class="color_attribute">Power</span>]');
		txt = txt.replace(/(\[Speed])/g, '[<span style="vertical-align: baseline;" class="color_attribute">Speed</span>]');
		txt = txt.replace(/(\[Spirit])/g, '[<span style="vertical-align: baseline;" class="color_attribute">Spirit</span>]');
		txt = txt.replace(/(\[Recovery])/g, '[<span style="vertical-align: baseline;" class="color_attribute">Recovery</span>]');
		txt = txt.replace(/(\(Common\))/g, '(<span style="vertical-align: baseline;" class="color_common">Common</span>)');
		txt = txt.replace(/(\(Uncommon\))/g, '(<span style="vertical-align: baseline;" class="color_uncommon">Uncommon</span>)');
		txt = txt.replace(/(\(Rare\))/g, '(<span style="vertical-align: baseline;" class="color_rare">Rare</span>)');
		txt = txt.replace(/(\(Epic\))/g, '(<span style="vertical-align: baseline;" class="color_epic">Epic</span>)');
		txt = txt.replace(/(\(Legendary\))/g, '(<span style="vertical-align: baseline;" class="color_legendary">Legendary</span>)');
		txt = txt.replace(/(\(Divine\))/g, '(<span style="vertical-align: baseline;" class="color_divine">Divine</span>)');
		txt = txt.replace(/(\(Transcendent\))/g, '(<span style="vertical-align: baseline;" class="color_transcendent">Transcendent</span>)');
		txt = txt.replace(/(\(Confluence\))/g, '(<span style="vertical-align: baseline;" class="color_confluence">Confluence</span>)');
		txt = txt.replace(/(\[Iron])/g, '[<span style="vertical-align: baseline;" class="color_iron">Iron</span>]');
		txt = txt.replace(/(\[Bronze])/g, '[<span style="vertical-align: baseline;" class="color_bronze">Bronze</span>]');
		txt = txt.replace(/(\[Silver])/g, '[<span style="vertical-align: baseline;" class="color_silver">Silver</span>]');
		txt = txt.replace(/(\[Gold])/g, '[<span style="vertical-align: baseline;" class="color_gold">Gold</span>]');
		txt = txt.replace(/(\[Diamond])/g, '[<span style="vertical-align: baseline;" class="color_diamond">Diamond</span>]');
		txt = txt.replace(/(})/g, '</span>');
		txt = txt.replace(/(]])/g, '</span>]');
		txt = txt.replace(/(]!])/g, '</span>]');
		return txt;
	}
	return "";
}