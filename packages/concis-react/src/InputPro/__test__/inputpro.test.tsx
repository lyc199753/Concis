import React from 'react';
import InputPro from '../../../src/InputPro/index';
import { sleep } from '../../../../../tests/sleep';
import { optionParams } from '../../../src/InputPro/interface';
import Enzyme from '../../../../../tests/setup';
import mountTest from '../../../../../tests/mountTest';

const { mount } = Enzyme;

mountTest(InputPro);

const option: optionParams[] = [
  {
    label: 'JavaScript',
  },
  {
    label: 'TypeScript',
  },
  {
    label: 'VueJS',
  },
  {
    label: 'ReactJS',
  },
];
describe('InputPro', () => {
  it('test base InputPro show correctly', async () => {
    const component = mount(<InputPro option={option} />);
    expect(component.find('.concis-input-pro').length).toBe(1);
    component.find('.concis-input-pro input').simulate('focus');
    await sleep(200);
    expect(component.find('.concis-input-pro-tragger').length).toBe(1);
    component.find('.concis-input-pro .concis-input-pro-tragger span').at(1).simulate('click');
    expect(component.find('.concis-input-pro input').getDOMNode().getAttribute('value')).toBe(
      'TypeScript'
    );
  });

  it('test different align show correctly', () => {
    const component = mount(<InputPro option={option} align="bottom" />);
    expect(component.find('.concis-input-pro').length).toBe(1);
    component.find('.concis-input-pro input').simulate('focus');
    expect(component.find('.concis-input-pro-tragger').length).toBe(1);
    expect(
      component
        .find('.concis-input-pro-tragger')
        .getDOMNode()
        .getAttribute('style')
        .includes('left: 25%; top: calc(100% + 5px)')
    ).toBe(true);
    component.setProps({ align: 'top' });
    expect(
      component
        .find('.concis-input-pro-tragger')
        .getDOMNode()
        .getAttribute('style')
        .includes('left: 25%;') &&
        component
          .find('.concis-input-pro-tragger')
          .getDOMNode()
          .getAttribute('style')
          .includes('bottom: calc(100% + 5px);')
    ).toBe(true);
    component.setProps({ align: 'left' });
    expect(
      component
        .find('.concis-input-pro-tragger')
        .getDOMNode()
        .getAttribute('style')
        .includes('left: -50%;') &&
        component
          .find('.concis-input-pro-tragger')
          .getDOMNode()
          .getAttribute('style')
          .includes('top: -120%;')
    ).toBe(true);
    component.setProps({ align: 'right' });
    expect(
      component
        .find('.concis-input-pro-tragger')
        .getDOMNode()
        .getAttribute('style')
        .includes('right: -50%;') &&
        component
          .find('.concis-input-pro-tragger')
          .getDOMNode()
          .getAttribute('style')
          .includes('top: -120%;')
    ).toBe(true);
  });

  it('test disabled correctly', () => {
    option[0].disabled = true;
    const component = mount(<InputPro option={option} />);
    component.find('.concis-input-pro input').simulate('focus');
    expect(component.find('.concis-input-pro-tragger .disabled-option').length).toBe(1);
    component.find('.concis-input-pro-tragger .disabled-option').at(0).simulate('click');
    expect(component.find('.concis-input-pro input').getDOMNode().getAttribute('value')).toBe('');
    expect(component.find('.concis-input-pro .concis-input-pro-tragger').length).toBe(1);
  });
});
