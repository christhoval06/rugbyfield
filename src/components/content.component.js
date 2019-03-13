import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import {DRAWER_WIDTH} from "../configs";
import Field from "../components/field";
import EmptyPlayersComponent from '../components/empty-players.component';

const styles = theme => ({
	toolbar             : theme.mixins.toolbar,
	content             : {
		display        : 'flex',
		position       : 'relative',
		width          : '100%',
		flexGrow       : 1,
		overflowY      : 'scroll',
		backgroundColor: theme.palette.background.default,
		padding        : theme.spacing.unit * 3,
		transition     : theme.transitions.create('margin', {
			easing  : theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	'content-left'      : {
		marginLeft: -DRAWER_WIDTH,
	},
	'content-right'     : {
		marginRight: -DRAWER_WIDTH,
	},
	contentShift        : {
		transition: theme.transitions.create('margin', {
			easing  : theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	'contentShift-left' : {
		marginLeft: 0,
	},
	'contentShift-right': {
		marginRight: 0,
	}
});

@withStyles(styles)
@inject('OptionsStore')
@observer
class ContentComponent extends Component {

	static propTypes = {
		classes     : PropTypes.object,
		OptionsStore: PropTypes.object,
		PlayersStore: PropTypes.object,
		fieldLoaded : PropTypes.func.isRequired
	};

	fieldLoaded = (extraMenu) => {
		const {fieldLoaded} = this.props;
		if (fieldLoaded) {
			fieldLoaded(extraMenu);
		}
	};

	getExtraMenu() {

		if (!this.field) return null;
		return this.field.wrappedInstance.getExtraMenu();
	}

	render() {
		const {OptionsStore, classes} = this.props;
		return (
			<main
				className={classNames(classes.content, classes['contentShift-left'], {
					[classes['content-right']]: OptionsStore.rightOpen,
					[classes.contentShift]    : OptionsStore.rightOpen
				})}>
				<div className={classes.toolbar}/>
				<Field innerRef={node => this.field = node} loaded={this.fieldLoaded}/>
				<EmptyPlayersComponent/>
			</main>
		);
	}
}

export default ContentComponent;
