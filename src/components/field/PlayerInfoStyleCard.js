import React from 'react';
import { Group, Text, Rect } from 'react-konva';
import PropTypes from 'prop-types';

import { IMAGE_H, CARD_STYLE } from '../../constants/dimens';
import { basic } from '../../constants/colors';

const NUMBER_WIDTH = CARD_STYLE.WIDTH - CARD_STYLE.NAME_SPACE;
const NAME_WIDTH = CARD_STYLE.WIDTH - CARD_STYLE.NUMBER_SPACE - 1;

const NUMBER_FONT = 14;

const PlayerInfoStyleCard = ({ player, attr, fontSize = 12 }) => {
  const y = IMAGE_H + 1;
  return (
    <Group y={y}>
      <Group width={NUMBER_WIDTH}>
        <Rect
          width={NUMBER_WIDTH}
          height={CARD_STYLE.HEIGHT}
          fill={basic.basic100}
          cornerRadius={[0, 0, 0, CARD_STYLE.RADIUS]}
          opacity={CARD_STYLE.OPACITY}
        />
        <Text
          text={player.getNumber()}
          width={NUMBER_WIDTH}
          height={CARD_STYLE.HEIGHT}
          fontSize={NUMBER_FONT}
          align='center'
          verticalAlign='middle'
          fontStyle='bold'
          fill={basic.basic500}
        />
      </Group>

      <Group x={NUMBER_WIDTH + 1}>
        <Rect
          width={NAME_WIDTH}
          height={CARD_STYLE.HEIGHT}
          fill={basic.basic100}
          cornerRadius={[0, 0, CARD_STYLE.RADIUS, 0]}
          opacity={CARD_STYLE.OPACITY}
        />
        <Text
          text={player.name}
          width={NAME_WIDTH}
          height={CARD_STYLE.HEIGHT}
          fontSize={fontSize}
          align='center'
          verticalAlign='middle'
          fontStyle='bold'
          fill={basic.basic500}
        />
      </Group>
    </Group>
  );
};

PlayerInfoStyleCard.propTypes = {
  player: PropTypes.object.isRequired,
  attr: PropTypes.object.isRequired,
  fontSize: PropTypes.number,
};

export default PlayerInfoStyleCard;
