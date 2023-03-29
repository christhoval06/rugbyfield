import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { TITLE_TEXT } from '../../constants/title';

const HeaderGroup = () => (
  <Group>
    {TITLE_TEXT.map((t, i) => (
      <Text {...t} key={i} />
    ))}
    <Rect
      {...{
        x: 58,
        y: 23,
        width: 420,
        height: 100,
        stroke: 'white',
        strokeWidth: 1.5,
      }}
    />
  </Group>
);

export default HeaderGroup;
