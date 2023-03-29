import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'recompose';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';

import { DRAWER_WIDTH } from '../../configs';

const styles = (theme) => ({
  drawerPaper: {
    position: 'relative',
    width: DRAWER_WIDTH,
  },
  'drawerPaper-left': {
    position: 'absolute',
    top: 0,
    width: DRAWER_WIDTH,
  },
});

function OptionalDrawer(props) {
  const { OptionsStore, classes, children, anchor } = props;
  if (!OptionsStore[`${anchor}Open`]) return null;

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: classNames(classes.drawerPaper, {
          [classes['drawerPaper-left']]: anchor === 'left',
        }),
      }}
      anchor={anchor}
      open={OptionsStore[`${anchor}Open`]}
    >
      {children && React.cloneElement(children, { anchor })}
    </Drawer>
  );
}

OptionalDrawer.propTypes = {
  classes: PropTypes.object,
  OptionsStore: PropTypes.object,
  anchor: PropTypes.oneOf(['left', 'right']).isRequired,
  children: PropTypes.node,
};

export default compose(withStyles(styles), inject('OptionsStore'), observer)(OptionalDrawer);
