import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { parseDate } from '../utils/DateHelpers';
import Comment from './Comment';

configure({adapter: new Adapter()});

test('Validate that Comment component displays message body', () => {
    const data = { name: 'test user', message: 'test message', created:'2020-06-27 17:36:51' };
    const commentComponent = shallow(<Comment commentData={data}  />);
    expect(commentComponent.find("div").at(1).text()).toMatch('test message');
});

test('Validate that Comment component displays posted message', () => {
    const data = { name: 'test user', message: 'test message', created:'2020-06-27 17:36:51' };
    const commentComponent = shallow(<Comment commentData={data}  />);
    expect(commentComponent.find("div").at(2).text()).toMatch(`${data.name} on ${parseDate(data.created)}`);
});