import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Text, Rect, Image } from 'react-konva';
import PropTypes from 'prop-types';
import Konva from 'konva';

import { CARD_STYLE } from '../../constants/dimens';
import { choice } from '../../utils/array';
import { colors, basic } from '../../constants/colors';

import { useDraggable } from './useDraggable';

import PlayerInfo from './player-info.group';


const PlayerCardGroup = ({ OptionsStore, PlayersStore, player, attr }) => {
  const { x, y, width, height } = attr.image;
  const { groupRef, slotRef, onDrag, onDragLeave, onDragEnter, onDragOver, onDrop } =
  useDraggable();

  const onEdit = () => PlayersStore.editPlayer(player);

  return (
    <Group
      name='player-card--container'
      listening
      onDragOver={onDragOver}
      onDrag={onDrag}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onClick={onEdit}
      onTap={onEdit}
    >
      <Rect
        name='player-slot'
        ref={slotRef}
        listening
        visible={false}
        x={x - CARD_STYLE.CONTAINER_SPACE}
        y={y - CARD_STYLE.CONTAINER_SPACE}
        width={CARD_STYLE.CONTAINER_WIDTH}
        height={CARD_STYLE.CONTAINER_HEIGHT}
        stroke={basic.basic100}
        opacity={0.5}
        strokeWidth={CARD_STYLE.SPACE}
        dash={[5, 2]}
        cornerRadius={CARD_STYLE.RADIUS}
      />

      <Group
        name='player-card'
        ref={groupRef}
        x={x}
        y={y}
        draggable
        onDragStart={(event) => {
          groupRef.current.cache();
          groupRef.current.filters([Konva.Filters.Sepia]);
        }}
        onDragEnd={(event) => {
          groupRef.current.clearCache();
          groupRef.current.filters([]);
        }}
      >
        {OptionsStore.showImages && (
          <Image
            name='player-card--avatar'
            width={width}
            height={height}
            image={player.getImage()}
            cornerRadius={[5, 5, 0, 0]}
          />
        )}

        {OptionsStore.showOnlyInitials && (
          <Group name='player-card--initials'>
            <Rect fill={choice(colors)} width={width} height={height} cornerRadius={[5, 5, 0, 0]} />
            <Text
              text={player.initials}
              fill={basic.basic100}
              width={width}
              height={height}
              fontSize={30}
              align='center'
              verticalAlign='middle'
              fontStyle='bold'
            />
          </Group>
        )}

        <PlayerInfo player={player} attr={attr} template='card' />
      </Group>
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
