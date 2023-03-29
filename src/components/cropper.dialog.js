import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@mui/styles';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Refresh from '@mui/icons-material/Refresh';

const styles = theme => ({
	button      : {
		margin: theme.spacing.unit,
	},
	leftIcon    : {
		marginRight: theme.spacing.unit,
	},
	cropper     : {
		height: 350,
		width : '100%'
	},
	content     : {
		padding: 0
	},
	titleWrapper: {
		display   : 'flex',
		alignItems: 'center',
		padding   : '5px 24px'
	},
	titleText   : {
		flex          : 1,
		display       : 'flex',
		justifyContent: 'left',
		alignItems    : 'center',
	},
	titleButton : {
		display       : 'flex',
		justifyContent: 'left',
		alignItems    : 'center',
	}
});

const CROPPER_DEFAULT = {
	// autoCrop        : true,
	// autoCropArea    : 1,
	// cropBoxMovable  : false,
	// cropBoxResizable: false,
	guides     : true,
	dragMode   : "move",
	aspectRatio: 1,
	movable    : true,
	background : false,
	modal      : false,
	viewMode   : 3
};

function CropperDialog(props) {

	const cropperRef = React.useRef(null);
	const [state, setState] = React.useState(() => ({
		src : props.src,
		open: props.open
	}))

	React.useEffect(() => {
		setState({
			src : props.src,
			open: props.open
		});
	}, [props.src, props.open]);


	const onCrop = () => {
		const cropper = cropperRef.current?.cropper;
		props.onCrop(cropper.getCroppedCanvas().toDataURL());
		props.onClose();
	};

		const {classes, onClose, onTryAgain} = props;
		const {src, open} = state;
		return (
			<Dialog
				disableEscapeKeyDown
				open={open}
				onClose={onClose}>
				<DialogTitle className={classes.titleWrapper}>
					<Typography variant="p" className={classes.titleText}>Drag the image to
						adjust.</Typography>
					<Button className={classNames(classes.button, classes.titleButton)}
							color="secondary"
							onClick={onTryAgain}>
						<Refresh className={classes.leftIcon}/>
						Try Again
					</Button>
				</DialogTitle>
				<DialogContent className={classes.content}>
					<Cropper
						ref={cropperRef}
						src={src}
						className={classes.cropper}
						{...CROPPER_DEFAULT}/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={onCrop} variant="contained" color="primary">Aceptar</Button>
				</DialogActions>
			</Dialog>
		);
}

CropperDialog.propTypes = {
	classes   : PropTypes.object,
	onTryAgain: PropTypes.func.isRequired,
	onCrop    : PropTypes.func.isRequired,
	onClose   : PropTypes.func.isRequired,
	src       : PropTypes.string.isRequired,
	open      : PropTypes.bool
};

export default withStyles(styles)(CropperDialog);
