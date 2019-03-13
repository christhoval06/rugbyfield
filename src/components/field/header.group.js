import React from 'react';
import {Group, Rect, Text} from 'react-konva';
import {TITLE_TEXT} from '../../constants/title';

const HeaderGroup = () => (
	<Group>
		<Group>
			{TITLE_TEXT.map((t, i) => (<Text {...t} key={i}/>))}
			<Rect {...{
				x          : 58,
				y          : 23,
				width      : 420,
				height     : 100,
				stroke     : 'white',
				strokeWidth: 1.5
			}} />
		</Group>
		<Group>
			<Text
				x={553}
				y={55}
				fontSize={30}
				fontFamily='Arial'
				fill='#fff'
				padding={5}
				align='center'
				text='SUBSTITUTES'/>
			<Rect {...{
				x          : 535,
				y          : 23,
				width      : 250,
				height     : 100,
				stroke     : 'white',
				strokeWidth: 2
			}} />
		</Group>
	</Group>
);

export default HeaderGroup;
