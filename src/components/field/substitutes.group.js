import React from 'react';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import {Group, Rect, Text} from 'react-konva';
import PropTypes from "prop-types";
import RoundedImageComponent from '../rounded-image.component';

const SubstitutesGroup = ({PlayersStore, OptionsStore}) => {
	if (!PlayersStore.havePlayers) return null;

	return (<Group>
		<Rect {...{
			x           : 535,
			y           : 345,
			width       : 250,
			height      : 360,
			stroke      : 'white',
			strokeWidth : 2,
			cornerRadius: 10
		}} />

		{
			PlayersStore.getPlayerSubstitutes().map((p, i) => {
				const x = 545;
				const y = 355 + 25 * i + 5 * i;
				return (
					<Group key={p.id} onClick={() => PlayersStore.editPlayer(p)}>
						{false && <RoundedImageComponent
							image={p.getImage()}
							{...{
								x,
								y,
								width       : 25,
								height      : 25,
								stroke      : '#FFF',
								strokeWidth : 2,
								cornerRadius: OptionsStore.imageSubstitutesRadius,
							}}/>
						}

						<Text
							x={x + 5}
							y={y + 5}
							fontSize={OptionsStore.SubstitutesFontSize}
							fontFamily='Arial'
							fill='#fff'
							padding={5}
							align='center'
							text={`${p.getNumber()}. ${p.name}`}/>
					</Group>)
			})
		}
	</Group>)
};

SubstitutesGroup.propTypes = {
	PlayersStore: PropTypes.object,
	OptionsStore: PropTypes.object,
};

export default compose(
	inject('OptionsStore', 'PlayersStore'),
	observer
)(SubstitutesGroup);
