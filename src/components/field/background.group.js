import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';
import PropTypes from 'prop-types';
import useImage from 'use-image';

import { BACKGROUND, CANVA_H, CANVA_W } from '../../constants/field.metrics';

// const URL = 'https://thumbs.dreamstime.com/b/grass-pitch-focus-irish-national-sport-goalpost-out-background-concept-football-rugby-hurling-camogie-training-172820117.jpg';
const URL = 'https://images.unsplash.com/photo-1620392853596-0d3d4facfe9d';

const BackGroundImage = ({
  x = 0,
  y = 0,
  width = CANVA_W,
  height = CANVA_H,
  cornerRadius = 0,
  strokeColor,
}) => {
  const [image] = useImage(URL, 'Anonymous');

  const rectRef = React.useRef();

  // when image is loaded we need to cache the shape
  React.useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      rectRef.current.cache();
	//   console.log(rectRef.current.attrs.fillPatternImage);
    }
  }, [image]);

  if (!image) {
    return null;
  }
  let scaleX = 1;
  let scaleY = 1;
  let offsetX = 0;
  let offsetY = 0;
  scaleX = width / image.width;
  scaleY = height / image.height;
  if (scaleY > scaleX) {
    offsetX = (image.width * Math.max(scaleX, scaleY) - width) / 2;
  } else {
    offsetY = (image.height * Math.max(scaleX, scaleY) - height) / 2;
  }
  const scale = Math.max(scaleX, scaleY);

  return (
    <Rect
      ref={rectRef}
      fillPatternImage={image}
      opacity={0.4}
      filters={[Konva.Filters.Blur]}
      x={x}
      y={y}
      width={width}
      height={height}
      cornerRadius={cornerRadius}
      stroke={strokeColor}
      strokeWidth={2}
	  fillPatternScaleX={scale}
	  fillPatternScaleY={scale}
	  fillPatternOffsetX={offsetX}
	  fillPatternOffsetY={offsetY}
    />
  );
};

// const FilterImage = () => {
//   const [image] = useImage(URL, 'Anonimus');
//   const imageRef = React.useRef();

//   // when image is loaded we need to cache the shape
//   React.useEffect(() => {
//     if (image) {
//       // you many need to reapply cache on some props changes like shadow, stroke, etc.
//       imageRef.current.cache();
//     }
//   }, [image]);

//   return (
//     <Image
//       ref={imageRef}
//       x={0}
//       y={0}
//       width={CANVA_W}
//       height={CANVA_H}
//       opacity={0.4}
//       image={image}
//       filters={[Konva.Filters.Blur]}
//       blurRadius={10}
//     />
//   );
// };

const BackgroundGroup = ({ OptionsStore: { backgroundColor } }) => (
  <Group>
    {BACKGROUND.map((r, i) => (
      <Rect {...{ ...r, fill: backgroundColor }} key={i} filters={[Konva.Filters.Noise]} />
    ))}
    <BackGroundImage />
    {/* <FilterImage /> */}
  </Group>
);

BackgroundGroup.propTypes = {
  OptionsStore: PropTypes.object,
};

export default compose(inject('OptionsStore'), observer)(BackgroundGroup);
