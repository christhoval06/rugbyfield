import React from 'react';
import {Group, Line, Rect, Text} from 'react-konva';

import {FIELD_LINES, FIELD_NUMBERS, FIELD_OPACITY, FIELD_RECTS} from '../../constants/field.metrics';

const FieldGroup = () => (
	<Group opacity={FIELD_OPACITY}>
		{FIELD_RECTS.map((r, i) => (<Rect {...r} key={i}/>))}
		{FIELD_LINES.map((l, i) => (<Line {...l} key={i}/>))}
		{FIELD_NUMBERS.map((t, i) => (<Text {...t} key={i}/>))}
	</Group>
);

export default FieldGroup;
