import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Rect, Text, Image } from 'react-konva';
import PropTypes from 'prop-types';

import { choice } from '../../utils/array';
import { colors } from '../../constants/colors';

const SubstitutesGroup = ({ PlayersStore, OptionsStore }) => {
  const substitutes = PlayersStore.getPlayerSubstitutes();

  if (!Boolean(substitutes.length)) return null;

  return (
    <Group>
      <Group>
        <Text
          x={536}
          y={175}
          fontSize={30}
          fontFamily='Arial'
          fill='#fff'
          padding={5}
          align='center'
          text='SUBSTITUTES'
        />
        <Rect
          {...{
            x: 520,
            y: 145,
            width: 250,
            height: 100,
            stroke: 'white',
            strokeWidth: 2,
          }}
        />
      </Group>
      <Group>
        <Rect
          {...{
            x: 520,
            y: 270,
            width: 250,
            height: 480,
            stroke: 'white',
            strokeWidth: 2,
            cornerRadius: 10,
          }}
        />

        {PlayersStore.getPlayerSubstitutes().map((player, i) => {
          const x = 535;
          const y = 280 + 35 * i + 10 * i;

          return (
            <Group
              key={player.id}
              onClick={() => PlayersStore.editPlayer(player)}
              onTap={() => PlayersStore.editPlayer(player)}
            >
              <Rect
                name='player-slot'
                x={x - 5}
                y={y - 5}
                width={230}
                height={35}
                stroke={'white'}
                opacity={0.5}
                strokeWidth={1}
                dash={[5, 2]}
                cornerRadius={8}
              />
              <Group x={x} y={y}>
                {false && (
                  <Image
                    image={player.getImage()}
                    width={25}
                    height={25}
                    stroke='white'
                    strokeWidth={2}
                    cornerRadius={OptionsStore.imageSubstitutesRadius}
                  />
                )}
                <Group name='player-card--initials'>
                  <Rect
                    fill={choice(colors)}
                    width={25}
                    height={25}
                    cornerRadius={25}
                    opacity={0.75}
                    stroke='white'
                    strokeWidth={2}
                  />

                  <Text
                    text={player.initials}
                    fill='#fff'
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
                  fill='white'
                  padding={5}
                  align='center'
                  text={`${player.getNumber()}. ${player.name}`}
                />
              </Group>
            </Group>
          );
        })}
      </Group>
    </Group>
  );
};

SubstitutesGroup.propTypes = {
  PlayersStore: PropTypes.object,
  OptionsStore: PropTypes.object,
};

export default compose(inject('OptionsStore', 'PlayersStore'), observer)(SubstitutesGroup);
