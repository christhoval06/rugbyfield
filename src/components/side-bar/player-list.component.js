import React from 'react';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/es/Paper/Paper";
import List from "@material-ui/core/es/List/List";

import PlayerItemComponent from './player-item.component';
import PropTypes from "prop-types";

const styles = {
	height : {
		height: '100%'
	},
	players: {
		borderRadius: 0,
		flexGrow    : 1,
		flex        : 1,
		overflowY   : 'auto',
	},
};

const PlayerListComponent = ({classes, PlayersStore}) => (
	<Paper elevation={1} className={classNames(classes.players, classes.height)}>
		<List>
			{PlayersStore.filteredPlayers.map(p => (<PlayerItemComponent key={p.id} player={p}/>))}
		</List>
	</Paper>);

PlayerListComponent.propTypes = {
	classes: PropTypes.object,
	store  : PropTypes.object,
};

export default compose(
	withStyles(styles),
	inject('PlayersStore'),
	observer
)(PlayerListComponent);
