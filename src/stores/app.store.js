import {applySnapshot, getRoot, getSnapshot, types} from 'mobx-state-tree';
import storeValidator from '../validations/store'

export default types
	.model({
		title  : types.string,
		version: types.string
	}).actions(self => ({
		toJSON() {
			return getSnapshot(getRoot(self));
		},
		load: function(file) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					try {
						const data = JSON.parse(reader.result);
						const isValid = storeValidator(data);
						if(!isValid){
							reject(new Error('File no valid'));
						}
						self.update(data, resolve, reject)
					} catch (e) {
						console.error(e);
						reject(e);
					}
				};
				reader.readAsText(file);
			});
		},
		update(data, resolve, reject) {
			const root = getRoot(self);
			if (!data.hasOwnProperty('AppStore')) {
				return reject(new Error('not-app-config'))
			}
			if (!data.hasOwnProperty('PlayersStore')) {
				return reject(new Error('not-players-config'))
			}
			if (!data.hasOwnProperty('OptionsStore')) {
				return reject(new Error('not-options-config'))
			}

			// if (data['AppStore'].version !== self.version) {
			// 	return reject(new Error('mismatch-version'))
			// }

			// Object.keys(data)
			applySnapshot(root, data);
			resolve(true)

			// data.players.forEach(player => self.props.PlayersStore.addPlayer(player));
		},
		new() {
			const root = getRoot(self);
			applySnapshot(root, {});
		}
	}));
