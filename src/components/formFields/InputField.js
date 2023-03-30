import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import NonEditableField from './NonEditableField';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  ended: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textField: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(0, 2),
  },
  lengthInputAdornment: {
    color: '#bbb',
    fontSize: 14,
  },
});

function InputField({
  classes,
  editMode,
  onChange,
  fieldName,
  defaultValue,
  error,
  helperText,
  label,
  maxLength,
  required
}) {
  const [editable, setEditable] = React.useState(false);
  const [value, setValue] = React.useState(() => defaultValue ?? '');

  const valueLength = value.length;
  const _onChange = useCallback(
    (event) => {
      onChange(event);
      setValue(event.target.value);
    },
    [onChange],
  );

  return (
    <FormControl
      className={classes.formControl}
      error={error?.attribute === fieldName}
      required={required}
      variant='standard'
      sx={{padding: '0px 8px'}}
    >
      <Typography color='secondary'>{label}</Typography>
      {editMode && !editable && (
        <NonEditableField value={defaultValue} onChange={() => setEditable(true)} />
      )}
      {(!editMode || editable) && (
        <div className={classNames(classes.toolbar, classes.textField, classes.ended)}>
          <TextField
            className={classes.textField}
            defaultValue={defaultValue}
            error={error?.attribute === fieldName}
            helperText={error?.attribute === fieldName ? error.message : helperText}
            onChange={_onChange}
            margin='normal'
            variant="standard" 
            inputProps={{
              name: fieldName,
              maxLength,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment className={classes.lengthInputAdornment} position='end'>
                  {maxLength - valueLength}
                </InputAdornment>
              ),
            }}
            fullWidth={true}
          />
        </div>
      )}
    </FormControl>
  );
}

InputField.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  helperText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  required: PropTypes.bool
};

export default withStyles(styles)(InputField);
