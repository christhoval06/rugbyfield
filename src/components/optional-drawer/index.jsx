import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';

import { DRAWER_WIDTH } from '../../configs';

import { cn } from '@/utils/cn';

const styles = (theme) => ({
  drawerPaper: {
    position: 'relative',
    width: DRAWER_WIDTH,
  },
});

function OptionalDrawer(props) {
  const { OptionsStore, classes, children, anchor } = props;
  if (!OptionsStore[`${anchor}Open`]) return null;

  return (
    <Drawer
      // variant='permanent'
      classes={{ paper: cn(classes.drawerPaper) }}
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
