import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Text, Rect, Image } from 'react-konva';
import PropTypes from 'prop-types';
import Konva from 'konva';

import { colors } from '../../constants/colors';
import { CARD_STYLE } from '../../constants/dimens';
import { choice } from '../../utils/array';

import PlayerInfo from './player-info.group';

const activeSlot = (slot) => {
  slot.stroke('red');
  slot.fill('green');
  slot.opacity(0.5);
  slot.cache();
  slot.moveToTop();
};

const deactiveSlot = (slot) => {
  slot.stroke('white');
  slot.fill('transparent');
  slot.opacity(0.5);
  slot.cache();
  slot.moveToBottom();
};

const useDraggableEditor = () => {
  const groupRef = React.useRef();
  const slotRef = React.useRef();

  React.useEffect(() => {
    const group = groupRef.current;
    const slot = slotRef.current;
    // group.cache();
    // slot.cache();

    return () => {
      group.clearCache();
      slot.clearCache();
    };
  }, []);

  const onDrag = React.useCallback(() => {
    activeSlot(slotRef.current);
  }, []);

  const onDrop = React.useCallback(() => {
    deactiveSlot(slotRef.current);
  }, []);

  const onDragLeave = React.useCallback(() => {
    onDrop();
  }, [onDrop]);

  const onDragEnter = React.useCallback(() => {
    onDrag();
  }, [onDrag]);

  const onDragOver = React.useCallback(() => {}, []);

  return {
    groupRef,
    slotRef,
    onDrag,
    onDragLeave,
    onDragEnter,
    onDragOver,
    onDrop,
  };
};

const PlayerCardGroup = ({ OptionsStore, PlayersStore, player, attr }) => {
  const { x, y, width, height } = attr.image;
  const { groupRef, slotRef, onDrag, onDragLeave, onDragEnter, onDragOver, onDrop } =
    useDraggableEditor();

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
    >
      <Rect
        name='player-slot'
        ref={slotRef}
        listening
        x={x - CARD_STYLE.CONTAINER_SPACE}
        y={y - CARD_STYLE.CONTAINER_SPACE}
        width={CARD_STYLE.CONTAINER_WIDTH}
        height={CARD_STYLE.CONTAINER_HEIGHT}
        stroke={'white'}
        opacity={0.5}
        strokeWidth={CARD_STYLE.SPACE}
        dash={[5, 2]}
        cornerRadius={CARD_STYLE.RADIUS}
        rugbyPositionName={player.getPosition()}
        rugbyPlayer={player}
        rugbyPosition={player.position}
      />

      <Group
        name='player-card'
        ref={groupRef}
        x={x}
        y={y}
        draggable
        onClick={onEdit}
        onTap={onEdit}
        onDragStart={(event) => {
          groupRef.current.cache();
          groupRef.current.filters([Konva.Filters.Grayscale]);
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
