
export const attributes = ["Power", "Speed", "Spirit", "Recovery"];

export const abilityTypes = [undefined, "Special Attack", "Special Ability", "Spell", "Conjuration", "Ritual", "Aura", "Perception"];

export const abilityModifiers = [
	"Counter-Execute",
	"Execute",
	"Familiar",
	"Melee",
	"Movement",
	"Ranged",
	"Summon",
	"Teleport",
];

export const debuffModifiers = [
	"Stacking",
];

export const universalModifiers = [
	"Damage-over-time",
	"Drain",
	"Recovery",
];

export const elementModifiers = [
	"Blood",
	"Cleansing",
	"Curse",
	"Dark",
	"Dimension",
	"Disease",
	"Holy",
	"Healing",
	"Light",
	"Magic",
	"Poison",
	"Unholy",
	"Wounding",
];

export class BuildToolOptions {
	editing: boolean;
	editing_essences: [boolean, boolean, boolean, boolean];

	constructor(
		editing?: boolean,
		editing_essences?: [boolean, boolean, boolean, boolean],
	) {
		this.editing = editing !== undefined ? editing : false;
		this.editing_essences = editing_essences !== undefined ? editing_essences : [false, false, false, false];
	}
}

export class Build {
	name?: String;
	description?: String;
	essences: [Essence, Essence, Essence, Essence];

	constructor(
		name?: String,
		description?: String,
		essences?: [Essence, Essence, Essence, Essence],
	) {
		this.name = name;
		this.description = description;
		this.essences = essences !== undefined ? essences : [new Essence(), new Essence(), new Essence(), new Essence()];
	}
}

export class Essence {
	name?: String;
	rarity?: String;
	abilities: [Ability, Ability, Ability, Ability, Ability];
	restricted?: boolean;
	info?: String;

	constructor(
		name?: String,
		rarity?: String,
		abilities?: [Ability, Ability, Ability, Ability, Ability],
		restricted?: boolean,
		info?: String,
	) {
		this.name = name;
		this.rarity = rarity;
		this.abilities = abilities !== undefined ? abilities : [new Ability(), new Ability(), new Ability(), new Ability(), new Ability()];
		this.restricted = restricted;
		this.info = info;
	}
}

export class Ability {
	name?: String;
	stone?: Stone;
	ability_type?: String;
	modifiers: String[];
	chant?: String;
	effects: [Effect, Effect, Effect, Effect, Effect];

	constructor(
		name?: String,
		stone?: Stone,
		ability_type?: String,
		modifiers?: String[],
		chant?: String,
		effects?: [Effect, Effect, Effect, Effect, Effect],
	) {
		this.name = name;
		this.stone = stone;
		this.ability_type = ability_type;
		this.modifiers = modifiers !== undefined ? modifiers : [];
		this.chant = chant;
		this.effects = effects !== undefined ? effects : [new Effect(), new Effect(), new Effect(), new Effect(), new Effect()];
	}
}

export class Stone {
	name?: String;
	rarity?: String;

	constructor(
		name?: String,
		rarity?: String,
	) {
		this.name = name;
		this.rarity = rarity;
	}
}

export class Effect {
	text?: String;
	buffs: Buff[];

	constructor(
		text?: String,
		buffs?: Buff[],
	) {
		this.text = text;
		this.buffs = buffs !== undefined ? buffs : [];
	}
}

export class Buff {
	name?: String;
	text?: String;
	affliction?: boolean;
	modifiers: String[];

	constructor(
		name?: String,
		text?: String,
		modifiers?: String[],
		affliction?: boolean,
	) {
		this.name = name;
		this.text = text;
		this.modifiers = modifiers !== undefined ? modifiers : [];
		this.affliction = affliction;
	}
}