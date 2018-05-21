// @flow

import React, { type Element } from 'react';
import removeAccents from 'remove-accents';
import Container from './Container';
import Input from './Input';
import Results from './Results';
import ResultItem from './ResultItem';

const NO_RESULTS = 'No results';

type Props = {
  data: Array<string> | string,
  value?: string,
  parseResults?: Function,
  maxItems?: number,
};

type State = {
  results: Array<*>,
  value: ?string,
  isLoading: boolean,
  activeIndex: number,
}

class Autocomplete extends React.Component<Props, State> {
    static displayName = 'Autocomplete';

    static props: Props;

    state: State = {
      results: [],
      value: null,
      isLoading: false,
      activeIndex: -1,
    };

    constructor(props: Props) {
      super(props);

      this.state.value = this.props.value || '';

      (this: any).onBlur = this.onBlur.bind(this);
      (this: any).onChange = this.onChange.bind(this);
      (this: any).onKeyDown = this.onKeyDown.bind(this);
      (this: any).renderItem = this.renderItem.bind(this);
      (this: any).getResults = this.getResults.bind(this);
      (this: any).isRemoteData = this.isRemoteData.bind(this);
    }

    getResults: Function;
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

    onChange(e: any): void {
      const {
        data = [],
        parseResults,
        maxItems = 5,
      } = this.props;

      const { value } = e.target;

      this.setState({ value });

      if (this.isRemoteData()) {
        this.setState({
          isLoading: true,
          results: ['Loading...'],
        });

        this.getResults().then(json => {
          let results = parseResults ? parseResults(json) : [];

          if (!results.length) {
            results = [NO_RESULTS];
          }

          this.setState({
            isLoading: false,
            results: results.slice(0, maxItems),
          });
        });

        return;
      }

      const dataArr = Array.isArray(data) ? data : [];
      let filteredResults = value === ''
        ? []
        : dataArr
          .filter(item => {
            const regexp = new RegExp(removeAccents(value), 'ig');
            return regexp.test(item);
          })
          .slice(0, maxItems);

      if (!filteredResults.length) {
        filteredResults = [NO_RESULTS];
      }

      this.setState({ results: filteredResults });
    }

    onKeyDown(e: any): void {
      const { activeIndex, results } = this.state;
      const { value } = e.target;

      if (!results.length) {
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          this.setState({
            activeIndex: (activeIndex === 0) ? 0 : (activeIndex - 1),
          });
          break;

        case 'ArrowDown':
          this.setState({
            activeIndex: (activeIndex === results.length - 1) ? activeIndex : (activeIndex + 1),
          });
          break;

        case 'Enter':
          this.setState({
            activeIndex: -1,
            results: [],
            value: results[activeIndex],
          });
          break;

        case 'Escape':
          this.setState({
            activeIndex: -1,
            results: [],
          });
          break;

        default:
          this.setState({ value });
      }
    }

    onBlur(): void {
      setTimeout(() => {
        this.setState({ results: [] });
      }, 50);
    }

    renderItem(item: string, key: number = 1): Element<*> {
      return (
        <ResultItem
          key={key}
          onClick={() => this.setState({ value: item })}
          isActive={key === this.state.activeIndex}
        >
          {item}
        </ResultItem>
      );
    }

    render() {
      const {
        results,
        value,
      } = this.state;

      return (
        <Container>
          <Input
            onChange={this.onChange}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            innerRef={input => this.input = input}
            value={value}
          />
          {
            !!results.length &&
            <Results>
              { results.map(this.renderItem) }
            </Results>
          }
        </Container>
      );
    }
}

export default Autocomplete;
