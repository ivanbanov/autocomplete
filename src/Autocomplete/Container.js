// @flow

import styled from 'styled-components';
import { type ComponentType } from 'react';

type Props = {};

const Container: ComponentType<Props> =
  styled.div`
    position: relative;
  `;

Container.displayName = 'Autocomplete.Container';

export default Container;
