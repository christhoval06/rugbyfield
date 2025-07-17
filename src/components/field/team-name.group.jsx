import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Text, Image } from 'react-konva';

const TeamNameGroup = ({ OptionsStore }) => (
  <Group x={535} y={30}>
    <Group>
      <Image
        image={OptionsStore.getImage()}
        cornerRadius={[0, 0, 8, 0]}
        x={0}
        y={0}
        width={80}
        height={80}
        fill='white'
      />
    </Group>

    <Group x={85} y={25}>
      <Text
        y={5}
        fontSize={24}
        fontFamily='Arial'
        fontStyle={'bold'}
        fill='#fff'
        padding={5}
        align='center'
        text={OptionsStore.getTeamNameSplited(0)}
      />
      <Text
        y={30}
        fontSize={18}
        fontFamily='Arial'
        fill='#fff'
        padding={5}
        align='center'
        text={OptionsStore.getTeamNameSplited(1)}
      />
    </Group>
  </Group>
);

TeamNameGroup.propTypes = {
  OptionsStore: PropTypes.object,
};

export default compose(inject('OptionsStore'), observer)(TeamNameGroup);
