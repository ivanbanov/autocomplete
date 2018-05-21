// @flow

import styled from 'styled-components';
import { type ComponentType } from 'react';

type Props = {};

const Results: ComponentType<Props> =
  styled.div`
    position: absolute;
    top: 100%;
  `;

Results.displayName = 'Autocomplete.Results';

export default Results;
