// @flow

import styled from 'styled-components';
import { type ComponentType } from 'react';

type Props = {
  fluid?: boolean,
};

const Input: ComponentType<Props> =
  styled.input.attrs({
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

export default Input;
