import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import {withMixpanel} from '../context/MixpanelContext';

import SideBarComponent from '../components/side-bar';
import ContentComponent from '../components/content.component'
import OptionalDrawer from "../components/optional-drawer";
import AppBarComponent from "../components/app-bar-component";
import PlayerEditComponent from '../components/optional-drawer/player-edit.component';
import OptionsComponent from '../components/optional-drawer/options.component';

const styles = {

	app     : {
		flexGrow: 1,
		height  : '100%',
	},
	appFrame: {
		height  : '100%',
		zIndex  : 1,
		position: 'relative',
		display : 'flex',
		width   : '100%',
	}
};

@withStyles(styles)
@withMixpanel
@inject('PlayersStore', 'OptionsStore')
@observer
class Main extends Component {
	static  propTypes = {
		classes     : PropTypes.object,
		PlayersStore: PropTypes.object.isRequired,
		OptionsStore: PropTypes.object.isRequired,
		mixpanel    : PropTypes.object.isRequired
	};

	state = {
		extraMenu: null
	};

	componentDidMount() {
		this.props.mixpanel.track(`RugbyField started.`);
	}

	loadField = (extraMenu) => {
		this.setState({extraMenu});
	};

	render() {
		const {PlayersStore, classes} = this.props;
		const {extraMenu} = this.state;
		return (
			<div className={classes.app}>
				<div className={classes.appFrame}>
					<AppBarComponent extraMenu={extraMenu}/>

					{PlayersStore.havePlayers && <SideBarComponent/>}

					<OptionalDrawer anchor={'left'}>
						<PlayerEditComponent/>
					</OptionalDrawer>

					<ContentComponent innerRef={node => this.content = node} fieldLoaded={this.loadField}/>

					<OptionalDrawer anchor={'right'}>
						<OptionsComponent/>
					</OptionalDrawer>
				</div>
			</div>
		);
	}
}

export default Main;
