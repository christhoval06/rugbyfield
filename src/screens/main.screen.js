import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@mui/styles';
import { compose } from 'recompose';
import { withMixpanel } from '../context/MixpanelContext';

import SideBarComponent from '../components/side-bar';
import ContentComponent from '../components/content.component';
import OptionalDrawer from '../components/optional-drawer';
import AppBarComponent from '../components/app-bar-component';
import PlayerEditComponent from '../components/optional-drawer/player-edit.component';
import OptionsComponent from '../components/optional-drawer/options.component';

const styles = {
  app: {
    flexGrow: 1,
    height: '100%',
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
};

// @withMixpanel
function Main({ PlayersStore, classes }) {
  // const [extraMenu, setExtraMenu] = useState([]);
  const content = useRef();

  // componentDidMount() {
  // 	// this.props.mixpanel.track(`RugbyField started.`);
  // }

  // const loadField = (extraMenu) => {
  //   console.log('loadField');
  //   setExtraMenu(extraMenu);
  // };

  return (
    <div className={classes.app}>
      <div className={classes.appFrame}>
        <AppBarComponent />

        {PlayersStore.havePlayers && <SideBarComponent />}

        <OptionalDrawer anchor={'left'}>
          <PlayerEditComponent />
        </OptionalDrawer>

        <ContentComponent innerRef={content} />

        <OptionalDrawer anchor={'right'}>
          <OptionsComponent />
        </OptionalDrawer>
      </div>
    </div>
  );
}
Main.propTypes = {
  classes: PropTypes.object,
  PlayersStore: PropTypes.object.isRequired,
  OptionsStore: PropTypes.object.isRequired,
  // mixpanel    : PropTypes.object.isRequired
};

export default compose(withStyles(styles), inject('PlayersStore', 'OptionsStore'), observer)(Main);
