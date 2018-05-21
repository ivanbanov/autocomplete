// @flow

import styled from 'styled-components';
import { type ComponentType } from 'react';

type Props = {};

const Results: ComponentType<Props> =
  styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    border: 1px solid #bbb;
    border-top: none;
  `;

Results.displayName = 'Autocomplete.Results';

export default Results;
