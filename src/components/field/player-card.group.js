import React from 'react';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import {Group} from 'react-konva';
import PropTypes from "prop-types";
import RoundedImageComponent from "../rounded-image.component";
import PlayerInfo from './player-info.group';

const PlayerCardGroup = ({OptionsStore, PlayersStore, player, attr}) => (
	<Group onClick={() => PlayersStore.editPlayer(player)}>
		{
			OptionsStore.showImages && (
				<RoundedImageComponent
					image={player.getImage()}
					{...{
						...attr.image,
						cornerRadius: OptionsStore.imagePlayersRadius
					}}/>
			)}
		<PlayerInfo player={player} attr={attr}/>
	</Group>);

PlayerCardGroup.propTypes = {
	OptionsStore: PropTypes.object,
	PlayersStore: PropTypes.object,
	player      : PropTypes.object,
	attr        : PropTypes.object,
};

export default compose(
	inject('OptionsStore', 'PlayersStore'),
	observer
)(PlayerCardGroup);
