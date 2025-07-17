import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import green from '@mui/material/colors/green';
import amber from '@mui/material/colors/amber';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import WarningIcon from '@mui/icons-material/Warning';
import { withStyles } from '@mui/styles';

import { cn } from '@/utils/cn';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function CustomizedSnackbar(props) {
  const { open, classes, className, message, onClose, variant, ...other } = props;

  const Icon = variantIcon[variant];
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        className={cn(classes[variant], className)}
        aria-describedby='client-snackbar'
        message={
          <span id='client-snackbar' className={classes.message}>
            <Icon className={cn(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    </Snackbar>
  );
}

CustomizedSnackbar.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles)(CustomizedSnackbar);
