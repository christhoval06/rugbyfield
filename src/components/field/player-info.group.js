import React from 'react';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import {Group, Text} from 'react-konva';
import PropTypes from "prop-types";

const PlayerInfoGroup = ({OptionsStore, player, attr}) => (
	<Group>
		{
			OptionsStore.showText && (<Text
				text={`${player.getNumber()}. ${player.name}`}
				{...{
					...attr.text,
					y       : OptionsStore.showImages?  attr.text.y: attr.text.y - attr.image.width*0.3,
					fontSize: OptionsStore.playerFontSize
				}}/>)
		}
	</Group>
);

PlayerInfoGroup.propTypes = {
	OptionsStore: PropTypes.object,
	player      : PropTypes.object,
	attr        : PropTypes.object,
};

export default compose(
	inject('OptionsStore'),
	observer
)(PlayerInfoGroup);
