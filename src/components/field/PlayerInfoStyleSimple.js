import React from 'react';
import { Group, Text } from 'react-konva';
import PropTypes from 'prop-types';

const PlayerInfoStyleSimple = ({ player, attr, fontSize = 12 }) => {
  const y = attr.image.width;
  return (
    <Group >
      <Text
        text={`${player.getNumber()}. ${player.name}`}

        {...{
          ...attr.text,
          y,
          fontSize,
          x: 0,
          width: attr.image.width
        }}
      />
    </Group>
  );
};

PlayerInfoStyleSimple.propTypes = {
  player: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  fontSize: PropTypes.number,
};

export default PlayerInfoStyleSimple;
