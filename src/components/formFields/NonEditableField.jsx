import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';

import { cn } from '@/utils/cn';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  InputEditMode: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 24px',
  },
  InputEditModeText: {
    flex: 1,
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  InputEditModeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function NonEditableField({ classes, onChange, value }) {
  return (
    <div className={cn(classes.toolbar, classes.InputEditMode)}>
      <Typography className={classes.InputEditModeText}>{value}</Typography>
      <IconButton className={classes.InputEditModeButton} onClick={onChange}>
        <Edit />
      </IconButton>
    </div>
  );
}

NonEditableField.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default withStyles(styles)(NonEditableField);
