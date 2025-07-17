import { getSnapshot, types } from 'mobx-state-tree';

import AppStore from './app.store';
import Options from './options.store';
import Players from './players.store';
import { DEFAULT_OPTIONS } from '../constants/options';
import { DEFAULT_APP } from '../constants/app';

const Store = types
  .model('Store', {
    AppStore: types.optional(AppStore, DEFAULT_APP),
    PlayersStore: types.optional(Players, { players: [] }),
    OptionsStore: types.optional(Options, DEFAULT_OPTIONS),
  })
  .actions((self) => ({
    toJSON() {
      console.log('getSnapshot(self)', getSnapshot(self));
    },
  }));

export default Store.create({});
