import Metrics from './field.metrics';
import {GAME_VARIANT_LEAGUE, GAME_VARIANT_SEVENS, GAME_VARIANT_TEN, GAME_VARIANT_UNION} from './players';

const {X: FIELD_X, Y: FIELD_Y, FIELD_W} = Metrics;
export const IMAGE_W = 70;
export const IMAGE_H = IMAGE_W;

const X = FIELD_X + 50;
const Y = FIELD_Y - 5;

const  STROKE_WIDTH = 1;

const PLAYER_SPACE = 60;

const PLAYER_NAME_SPACE = 25;
const PLAYER_NAME_SEPARATION = 5;

const ROW_SEPARATION = 10;

const IMAGE_DEFAULTS = {
	width       : IMAGE_W,
	height      : IMAGE_H,
	stroke      : '#FFF',
	strokeWidth : 2,
	cornerRadius: 10
};

const TEXT_DEFAULTS = {
	fontSize  : 12,
	fontFamily: 'Arial',
	fill      : '#fff',
	width     : IMAGE_W + PLAYER_NAME_SPACE * 2,
	padding   : 5,
	align     : 'center'
};

export const ROWS = {
	[GAME_VARIANT_SEVENS]: [
		['LP', 'HO', 'TP'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i;
			return {
				position: p,
				image   : {
					x,
					y: Y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : Y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: Y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['SH', 'FH', 'IC', 'RW'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + (IMAGE_W * .45) * i;
			const y = Y + IMAGE_H + PLAYER_NAME_SPACE + ROW_SEPARATION + (IMAGE_W * 1.4) * i;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
	],
	[GAME_VARIANT_TEN]   : [
		['LP', 'HO', 'TP'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i;
			return {
				position: p,
				image   : {
					x,
					y: Y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : Y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: Y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['LL', 'RL'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i + 70;
			const y = Y + IMAGE_H + PLAYER_NAME_SPACE + ROW_SEPARATION;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['SH', 'FH', 'IC', 'RW'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + (IMAGE_W * .5) * i;
			const y = Y + IMAGE_H * 2 + PLAYER_NAME_SPACE * 2 + ROW_SEPARATION * 2 + (IMAGE_W * 1.5) * i;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['LW'].map((p, i) => {
			const x = X - 35 + 40 * i + IMAGE_W * i;
			const y = Y + IMAGE_H * 3 + PLAYER_NAME_SPACE * 3 + ROW_SEPARATION * 3;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
	],
	[GAME_VARIANT_LEAGUE]: [
		['LP', 'HO', 'TP'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i;
			return {
				position: p,
				image   : {
					x,
					y: Y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : Y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: 2,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: Y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['LL', 'RL'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i + 70;
			const y = Y + IMAGE_H + PLAYER_NAME_SPACE + ROW_SEPARATION;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: 2,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		[null, 'N8', null].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i;
			const y = Y + IMAGE_H * 2 + PLAYER_NAME_SPACE * 2 + ROW_SEPARATION * 2;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['SH', 'FH'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i + 70;
			const y = Y + IMAGE_H * 3 + PLAYER_NAME_SPACE * 3 + ROW_SEPARATION * 3;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['LW', 'IC', 'OC', 'RW'].map((p, i) => {
			const x = X - 35 + 40 * i + IMAGE_W * i;
			const y = Y + IMAGE_H * 4 + PLAYER_NAME_SPACE * 4 + ROW_SEPARATION * 4;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['FB'].map((p) => {
			const x = FIELD_X + FIELD_W / 2 - IMAGE_W / 2;
			const y = Y + IMAGE_H * 5 + PLAYER_NAME_SPACE * 5 + ROW_SEPARATION * 5;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		})
	],
	[GAME_VARIANT_UNION] : [
		['LP', 'HO', 'TP'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i;
			return {
				position: p,
				image   : {
					x,
					y: Y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : Y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: Y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['LL', 'RL'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i + 70;
			const y = Y + IMAGE_H + PLAYER_NAME_SPACE + ROW_SEPARATION;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['BF', 'N8', 'OF'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i;
			const y = Y + IMAGE_H * 2 + PLAYER_NAME_SPACE * 2 + ROW_SEPARATION * 2;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['SH', 'FH'].map((p, i) => {
			const x = X + PLAYER_SPACE * i + IMAGE_W * i + 70;
			const y = Y + IMAGE_H * 3 + PLAYER_NAME_SPACE * 3 + ROW_SEPARATION * 3;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['LW', 'IC', 'OC', 'RW'].map((p, i) => {
			const x = X - 35 + 40 * i + IMAGE_W * i;
			const y = Y + IMAGE_H * 4 + PLAYER_NAME_SPACE * 4 + ROW_SEPARATION * 4;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		}),
		['FB'].map((p) => {
			const x = FIELD_X + FIELD_W / 2 - IMAGE_W / 2;
			const y = Y + IMAGE_H * 5 + PLAYER_NAME_SPACE * 5 + ROW_SEPARATION * 5;
			return {
				position: p,
				image   : {
					x,
					y,
					...IMAGE_DEFAULTS
				},
				rect    : {
					x          : x - PLAYER_NAME_SPACE,
					y          : y + IMAGE_H + PLAYER_NAME_SEPARATION,
					stroke     : '#FFF',
					strokeWidth: STROKE_WIDTH,
					height     : PLAYER_NAME_SPACE,
					width      : IMAGE_W + PLAYER_NAME_SPACE * 2,
				},
				text    : {
					x: x - PLAYER_NAME_SPACE,
					y: y + IMAGE_H + PLAYER_NAME_SEPARATION,
					...TEXT_DEFAULTS
				}
			}
		})
	],
};


