// @flow

import styled from 'styled-components';
import { type ComponentType } from 'react';

type Props = {};

const Input: ComponentType<Props> =
  styled.input.attrs({
    type: 'search',
  })`
    border: 1px solid #ddd;
    padding: .5rem;
    width: 100%;
    outline: none;

    &:focus {
      border-color: #bbb;
    }
  `;

Input.displayName = 'Autocomplete.Input';

export default Input;
