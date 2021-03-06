import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Select,
  OutlinedInput
} from '@material-ui/core';
import StyledLabel from './label.jsx';

const styles = theme => ({
  root: {
    verticalAlign: 'bottom',
    minWidth: '200px',
    marginBottom: '12px',
    marginTop: '12px'
  }
});

function StyledSelect(props) {
  const {
    classes,
    label,
    id,
    value,
    handleChange,
    fullWidth,
    options,
    disabled
  } = props;

  return (
    <FormControl className={ classes.root } fullWidth={ fullWidth } variant="outlined">
      <StyledLabel label={ label } />
        <OutlinedInput
          name="age"
          id={ id }
          labelWidth={ 0 }
          value = {"Mesefa"}
          disabled = {true}
        />
    </FormControl>
  )
}

StyledSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool
};

export default withStyles(styles)(StyledSelect);
