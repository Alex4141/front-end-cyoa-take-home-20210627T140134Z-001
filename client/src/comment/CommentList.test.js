import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import CommentList from './CommentList';
import Comment from './Comment';

configure({adapter: new Adapter()});

test('Validate that comment list component displays comments', () => {
    const data = [
        { id: "1", name: 'test user', message: 'test message', created:'2020-06-27 17:36:51' },
        { id: "2", name: 'test user two', message: 'test message', created:'2019-06-27 17:36:51' }
    ];
    const commentListComponent = shallow(<CommentList comments={data}  />);
    expect(commentListComponent.find(Comment).length).toEqual(2);
});

test("Validate that comment list component with no data, does not render comments", () => {
    const data = [];
    const commentListComponent = shallow(<CommentList comments={data}  />);
    expect(commentListComponent.find(Comment).length).toEqual(0);
});