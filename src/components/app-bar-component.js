import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVert from '@mui/icons-material/MoreVert';
import Settings from '@mui/icons-material/Settings';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import { DEFAULT_OPTIONS } from '../constants/options';
import { DRAWER_WIDTH } from '../configs';

import { useMenu } from '../hooks/MenuProvider';

import AppTitleComponent from './side-bar/app-title.component';
import CustomizedSnackbar from './customized-snack-bar.component';

const styles = (theme) => ({
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarFull: {
    width: '100%',
  },
  'appBarShift-left': {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
  },
  'appBarShift-right': {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginRight: DRAWER_WIDTH,
  },
  appBarShiftBoot: {
    width: `calc(100% - ${DRAWER_WIDTH * 2}px)`,
  },
  row: {
    flex: 1,
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 10,
    backgroundColor: 'white',
  },
  toolbar: theme.mixins.toolbar,
});

function AppBarComponent(props) {
  const fileField = useRef();
  const [state, setState] = useState({
    anchorEl: null,
    snackBarVariant: 'success',
    snackBarMessage: false,
    snackBarOpen: false,
  });

  const handleMenu = (event) => {
    setState((s) => ({ ...s, anchorEl: event.currentTarget }));
  };

  const handleClose = () => {
    setState((s) => ({ ...s, anchorEl: null }));
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState((s) => ({ ...s, snackBarOpen: false }));
  };

  const onChangeFile = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    props.AppStore.load(file)
      .then((r) => {
        // this.props.mixpanel.track('Load from File.');
        setState((s) => ({
          ...s,
          snackBarVariant: 'success',
          snackBarOpen: true,
          snackBarMessage: 'Loaded!!!',
        }));
      })
      .catch((e) => {
        // this.props.mixpanel.track('Error to load from File.');
        setState((s) => ({
          ...s,
          snackBarVariant: 'error',
          snackBarOpen: true,
          snackBarMessage: 'Error',
        }));
      });
  };

  const { AppStore, PlayersStore, OptionsStore, classes } = props;
  const { anchorEl, snackBarOpen, snackBarVariant, snackBarMessage } = state;
  const open = Boolean(anchorEl);

  const {menu: extraMenu} = useMenu();

  return (
    <AppBar
      color='inherit'
      position='absolute'
      className={classNames(classes.appBar, {
        [classes.appBarFull]: !PlayersStore.havePlayers,
        [classes.appBarShift]: OptionsStore.rightOpen || OptionsStore.leftOpen,
        [classes['appBarShift-right']]: OptionsStore.rightOpen,
        [classes['appBarShift-left']]: OptionsStore.leftOpen,
        [classes['appBarShiftBoot']]:
          (OptionsStore.rightOpen && OptionsStore.leftOpen) ||
          (PlayersStore.havePlayers && OptionsStore.rightOpen),
      })}
    >
      <CustomizedSnackbar
        open={snackBarOpen}
        variant={snackBarVariant}
        message={snackBarMessage}
        onClose={handleCloseSnackBar}
      />

      <Toolbar>
        <div className={classes.row}>
          <Avatar src={DEFAULT_OPTIONS.teamImage} alt='RugbyField' className={classes.avatar} />
          {PlayersStore.havePlayers && (
            <Typography variant='h6' color='inherit' noWrap>
              Rugby PTY
            </Typography>
          )}
          {!PlayersStore.havePlayers && <AppTitleComponent />}
        </div>
        <div>
          <input ref={fileField} type='file' hidden name='file' onChange={onChangeFile} />
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup='true'
            onClick={OptionsStore.toggleRightDrawer}
            color='inherit'
          >
            <Settings />
          </IconButton>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <MoreVert />
          </IconButton>
          <Menu id='menu-appbar' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                AppStore.new();
              }}
            >
              New
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                fileField.current.click();
              }}
            >
              Load from File
            </MenuItem>
            {Boolean(extraMenu.length) && <Divider />}
            {extraMenu &&
              extraMenu.map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleClose();
                    item.onClick();
                  }}
                >
                  {item.text}
                </MenuItem>
              ))}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

AppBarComponent.propTypes = {
  classes: PropTypes.object,
  PlayersStore: PropTypes.object,
  OptionsStore: PropTypes.object,
  // mixpanel    : PropTypes.object
};

export default compose(
  withStyles(styles),
  // @withMixpanel
  inject('AppStore', 'PlayersStore', 'OptionsStore'),
  observer,
)(AppBarComponent);
