import React from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';
import PropTypes from 'prop-types';
import useImage from 'use-image';

import { CANVA_H, CANVA_W } from '../constants/field.metrics';

// const IMAGE_1 = 'https://thumbs.dreamstime.com/b/grass-pitch-focus-irish-national-sport-goalpost-out-background-concept-football-rugby-hurling-camogie-training-172820117.jpg';
const IMAGE_2 = 'https://images.unsplash.com/photo-1620392853596-0d3d4facfe9d';
// const IMAGE_3 = 'https://s3-prod.rubbernews.com/s3fs-public/Synthetic-turf-Irina-Inga-Unsplash-main_i.jpg';

const BackgroundImage = ({
  x = 0,
  y = 0,
  width = CANVA_W,
  height = CANVA_H,
  cornerRadius = 0,
  strokeColor,
}) => {
  const [image] = useImage(IMAGE_2, 'Anonymous');

  const rectRef = React.useRef();

  // when image is loaded we need to cache the shape
  React.useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      rectRef.current.cache();
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

BackgroundImage.prototype = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  cornerRadius: PropTypes.number,
  strokeColor: PropTypes.string,
};

BackgroundImage.defaultProps = {
  x: 0,
  y: 0,
  width: CANVA_W,
  height: CANVA_H,
  cornerRadius: 0,
};


export default BackgroundImage;
