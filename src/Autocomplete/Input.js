// @flow

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input``;

Input.displayName = 'Autocomplete.Input';

Input.propTypes = {
  foo: PropTypes.string.isRequired,
};

export default Input;
