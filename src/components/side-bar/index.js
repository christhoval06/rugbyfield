import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import PlayerListComponent from './player-list.component';
import HeaderComponent from './header.component';
import SearchBarComponent from './search-bar.component';
import { DRAWER_WIDTH } from '../../configs';

const styles = {
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
  },
};

const SideBarComponent = ({ classes, ...props }) => (
  <Drawer
    variant='permanent'
    classes={{ root: classes.drawer, paper: classes.drawerPaper }}
    anchor='left'
  >
    <HeaderComponent {...props} />
    <Divider />
    <SearchBarComponent {...props} />
    <Divider />
    <PlayerListComponent {...props} />
  </Drawer>
);

SideBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBarComponent);
