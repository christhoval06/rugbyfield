import React from 'react';
import {compose} from 'recompose';
import {inject, observer} from 'mobx-react';
import {Group, Rect, Image} from 'react-konva';
import Konva from "konva";

import {BACKGROUND,CANVA_H, CANVA_W} from '../../constants/field.metrics';
import PropTypes from "prop-types";

const BackgroundGroup = ({OptionsStore: {backgroundColor}}) => (
	<Group>
		{BACKGROUND.map((r, i) => (<Rect {...{...r, fill: backgroundColor}} key={i} filters={[Konva.Filters.Noise]}/>))}
		<Image></Image>
	</Group>
);

BackgroundGroup.propTypes = {
	OptionsStore: PropTypes.object,
};

export default compose(
	inject('OptionsStore'),
	observer
)(BackgroundGroup);
