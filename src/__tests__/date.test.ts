import { describe, expect, test } from '@jest/globals';
import {
    parseDate,
    formatDate,
    toUTCDate,
    DATE_REGEX,
} from '../date';

describe('DATE_REGEX', () => {

    test.each([
        "2023-01-01", // YYYY-MM-DD
        "2023/01/01", // YYYY/MM/DD
        "2023.01.01", // YYYY.MM.DD
    ])('should match date format: %s', (date) => {
        expect(DATE_REGEX.test(date)).toBeTruthy();
    });

    test.each([
        "2023-1-01",   // Incorrect month format
        "2023-01-1",   // Incorrect day format
        "20230101",    // No separators
        "23-01-01",    // YY-MM-DD
        "23/01/01",    // YY/MM/DD
        "23.01.01",    // YY.MM.DD
        "01-2023-01",  // Incorrect order
        "2023/013/01", // Month too long
        "2023/01/013", // Day too long
        "2023-01/01",  // Mixed separators
        "2023-01.01",  // Mixed separators
        "2023--01-01", // Double separators
        "some text"    // Totally wrong format
    ])('should not match incorrect date format: %s', (date) => {
        expect(DATE_REGEX.test(date)).toBeFalsy();
    });
});

describe('parseDate tests', () => {
    test('should return the date when format is correct YYYY-MM-DD', () => {
        expect(parseDate('2024-04-18')).toEqual(new Date('2024-04-18'));
    });

    test('should throw exception for incorrect date formats', () => {
        expect(() => parseDate('2024/04-18')).toThrow(Error);
        expect(() => parseDate('20240418')).toThrow(Error);
        expect(() => parseDate('2024-418')).toThrow(Error);
    });

    test('should throw exception for non date input', () => {
        expect(() => parseDate('something')).toThrow(Error);
        expect(() => parseDate('some thing')).toThrow(Error);
        expect(() => parseDate('')).toThrow(Error);
        expect(() => parseDate('1-2-3-4-5-6-7')).toThrow(Error);
    });

    test('should throw exception with a specific message for incorrect formats', () => {
        expect(() => parseDate('20240418'))
            .toThrow(Error('Invalid date format. Please use YYYY-MM-DD or YY-MM-DD or YY/MM/DD or YY.MM.DD'));
    });

    test('should throw exception with a specific message for correct formats but invalid date', () => {
        expect(() => parseDate('0000-20-20'))
            .toThrow(Error('Invalid date. Please enter a valid date'));
    });
});

describe('formatDate', () => {
    test('formats date correctly', () => {
        const testDate = new Date(2020, 0, 1);
        expect(formatDate(testDate)).toBe('2020-01-01');
    });
});

describe('toUTCDate function', () => {
    test('converts date with timezone to UTC date string correctly', () => {
        expect(toUTCDate('2018-12-09T14:19:00+00:00')).toBe('2018-12-09');
        expect(toUTCDate('2018-12-09T14:19:00+01:00')).toBe('2018-12-09');
        expect(toUTCDate('2018-12-08T23:30:00-05:00')).toBe('2018-12-09');
        expect(toUTCDate('2018-12-08T20:00:00-08:00')).toBe('2018-12-09');
        expect(toUTCDate('2018-12-10T04:00:00+10:00')).toBe('2018-12-09');
        expect(toUTCDate('2018-12-08T18:30:00-10:00')).toBe('2018-12-09');
    });

    test('handles edge cases around midnight', () => {
        expect(toUTCDate('2018-12-08T23:59:59-00:00')).toBe('2018-12-08');
        expect(toUTCDate('2018-12-09T00:00:00+00:00')).toBe('2018-12-09');
        expect(toUTCDate('2018-12-09T00:00:00+00:01')).toBe('2018-12-08');
        expect(toUTCDate('2018-12-08T23:59:59-00:01')).toBe('2018-12-09');
    });
});