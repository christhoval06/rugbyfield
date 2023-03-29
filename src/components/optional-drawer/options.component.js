import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { compose } from 'recompose';
import { withStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem/MenuItem';

import { DEFAULT_OPTIONS } from '../../constants/options';
import { GAME_VARIANTS } from '../../constants/players';

import { withMixpanel } from '../../context/MixpanelContext';

import CropperComponent from '../cropper.component';
import OptionalHeaderComponent from './optional-header.component';
import ColorPickerComponent from '../color-picker.component';

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  formControl: {
    ...theme.mixins.toolbar,
    margin: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
  },
  formControlLabel: {
    ...theme.mixins.toolbar,
    margin: theme.spacing.unit,
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'left',
  },
  flex: {
    flex: 1,
  },
  row: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

function OptionsComponent(props) {
  const [state, setState] = React.useState(() => {
    const { OptionsStore } = props;
    return {
      ...DEFAULT_OPTIONS,
      ...OptionsStore,
      croppedImage: null,
    };
  });

  const onClose = React.useCallback(() => {
    const { OptionsStore, anchor } = props;
    if (OptionsStore.showModal) {
      OptionsStore.toggleShowModal();
    }
    OptionsStore.closeDrawer(anchor);
  }, [props]);

  const onSubmit = () => {
    const { OptionsStore } = props;
    const {
      showText,
      showImages,
      gameVariant,
      teamName,
      teamImage,
      imagePlayersRadius,
      imageSubstitutesRadius,
      backgroundColor,
      playerFontSize,
      SubstitutesFontSize,
      showOnlyInitials,
    } = state;
    // this.props.mixpanel.track(`Save Options`);
    OptionsStore.save({
      showText,
      showImages,
      showOnlyInitials,
      gameVariant,
      teamName,
      teamImage,
      imagePlayersRadius: parseInt(imagePlayersRadius, 10),
      imageSubstitutesRadius: parseInt(imageSubstitutesRadius, 10),
      backgroundColor,
      playerFontSize: parseInt(playerFontSize, 10),
      SubstitutesFontSize: parseInt(SubstitutesFontSize, 10),
    });
    onClose();
  };

  const onCrop = (croppedImage) => {
    // this.props.mixpanel.track(`Options change Image.`);
    setState((s) => ({ ...s, teamImage: croppedImage, croppedImage }));
  };

  const handleChange = (name) => (event) =>
    setState((s) => ({
      ...s,
      [name]: event.target.value,
      [`${name}Length`]: event.target.value.length,
    }));

  const handleChangeBoolean = (name) => (event) => {
    // this.props.mixpanel.track(`Options prefers ${name}-> ${event.target.checked ? 'SI' : 'NO'}.`);
    setState((s) => ({ ...s, [name]: event.target.checked }));
  };

  React.useEffect(() => {
    return () => {
      setState({ ...DEFAULT_OPTIONS });
      onClose();
    };
  }, [onClose]);

  const { classes, anchor } = props;
  const {
    showOnlyInitials,
    showText,
    showImages,
    croppedImage,
    gameVariant,
    teamName,
    teamImage,
    imagePlayersRadius,
    imageSubstitutesRadius,
    backgroundColor,
    playerFontSize,
    SubstitutesFontSize,
  } = state;

  return (
    <div>
      <OptionalHeaderComponent anchor={anchor} onClick={onClose} title='Options' />
      <Divider />

      <form className={classes.form} noValidate autoComplete='off'>
        <div className={classes.formContainer}>
          <FormControl className={classes.formControl}>
            <div className={classNames(classes.flex, classes.row)}>
              <Typography color='secondary'>Background Color</Typography>
            </div>
            <ColorPickerComponent
              onColorSelected={(color) => setState((s) => ({ ...s, backgroundColor: color }))}
              color={backgroundColor}
              defaultColor={DEFAULT_OPTIONS.backgroundColor}
            />
          </FormControl>

          <Divider />

          <FormControl className={classes.formControl}>
            <Typography color='secondary'>Team Image</Typography>
            <CropperComponent
              image={croppedImage || teamImage}
              defaultImage={teamImage}
              onCrop={onCrop}
            />
          </FormControl>

          <Divider />

          <FormControl className={classes.formControl}>
            <Typography color='secondary'>Game Variant</Typography>
            <Select
              value={gameVariant}
              onChange={handleChange('gameVariant')}
              inputProps={{
                name: 'game_variant',
              }}
            >
              <MenuItem disabled={true} value='default'>
                <em>Select a variant</em>
              </MenuItem>
              {Object.keys(GAME_VARIANTS).map((k, i) => (
                <MenuItem key={i} value={k}>
                  {GAME_VARIANTS[k]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Divider />

          <FormControl className={classes.formControl}>
            <Typography color='secondary'>Team Name</Typography>
            <Input
              type='text'
              placeholder='Team Name'
              defaultValue={teamName}
              onChange={handleChange('teamName')}
            />
          </FormControl>

          <Divider />

          <FormControl className={classes.formControl}>
            <Typography color='secondary'>Player Image Radius</Typography>
            <Input
              type='text'
              placeholder='Radius'
              defaultValue={imagePlayersRadius}
              onChange={handleChange('imagePlayersRadius')}
            />
          </FormControl>

          <Divider />

          <FormControl className={classes.formControl}>
            <Typography color='secondary'>Player FontSize</Typography>
            <Input
              type='text'
              placeholder='Radius'
              defaultValue={playerFontSize}
              onChange={handleChange('playerFontSize')}
            />
          </FormControl>

          <Divider />

          <FormControl className={classes.formControl}>
            <Typography color='secondary'>Substitutes Radius</Typography>
            <Input
              type='text'
              placeholder='Radius'
              defaultValue={imageSubstitutesRadius}
              onChange={handleChange('imageSubstitutesRadius')}
            />
          </FormControl>

          <Divider />

          <FormControl className={classes.formControl}>
            <Typography color='secondary'>Substitutes FontSize</Typography>
            <Input
              type='text'
              placeholder='Radius'
              defaultValue={SubstitutesFontSize}
              onChange={handleChange('SubstitutesFontSize')}
            />
          </FormControl>

          <Divider />

          <FormControl className={classes.formControl}>
            <Typography color='secondary'>Substitutes FontSize</Typography>
            <Input
              type='text'
              placeholder='Radius'
              defaultValue={SubstitutesFontSize}
              onChange={handleChange('SubstitutesFontSize')}
            />
          </FormControl>

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch
                checked={showText}
                onChange={handleChangeBoolean('showText')}
                value='showText'
                color='primary'
              />
            }
            label='Show Text'
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch
                checked={showImages}
                onChange={handleChangeBoolean('showImages')}
                value='showImages'
                color='primary'
              />
            }
            label='Show Images'
          />

          <FormControlLabel
            className={classes.formControlLabel}
            control={
              <Switch
                checked={showOnlyInitials}
                onChange={handleChangeBoolean('showOnlyInitials')}
                value='showImages'
                color='primary'
              />
            }
            label='Only Initials'
          />
        </div>
        <Divider />
        <Button color='primary' onClick={() => onSubmit()}>
          Save
        </Button>{' '}
        <Button color='secondary' onClick={() => onClose()}>
          Cancel
        </Button>
      </form>
    </div>
  );
}

OptionsComponent.propTypes = {
  OptionsStore: PropTypes.object,
  classes: PropTypes.object,
  anchor: PropTypes.oneOf(['left', 'right']),
  mixpanel: PropTypes.object,
};

export default compose(
  withStyles(styles),
  // @withMixpanel
  inject('OptionsStore'),
  observer,
)(OptionsComponent);
