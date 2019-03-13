import React, {Component} from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import {observer, inject} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import {DRAWER_WIDTH} from "../../configs";

const styles = theme => ({
	drawerPaper       : {
		position: 'relative',
		width   : DRAWER_WIDTH,
	},
	'drawerPaper-left': {
		position: 'absolute',
		top     : 0,
		width   : DRAWER_WIDTH,
	}
});

@withStyles(styles)
@inject('OptionsStore')
@observer
class OptionalDrawer extends Component {
	static propTypes = {
		classes : PropTypes.object,
		OptionsStore   : PropTypes.object,
		anchor  : PropTypes.oneOf(['left', 'right']).isRequired,
		children: PropTypes.node,
	};

	constructor(props) {
		super(props);
		this.state = {
			anchor: props.anchor,
		};
	}

	render() {
		const {OptionsStore, classes, children} = this.props;
		const {anchor} = this.state;
		if (!OptionsStore[`${anchor}Open`]) return null;

		return (<Drawer variant="permanent"
						classes={{
							paper: classNames(classes.drawerPaper, {
								[classes['drawerPaper-left']]: anchor === 'left'
							})
						}}
						anchor={anchor}
						open={OptionsStore[`${anchor}Open`]}>
			{children && React.cloneElement(children, {anchor})}
		</Drawer>);
	}
}

export default OptionalDrawer;
