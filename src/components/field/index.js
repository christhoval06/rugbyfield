import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from "prop-types";
import {Layer, Stage, Text} from 'react-konva';
import {withStyles} from '@material-ui/core/styles/index';
import download from '../../utils/download.util';

import {CANVA_H, CANVA_W} from '../../constants/field.metrics';

import {withMixpanel} from '../../context/MixpanelContext';
import BackgroundGroup from './background.group';
import FieldGroup from './field.group';
import HeaderGroup from './header.group';
import PlayersInFieldGroup from './players-in-field.group';
import SubstitutesGroup from './substitutes.group';
import TeamNameGroup from './team-name.group';

const styles = {
	container: {
		position      : 'absolute',
		marginTop     : 80,
		flexGrow      : 1,
		alignItems    : 'center',
		justifyContent: 'center',
		display       : 'flex',
		width         : '100%',
	}
};

@withStyles(styles)
@withMixpanel
@inject('AppStore', 'PlayersStore')
@observer
class Field extends Component {

	static propTypes = {
		classes     : PropTypes.object,
		AppStore    : PropTypes.object,
		PlayersStore: PropTypes.object,
		mixpanel    : PropTypes.object,
		loaded      : PropTypes.func.isRequired,
	};

	getExtraMenu = () => {
		if (!this.stage) return null;
		const stage = this.stage.getStage();

		if (!stage) return null;
		return [
			{
				text   : 'Save as Image',
				onClick: () => {
					this.props.mixpanel.track('Download as Image');
					download(this.stage.getStage().toDataURL(), `rf_${(new Date()).getTime()}.png`, 'image/png');
				}
			},
			{
				text   : 'Save as File',
				onClick: () => {
					this.props.mixpanel.track('Download as File');
					download(JSON.stringify(this.props.AppStore.toJSON()), `rf_${(new Date()).getTime()}.json`, 'application/json')
				}
			}
		]
	};

	// componentWillUpdate(nextProps, nextState, snapshot) {
	// 	const {PlayersStore, loaded} = nextProps;
	// 	if (PlayersStore.havePlayers) {
	// 		loaded(this.getExtraMenu());
	// 	}
	// }

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {PlayersStore, loaded} = this.props;
		if (PlayersStore.havePlayers) {
			loaded(this.getExtraMenu());
		} else {
			loaded(null)
		}
	}

	componentWillUnmount() {
		const {loaded} = this.props;
		loaded([]);
	}

	render() {
		const {classes, PlayersStore} = this.props;

		if (!PlayersStore.havePlayers) return null;

		return (
			<Stage width={CANVA_W} height={CANVA_H} ref={el => this.stage = el} className={classes.container}>
				<Layer>
					<BackgroundGroup/>
					<FieldGroup/>
					<HeaderGroup/>
					<PlayersInFieldGroup/>
					<TeamNameGroup/>
					<SubstitutesGroup/>

					{/*<Rect {...{*/}
					{/*x           : 535,*/}
					{/*y           : 720,*/}
					{/*width       : 250,*/}
					{/*height      : 60,*/}
					{/*fill        : 'white',*/}
					{/*cornerRadius: 10*/}
					{/*}} />*/}

					<Text
						x={730}
						y={780}
						fontSize={10}
						fontFamily='Arial'
						fill='#fff'
						padding={5}
						align='right'
						text='@rugbypty'
						opacity={.5}/>
				</Layer>
			</Stage>
		)
	}
}

export default Field;
