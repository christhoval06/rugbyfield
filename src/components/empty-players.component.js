import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {withMixpanel} from '../context/MixpanelContext';
import CustomizedSnackbar from "./customized-snack-bar.component";

const styles = theme => ({
	container       : {
		backgroundColor: '#f7f9fa',
		cursor         : 'default',
		paddingBottom  : 28,
		paddingTop     : 28,
		alignItems     : 'center',
		boxSizing      : 'border-box',
		flexGrow       : 1,
		justifyContent : 'center',
		position       : 'absolute',
		zIndex         : 1,
		display        : 'flex',
		height         : '100%',
		width          : '100%',
	},
	wrapper         : {
		textAlign: 'center',
		marginTop: -20,
		maxWidth : 460,
		width    : '80%'
	},
	textWrapper     : {},
	primaryText     : {
		marginTop : 28,
		fontSize  : 32,
		color     : '#4b5961',
		fontWeight: 300,
	},
	secondaryText   : {
		marginTop : 18,
		fontSize  : 14,
		color     : '#929fa6',
		lineHeight: '20px',
	},
	otherMessages   : {
		marginTop: 34,
	},
	messageSeparator: {
		marginBottom   : 34,
		backgroundColor: '#E1E9EB',
		height         : 1,
	},
	messageText     : {
		fontSize  : 14,
		color     : '#929fa6',
		lineHeight: '20px',
		display   : 'inline-flex',
		alignItems: 'center',
	},
	messageLink     : {
		textDecoration: 'none',
		cursor        : 'pointer',
		marginLeft    : 3,
		marginRight   : 3,
	},
	assertText      : {
		color     : `${theme.palette.primary.light} !important`,
		fontWeight: 'bold',
	}
});

@withStyles(styles)
@withMixpanel
@inject('AppStore', 'PlayersStore', 'OptionsStore')
@observer
class EmptyPlayersComponent extends Component {
	static propTypes = {
		classes     : PropTypes.object,
		OptionsStore: PropTypes.object,
		PlayersStore: PropTypes.object,
		AppStore    : PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = {
			anchorEl       : null,
			snackBarVariant: 'success',
			snackBarMessage: false,
			snackBarOpen   : false,
		};
	}

	onChangeFile = e => {
		const self = this;
		e.preventDefault();

		const file = e.target.files[0];

		this.props.AppStore.load(file)
			.then(() => {
				this.props.mixpanel.track('Load from File.');
				this.setState({
					snackBarVariant: 'success',
					snackBarOpen   : true,
					snackBarMessage: 'Loaded!!!'
				})
			})
			.catch(() => {
				this.props.mixpanel.track('Error to load from File.');
				this.setState({
					snackBarVariant: 'error',
					snackBarOpen   : true,
					snackBarMessage: 'Error'
				})
			});
	};

	handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({snackBarOpen: false});
	};

	render() {
		const {OptionsStore, PlayersStore, classes} = this.props;
		if (PlayersStore.havePlayers) return null;
		const {snackBarOpen, snackBarVariant, snackBarMessage} = this.state;

		return (
			<div className={classes.container}>
				<CustomizedSnackbar
					open={snackBarOpen}
					variant={snackBarVariant}
					message={snackBarMessage}
					onClose={this.handleCloseSnackBar}/>
				<div className={classes.wrapper}>
					<div className={classes.textWrapper}>
						<Typography variant="h6" color="inherit" noWrap className={classes.primaryText}>
							You haven't Players
						</Typography>
						<Typography className={classes.secondaryText}>
							You can use <span className={classes.assertText}>Rugby Field</span> to create & organize
							your
							rugby
							aligment
						</Typography>

					</div>
					<div className={classes.otherMessages}>
						<div className={classes.messageSeparator}/>
						<Typography className={classes.messageText}>
							You can add a player <a href={'#'}
													className={classNames(classes.assertText, classes.messageLink)}
													onClick={OptionsStore.toggleLeftDrawer}> HERE</a>
						</Typography>

						<Typography className={classes.messageText}>
							or load
							<a href={'#'}
							   className={classNames(classes.assertText, classes.messageLink)}
							   onClick={() => this.fileField.click()}> Players From File</a>
						</Typography>
					</div>
				</div>
				<input ref={el => this.fileField = el} type="file" hidden accept="application/json,*.json" name="file"
					   onChange={this.onChangeFile}/>
			</div>
		);
	}
}

export default EmptyPlayersComponent;
