import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Rect, Text } from 'react-konva';
import PropTypes from 'prop-types';
import RoundedImageComponent from '../rounded-image.component';

const SubstitutesGroup = ({ PlayersStore, OptionsStore }) => {
  const substitutes = PlayersStore.getPlayerSubstitutes();
//   if (!Boolean(substitutes.length)) return null;

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

        {PlayersStore.getPlayerSubstitutes().map((p, i) => {
          const x = 545;
          const y = 270 + 25 * i + 5 * i;
          return (
            <Group key={p.id} onClick={() => PlayersStore.editPlayer(p)}>
              {false && (
                <RoundedImageComponent
                  image={p.getImage()}
                  {...{
                    x,
                    y,
                    width: 25,
                    height: 25,
                    stroke: '#FFF',
                    strokeWidth: 2,
                    cornerRadius: OptionsStore.imageSubstitutesRadius,
                  }}
                />
              )}

              <Text
                x={x + 5}
                y={y + 5}
                fontSize={OptionsStore.SubstitutesFontSize}
                fontFamily='Arial'
                fill='#fff'
                padding={5}
                align='center'
                text={`${p.getNumber()}. ${p.name}`}
              />
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
