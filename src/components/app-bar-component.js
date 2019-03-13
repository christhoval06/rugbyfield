import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Settings from '@material-ui/icons/Settings';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import {DEFAULT_OPTIONS} from "../constants/options";
import {DRAWER_WIDTH} from "../configs";

import {withMixpanel} from '../context/MixpanelContext';

import AppTitleComponent from './side-bar/app-title.component';
import CustomizedSnackbar from './customized-snack-bar.component';

const styles = theme => ({
	appBar             : {
		position  : 'absolute',
		width     : `calc(100% - ${DRAWER_WIDTH}px)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing  : theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift        : {
		transition: theme.transitions.create(['margin', 'width'], {
			easing  : theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	appBarFull         : {
		width: '100%',
	},
	'appBarShift-left' : {
		width     : `calc(100% - ${DRAWER_WIDTH }px)`,
		marginLeft: DRAWER_WIDTH,
	},
	'appBarShift-right': {
		width      : `calc(100% - ${DRAWER_WIDTH }px)`,
		marginRight: DRAWER_WIDTH,
	},
	appBarShiftBoot    : {
		width: `calc(100% - ${DRAWER_WIDTH * 2 }px)`,
	},
	row                : {
		flex          : 1,
		display       : 'flex',
		justifyContent: 'left',
		alignItems    : 'center',
	},
	avatar             : {
		marginRight    : 10,
		backgroundColor: 'white'
	},
	toolbar            : theme.mixins.toolbar,
});

@withStyles(styles)
@withMixpanel
@inject('AppStore', 'PlayersStore', 'OptionsStore')
@observer
class AppBarComponent extends Component {

	static propTypes = {
		classes     : PropTypes.object,
		PlayersStore: PropTypes.object,
		OptionsStore: PropTypes.object,
		extraMenu   : PropTypes.array,
		mixpanel    : PropTypes.object
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

	handleMenu = event => {
		this.setState({anchorEl: event.currentTarget});
	};

	handleClose = () => {
		this.setState({anchorEl: null});
	};

	handleCloseSnackBar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({snackBarOpen: false});
	};

	onChangeFile = e => {
		e.preventDefault();

		const file = e.target.files[0];

		this.props.AppStore.load(file)
			.then(r => {
				this.props.mixpanel.track('Load from File.');
				this.setState({
					snackBarVariant: 'success',
					snackBarOpen   : true,
					snackBarMessage: 'Loaded!!!'
				})
			})
			.catch(e => {
				this.props.mixpanel.track('Error to load from File.');
				this.setState({
					snackBarVariant: 'error',
					snackBarOpen   : true,
					snackBarMessage: 'Error'
				})
			});
	};

	render() {
		const {AppStore, PlayersStore, OptionsStore, classes, extraMenu} = this.props;
		const {anchorEl, snackBarOpen, snackBarVariant, snackBarMessage} = this.state;
		const open = Boolean(anchorEl);
		return (
			<AppBar color="inherit" position="absolute"
					className={classNames(classes.appBar, {
						[classes.appBarFull]          : !PlayersStore.havePlayers,
						[classes.appBarShift]         : (OptionsStore.rightOpen || OptionsStore.leftOpen),
						[classes['appBarShift-right']]: OptionsStore.rightOpen,
						[classes['appBarShift-left']] : OptionsStore.leftOpen,
						[classes['appBarShiftBoot']]  : (OptionsStore.rightOpen && OptionsStore.leftOpen) || (PlayersStore.havePlayers && OptionsStore.rightOpen),

					})}>

				<CustomizedSnackbar
					open={snackBarOpen}
					variant={snackBarVariant}
					message={snackBarMessage}
					onClose={this.handleCloseSnackBar}/>

				<Toolbar>
					<div className={classes.row}>
						<Avatar src={DEFAULT_OPTIONS.teamImage} alt="RugbyField"
								className={classes.avatar}/>
						{PlayersStore.havePlayers && (
							<Typography variant="h6" color="inherit" noWrap>Rugby PTY</Typography>)}
						{!PlayersStore.havePlayers && <AppTitleComponent/>}
					</div>
					<div>
						<input ref={el => this.fileField = el} type="file" hidden accept="application/json,*.json"
							   name="file"
							   onChange={this.onChangeFile}/>
						<IconButton
							aria-owns={open ? 'menu-appbar' : null}
							aria-haspopup="true"
							onClick={OptionsStore.toggleRightDrawer}
							color="inherit">
							<Settings/>
						</IconButton>
						<IconButton
							aria-owns={open ? 'menu-appbar' : null}
							aria-haspopup="true"
							onClick={this.handleMenu}
							color="inherit">
							<MoreVert/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							open={open}
							onClose={this.handleClose}>
							<MenuItem onClick={() => {
								this.handleClose();
								AppStore.new();
							}}>New</MenuItem>
							<MenuItem onClick={() => {
								this.handleClose();
								this.fileField.click()
							}}>
								Load from File
							</MenuItem>
							<Divider/>
							{extraMenu && extraMenu.map((item, i) => (
								<MenuItem key={i} onClick={() => {
									this.handleClose();
									item.onClick();
								}}>{item.text}</MenuItem>))}
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default AppBarComponent;
