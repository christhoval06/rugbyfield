import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import 'cropperjs/dist/cropper.css';

const styles = {
  container: {
    position: 'relative',
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 32,
  },
  imageMask: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    borderRadius: '50%',
    cursor: 'pointer',
    transform: 'translateZ(0)',
    height: 200,
    overflow: 'hidden',
    position: 'relative',
    width: 200,
  },
  imageContainer: {
    width: 200,
    height: 200,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  imageView: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    background: 'rgba(144, 144, 144, 0.80)',
    position: 'absolute',
    zIndex: 0,
    padding: 0,
    overflow: 'hidden',
    transition: 'all .2s ease',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  imageOverlayHover: {
    opacity: 1,
    padding: 20,
  },
  imageOverlayText: {
    margin: 0,
    padding: '0 0 10px',
    fontSize: 20,
    fontWeight: 600,
  },
  imageOverlayIcon: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 10,
  },
};

function ImageComponent(props) {
  const [state, setState] = React.useState(() => ({
    overlay: props.overlay,
    src: props.src,
  }));

  React.useEffect(() => {
    setState({
      overlay: props.overlay,
      src: props.src,
    });
  }, [props.overlay, props.src]);

  const { classes, onMouseEnter, onMouseLeave, children } = props;
  const { overlay, src } = state;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className={classes.imageMask}>
          <div className={classes.imageContainer}>
            <img src={src} alt='User preview' className={classes.imageView} />
          </div>
          <div
            className={classNames(classes.imageOverlay, { [classes.imageOverlayHover]: overlay })}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

ImageComponent.propTypes = {
  classes: PropTypes.object,
  src: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  overlay: PropTypes.bool,
};

ImageComponent.defaultProps = {
  onMouseEnter: () => null,
  onMouseLeave: () => null,
  overlay: false,
};

export default withStyles(styles)(ImageComponent);
