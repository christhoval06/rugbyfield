import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import 'cropperjs/dist/cropper.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {DEFAULT_PLAYER} from "../constants/players";

import ImageComponent from './image.component';
import CropperDialog from './cropper.dialog';

const styles = {
	centered : {
		display       : 'flex',
		justifyContent: 'center',
		alignItems    : 'center',
		width         : '100%',
	},
	imageText: {
		margin    : 0,
		padding   : '0 0 10px',
		fontSize  : 20,
		fontWeight: 600
	},
	imageIcon: {
		fontSize    : 48,
		color       : '#fff',
		marginBottom: 10,
	}
};

@withStyles(styles)
class CropperComponent extends Component {

	static propTypes = {
		classes     : PropTypes.object,
		onCrop      : PropTypes.func.isRequired,
		image       : PropTypes.string.isRequired,
		defaultImage: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			imagePreview: props.image,
			defaultImage: props.defaultImage,
			hover       : false,
			cropIsOpen  : false,
			menuEl      : null,
			croppedImage: null
		};
	}

	onOpenMenu = e => this.setState({menuEl: e.currentTarget, hover: true});

	onCloseMenu = () => this.setState({menuEl: null, hover: false});

	onCloseCropDialog = () => this.setState({cropIsOpen: false});

	onChangeImage = e => {
		e.preventDefault();

		const reader = new FileReader();
		const file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file        : file,
				imagePreview: reader.result,
				cropIsOpen  : true,
				menuEl      : null,
				hover       : false
			});
		};

		reader.readAsDataURL(file)
	};

	onMouseLeave = () => this.setState({hover: !!this.state.menuEl});

	onCrop = (croppedImage) => {
		this.setState({croppedImage, cropIsOpen: false});
		this.props.onCrop(croppedImage);
	};

	onDeleteImage = () => {
		this.setState({croppedImage: DEFAULT_PLAYER.image, menuEl: null, hover: false});
		this.props.onCrop(DEFAULT_PLAYER.image);
	};

	render() {
		const {classes} = this.props;
		const {imagePreview, defaultImage, hover, menuEl, cropIsOpen, croppedImage} = this.state;
		return (
			<div className={classes.centered}>
				<input
					ref={el => this.photoField = el}
					type="file"
					hidden
					name="file"
					id="photo"
					accept="image/*"
					onChange={this.onChangeImage}/>


				<ImageComponent
					onMouseEnter={() => this.setState({hover: true})}
					overlay={hover}
					onMouseLeave={this.onMouseLeave}
					src={croppedImage || defaultImage}>
					<IconButton aria-owns={menuEl ? 'cropper-menu' : null} aria-haspopup="true"
								onClick={this.onOpenMenu}>
						<PhotoCamera className={classes.imageIcon}/>
					</IconButton>
					<p className={classes.imageText}>Change Image</p>
				</ImageComponent>

				<Menu
					id="cropper-menu"
					anchorEl={menuEl}
					open={Boolean(menuEl)}
					onClose={this.onCloseMenu}>
					<MenuItem onClick={this.onCloseMenu}>View Photo</MenuItem>
					<MenuItem onClick={() => this.photoField.click()}>Upload Photo</MenuItem>
					<MenuItem onClick={this.onDeleteImage}>Delete Photo</MenuItem>
				</Menu>

				<CropperDialog
					src={imagePreview}
					onClose={this.onCloseCropDialog}
					open={cropIsOpen}
					onTryAgain={() => this.photoField.click()}
					onCrop={this.onCrop}/>

			</div>
		);
	}
}

export default CropperComponent;
