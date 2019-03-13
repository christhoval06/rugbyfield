const TITLE_DEFAULTS = {
	fontFamily: 'Arial',
	fill      : '#fff',
	padding   : 5,
	align     : 'center',
	/*
	draggable    : true,
	dragBoundFunc: pos => {
		console.log('TEAM', pos);
		return pos;
	}
	*/
};
export const TITLE_TEXT = [{
	x        : 61,
	y        : 35,
	fontSize : 64,
	fontStyle: 'bold',
	text     : 'TEAM',
	...TITLE_DEFAULTS
}, {
	x       : 276,
	y       : 49,
	fontSize: 14,
	text    : 'OF',
	...TITLE_DEFAULTS
}, {
	x       : 267,
	y       : 72,
	fontSize: 14,
	text    : 'THE',
	...TITLE_DEFAULTS
}, {
	x        : 330,
	y        : 36,
	fontSize : 64,
	fontStyle: 'bold',
	text     : 'DAY',
	...TITLE_DEFAULTS
}];
