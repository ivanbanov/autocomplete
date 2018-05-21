// @flow

import styled from 'styled-components';
import { type ComponentType } from 'react';

type Props = {
  isActive: boolean,
};

const ResultItem: ComponentType<Props> =
  styled.div`
    padding: .5rem;
    background: ${props => (props.isActive ? '#ddd' : '#fff')};

    & + & { padding-top: 1px solid #ddd; }

    &:hover {
      background: #ddd;
    }
  `;

ResultItem.displayName = 'Autocomplete.ResultItem';

export default ResultItem;
