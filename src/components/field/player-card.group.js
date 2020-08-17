import React from 'react';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import {Circle, Group, Text} from 'react-konva';
import PropTypes from "prop-types";
import RoundedImageComponent from "../rounded-image.component";
import PlayerInfo from './player-info.group';

const PlayerCardGroup = ({OptionsStore, PlayersStore, player, attr}) => {
	const {x, y, ...rest} = attr.image;
	return (
		<Group onClick={() => PlayersStore.editPlayer(player)}>
			{
				OptionsStore.showImages && (
					<RoundedImageComponent
						image={player.getImage()}
						{...{
							x,
							y,
							...rest,
							cornerRadius: OptionsStore.imagePlayersRadius
						}}/>
				)
			}

			{
				OptionsStore.showOnlyInitials && (
					<Group>
						<Circle
							{...{
								x     : x + 35,
								y     : y + 35,
								...rest,
								radius: 40,
								fill  : 'red',
							}}/>
						<Text text={player.initials}
							  x={x + 15}
							  y={y + 20}
							  fill="#fff"
							  fontSize={30}
							  fontStyle="bold"
						/>
					</Group>
				)
			}


			<PlayerInfo player={player} attr={attr}/>
		</Group>);
};

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
