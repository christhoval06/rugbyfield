import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Rect, Text } from 'react-konva';
import PropTypes from 'prop-types';
import { basic } from '../../constants/colors';

import Substitute from './Substitute';

const SubstitutesGroup = ({ PlayersStore }) => {
  const substitutes = PlayersStore.getPlayerSubstitutes();

  if (!Boolean(substitutes.length)) return null;

  return (
    <Group x={520} y={145}>
      <Group width={250} height={100}>
        <Text
          width={250}
          height={100}
          fontSize={30}
          fontFamily='Arial'
          fill={basic.basic100}
          align='center'
          verticalAlign='middle'
          fontStyle='bold'
          text='SUBSTITUTES'
        />
        <Rect width={250} height={100} stroke={basic.basic100} strokeWidth={2} />
      </Group>
      <Group y={120} width={250} height={480}>
        <Rect width={250} height={480} stroke={basic.basic100} strokeWidth={2} cornerRadius={10} />

        {substitutes.map((player, i) => {
          const x = 15;
          const y = 15 + 35 * i + 10 * i;

          return (
            <Substitute
              key={player.id}
              x={x}
              y={y}
              player={player}
              onClick={() => PlayersStore.editPlayer(player)}
              onTap={() => PlayersStore.editPlayer(player)}
            />
          );
        })}
      </Group>
    </Group>
  );
};

SubstitutesGroup.propTypes = {
  PlayersStore: PropTypes.object,
};

export default compose(inject('PlayersStore'), observer)(SubstitutesGroup);
