import { getButtons } from '../createButtons';

describe('Check getButtons func working', () => {
    test('should be 1 2 ... next', () => {
        const expected = [
            {
                type: 'NUMBER',
                value: 1,
                disabled: true,
            },
            {
                type: 'NUMBER',
                value: 2,
                disabled: undefined,
            },
            {
                type: 'DOTS',
                value: undefined,
                disabled: undefined,
            },
            {
                type: 'NEXT',
                value: 2,
                disabled: undefined,
            },
        ];
        expect(getButtons(1, 20)).toEqual(expect.arrayContaining(expected));
    });

    test('should be empty array', () => {
        expect(getButtons(1, 20, 19)).toEqual([]);
    });

    test('should be 7 buttons', () => {
        const buttons = getButtons(7, 20, 200);
        expect(buttons.length).toEqual(7);
    });

    test('Number must be last button', () => {
        const buttons = getButtons(5, 10, 50);
        expect(buttons[buttons.length - 1].type).toBe('NUMBER');
    });
});
