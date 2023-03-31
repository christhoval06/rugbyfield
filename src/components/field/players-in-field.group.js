import React from 'react';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import {Group} from 'react-konva';
import PropTypes from "prop-types";
import {ROWS} from '../../constants/aligment';
import PlayerCard from './player-card.group';

const PlayersInFieldGroup = ({OptionsStore, PlayersStore}) => {
	if (!PlayersStore.havePlayers) return null;

	return ROWS[OptionsStore.gameVariant].map((row, i) => (
		<Group key={i}>
			{
				row.map((p) => {
					const player = PlayersStore.getPlayerWithPosition(p.position);
					if (!player) return null;
					return (<PlayerCard key={`player--card-${player.number}`} player={player} attr={p}/>)
				})
			}
		</Group>
	));
};

PlayersInFieldGroup.propTypes = {
	OptionsStore: PropTypes.object,
	PlayersStore: PropTypes.object,
};

export default compose(
	inject('OptionsStore', 'PlayersStore'),
	observer
)(PlayersInFieldGroup);
