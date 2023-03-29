import React from 'react';
import {compose} from 'recompose';
import PropTypes from "prop-types";
import {inject, observer} from 'mobx-react';
import {withStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import Search from '@mui/icons-material/Search';

import {withMixpanel} from '../../context/MixpanelContext';

const styles = {
	paper    : {
		backgroundColor: '#fbfbfb',
		flex           : 'none',
	},
	container: {
		position       : 'relative',
		transitionDelay: '0.12s',
		padding        : 0,
		backgroundColor: 'transparent',
		height         : 49,
		boxSizing      : 'border-box',
		zIndex         : 100,
		transition     : 'box-shadow 0.18s ease-out, background-color 0.18s ease-out',
	},
	icon     : {
		left      : 24,
		background: 'none !important',
		position  : 'absolute',
		zIndex    : 100,
		width     : 24,
		height    : 24,
		top       : 12,
	},
	label    : {
		marginLeft     : 12,
		paddingLeft    : 52,
		paddingRight   : 10,
		backgroundColor: '#fff',
		borderRadius   : 18,
		border         : '1px solid #f6f6f6',
		marginTop      : 7,
		display        : 'flex',
		height         : 34,
		position       : 'absolute',
		transition     : '0.12s cubic-bezier(0.1, 0.82, 0.25, 1)',
		width          : 'calc(100% - 28px)',
	},
	input    : {
		textAlign: 'left',
		padding  : 0,
		border   : 'none',
		width    : '100%'
	}
};

const SearchBarComponent = ({PlayersStore, classes, mixpanel}) => {
	if (!PlayersStore.havePlayers) return null;
	return (
		<Paper elevation={0} className={classes.paper}>
			<div className={classes.container}>
				<div className={classes.wrapper}>
					<Search className={classes.icon}/>
					<label className={classes.label}>
						<input type="text" name="q" className={classes.input} placeholder="Search by Name"
							   onChange={({target: {value}}) => {
								   mixpanel.track(`Player Filtered`);
								   PlayersStore.setQueryFilter(value)
							   }}/>
					</label>
				</div>
			</div>
		</Paper>)
};

SearchBarComponent.propTypes = {
	classes     : PropTypes.object,
	PlayersStore: PropTypes.object,
	mixpanel: PropTypes.object,
};

export default compose(
	withStyles(styles),
	withMixpanel,
	inject('PlayersStore'),
	observer
)(SearchBarComponent);
