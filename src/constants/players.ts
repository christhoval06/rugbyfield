export const SHOW_ALL = 'show_all';
export const SHOW_BACKS = 'show_backs';
export const SHOW_FORDWARDS = 'show_fordwards';
export const SHOW_SUBSTITUTE = 'show_substitute';
export const SHOW_BY_NAME = 'show_by_name';

export const PLAYER_SUBSTITUTE = 'Substitute';

export const PLAYER_GROUP_BACKS = 'backs';
export const PLAYER_GROUP_FORDWARDS = 'fordwards';
export const PLAYER_GROUP_SUBSTITUTE = PLAYER_SUBSTITUTE;

export const POSITION_IN_GROUP_FORDWARDS = ['LP', 'HO', 'TP', 'LO', 'LL', 'RL', 'BF', 'OF', 'N8'];
export const POSITION_IN_GROUP_BACKS = ['SH', 'FH', 'LW', 'IC', 'OC', 'RW', 'FB'];
export const POSITION_IN_GROUP_SUBSTITUTE = [PLAYER_SUBSTITUTE];

export const GAME_VARIANT_SEVENS = 'rugby_sevens';
export const GAME_VARIANT_TEN = 'rugby_tens';
export const GAME_VARIANT_LEAGUE = 'rugby_league';
export const GAME_VARIANT_UNION = 'rugby_union';

export const GAME_VARIANTS = {
	[GAME_VARIANT_SEVENS]: 'Rugby 7s',
	[GAME_VARIANT_TEN]   : 'Rugby X',
	[GAME_VARIANT_LEAGUE]: 'Rugby League',
	[GAME_VARIANT_UNION] : 'Rugby XV',
};

export const GAME_SUBSTITUTES_START = {
	[GAME_VARIANT_SEVENS]: 8,
	[GAME_VARIANT_TEN]   : 11,
	[GAME_VARIANT_LEAGUE]: 14,
	[GAME_VARIANT_UNION] : 16,
};

export const GAME_SUBSTITUTES = {
	[GAME_VARIANT_SEVENS]: 5,
	[GAME_VARIANT_TEN]   : 5,
	[GAME_VARIANT_LEAGUE]: 7,
	[GAME_VARIANT_UNION] : 8,
};

export const DEFAULT_FIELD = {
	nameMaxLength  : 20,
	numberMaxLength: 3
};

export const DEFAULT_PLAYER = {
	name    : null,
	number  : null,
	position: null,
	image   : '/images/user-placeholder.jpg',
	group   : null,
	id      : null
};

export const PLAYER_POSITIONS = [
	{
		short        : 'LP',
		number       : 1,
		name         : 'Loose-head Prop',
		game_variants: [GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'HO',
		number       : 2,
		name         : 'Hooker',
		game_variants: [GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'TP',
		number       : 3,
		name         : 'Tight-head Prop',
		game_variants: [GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'LL',
		number       : 4,
		name         : 'Lock 4',
		game_variants: [GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'RL',
		number       : 5,
		name         : 'Lock 5',
		game_variants: [GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'BF',
		number       : 6,
		name         : 'Blind-side Flanker',
		game_variants: [GAME_VARIANT_UNION],
	},
	{
		short        : 'OF',
		number       : 7,
		name         : 'Open-side Flanker',
		game_variants: [GAME_VARIANT_UNION],
	},
	{
		short        : 'N8', // LF
		number       : {
			[GAME_VARIANT_LEAGUE]: 6,
			[GAME_VARIANT_UNION] : 8,
		},
		name         : 'Loose Forward',
		game_variants: [GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'SH',
		number       : {
			[GAME_VARIANT_SEVENS]: 4,
			[GAME_VARIANT_TEN]   : 6,
			[GAME_VARIANT_LEAGUE]: 7,
			[GAME_VARIANT_UNION] : 9,
		},
		name         : 'Scrum Half',
		game_variants: [GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'FH',
		number       : {
			[GAME_VARIANT_SEVENS]: 5,
			[GAME_VARIANT_TEN]   : 7,
			[GAME_VARIANT_LEAGUE]: 8,
			[GAME_VARIANT_UNION] : 10,
		},
		name         : 'Fly Half',
		game_variants: [GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'LW',
		number       : {
			[GAME_VARIANT_TEN]   : 9,
			[GAME_VARIANT_LEAGUE]: 9,
			[GAME_VARIANT_UNION] : 11,
		},
		name         : 'Left Wing',
		game_variants: [GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'IC',
		number       : {
			[GAME_VARIANT_SEVENS]: 6,
			[GAME_VARIANT_TEN]   : 8,
			[GAME_VARIANT_LEAGUE]: 10,
			[GAME_VARIANT_UNION] : 12,
		},
		name         : {
			[GAME_VARIANT_SEVENS]: 'Centre',
			[GAME_VARIANT_TEN]   : 'Centre',
			[GAME_VARIANT_LEAGUE]: 'Inside Centre',
			[GAME_VARIANT_UNION] : 'Inside Centre',
		},
		game_variants: [GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'OC',
		number       : {
			[GAME_VARIANT_LEAGUE]: 11,
			[GAME_VARIANT_UNION] : 13,
		},
		name         : 'Outside Centre',
		game_variants: [GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'RW',
		number       : {
			[GAME_VARIANT_SEVENS]: 7,
			[GAME_VARIANT_TEN]   : 10,
			[GAME_VARIANT_LEAGUE]: 12,
			[GAME_VARIANT_UNION] : 14,
		},
		name         : {
			[GAME_VARIANT_SEVENS]: 'Winger',
			[GAME_VARIANT_TEN]   : 'Right Wing',
			[GAME_VARIANT_LEAGUE]: 'Right Wing',
			[GAME_VARIANT_UNION] : 'Right Wing',
		},
		game_variants: [GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : 'FB',
		number       : {
			[GAME_VARIANT_LEAGUE]: 13,
			[GAME_VARIANT_UNION] : 15,
		},
		name         : 'Full Back',
		game_variants: [GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	},
	{
		short        : PLAYER_SUBSTITUTE,
		number       : 0,
		name         : PLAYER_SUBSTITUTE,
		game_variants: [GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_LEAGUE, GAME_VARIANT_UNION],
	}
];
