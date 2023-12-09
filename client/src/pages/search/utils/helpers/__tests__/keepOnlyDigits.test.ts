import { keepOnlyDigits } from '../keepOnlyDigits';

describe('keepOnlyDigits', () => {
    it('should remove all non-digit characters from a string', () => {
        const input = 'abc123def456ghi';
        const expectedOutput = '123456';
        const result = keepOnlyDigits(input);
        expect(result).toEqual(expectedOutput);
    });

    it('should return an empty string if the input is empty', () => {
        const input = '';
        const expectedOutput = '';
        const result = keepOnlyDigits(input);
        expect(result).toEqual(expectedOutput);
    });

    it('should return an empty string if the input contains only non-digit characters', () => {
        const input = 'abc';
        const expectedOutput = '';
        const result = keepOnlyDigits(input);
        expect(result).toEqual(expectedOutput);
    });
});