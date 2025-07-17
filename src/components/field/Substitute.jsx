import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Rect, Text, Image } from 'react-konva';
import PropTypes from 'prop-types';
import Konva from 'konva';

import { choice } from '../../utils/array';
import { basic, colors } from '../../constants/colors';

import { useDraggable } from './useDraggable';

const Substitute = ({ x, y, player, OptionsStore, onClick, onTap }) => {
  const { groupRef, slotRef, onDrag, onDragLeave, onDragEnter, onDragOver, onDrop } =
  useDraggable();

  return (
    <Group
      key={player.id}
      x={x - 5}
      y={y - 5}
      width={230}
      height={35}
      onClick={onClick}
      onTap={onTap}
      onDragOver={onDragOver}
      onDrag={onDrag}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <Rect
      visible={false}
        name='player-slot'
        ref={slotRef}
        width={230}
        height={35}
        stroke={basic.basic100}
        opacity={0.5}
        strokeWidth={1}
        dash={[5, 2]}
        cornerRadius={8}
        fill={basic.basic200}
      />
      <Group
        name='player-card'
        ref={groupRef}
        x={5}
        y={5}
        draggable
        onDragStart={(event) => {
          groupRef.current.cache();
          groupRef.current.filters([Konva.Filters.Sepia]);
        }}
        onDragEnd={(event) => {
          groupRef.current.clearCache();
          groupRef.current.filters([]);
        }}
        isSubstitute={true}
      >
        {false && (
          <Image
            image={player.getImage()}
            width={25}
            height={25}
            stroke={basic.basic100}
            strokeWidth={2}
            cornerRadius={OptionsStore.imageSubstitutesRadius}
          />
        )}
        <Group name='player-card--initials' width={25} height={25}>
          <Rect
            fill={choice(colors)}
            width={25}
            height={25}
            cornerRadius={25}
            opacity={0.75}
            stroke={basic.basic100}
            strokeWidth={2}
          />

          <Text
            text={player.initials}
            fill={basic.basic100}
            width={25}
            height={25}
            fontSize={12}
            align='center'
            verticalAlign='middle'
            fontStyle='bold'
          />
        </Group>

        <Text
          x={30}
          y={0}
          fontSize={OptionsStore.SubstitutesFontSize}
          fontFamily='Arial'
          fontStyle='bold'
          fill={basic.basic100}
          padding={5}
          align='center'
          text={`${player.getNumber()}. ${player.name}`}
        />
      </Group>
    </Group>
  );
};

Substitute.propTypes = {
  player: PropTypes.object,
  OptionsStore: PropTypes.object,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onTap: PropTypes.func.isRequired,
};

export default compose(inject('OptionsStore', 'PlayersStore'), observer)(Substitute);
