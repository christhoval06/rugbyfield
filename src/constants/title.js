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
	x        : 20,
	y        : 15,
	fontSize : 64,
	fontStyle: 'bold',
	text     : 'TEAM',
	...TITLE_DEFAULTS
}, {
	x       : 221,
	y       : 25,
	fontSize: 14,
	text    : 'OF',
	...TITLE_DEFAULTS
}, {
	x       : 218,
	y       : 45,
	fontSize: 14,
	text    : 'THE',
	...TITLE_DEFAULTS
}, {
	x        : 260,
	y        : 15,
	fontSize : 64,
	fontStyle: 'bold',
	text     : 'DAY',
	...TITLE_DEFAULTS
}];
