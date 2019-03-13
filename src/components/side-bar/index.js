import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import PlayerListComponent from './player-list.component';
import HeaderComponent from './header.component';
import SearchBarComponent from './search-bar.component';
import {DRAWER_WIDTH} from "../../configs";

const styles = {
	drawerPaper: {
		position: 'relative',
		width   : DRAWER_WIDTH,
	}
};

const SideBarComponent = ({classes, ...props}) => (
	<Drawer variant="permanent"
			classes={{paper: classes.drawerPaper}}
			anchor="left">
		<HeaderComponent {...props}/>
		<Divider/>
		<SearchBarComponent {...props}/>
		<Divider/>
		<PlayerListComponent {...props}/>
	</Drawer>);

SideBarComponent.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBarComponent);
