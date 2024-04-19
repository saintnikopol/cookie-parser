import * as fs from 'fs';
import * as path from 'path';

// YYYY-MM-DD or YYYY/MM/DD or YYYY.MM.DD
export const DATE_REGEX = /^(\d{4})([/]\d{2}[/]|[\-]\d{2}[\-]|[.]\d{2}[.])\d{2}$/;

export const parseDate = (date: string): Date => {
    if (!DATE_REGEX.test(date)) {
        throw Error('Invalid date format. Please use YYYY-MM-DD or YY-MM-DD or YY/MM/DD or YY.MM.DD');
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw Error('Invalid date. Please enter a valid date');
    }
    return parsedDate;
};

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

export const countCookies = (data: string, date: Date): string[] => {
    const lines = data.split('\n');
    const counts = new Map<string, number>();
    let maxCount = 0;
    let mostActiveCookies: string[] = [];

    const dateYYYYMMDD = formatDate(date);
    for (let line of lines) {
        if (line.trim() === '') {
            continue;
        }

        const [cookie, timestamp] = line.split(',');
        const entryDate = timestamp.split('T')[0];

        if (entryDate === dateYYYYMMDD) {
            const currentCount = (counts.get(cookie) ?? 0) + 1;
            counts.set(cookie, currentCount);

            if (currentCount > maxCount) {
                maxCount = currentCount;
                mostActiveCookies = [cookie];
            } else if (currentCount === maxCount) {
                mostActiveCookies.push(cookie);
            }
        }
    }

    return mostActiveCookies;
};

export const loadDataAndCountCookies = (
    filePath: string, date: Date,
): string[] => {
    const data = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    return countCookies(data, date);
};
