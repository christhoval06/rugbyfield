import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Layer, Stage, Text } from 'react-konva';
import { withStyles } from '@mui/styles';
import Box from '@mui/material/Box';

import download from '../../utils/download.util';
import { useMenu } from '../../hooks/MenuProvider';

import { CANVA_H, CANVA_W } from '../../constants/field.metrics';

import BackgroundGroup from './background.group';
import FieldGroup from './field.group';
import HeaderGroup from './header.group';
import PlayersInFieldGroup from './players-in-field.group';
import SubstitutesGroup from './substitutes.group';
import TeamNameGroup from './team-name.group';

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing(6),
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});

const fire = (slot, event, data) => {
  slot.fire(event, data, true);
};

const useDraggableEditor = (stageRef) => {
  const layerRef = React.useRef();
  const layerTempRef = React.useRef();
  const startSlotRef = React.useRef();
  const previousSlotRef = React.useRef();

  const onDragStart = React.useCallback((event) => {
    const shape = event.target;
    const parent = shape.parent;
    const slot = parent.findOne('.player-slot');
    startSlotRef.current = slot;
    const shapeCloned = shape.clone();
    shapeCloned.setAttr('name', 'player-card--copy');

    shapeCloned.moveTo(parent);
    shape.moveTo(layerTempRef.current);
    slot.fire('drag', { evt: event.evt }, true);
  }, []);

  const onDragMove = React.useCallback((event) => {
    const pos = stageRef.current.getPointerPosition();
    const slot = layerRef.current.getIntersection(pos);

    if ('player-slot' !== slot?.attrs?.name) {
      if (previousSlotRef.current) {
        // leave from old targer
        fire(previousSlotRef.current, 'dragleave', { evt: event.evt });
        previousSlotRef.current = undefined;

        return;
      }
    }

    if (slot._id === startSlotRef.current._id) {
      return;
    }

    if (previousSlotRef.current) {
      if (slot._id === previousSlotRef.current._id) {
        fire(previousSlotRef.current, 'dragover', { evt: event.evt });
        return;
      }
      // leave from old targer
      fire(previousSlotRef.current, 'dragleave', { evt: event.evt });

      // enter new targer
      fire(slot, 'dragenter', { evt: event.evt });
      previousSlotRef.current = slot;
      return;
    }

    if (!previousSlotRef.current) {
      previousSlotRef.current = slot;
      fire(slot, 'dragenter', { evt: event.evt });
      return;
    }
  }, [stageRef]);

  const onDragEnd = React.useCallback((event) => {
    const pos = stageRef.current.getPointerPosition();
    const slot = layerRef.current.getIntersection(pos);
    const shape = event.target;

    if ('player-slot' !== slot?.attrs?.name || slot?._id === startSlotRef.current._id) {
      const parent = startSlotRef.current.parent;
      const cardCopy = parent.findOne('.player-card--copy');
      shape.moveTo(parent);
      shape.to({
        x: cardCopy.attrs.x,
        y: cardCopy.attrs.y,
        duration: 0.1,
        onFinish: () => {
          fire(startSlotRef.current, 'drop', { evt: event.evt });
          cardCopy.destroy();
          startSlotRef.current = undefined;
        },
      });
      return;
    }

    const parent = startSlotRef.current.parent;

    const currentParent = slot.parent;
    const currentPlayer = currentParent.findOne('.player-card');
    const dropPlayer = parent.findOne('.player-card--copy');

    currentPlayer.moveTo(parent);
    shape.moveTo(currentParent);
    shape.to({
      x: currentPlayer.attrs.x,
      y: currentPlayer.attrs.y,
      duration: 0.1,
      onFinish: () => {
        fire(slot, 'drop', { evt: event.evt });
      },
    });
    currentPlayer.to({
      x: dropPlayer.attrs.x,
      y: dropPlayer.attrs.y,
      duration: 0.1,
      onFinish: () => {
        fire(startSlotRef.current, 'drop', { evt: event.evt });
        dropPlayer.destroy();
        startSlotRef.current = undefined;
      },
    });
  }, [stageRef]);

  return { layerRef, layerTempRef, onDragStart, onDragMove, onDragEnd };
};

// ToDo: implementar swap player function
function Field({ PlayersStore, classes, ...props }) {
  const stageRef = React.useRef();

  const { layerRef, layerTempRef, onDragStart, onDragMove, onDragEnd } =
    useDraggableEditor(stageRef);

  const { setMenu } = useMenu();

  React.useEffect(() => {
    (function () {
      if (!PlayersStore.havePlayers || !stageRef?.current) {
        setMenu([]);
        return;
      }

      const _stage = stageRef.current.getStage();

      if (!_stage) {
        setMenu([]);
        return;
      }

      setMenu([
        {
          text: 'Save as Image',
          onClick: () => {
            // this.props.mixpanel.track('Download as Image');
            download(
              _stage
                .getStage()
                .toDataURL({ pixelRatio: 3, quality: 1, imageSmoothingEnabled: false }),
              `rf_${new Date().getTime()}.png`,
              'image/png',
            );
          },
        },
        {
          text: 'Save as File',
          onClick: () => {
            // props.mixpanel.track('Download as File')
            download(
              JSON.stringify(props.AppStore.toJSON()),
              `rf_${new Date().getTime()}.rbf`,
              'application/json',
            );
          },
        },
      ]);
    })();

    return () => {
      setMenu([]);
    };
  }, [PlayersStore.havePlayers, props.AppStore, setMenu]);

  if (!PlayersStore.havePlayers) return null;

  return (
    <Box className={classes.container}>
      <Stage
        width={CANVA_W}
        height={CANVA_H}
        ref={stageRef}
        listening
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        <Layer ref={layerRef}>
          <BackgroundGroup />
          <FieldGroup />
          <HeaderGroup />
          <PlayersInFieldGroup />
          <TeamNameGroup />
          <SubstitutesGroup />

          {/*<Rect {...{*/}
          {/*x           : 535,*/}
          {/*y           : 720,*/}
          {/*width       : 250,*/}
          {/*height      : 60,*/}
          {/*fill        : 'white',*/}
          {/*cornerRadius: 10*/}
          {/*}} />*/}

          <Text
            x={730}
            y={780}
            fontSize={10}
            fontFamily='Arial'
            fill='#fff'
            padding={5}
            align='right'
            text='@rugbypty'
            opacity={0.5}
          />
        </Layer>
        <Layer ref={layerTempRef} />
      </Stage>
    </Box>
  );
}

Field.propTypes = {
  classes: PropTypes.object,
  AppStore: PropTypes.object,
  PlayersStore: PropTypes.object,
  mixpanel: PropTypes.object,
};

export default compose(
  // @withMixpanel
  withStyles(styles),
  inject('AppStore', 'PlayersStore'),
  observer,
)(Field);
