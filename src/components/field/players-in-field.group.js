import React from 'react';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import {Group} from 'react-konva';
import PropTypes from "prop-types";
import {ROWS} from '../../constants/aligment';
import PlayerCard from './player-card.group';

const PlayersInFieldGroup = ({OptionsStore, PlayersStore}) => {
	if (!PlayersStore.havePlayers) return null;

	return ROWS[OptionsStore.gameVariant].map((r, i) => (
		<Group key={i}>
			{
				r.map((p, i) => {
					const player = PlayersStore.getPlayerWithPosition(p.position);
					if (!player) return null;
					return (<PlayerCard key={i} player={player} attr={p}/>)
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
