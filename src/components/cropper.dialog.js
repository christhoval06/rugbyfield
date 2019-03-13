import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Refresh from '@material-ui/icons/Refresh';

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

@withStyles(styles)
class CropperDialog extends Component {

	static propTypes = {
		classes   : PropTypes.object,
		onTryAgain: PropTypes.func.isRequired,
		onCrop    : PropTypes.func.isRequired,
		onClose   : PropTypes.func.isRequired,
		src       : PropTypes.string.isRequired,
		open      : PropTypes.bool
	};

	constructor(props) {
		super(props);
		this.state = {
			src : props.src,
			open: props.open
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const {src, open} = nextProps;
		return {src, open};
	}

	onCrop = () => {
		this.props.onCrop(this.cropper.getCroppedCanvas().toDataURL());
		this.props.onClose();
	};

	render() {
		const {classes, onClose, onTryAgain} = this.props;
		const {src, open} = this.state;
		return (
			<Dialog
				disableBackdropClick={true}
				open={open}
				onClose={onClose}>
				<DialogTitle className={classes.titleWrapper} disableTypography={true}>
					<Typography variant="h6" className={classes.titleText}>Drag the image to
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
						ref={el => this.cropper = el}
						src={src}
						className={classes.cropper}
						{...CROPPER_DEFAULT}/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={this.onCrop} variant="contained" color="primary">Aceptar</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default CropperDialog;
