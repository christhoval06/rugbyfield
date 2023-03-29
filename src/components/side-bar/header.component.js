import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Add from '@mui/icons-material/Add';

import PlayersFiltersComponent from './players-filters.component';
import AppTitleComponent from './app-title.component';

const styles = {
  appBar: {
    boxShadow: 'none',
  },
  actions: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  toolbar: {
    padding: '10px 16px',
  },
};

const HeaderComponent = ({ classes, OptionsStore }) => (
  <AppBar position='static' color='inherit' className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <AppTitleComponent />
      <div className={classes.actions}>
        <IconButton aria-haspopup='true' color='inherit' onClick={OptionsStore.toggleLeftDrawer}>
          <Add />
        </IconButton>
        <PlayersFiltersComponent />
      </div>
    </Toolbar>
  </AppBar>
);

HeaderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  OptionsStore: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), inject('OptionsStore'), observer)(HeaderComponent);
