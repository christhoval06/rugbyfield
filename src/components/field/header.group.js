import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { TITLE_TEXT } from '../../constants/title';

const width = 420;
const height = 100;

const HeaderGroup = () => (
  <Group x={58} y={23} width={width} height={height}>
    {TITLE_TEXT.map((t, i) => (
      <Text {...t} key={t.text} />
    ))}
    <Rect width={width} height={height} stroke='white' strokeWidth={1.5} />
  </Group>
);

export default HeaderGroup;
