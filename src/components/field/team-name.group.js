import React from 'react';
import PropTypes from "prop-types";
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import {Group, Text} from 'react-konva';

import RoundedImageComponent from "../rounded-image.component";

const TeamNameGroup = ({OptionsStore}) => (
	<Group>
		<Group>
			<RoundedImageComponent
				image={OptionsStore.getImage()}
				cornerRadius={10}

				{...{
					x     : 535,
					y     : 175,
					width : 80,
					height: 80,
					fill  : 'white',
				}}/>


			{/*<Rect {...{*/}
			{/*x           : 605,*/}
			{/*y           : 142,*/}
			{/*width       : 180,*/}
			{/*height      : 100,*/}
			{/*fill        : 'white',*/}
			{/*cornerRadius: 10*/}
			{/*}} />*/}

		</Group>

		<Text
			x={535}
			y={261}
			fontSize={24}
			fontFamily='Arial'
			fontStyle={'bold'}
			fill='#fff'
			padding={5}
			align='center'
			text={OptionsStore.getTeamNameSplited(0)}/>
		<Text
			x={535}
			y={288}
			fontSize={18}
			fontFamily='Arial'
			fill='#fff'
			padding={5}
			align='center'
			text={OptionsStore.getTeamNameSplited(1)}/>
	</Group>
);

TeamNameGroup.propTypes = {
	OptionsStore: PropTypes.object,
};

export default compose(
	inject('OptionsStore'),
	observer
)(TeamNameGroup);
