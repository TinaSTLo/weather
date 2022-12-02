import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import { WeatherApp } from './page';

const setup = () => shallow(<WeatherApp />);//渲染方式 (Shallow)
const findByTestAttribute = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

// 正常顯示Component
test('renders without errors', () => {
    const wrapper = setup();

    const appComponent = findByTestAttribute(wrapper, 'component-app');
    expect(appComponent.length).toBe(1); //期望找到的是「1個」Component
});

//按鈕是否顯示
test('render button', () => {
    const wrapper = setup();

    const incrementButtont = findByTestAttribute(wrapper, 'increment-button');
    expect(incrementButtont.length).toBe(1);
});

//counter 數字是否正確顯示
test('counter display', () => {
    const wrapper = setup();

    const counterDisplay = findByTestAttribute(wrapper, 'count');
    expect(counterDisplay.length).toBe(1);
});

//counter 的初始值是否為0
test('counter start at 0', () => {
    const wrapper = setup();

    const count = findByTestAttribute(wrapper, 'count').text();

    expect(count).toBe('0');
});

//按下按鈕 counter是否加一
test('clicking on button increments counter display', () => {
    // 模擬事件動作的時候，我們是透過simulate這個API去進行
    const wrapper = setup();

    const button = findByTestAttribute(wrapper, 'increment-button');
    button.simulate('click');

    const count = findByTestAttribute(wrapper, 'count').text();
    expect(count).toBe('1');
});

//按下按鈕 counter是否減一
test('clicking on button decrements counter display', () => {
    const wrapper = setup();
    const button = findByTestAttribute(wrapper, 'decrement-button');

    button.simulate('click');
    const count = findByTestAttribute(wrapper, 'count').text();
    expect(count).toBe('0');
});

Enzyme.configure({ adapter: new EnzymeAdapter() });