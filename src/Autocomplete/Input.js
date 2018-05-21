// @flow

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input.attrs({
  type: 'search',
})`
  border: 1px solid #ddd;
  padding: 1rem;
  width: ${props => (props.fluid ? '100%' : 'auto')};
  outline: none;
  border-radius: 3px;

  &:focus {
    border-color: #bbb;
  }
`;

Input.displayName = 'Autocomplete.Input';

Input.propTypes = {
  fluid: PropTypes.bool,
};

export default Input;
