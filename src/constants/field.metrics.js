export const CANVA_W = 800;
export const CANVA_H = CANVA_W;

export const FIELD_OPACITY = .5;
export const X = 50;
export const Y = 150;

export const FIELD_W = 430;
export const FIELD_H = 600;

export const IN_GOAL_W = 45;
export const LINE_22_W = 110;
export const LINE_10_W = 52;
export const LINE_5_W = 25;

export const BACKGROUND_COLOR = '#174B26';

export const BACKGROUND = [{
	x     : 0,
	y     : 0,
	width : CANVA_W,
	height: CANVA_H,
	fill  : BACKGROUND_COLOR,

	/*
	radius                       : CANVA_W / 2,
	fillRadialGradientStartPoint : CANVA_H / 2,
	fillRadialGradientStartRadius: CANVA_W / 2,
	fillRadialGradientEndPoint   : CANVA_H / 2,
	fillRadialGradientEndRadius  : CANVA_H,
	fillRadialGradientColorStops : [0, BACKGROUND_COLOR, 1, 'green'],
	 */
}];

export const FIELD_RECTS = [
	{
		x          : X,
		y          : Y,
		width      : FIELD_W,
		height     : FIELD_H,
		stroke     : 'white',
		strokeWidth: 1
	},
];

const LINE_DEFAULTS = {
	stroke     : 'white',
	strokeWidth: 1.5,
	lineJoin   : 'round'
};

export const FIELD_LINES = [
	// IN GOAL
	{
		points: [X, Y + IN_GOAL_W, FIELD_W + X, Y + IN_GOAL_W],
		...LINE_DEFAULTS
	},
	// 5
	{
		points: [X + LINE_5_W, Y + IN_GOAL_W + LINE_5_W, FIELD_W + X - LINE_5_W, Y + IN_GOAL_W + LINE_5_W],
		dash  : [10, 80],
		...LINE_DEFAULTS
	},
	// 22
	{
		points: [X, Y + IN_GOAL_W + LINE_22_W, FIELD_W + X, Y + IN_GOAL_W + LINE_22_W],
		...LINE_DEFAULTS
	},
	// 10
	{
		points: [X + LINE_5_W, Y + FIELD_H / 2 - LINE_10_W, FIELD_W + X - LINE_5_W, Y + FIELD_H / 2 - LINE_10_W],
		dash  : [30, 30],
		...LINE_DEFAULTS
	},
	// CENTER
	{
		points: [X, Y + FIELD_H / 2, FIELD_W + X, Y + FIELD_H / 2],
		...LINE_DEFAULTS
	},
	// 10
	{
		points: [X + LINE_5_W, Y + FIELD_H / 2 + LINE_10_W, FIELD_W + X - LINE_5_W, Y + FIELD_H / 2 + LINE_10_W],
		dash  : [30, 30],
		...LINE_DEFAULTS
	},
	// 22
	{
		points: [X, FIELD_H + Y - IN_GOAL_W - LINE_22_W, FIELD_W + X, FIELD_H + Y - IN_GOAL_W - LINE_22_W],
		...LINE_DEFAULTS
	},
	// 5
	{
		points: [X + LINE_5_W, FIELD_H + Y - IN_GOAL_W - LINE_5_W, FIELD_W + X - LINE_5_W, FIELD_H + Y - IN_GOAL_W - LINE_5_W],
		dash  : [10, 80],
		...LINE_DEFAULTS
	},
	// IN GOAL
	{
		points: [X, FIELD_H + Y - IN_GOAL_W, FIELD_W + X, FIELD_H + Y - IN_GOAL_W],
		...LINE_DEFAULTS
	},
	// 5
	{
		points: [X + LINE_5_W, Y + IN_GOAL_W + LINE_5_W, X + LINE_5_W, Y + FIELD_H - IN_GOAL_W - LINE_5_W],
		dash  : [10, 80],
		...LINE_DEFAULTS
	},
	// 5
	{
		points: [X + FIELD_W - LINE_5_W, Y + IN_GOAL_W + LINE_5_W, X + FIELD_W - LINE_5_W, Y + FIELD_H - IN_GOAL_W - LINE_5_W],
		dash  : [10, 80],
		...LINE_DEFAULTS
	},
	// 15
	{
		points: [X + LINE_5_W * 3, Y + IN_GOAL_W + LINE_5_W, X + LINE_5_W * 3, Y + FIELD_H - IN_GOAL_W - LINE_5_W],
		dash  : [10, 80],
		...LINE_DEFAULTS
	},
	// 15
	{
		points: [X + FIELD_W - LINE_5_W * 3, Y + IN_GOAL_W + LINE_5_W, X + FIELD_W - LINE_5_W * 3, Y + FIELD_H - IN_GOAL_W - LINE_5_W],
		dash  : [10, 80],
		...LINE_DEFAULTS
	},
];

const TEXT_DEFAULTS = {
	fontSize  : 14,
	fontFamily: 'Arial',
	fill      : '#fff',
	width     : 20,
	padding   : 2,
	align     : 'right',
	rotation  : 90
};
export const FIELD_NUMBERS = [
	{
		x   : X,
		y   : Y + IN_GOAL_W + LINE_22_W - 10,
		text: '22',
		...TEXT_DEFAULTS
	}, {
		x   : FIELD_W + X + 18,
		y   : Y + IN_GOAL_W + LINE_22_W - 10,
		text: '22',
		...TEXT_DEFAULTS
	}, {
		x   : X,
		y   : Y + FIELD_H / 2 - LINE_10_W - 10,
		text: '10',
		...TEXT_DEFAULTS
	}, {
		x   : X + FIELD_W + 18,
		y   : Y + FIELD_H / 2 - LINE_10_W - 10,
		text: '10',
		...TEXT_DEFAULTS
	},
	{
		x   : X,
		y   : Y + FIELD_H / 2 + LINE_10_W - 10,
		text: '10',
		...TEXT_DEFAULTS
	}, {
		x   : X + FIELD_W + 18,
		y   : Y + FIELD_H / 2 + LINE_10_W - 10,
		text: '10',
		...TEXT_DEFAULTS
	},
	{
		x   : X,
		y   : Y + FIELD_H - IN_GOAL_W - LINE_22_W - 10,
		text: '22',
		...TEXT_DEFAULTS
	}, {
		x   : FIELD_W + X + 18,
		y   : Y + FIELD_H - IN_GOAL_W - LINE_22_W - 10,
		text: '22',
		...TEXT_DEFAULTS
	}];

export default {X, Y, FIELD_W, FIELD_H}
