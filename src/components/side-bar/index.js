import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

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
