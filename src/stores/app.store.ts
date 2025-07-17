import {
  applySnapshot,
  getRoot,
  getSnapshot,
  types,
  type Instance,
  type SnapshotIn,
  type SnapshotOut,
} from 'mobx-state-tree';

import storeValidator from '../validations/store';

import { encryptAndSign, verifyAndDecrypt } from '../utils/encryptor';
import { loadFile } from '../utils/file';

const AppStore = types
  .model('AppStore', {
    title: types.string,
    version: types.string,
  })
  .actions((self) => ({
    toJSON() {
      return getSnapshot(getRoot(self));
    },
    getEncriptedState() {
      return encryptAndSign(JSON.stringify(self.toJSON()));
    },
    load: function (file: File) {
      return new Promise(async (resolve, reject) => {
        try {
          const encrypted = await loadFile(file);
          const res = verifyAndDecrypt(encrypted);
          let snapshot = null;
          if (res) {
            snapshot = JSON.parse(res);
          } else {
            snapshot = JSON.parse(encrypted);
          }
          const isValid = storeValidator(snapshot);
          if (!isValid) {
            reject(new Error('File no valid'));
          }
          self.update(snapshot, resolve, reject);
        } catch (e) {
          console.error(e);
          reject(e);
        }
      });
    },
    update(data: object, resolve: (res: boolean) => void, reject: (error: Error) => void) {
      const root = getRoot(self);
      if (!data.hasOwnProperty('AppStore')) {
        return reject(new Error('not-app-config'));
      }
      if (!data.hasOwnProperty('PlayersStore')) {
        return reject(new Error('not-players-config'));
      }
      if (!data.hasOwnProperty('OptionsStore')) {
        return reject(new Error('not-options-config'));
      }

      // if (data['AppStore'].version !== self.version) {
      // 	return reject(new Error('mismatch-version'))
      // }

      // Object.keys(data)
      applySnapshot(root, data);
      resolve(true);

      // data.players.forEach(player => self.props.PlayersStore.addPlayer(player));
    },
    new() {
      const root = getRoot(self);
      applySnapshot(root, {});
    },
  }));

export interface IAppStore extends Instance<typeof AppStore> {}
export interface IAppStoreSnapshotIn extends SnapshotIn<typeof AppStore> {}
export interface IAppStoreSnapshotOut extends SnapshotOut<typeof AppStore> {}

export default AppStore;
