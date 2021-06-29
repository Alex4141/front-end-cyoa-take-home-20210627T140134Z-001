import { getNth, parseDate } from "./DateHelpers";

test('st for proper input', () => {
    const output = getNth(1);
    expect(output).toMatch("st");
});

test('nd for proper input', () => {
    const output = getNth(2);
    expect(output).toMatch("nd");
});

test('rd for proper input', () => {
    const output = getNth(3);
    expect(output).toMatch("rd");
});

test('th for proper input', () => {
    const output = getNth(4);
    expect(output).toMatch("th");
});

test('Error for inputs less than one', () => {
    expect(() => { getNth(0) }).toThrow(Error);
});

test('Validate an older date', () => {
    const dateString = parseDate("2020-06-27 17:36:51");
    expect(dateString).toMatch("June 27th at 5PM");
});

test('Validate a recent date', () => {
    const date = new Date(Date.now());
    
    const day = new Intl.DateTimeFormat('en-US', {weekday : 'long'}).format(date);
    let hours = date.getHours();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours === 0 ?  12 : hours;
    const finalDate = [day, "at", hours.toString().concat(amOrPm)].join(" ");

    expect(parseDate(date)).toMatch(finalDate);
});

test("Ensure invalid dates throw an exception", () => {
    expect(() => { parseDate("foo") }).toThrow(Error);
});