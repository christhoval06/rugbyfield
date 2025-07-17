import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import { SketchPicker } from 'react-color';

import { cn } from '@/utils/cn';

const styles = {
  color: {
    width: 100,
    height: 14,
    borderRadius: 2,
  },
  swatch: {
    padding: 5,
    background: '#fff',
    borderRadius: 1,
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    zIndex: 2,
  },
  cover: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

function ColorPickerComponent({ classes, className, onColorSelected, color, defaultColor }) {
  const [state, setState] = useState({
    displayColorPicker: false,
    color: color,
    defaultColor: defaultColor,
  });

  const onClick = () => {
    setState((s) => ({ ...s, displayColorPicker: !s.displayColorPicker }));
  };

  const onClose = () => {
    setState((s) => ({ ...s, displayColorPicker: false }));
  };

  const onChange = (color) => {
    setState((s) => ({ ...s, color: color.hex }));
    onColorSelected(color.hex);
  };

  return (
    <div className={cn('color-picker-container', className)}>
      <div className={classes.swatch} onClick={onClick}>
        <div className={classes.color} style={{ background: state.color }} />
      </div>
      {state.displayColorPicker && (
        <div className={classes.popover}>
          <div className={classes.cover} onClick={onClose} />
          <SketchPicker color={state.color} onChange={(c) => onChange(c)} />
        </div>
      )}
    </div>
  );
}

ColorPickerComponent.propTypes = {
  classes: PropTypes.object,
  onColorSelected: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  defaultColor: PropTypes.string.isRequired,
};

export default withStyles(styles)(ColorPickerComponent);
