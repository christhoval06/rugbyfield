import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';
import PropTypes from 'prop-types';

import { BACKGROUND} from '../../constants/field.metrics';

import BackgroundImage from '../BackgroundImage';

const BackgroundGroup = ({ OptionsStore: { backgroundColor } }) => (
  <Group>
    {BACKGROUND.map((r, i) => (
      <Rect {...{ ...r, fill: backgroundColor }} key={i} filters={[Konva.Filters.Noise]} />
    ))}
    <BackgroundImage />
  </Group>
);

BackgroundGroup.propTypes = {
  OptionsStore: PropTypes.object,
};

export default compose(inject('OptionsStore'), observer)(BackgroundGroup);
