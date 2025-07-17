import React from 'react';
import compose from 'recompose/compose';
import { observer, inject } from 'mobx-react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';

import {
  PLAYER_GROUP_BACKS,
  PLAYER_GROUP_FORDWARDS,
  PLAYER_GROUP_SUBSTITUTE,
  SHOW_ALL,
  SHOW_BACKS,
  SHOW_FORDWARDS,
  SHOW_SUBSTITUTE,
} from '../../constants/players';

function PlayersFiltersComponent(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (filter) => {
    setAnchorEl(null);
    props.PlayersStore.setFilter(filter);
  };

  const { PlayersStore } = props;
  if (PlayersStore.players.length === 0) return null;

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        aria-owns={open ? 'menu-filters' : null}
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <MoreVert />
      </IconButton>
      <Menu id='menu-filters' anchorEl={anchorEl} open={open} onClose={() => handleClose(null)}>
        {[
          { text: 'ALL', onClick: () => handleClose(SHOW_ALL) },
          { text: PLAYER_GROUP_BACKS.toUpperCase(), onClick: () => handleClose(SHOW_BACKS) },
          {
            text: PLAYER_GROUP_FORDWARDS.toUpperCase(),
            onClick: () => handleClose(SHOW_FORDWARDS),
          },
          {
            text: PLAYER_GROUP_SUBSTITUTE.toUpperCase(),
            onClick: () => handleClose(SHOW_SUBSTITUTE),
          },
        ].map((item, i) => (
          <MenuItem key={i} {...item}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default compose(inject('PlayersStore'), observer)(PlayersFiltersComponent);
