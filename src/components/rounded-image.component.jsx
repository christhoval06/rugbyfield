import React from 'react';
import {Group, Image, Rect} from 'react-konva';

const RoundedImageComponent = ({x, y, width, height, cornerRadius, image, stroke, strokeWidth, ...props}) => (
	<Group clipFunc={ctx => {
		ctx.beginPath();
		ctx.moveTo(x + cornerRadius, y);
		ctx.lineTo(x + width - cornerRadius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
		ctx.lineTo(x + width, y + height - cornerRadius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height);
		ctx.lineTo(x + cornerRadius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
		ctx.lineTo(x, y + cornerRadius);
		ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
		ctx.closePath();
		if (stroke) {
			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = stroke;
			ctx.stroke();
		}
		ctx.shadowColor = stroke;
		ctx.shadowBlur = 10;
		ctx.shadowOffsetY = 10;
		ctx.shadowOffsetX = 10;
	}} {...props}>
		<Rect x={x} y={y} width={width} height={height} cornerRadius={cornerRadius} fill={'white'}/>

		<Image x={x} y={y} width={width} height={height} image={image}/>
	</Group>
);

export default RoundedImageComponent;
