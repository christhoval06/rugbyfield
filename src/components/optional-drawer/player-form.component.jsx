import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import { withStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import ArrowForward from '@mui/icons-material/ArrowForward';

import { cn } from '@/utils/cn';

import InputField from '../formFields/InputField';
import SelectorField from '../formFields/SelectorField';

import {
  DEFAULT_FIELD,
  DEFAULT_PLAYER,
  PLAYER_GROUP_BACKS,
  PLAYER_GROUP_FORDWARDS,
  PLAYER_POSITIONS,
  PLAYER_SUBSTITUTE,
  POSITION_IN_GROUP_BACKS,
} from '../../constants/players';

const styles = (theme) => ({
  formContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar,
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function PlayerFormComponent(props) {
  const [state, setState] = React.useState(() => {
    const { PlayersStore } = props;
    let { name, number, position } = DEFAULT_PLAYER;

    if (PlayersStore.editMode) {
      name = PlayersStore.selectedPlayer.name;
      number = `${PlayersStore.selectedPlayer.number}`;
      position = PlayersStore.selectedPlayer.position;
    }

    return {
      name,
      number,
      position: position ?? 'default',
      error: props.error,
      fromIsValid: false,
    };
  });

  const getPositionValueVariant = (attr) => {
    const { OptionsStore } = props;
    if (typeof attr !== 'object') {
      return attr;
    }
    return attr[OptionsStore.gameVariant];
  };

  const getPlayerPositionValue = (key, value, find) => {
    const position = PLAYER_POSITIONS.find((p) => p[key] === value);
    const toFind = position?.[find];
    return getPositionValueVariant(toFind);
  };

  const _getPlayerPosition = (position) => {
    if (position === PLAYER_SUBSTITUTE) return setState((s) => ({ ...s, position }));
    setState((s) => ({
      ...s,
      position,
      // number: getPlayerPositionValue('short', position, 'number'),
    }));
  };

  const _getPlayerPositionName = () => getPlayerPositionValue('short', state.position, 'name');

  const _onSubmit = () => {
    const { onSubmit } = props;
    const { name, number, position } = state;
    onSubmit({
      name,
      number: parseInt(number, 10),
      position,
      group: POSITION_IN_GROUP_BACKS.includes(position)
        ? PLAYER_GROUP_BACKS
        : PLAYER_GROUP_FORDWARDS,
    });
  };

  const handleChange = (name) => (event) => {
    setState((s) => ({
      ...s,
      [name]: event.target.value,
    }));
  };

  const { OptionsStore, PlayersStore, classes } = props;
  const { error, name, number, position } = state;

  const editMode = PlayersStore.editMode;
  return (
    <div className={classes.formContainer}>
      <Divider />

      <InputField
        editMode={editMode}
        error={error}
        fieldName='name'
        label='Full Name'
        helperText='Player Name. Example: C BARBA'
        onChange={handleChange('name')}
        defaultValue={name}
        maxLength={DEFAULT_FIELD.nameMaxLength}
        required
      />

      <Divider />

      <SelectorField
        editMode={editMode}
        error={error}
        fieldName='position'
        label='Position'
        helperText='Player Position. Example: Lock'
        onChange={_getPlayerPosition}
        defaultValue={position}
        defaultOption='Select a position'
        options={PLAYER_POSITIONS.filter((p) => p.game_variants.includes(OptionsStore.gameVariant))}
        optionValueResolver={getPositionValueVariant}
        optionNameResolver={_getPlayerPositionName}
      />

      <Divider />

      {(position === PLAYER_SUBSTITUTE || true) && (
        <>
          <InputField
            editMode={editMode}
            error={error}
            fieldName='number'
            label='Number'
            helperText='Player Number. Example: 6'
            onChange={handleChange('number')}
            defaultValue={number}
            maxLength={DEFAULT_FIELD.numberMaxLength}
            required
          />
          <Divider />
        </>
      )}

      <div className={cn(classes.toolbar, classes.centered)}>
        <Fab color='primary' aria-label='add or save' onClick={_onSubmit}>
          <ArrowForward />
        </Fab>
      </div>
    </div>
  );
}
PlayerFormComponent.propTypes = {
  classes: PropTypes.object,
  OptionsStore: PropTypes.object,
  PlayersStore: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  inject('OptionsStore', 'PlayersStore'),
  observer,
)(PlayerFormComponent);
