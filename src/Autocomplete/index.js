// @flow

import React from 'react';
import removeAccents from 'remove-accents';
import Container from './Container';
import Input from './Input';
import Results from './Results';
import debounce from '../utils/debounce';

type Props = {
  data: Array<*> | string,
  renderItem?: Function,
  highlightColor?: string,
  value?: string,
  parseResults?: Function,
  maxItems?: number,
};

type State = {
  results: Array<*>,
  value: ?string,
  isLoading: boolean,
}

class Autocomplete extends React.Component<Props, State> {
    static displayName = 'Autocomplete';

    static props: Props;

    state: State = {
      results: [],
      value: null,
      isLoading: false,
    };

    constructor(props: Props) {
      super(props);

      (this: any).onBlur = this.onBlur.bind(this);
      (this: any).onChange = this.onChange.bind(this);
      (this: any).onKeyDown = this.onKeyDown.bind(this);
      (this: any).getResults = this.getResults.bind(this);
      (this: any).isRemoteData = this.isRemoteData.bind(this);
    }

    getResults: Function;
    onBlur: Function;
    onChange: Function;
    onKeyDown: Function;
    input: ?HTMLInputElement;

    isRemoteData() {
      const { data } = this.props;
      return typeof data === 'string' && data.match(/^https?:\/\/|\/\//);
    }

    getResults(): (Promise<*> | Array<*> | null) {
      const search = (this.input && this.input.value) || '';
      const { data = [] } = this.props;

      // flowtype forces to check typeof again
      if (this.isRemoteData && typeof data === 'string') {
        return fetch(data + search).then(res => res.json());
      } else if (Array.isArray(data)) {
        return data;
      }

      return null;
    }

    onChange(e: Event): void {
      const {
        data = [],
        parseResults,
        maxItems,
      } = this.props;

      const { target } = e;

      if (target instanceof HTMLInputElement) {
        this.setState({ value: target.value });
      }

      if (this.isRemoteData()) {
        this.setState({ isLoading: true });

        this.getResults().then(json => {
          this.setState({
            isLoading: false,
            results: (parseResults ? parseResults(json) : []).slice(0, maxItems),
          });
        });

        return;
      }

      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      const dataArr = Array.isArray(data) ? data : [];
      const filteredResults = target.value === ''
        ? []
        : dataArr.filter(item => {
          const regexp = new RegExp(removeAccents(target.value), 'ig');
          return regexp.test(item);
        })
          .slice(0, maxItems);

      this.setState({ results: filteredResults });
    }

    onKeyDown(e: Event): void {

    }

    onBlur(): void {
      this.setState({
        results: [],
      });
    }

    render() {
      const {
        results,
        value: stateValue,
      } = this.state;

      const {
        renderItem = (item, i) => <div key={i}>{item}</div>,
        value: propsValue,
      } = this.props;

      return (
        <Container>
          <Input
            onChange={this.isRemoteData() ? debounce(this.onChange) : this.onChange}
            onBlur={this.onBlur}
            innerRef={node => this.input = node}
            value={stateValue !== null ? stateValue : propsValue}
          />
          {
            results &&
            <Results>
              { results.map(renderItem) }
            </Results>
          }
        </Container>
      );
    }
}

export default Autocomplete;
