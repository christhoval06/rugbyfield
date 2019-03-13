import React from 'react';
import {compose} from 'recompose';
import PropTypes from "prop-types";
import classNames from 'classnames';
import {inject, observer} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import ArrowBack from '@material-ui/icons/ArrowBack';

const styles = theme => ({
	drawerHeader        : {
		display       : 'flex',
		alignItems    : 'center',
		justifyContent: 'flex-end',
		padding       : '0 8px',
		...theme.mixins.toolbar,
	},
	'drawerHeader-left' : {
		justifyContent: 'flex-start',
	},
	'drawerHeader-right': {
		justifyContent: 'flex-start',
	},
	flex                : {
		flex: 1,
	},
	row                 : {
		display       : 'flex',
		justifyContent: 'left',
		alignItems    : 'center',
	},
	actions             : {
		display       : 'flex',
		justifyContent: 'left',
		alignItems    : 'center',
	},
});

const OptionalHeaderComponent = ({OptionsStore, classes, anchor, onClick, title}) => {

	const action = (<div className={classes.actions}>
		<IconButton onClick={() => {
			OptionsStore.toggleDrawer(anchor);
			onClick();
		}}>
			{anchor !== 'left' && <Close/>}
			{anchor === 'left' && <ArrowBack/>}
		</IconButton>
	</div>);

	let left = null;
	let right = null;
	if (anchor === 'left') {
		left = action;
	} else {
		right = action;
	}
	return (
		<div className={classNames(classes.drawerHeader, classes[`drawerHeader-${anchor}`])}>
			{left}
			<div className={classNames(classes.flex, classes.row)}>
				<Typography variant="h6" color="inherit">{title}</Typography>
			</div>
			{right}
		</div>)
};

OptionalHeaderComponent.propTypes = {
	classes     : PropTypes.object,
	OptionsStore: PropTypes.object,
	anchor      : PropTypes.oneOf(['left', 'right']).isRequired,
	onClick     : PropTypes.func.isRequired,
	title       : PropTypes.string.isRequired
};

export default compose(
	withStyles(styles),
	inject('OptionsStore'),
	observer)(OptionalHeaderComponent);
