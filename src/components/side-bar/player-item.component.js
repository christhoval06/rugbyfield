import React, {Component} from 'react';
import PropTypes from "prop-types";
import {inject, observer} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";
import Divider from "@material-ui/core/es/Divider/Divider";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
	divider  : {
		marginLeft: '25%'
	},
	bigAvatar: {
		width : 60,
		height: 60,
	},
	matched  : {
		color     : theme.palette.secondary.main,
		fontWeight: 'bold',
	}
});

@withStyles(styles)
@inject('PlayersStore')
@observer
class PlayerItemComponent extends Component {
	static propTypes = {
		classes     : PropTypes.object,
		PlayersStore: PropTypes.object,
		player      : PropTypes.object.isRequired
	};

	state = {
		anchorEl: null,
	};

	handleMenu = event => {
		this.setState({anchorEl: event.currentTarget});
	};

	handleClose = () => {
		this.setState({anchorEl: null});
	};

	getPlayerFilteredName = (player) => {
		const {classes, PlayersStore} = this.props;
		const index = player.name.search(new RegExp(PlayersStore.query, 'i'));

		if (index < 0) return player.name;

		const query = PlayersStore.query;
		const name = player.name;
		const start = name.substr(0, index);
		const middle = name.substr(index, query.length);
		const end = name.substr(index + query.length, name.length);

		return (
			<span title={name}>
				{start}
				<span className={classes.matched}>{middle}</span>
				{end}
				</span>
		);
	};

	render() {
		const {classes, player, PlayersStore} = this.props;
		const {anchorEl} = this.state;
		const open = Boolean(anchorEl);

		return (
			<div>
				<ListItem dense button>
					<Avatar alt={player.name} src={player.image} className={classes.bigAvatar}/>
					<ListItemText
						primary={this.getPlayerFilteredName(player)}
						secondary={`#${player.getNumber()} ${player.getPosition()}`}/>
					<ListItemSecondaryAction>
						<IconButton aria-owns={open ? 'menu-appbar' : null}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color={'secondary'}>
							<KeyboardArrowDown/>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							open={open}
							onClose={this.handleClose}>
							<MenuItem onClick={() => {
								this.handleClose();
								PlayersStore.editPlayer(player);
							}}>Edit</MenuItem>
							<Divider/>
							<MenuItem onClick={() => {
								this.handleClose();
								player.remove();
							}}>Delete</MenuItem>
						</Menu>
					</ListItemSecondaryAction>
				</ListItem>
				<Divider className={classes.divider}/>
			</div>
		);
	}
}

export default PlayerItemComponent;
