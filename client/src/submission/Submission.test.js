import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Submission from './Submission';

configure({adapter: new Adapter()});

test('Validate implicit username state change', () => {
    const submissionComponent = shallow(<Submission />);
    submissionComponent.find(FormControl).at(0).simulate("change", { target : { value : "test" } });
    expect(submissionComponent.find(FormControl).at(0).prop('value')).toBeTruthy();
});

test("Validate implicit comment state change", () => {
    const submissionComponent = shallow(<Submission />);
    submissionComponent.find(FormControl).at(1).simulate("change", { target : { value : "Lorem Ipsum" }});
    expect(submissionComponent.find(FormControl).at(1).prop('value')).toBeTruthy();
});

test("Validate error when submit without username", () => {
    const submissionComponent = shallow(<Submission />);
    submissionComponent.find(FormControl).at(0).simulate("change", { target : { value : "" } });
    submissionComponent.find(Button).simulate("click");
    expect(submissionComponent.find("small").length).toEqual(1);
});

test("Validate error when submit without comment", () => {
    const submissionComponent = shallow(<Submission />);
    submissionComponent.find(FormControl).at(1).simulate("change", { target : { value : "" } });
    submissionComponent.find(Button).simulate("click");
    expect(submissionComponent.find("small").length).toEqual(1);
})

test("Validate no error message when both inputs aren't empty", () => {
    const submissionComponent = shallow(<Submission />);
    submissionComponent.find(FormControl).at(0).simulate("change", { target : { value : "test" } });
    submissionComponent.find(FormControl).at(1).simulate("change", { target : { value : "test" } });
    expect(submissionComponent.find("small").length).toEqual(0);
})