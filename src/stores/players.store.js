import {destroy, getRoot, types} from 'mobx-state-tree';

import {
	GAME_SUBSTITUTES,
	PLAYER_SUBSTITUTE,
	POSITION_IN_GROUP_BACKS,
	POSITION_IN_GROUP_FORDWARDS,
	POSITION_IN_GROUP_SUBSTITUTE,
	SHOW_ALL,
	SHOW_BACKS,
	SHOW_BY_NAME,
	SHOW_FORDWARDS,
	SHOW_SUBSTITUTE,
} from "../constants/players"
import Player from './player.store';

const filterType = types.union(...[SHOW_BY_NAME, SHOW_ALL, SHOW_BACKS, SHOW_FORDWARDS, SHOW_SUBSTITUTE].map(types.literal));
const PLAYER_FILTERS = {
	[SHOW_BY_NAME]   : q => p => p.name.search(new RegExp(q, 'i')) >= 0,
	[SHOW_ALL]       : () => () => true,
	[SHOW_BACKS]     : () => p => POSITION_IN_GROUP_BACKS.includes(p.variantPosition().short),
	[SHOW_FORDWARDS] : () => p => POSITION_IN_GROUP_FORDWARDS.includes(p.variantPosition().short),
	[SHOW_SUBSTITUTE]: () => p => POSITION_IN_GROUP_SUBSTITUTE.includes(p.variantPosition().short),
};

const PlayersStore = types
	.model({
		players        : types.array(Player),
		filter         : types.optional(filterType, SHOW_ALL),
		showPlayerModal: false,
		editMode       : false,
		selectedPlayer : types.maybeNull(types.reference(Player)),
		query          : types.maybeNull(types.string)
	})
	.actions(self => ({
		addPlayer(player) {
			const id = self.players.reduce((maxId, player) => Math.max(player.id, maxId), 0) + 1;
			self.players.unshift({...{id, ref: `player_${id}`}, ...player});
			self.editMode = false;
			console.log('self.players', self.players);
		},
		removePlayer(player) {
			destroy(player);
		},
		setFilter(filter) {
			if (filter) {
				self.filter = filter;
			}
		},
		setQueryFilter(query) {
			self.filter = SHOW_BY_NAME;
			self.query = query;
		},
		toggleEditMode() {
			self.editMode = !self.editMode;
			if (!self.editMode) {
				self.selectedPlayer = null;
			}
		},
		togglePlayerModal() {
			if (self.showPlayerModal && self.editMode) {
				self.editMode = false;
				self.selectedPlayer = null;
			}
			self.showPlayerModal = !self.showPlayerModal;
		},
		selectPlayer(player) {
			self.selectedPlayer = player.ref;
			self.editMode = self.showPlayerModal = true;
		},
		editPlayer(player) {
			self.togglePlayerModal();
			const {OptionsStore} = getRoot(self);
			OptionsStore.toggleLeftDrawer();
			player.selectPlayer();
		}
	}))
	.views(self => ({
		get havePlayers() {
			return self.players.length > 0;
		},
		get filteredPlayers() {
			return self.players
				.filter(PLAYER_FILTERS[self.filter](self.query))
				.sort((a, b) => a.getNumber() - b.getNumber());
		},
		getPlayerWithPosition(position) {
			return self.players.find(p => p.position === position)
		},
		getPlayerSubstitutes() {
			// const {OptionsStore} = getRoot(self);
			// const gameVariant = OptionsStore.gameVariant;
			// const count = GAME_SUBSTITUTES[gameVariant];
			return self.players
				.filter(p => p.variantPosition().short === PLAYER_SUBSTITUTE)
				// .slice(0, count)
				.sort((a, b) => a.getNumber() - b.getNumber());
		}
	}));

export default PlayersStore;
