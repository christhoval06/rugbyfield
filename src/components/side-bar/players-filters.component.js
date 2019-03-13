import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';

import {
	PLAYER_GROUP_BACKS,
	PLAYER_GROUP_FORDWARDS,
	PLAYER_GROUP_SUBSTITUTE,
	SHOW_ALL,
	SHOW_BACKS,
	SHOW_FORDWARDS,
	SHOW_SUBSTITUTE
} from "../../constants/players";

@inject('PlayersStore')
@observer
class PlayersFiltersComponent extends Component {
	state = {
		anchorEl: null,
	};

	handleMenu = event => {
		this.setState({anchorEl: event.currentTarget});
	};

	handleClose = (filter) => {
		this.setState({anchorEl: null});
		this.props.PlayersStore.setFilter(filter);
	};

	render() {
		const {PlayersStore} = this.props;
		if (PlayersStore.players.length === 0) return null;

		const {anchorEl} = this.state;
		const open = Boolean(anchorEl);

		return (
			<div>
				<IconButton
					aria-owns={open ? 'menu-filters' : null}
					aria-haspopup="true"
					onClick={this.handleMenu}
					color="inherit">
					<MoreVert/>
				</IconButton>
				<Menu
					id="menu-filters"
					anchorEl={anchorEl}
					open={open}
					onClose={() => this.handleClose(null)}>
					{[{text: 'ALL', onClick: () => this.handleClose(SHOW_ALL)},
					  {text: PLAYER_GROUP_BACKS.toUpperCase(), onClick: () => this.handleClose(SHOW_BACKS)},
					  {text: PLAYER_GROUP_FORDWARDS.toUpperCase(), onClick: () => this.handleClose(SHOW_FORDWARDS)},
					  {text: PLAYER_GROUP_SUBSTITUTE.toUpperCase(), onClick: () => this.handleClose(SHOW_SUBSTITUTE)}]
						.map((item, i) => (<MenuItem key={i} {...item}>{item.text}</MenuItem>))}
				</Menu>
			</div>);
	}
}

export default PlayersFiltersComponent;
