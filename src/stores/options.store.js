import {applySnapshot, types} from 'mobx-state-tree';
import {GAME_VARIANT_UNION} from "../constants/players";

const Options = types
	.model({
		gameVariant           : types.optional(types.string, GAME_VARIANT_UNION),
		teamName              : types.string,
		teamImage             : types.maybeNull(types.string),
		imagePlayersRadius    : types.number,
		imageSubstitutesRadius: types.number,
		backgroundColor       : types.string,
		playerFontSize        : types.number,
		SubstitutesFontSize   : types.number,
		showText              : true,
		showImages            : true,
		showModal             : false,
		leftOpen              : false,
		rightOpen             : false,
		leftView              : types.maybeNull(types.string),
		rightView             : types.maybeNull(types.string)
	})
	.actions(self => ({
		setGameVariant(gameVariant) {
			self.gameVariant = gameVariant
		},
		setTeamName(teamName) {
			self.teanName = teamName
		},
		setImagePlayersRadius(radius) {
			self.imagePlayersRadius = radius
		},
		setImageSubstitutesRadius(radius) {
			self.imageSubstitutesRadius = radius
		},
		setBackgroundColor(color) {
			self.backgroundColor = color
		},
		setPlayerFontSize(size) {
			self.playerFontSize = size
		},
		setSubstitutesFontSize(size) {
			self.SubstitutesFontSize = size
		},
		toggleShowModal() {
			self.showModal = !self.showModal;
		},
		toggleLeftDrawer() {
			self.leftOpen = !self.leftOpen;
		},
		toggleRightDrawer() {
			self.rightOpen = !self.rightOpen;
		},
		toggleDrawer(anchor) {
			self[`${anchor}Open`] = !self[`${anchor}Open`];
		},
		closeDrawer(anchor) {
			self[`${anchor}Open`] = false;
		},
		openDrawer(anchor) {
			self[`${anchor}Open`] = true;
		},
		save(options) {
			applySnapshot(self, options)
		},
	}))
	.views(self => ({
		get backgroundDefaults() {
			return {
				fill: self.backgroundColor
			}
		},
		getTeamNameSplited(position) {
			const space = self.teamName.indexOf(' ');
			if (!space) {
				return self.teamName.trim();
			}
			if (position === 0) {
				return self.teamName.substr(0, space).trim()
			} else {
				return self.teamName.substr(space, self.teamName.length).trim()
			}
		},
		getImage: () => {
			const image = new Image();
			image.src = self.teamImage;
			return image;
		}
	}));

export default Options;
