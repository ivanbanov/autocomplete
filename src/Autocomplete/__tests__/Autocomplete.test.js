import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Autocomplete from '../';
import Input from '../Input';
import Results from '../Results';
import ResultItem from '../ResultItem';

Enzyme.configure({ adapter: new Adapter() });

function simulateChange(component, str) {
  component.find(Input).simulate('change', {
    target: { value: str },
  });
}

describe('Autocomplete', () => {
  it('should render properly', () => {
    const component = renderer.create(
      <Autocomplete data={[]} />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with initial value', () => {
    const component = shallow(
      <Autocomplete data={['foo']} value="foo" />
    );

    expect(component.find(Input).dive().find('input').prop('value')).toEqual('foo');
  });

  it('should render results', () => {
    const component = shallow(
      <Autocomplete data={['foo', 'bar']} />
    );

    component.find(Input).simulate('change', {
      target: { value: 'foo' },
    });

    expect(component.find(Results)).toHaveLength(1);
    expect(component.find(Results).dive().find(ResultItem)).toHaveLength(1);
  });

  it('should render results', () => {
    const component = shallow(
      <Autocomplete data={['foo', 'bar']} />
    );

    simulateChange(component, 'foo');

    expect(component.find(Results)).toHaveLength(1);
    expect(component.find(Results).dive().find(ResultItem)).toHaveLength(1);
  });

  it('should render only the max items allowed', () => {
    const component = shallow(
      <Autocomplete data={['foo', 'foo']} maxItems={1} />
    );

    simulateChange(component, 'foo');

    expect(component.find(Results).dive().find(ResultItem)).toHaveLength(1);
  });

  it('should run the onSelect callback', () => {
    const fn = jest.fn();

    const component = shallow(
      <Autocomplete data={['foo', 'bar']} onSelect={fn} />
    );

    simulateChange(component, 'foo');
    component.find(ResultItem).first().simulate('click');

    expect(fn).toHaveBeenCalled();
  });

  it('should navigate with keyboard', () => {
    const fn = jest.fn();

    const component = shallow(
      <Autocomplete
        data={['foo1', 'foo2']}
        onSelect={value => {
          expect(value).toEqual('foo1');
          fn();
        }}
      />
    );

    simulateChange(component, 'foo');

    component.find(Input).simulate('keyDown', {
      key: 'ArrowDown', target: { value: 'foo' },
    });
    component.find(Input).simulate('keyDown', {
      key: 'ArrowDown', target: { value: 'foo' },
    });

    expect(component.find(ResultItem).at(1).prop('isActive')).toEqual(true);

    component.find(Input).simulate('keyDown', {
      key: 'ArrowUp', target: { value: 'foo' },
    });

    expect(component.find(ResultItem).at(0).prop('isActive')).toEqual(true);

    component.find(Input).simulate('keyDown', {
      key: 'Enter', target: { value: 'foo' },
    });

    expect(fn).toHaveBeenCalled();
  });
});
