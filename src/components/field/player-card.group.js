import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Text, Rect, Image } from 'react-konva';
import PropTypes from 'prop-types';

import { colors } from '../../constants/colors';
import { choice } from '../../utils/array';

import PlayerInfo from './player-info.group';

const PlayerCardGroup = ({ OptionsStore, PlayersStore, player, attr }) => {
  const { x, y, width, height } = attr.image;
  return (
    <Group x={x} y={y} onClick={() => PlayersStore.editPlayer(player)}>
      {OptionsStore.showImages && (
        <Image
          width={width}
          height={height}
          image={player.getImage()}
          cornerRadius={[5, 5, 0, 0]}
        />
      )}

      {OptionsStore.showOnlyInitials && (
        <Group>
          <Rect
            fill={choice(colors)}
            width={width}
            height={height}
            cornerRadius={[5, 5, 0, 0]}
            opacity={0.75}
          />
          {/* <Circle
            {...{
              x: x + 35,
              y: y + 35,
              ...rest,
              radius: 40,
              fill: 'red',
            }}
          /> */}
          <Text
            text={player.initials}
            fill='#fff'
            width={width}
            height={height}
            fontSize={30}
            align='center'
            verticalAlign='middle'
            fontStyle='bold'
          />
        </Group>
      )}

      <PlayerInfo player={player} attr={attr} template='simple' />
    </Group>
  );
};

PlayerCardGroup.propTypes = {
  OptionsStore: PropTypes.object,
  PlayersStore: PropTypes.object,
  player: PropTypes.object,
  attr: PropTypes.object,
};

export default compose(inject('OptionsStore', 'PlayersStore'), observer)(PlayerCardGroup);
