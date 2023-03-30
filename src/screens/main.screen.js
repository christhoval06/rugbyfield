import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import SideBarComponent from '../components/side-bar';
import ContentComponent from '../components/content.component';
import OptionalDrawer from '../components/optional-drawer';
import AppBarComponent from '../components/app-bar-component';
import PlayerEditComponent from '../components/optional-drawer/player-edit.component';
import OptionsComponent from '../components/optional-drawer/options.component';
function Main({ PlayersStore, classes }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarComponent />

      {PlayersStore.havePlayers && <SideBarComponent />}

      <OptionalDrawer anchor={'left'}>
        <PlayerEditComponent />
      </OptionalDrawer>

      <ContentComponent />

      <OptionalDrawer anchor={'right'}>
        <OptionsComponent />
      </OptionalDrawer>
    </Box>
  );
}
Main.propTypes = {
  classes: PropTypes.object,
  PlayersStore: PropTypes.object.isRequired,
  OptionsStore: PropTypes.object.isRequired,
};

export default compose(inject('PlayersStore', 'OptionsStore'), observer)(Main);
