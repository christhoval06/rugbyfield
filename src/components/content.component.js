import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { compose } from 'recompose';
import { withStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import { DRAWER_WIDTH } from '../configs';
import Field from '../components/field';
import EmptyPlayersComponent from '../components/empty-players.component';

const styles = (theme) => ({
  content: {
    display: 'flex',
    flexGrow: 1,
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  full: {},
  withSideBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
});

function ContentComponent({ OptionsStore, PlayersStore, classes }) {
  return (
    <Box component="main"
      className={classNames(classes.content, {
        [classes.full]: !PlayersStore.havePlayers,
        [classes.withSideBar]: PlayersStore.havePlayers,
      })}
    >
      <Field />
      <EmptyPlayersComponent />
    </Box>
  );
}

ContentComponent.propTypes = {
  classes: PropTypes.object,
  PlayersStore: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), inject('PlayersStore'), observer)(ContentComponent);
