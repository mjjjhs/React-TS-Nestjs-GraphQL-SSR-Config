import * as React from 'react';
// import {mount} from 'enzyme';

jest.mock('css');
describe('Pages', () => {
    beforeEach(() => {
        require('css');
    });
    describe('Index', () => {
        it('should render without throwing an error', function () {
            // const wrap = mount(<IndexPage query={{name: 'cs'}}/>);
            // expect(wrap.find('.hello').text()).toBe('hello');
        })
    })
});
