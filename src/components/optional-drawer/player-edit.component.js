import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { withStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';

import { DEFAULT_PLAYER } from '../../constants/players';

import CropperComponent from '../cropper.component';
import OptionalHeaderComponent from './optional-header.component';
import PlayerFormComponent from './player-form.component';

const styles = {
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

function PlayerEditComponent(props) {
  const [state, setState] = React.useState(() => {
    const { PlayersStore } = props;
    let { image } = DEFAULT_PLAYER;

    if (PlayersStore.editMode) {
      image = PlayersStore.selectedPlayer.image;
    }
    return {
      ...DEFAULT_PLAYER,
      image,
      croppedImage: null,
      openPosition: false,
      error: null,
    };
  });

  const onClose = React.useCallback(() => {
    const { PlayersStore, OptionsStore, anchor } = props;
    if (PlayersStore.showPlayerModal) {
      PlayersStore.togglePlayerModal();
    }
    OptionsStore.closeDrawer(anchor);
  }, [props]);

  React.useEffect(() => {
    return () => {
      setState({ ...DEFAULT_PLAYER });
      onClose();
    };
  }, [onClose]);

  const onSubmit = (data) => {
    const { PlayersStore } = props;

    const { image } = state;

    const player = {
      ...data,
      image,
    };

    if (PlayersStore.editMode) {
      // mixpanel.track(`Edit Player`);
      PlayersStore.selectedPlayer.edit(player);
    } else {
      // mixpanel.track(`Add Player`);
      PlayersStore.addPlayer(player);
    }

    onClose();
  };

  const onCrop = (croppedImage) => {
    // this.props.mixpanel.track('Crop Image.');
    setState((s) => ({ ...s, image: croppedImage, croppedImage }));
  };

  const { classes, anchor } = props;
  const { image, croppedImage } = state;

  return (
    <div>
      <OptionalHeaderComponent anchor={anchor} onClick={onClose} title='Player' />
      <Divider />
      <form className={classes.form} noValidate autoComplete='off'>
        <CropperComponent image={croppedImage || image} defaultImage={image} onCrop={onCrop} />

        <PlayerFormComponent onSubmit={onSubmit} />
      </form>
    </div>
  );
}

PlayerEditComponent.propTypes = {
  PlayersStore: PropTypes.object,
  OptionsStore: PropTypes.object,
  classes: PropTypes.object,
  anchor: PropTypes.oneOf(['left', 'right']),
  mixpanel: PropTypes.object,
};

export default compose(
  withStyles(styles),
  // @withMixpanel
  inject('PlayersStore', 'OptionsStore'),
  observer,
)(PlayerEditComponent);
