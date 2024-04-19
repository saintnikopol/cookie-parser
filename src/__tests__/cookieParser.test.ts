// import { describe } from 'yargs';
import { countCookies } from '../core';

describe('Cookie Parser', () => {
    test('finds single most active cookie for a given day', () => {
        const testData = `cookie,timestamp
AtY0laUfhglK3lC7,2018-12-09T14:19:00+00:00
SAZuXPGUrfbcn5UA,2018-12-09T10:13:00+00:00
AtY0laUfhglK3lC7,2018-12-09T06:19:00+00:00`;
        const date = '2018-12-09';
        const mostActiveCookies = countCookies(testData, date);
        expect(mostActiveCookies).toEqual(['AtY0laUfhglK3lC7']);
    });

    test('finds multiple most active cookies for a given day', () => {
        const testData = `cookie,timestamp
AtY0laUfhglK3lC7,2018-12-09T14:19:00+00:00
SAZuXPGUrfbcn5UA,2018-12-09T10:13:00+00:00
JJJJJJJUrfbcn5UA,2018-12-09T10:13:00+00:00
AtY0laUfhglK3lC7,2018-12-09T06:19:00+00:00
SAZuXPGUrfbcn5UA,2018-12-09T10:13:00+00:00
`;
        const date = '2018-12-09';
        const mostActiveCookies = countCookies(testData, date);
        expect(mostActiveCookies.length).toEqual(2);
        expect(mostActiveCookies).toContain('AtY0laUfhglK3lC7');
        expect(mostActiveCookies).toContain('SAZuXPGUrfbcn5UA');
    })
})