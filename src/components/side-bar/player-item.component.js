import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@mui/styles';
import compose from 'recompose/compose';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const styles = (theme) => ({
  divider: {
    marginLeft: '25%',
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  matched: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
});

function PlayerItemComponent(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPlayerFilteredName = (player) => {
    const { classes, PlayersStore } = props;
    const index = player.name.search(new RegExp(PlayersStore.query, 'i'));

    if (index < 0) return player.name;

    const query = PlayersStore.query;
    const name = player.name;
    const start = name.substr(0, index);
    const middle = name.substr(index, query.length);
    const end = name.substr(index + query.length, name.length);

    return (
      <span title={name}>
        {start}
        <span className={classes.matched}>{middle}</span>
        {end}
      </span>
    );
  };

  const { classes, player, PlayersStore } = props;
  const open = Boolean(anchorEl);

  return (
    <div>
      <ListItem dense button>
        <Avatar alt={player.name} src={player.image} className={classes.bigAvatar} />
        <ListItemText
          primary={getPlayerFilteredName(player)}
          secondary={`#${player.getNumber()} ${player.getPosition()}`}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup='true'
            onClick={handleMenu}
            color={'secondary'}
          >
            <KeyboardArrowDown />
          </IconButton>
          <Menu id='menu-appbar' anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                PlayersStore.editPlayer(player);
              }}
            >
              Edit
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                handleClose();
                player.remove();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider className={classes.divider} />
    </div>
  );
}

PlayerItemComponent.propTypes = {
  classes: PropTypes.object,
  PlayersStore: PropTypes.object,
  player: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), inject('PlayersStore'), observer)(PlayerItemComponent);
