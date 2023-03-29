import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { compose } from 'recompose';
import { withStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import ArrowForward from '@mui/icons-material/ArrowForward';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';

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
  button: {
    margin: theme.spacing.unit,
  },
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
  ended: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textField: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  lengthInputAdornment: {
    color: '#bbb',
    fontSize: 14,
  },
  InputEditMode: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 24px',
  },
  InputEditModeText: {
    flex: 1,
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  InputEditModeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function PlayerFormComponent(props) {
  const [state, setState] = React.useState(() => {
    const { PlayersStore } = props;
    let { name, number, position, image } = DEFAULT_PLAYER;

    if (PlayersStore.editMode) {
      name = PlayersStore.selectedPlayer.name;
      number = `${PlayersStore.selectedPlayer.number}`;
      position = PlayersStore.selectedPlayer.position;
    }

    return {
      name,
      number,
      position: position || 'default',
      error: props.error,
      openPosition: false,
      nameLength: (name || '').length,
      numberLength: (number || '').length,
      fromIsValid: false,
      editName: false,
      editPosition: false,
      editNumber: false,
    };
  });

  // componentWillMount() {
  // 	const {PlayersStore} = this.props;
  // 	let {name, number, position, image} = DEFAULT_PLAYER;
  //
  // 	if (PlayersStore.editMode) {
  // 		name = PlayersStore.selectedPlayer.name;
  // 		number = `${PlayersStore.selectedPlayer.number}`;
  // 		position = PlayersStore.selectedPlayer.position;
  // 	}
  //
  // 	return {error, name, number, position: };
  //
  // }

  const getPositionValueVariant = (attr) => {
    const { OptionsStore } = props;
    if (typeof attr !== 'object') {
      return attr;
    }
    return attr[OptionsStore.gameVariant];
  };

  const getPlayerPositionValue = (key, value, find) => {
    const position = PLAYER_POSITIONS.find((p) => p[key] === value);
    const toFind = position[find];
    return getPositionValueVariant(toFind);
  };

  const _getPlayerPosition = (e) => {
    const position = e.target.value;
    if (position === PLAYER_SUBSTITUTE) return setState((s) => ({ ...s, position }));
    setState((s) => ({
      ...s,
      position,
      number: getPlayerPositionValue('short', position, 'number'),
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
      [`${name}Length`]: event.target.value.length,
    }));
  };

  const { OptionsStore, PlayersStore, classes } = props;
  const {
    error,
    name,
    number,
    position,
    nameLength,
    numberLength,
    editName,
    editPosition,
    editNumber,
  } = state;

  const editMode = PlayersStore.editMode;
  return (
    <div className={classes.formContainer}>
      {position === PLAYER_SUBSTITUTE && (
        <FormControl className={classes.formControl} error={error && error.attribute === 'number'}>
          <Typography color='secondary'>Number</Typography>
          {editMode && !editNumber && (
            <div className={classNames(classes.toolbar, classes.InputEditMode)}>
              <Typography className={classes.InputEditModeText}>{number}</Typography>
              <IconButton
                className={classes.InputEditModeButton}
                onClick={() => setState((s) => ({ ...s, editNumber: true }))}
              >
                <Edit />
              </IconButton>
            </div>
          )}
          {(!editMode || editNumber) && (
            <div className={classNames(classes.toolbar, classes.textField, classes.ended)}>
              <TextField
                className={classes.textField}
                defaultValue={number}
                onChange={handleChange('number')}
                error={error && error.attribute === 'number'}
                helperText={
                  error && error.attribute === 'number'
                    ? error.message
                    : 'Player Number. Example: 6'
                }
                margin='normal'
                inputProps={{
                  name: 'name',
                  maxLength: DEFAULT_FIELD.numberMaxLength,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment className={classes.lengthInputAdornment} position='end'>
                      {DEFAULT_FIELD.numberMaxLength - numberLength}
                    </InputAdornment>
                  ),
                }}
                fullWidth={true}
              />
            </div>
          )}
        </FormControl>
      )}

      <Divider />

      <FormControl
        className={classes.formControl}
        error={error && error.attribute === 'name'}
        required
      >
        <Typography color='secondary'>Full Name</Typography>
        {editMode && !editName && (
          <div className={classNames(classes.toolbar, classes.InputEditMode)}>
            <Typography className={classes.InputEditModeText}>{name}</Typography>
            <IconButton
              className={classes.InputEditModeButton}
              onClick={() => setState((s) => ({ ...s, editName: true }))}
            >
              <Edit />
            </IconButton>
          </div>
        )}
        {(!editMode || editName) && (
          <div className={classNames(classes.toolbar, classes.textField, classes.ended)}>
            <TextField
              className={classes.textField}
              defaultValue={name}
              error={error && error.attribute === 'name'}
              helperText={
                error && error.attribute === 'name'
                  ? error.message
                  : 'Player Name. Example: C BARBA'
              }
              onChange={handleChange('name')}
              margin='normal'
              inputProps={{
                name: 'name',
                maxLength: DEFAULT_FIELD.nameMaxLength,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment className={classes.lengthInputAdornment} position='end'>
                    {DEFAULT_FIELD.nameMaxLength - nameLength}
                  </InputAdornment>
                ),
              }}
              fullWidth={true}
            />
          </div>
        )}
      </FormControl>

      <Divider />

      <FormControl className={classes.formControl} error={error && error.attribute === 'position'}>
        <Typography color='secondary'>Position</Typography>
        {editMode && !editPosition && (
          <div className={classNames(classes.toolbar, classes.InputEditMode)}>
            <Typography className={classes.InputEditModeText}>
              {_getPlayerPositionName()}
            </Typography>
            <IconButton
              className={classes.InputEditModeButton}
              onClick={() => setState((s) => ({ ...s, editPosition: true }))}
            >
              <Edit />
            </IconButton>
          </div>
        )}
        {(!editMode || editPosition) && (
          <div className={classNames(classes.toolbar, classes.textField, classes.ended)}>
            <TextField
              select
              helperText={
                error && error.attribute === 'position'
                  ? error.message
                  : 'Player Position. Example: Lock'
              }
              className={classes.textField}
              error={error && error.attribute === 'position'}
              value={position}
              onChange={_getPlayerPosition}
              inputProps={{ name: 'position' }}
            >
              <MenuItem disabled={true} value='default'>
                <em>Select a position</em>
              </MenuItem>
              {PLAYER_POSITIONS.filter((p) =>
                p.game_variants.includes(OptionsStore.gameVariant),
              ).map((p, i) => (
                <MenuItem key={i} value={p.short}>
                  {getPositionValueVariant(p.name)}
                </MenuItem>
              ))}
            </TextField>
          </div>
        )}
      </FormControl>

      <Divider />

      <div className={classNames(classes.toolbar, classes.centered)}>
        <Fab color='primary' aria-label='add' className={classes.button} onClick={_onSubmit}>
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
