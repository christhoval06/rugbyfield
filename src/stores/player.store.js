import {applySnapshot, getRoot, types} from 'mobx-state-tree';

import {GAME_SUBSTITUTES_START, PLAYER_POSITIONS, PLAYER_SUBSTITUTE} from '../constants/players';

const Player = types
	.model({
		id      : types.number,
		ref     : types.identifier,
		name    : types.string,
		number  : types.number,
		position: types.string,
		image   : types.string,
		group   : types.string
	})
	.actions(self => ({
		selectPlayer() {
			const {PlayersStore} = getRoot(self);
			PlayersStore.selectPlayer(self);
		},
		remove() {
			const {PlayersStore} = getRoot(self);
			PlayersStore.removePlayer(self);
		},
		edit(player) {
			applySnapshot(self, {id: self.id, ref: self.ref, ...player});
			const {PlayersStore} = getRoot(self);
			PlayersStore.toggleEditMode();
		},
		variantPosition() {
			const {OptionsStore} = getRoot(self);
			const gameVariant = OptionsStore.gameVariant;

			let position = PLAYER_POSITIONS.find(e => e.short === self.position && e.game_variants.includes(gameVariant));
			if (!position) {
				position = PLAYER_POSITIONS.find(e => e.short === PLAYER_SUBSTITUTE);
			}
			return position;
		},
		afterCreate() {
			// onSnapshot(self, self.save);
		}
	}))
	.views(self => ({
		getNumber() {
			return self.number;

			// const {OptionsStore} = getRoot(self);
			// const gameVariant = OptionsStore.gameVariant;
			// const position = self.variantPosition();
			// let number = 0;
			// if (self.getPosition() === PLAYER_SUBSTITUTE) {
			// 	number = self.number - GAME_SUBSTITUTES_START[gameVariant];
			// 	if (number < 0) {
			// 		number = Math.abs(number)
			// 	} else if (number < 0) {
			// 		number = Math.abs(number)
			// 	}
			// 	number += GAME_SUBSTITUTES_START[gameVariant];
			// }
			// if (typeof position.number === 'object') {
			// 	return number + position.number[gameVariant];
			// }
			// return number + position.number;
		},
		getPosition() {
			const {OptionsStore} = getRoot(self);
			const gameVariant = OptionsStore.gameVariant;
			const position = self.variantPosition();
			if (typeof position.name === 'object') {
				return position.name[gameVariant];
			}
			return position.name;
		},
		getImage: () => {
			const image = new Image();
			image.src = self.image;
			return image;
		},
		get initials() {
			const [first, last] = self.name.split(' ');
			return `${first.substr(0, 1)}${last.substr(0, 1)}`
		},
		getLastName() {
			const [, last] = self.name.split(' ');
			return last;
		},
	}));

export default Player;
