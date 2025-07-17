import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import 'cropperjs/dist/cropper.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { DEFAULT_PLAYER } from '../constants/players';

import ImageComponent from './image.component';
import CropperDialog from './cropper.dialog';

const styles = {
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageText: {
    margin: 0,
    padding: '0 0 10px',
    fontSize: 20,
    fontWeight: 600,
  },
  imageIcon: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 10,
  },
};

function CropperComponent(props) {
  const photoField = React.useRef();

  const [state, setState] = React.useState(() => ({
    imagePreview: props.image,
    defaultImage: props.defaultImage,
    hover: false,
    cropIsOpen: false,
    menuEl: null,
    croppedImage: null,
  }));

  const onOpenMenu = (e) => setState((s) => ({ ...s, menuEl: e.currentTarget, hover: true }));

  const onCloseMenu = () => setState((s) => ({ ...s, menuEl: null, hover: false }));

  const onCloseCropDialog = (e, reason) => {
    console.log({ reason });
	if(['backdropClick'].includes(reason)) return;
    setState((s) => ({ ...s, cropIsOpen: false }));
  };

  const onChangeImage = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      setState((s) => ({
        ...s,
        file: file,
        imagePreview: reader.result,
        cropIsOpen: true,
        menuEl: null,
        hover: false,
      }));
    };

    reader.readAsDataURL(file);
  };

  const onMouseLeave = () => setState((s) => ({ ...s, hover: !!s.menuEl }));

  const onCrop = (croppedImage) => {
    setState((s) => ({ ...s, croppedImage, cropIsOpen: false }));
    props.onCrop(croppedImage);
  };

  const onDeleteImage = () => {
    setState((s) => ({ ...s, croppedImage: DEFAULT_PLAYER.image, menuEl: null, hover: false }));
    props.onCrop(DEFAULT_PLAYER.image);
  };

  const { classes } = props;
  const { imagePreview, defaultImage, hover, menuEl, cropIsOpen, croppedImage } = state;
  return (
    <div className={classes.centered}>
      <input
        ref={photoField}
        type='file'
        hidden
        name='file'
        id='photo'
        accept='image/*'
        onChange={onChangeImage}
      />

      <ImageComponent
        onMouseEnter={() => setState((s) => ({ ...s, hover: true }))}
        overlay={hover}
        onMouseLeave={onMouseLeave}
        src={croppedImage || defaultImage}
      >
        <IconButton
          aria-owns={menuEl ? 'cropper-menu' : null}
          aria-haspopup='true'
          onClick={onOpenMenu}
        >
          <PhotoCamera className={classes.imageIcon} />
        </IconButton>
        <p className={classes.imageText}>Change Image</p>
      </ImageComponent>

      <Menu id='cropper-menu' anchorEl={menuEl} open={Boolean(menuEl)} onClose={onCloseMenu}>
        <MenuItem onClick={onCloseMenu}>View Photo</MenuItem>
        <MenuItem onClick={() => photoField.current.click()}>Upload Photo</MenuItem>
        <MenuItem onClick={onDeleteImage}>Delete Photo</MenuItem>
      </Menu>

      <CropperDialog
        src={imagePreview}
        onClose={onCloseCropDialog}
        open={cropIsOpen}
        onTryAgain={() => photoField.current.click()}
        onCrop={onCrop}
      />
    </div>
  );
}

CropperComponent.propTypes = {
  classes: PropTypes.object,
  onCrop: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  defaultImage: PropTypes.string.isRequired,
};

export default withStyles(styles)(CropperComponent);
