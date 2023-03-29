import React from 'react';
import {compose} from 'recompose';
import PropTypes from "prop-types";
import {inject, observer} from 'mobx-react';
import {withStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';

const styles = {
	container: {
		flex          : 1,
		display       : 'flex',
		justifyContent: 'left',
		alignItems    : 'center',
	}
};

const AppTitleComponent = ({classes, AppStore}) => (
	<div className={classes.container}>
		<Typography variant="h6" color="inherit">
			{AppStore.title || 'RugbyField'}
			<div>
				<small>{AppStore.version || 'v0.1.1'}</small>
			</div>
		</Typography>
	</div>
);

AppTitleComponent.propTypes = {
	classes: PropTypes.object.isRequired,
	AppStore  : PropTypes.object.isRequired,
};

export default compose(
	withStyles(styles),
	inject('AppStore'),
	observer)(AppTitleComponent);
