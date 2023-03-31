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

function Field({ PlayersStore, classes, ...props }) {
  const stage = React.useRef();
  const { setMenu } = useMenu();

  React.useEffect(() => {
    (function () {
      if (!PlayersStore.havePlayers || !stage?.current) {
        setMenu([]);
        return;
      }

      const _stage = stage.current.getStage();

      if (!_stage) {
        setMenu([]);
        return;
      }

      setMenu([
        {
          text: 'Save as Image',
          onClick: () => {
            // this.props.mixpanel.track('Download as Image');
            download(_stage.getStage().toDataURL({pixelRatio: 3, quality: 1, imageSmoothingEnabled: false}), `rf_${new Date().getTime()}.png`, 'image/png');
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
      <Stage width={CANVA_W} height={CANVA_H} ref={stage}>
        <Layer>
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
