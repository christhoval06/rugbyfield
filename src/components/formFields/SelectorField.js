import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import NonEditableField from './NonEditableField';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ended: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textField: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
  lengthInputAdornment: {
    color: '#bbb',
    fontSize: 14,
  },
});

function SelectorField({
  classes,
  editMode,
  onChange,
  fieldName,
  defaultValue,
  error,
  helperText,
  label,
  defaultOption,
  options,
  optionValueResolver,
  optionNameResolver,
}) {
  const [editable, setEditable] = React.useState(false);
  const [value, setValue] = React.useState(() => defaultValue ?? '');

  const _onChange = useCallback(
    (event) => {
      const position = event.target.value;
      onChange(position);
      setValue(position);
    },
    [onChange],
  );

  const fieldValueName = optionNameResolver(defaultValue);

  return (
    <FormControl className={classes.formControl} error={error?.attribute === fieldName} sx={{padding: '0px 8px'}}>
      <Typography color='secondary'>{label}</Typography>
      {editMode && !editable && (
        <NonEditableField value={fieldValueName} onChange={() => setEditable(true)} />
      )}
      {(!editMode || editable) && (
        <div className={classNames(classes.toolbar, classes.textField, classes.ended)}>
          <TextField
            select
            helperText={error?.attribute === fieldName ? error.message : helperText}
            className={classes.textField}
            error={error?.attribute === fieldName}
            value={value}
            onChange={_onChange}
            inputProps={{ name: fieldName }}
            variant="standard" 
          >
            <MenuItem disabled={true} value='default'>
              <em>{defaultOption}</em>
            </MenuItem>
            {options.map((p, i) => (
              <MenuItem key={i} value={p.short}>
                {optionValueResolver(p.name)}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}
    </FormControl>
  );
}

SelectorField.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  helperText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultOption: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  optionValueResolver: PropTypes.func.isRequired,
  optionNameResolver: PropTypes.func.isRequired,
};

export default withStyles(styles)(SelectorField);
