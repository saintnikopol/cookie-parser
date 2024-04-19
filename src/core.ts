import * as fs from 'fs';
import * as path from 'path';

export const countCookies = (data: string, date: string): string[] => {
    const lines = data.split('\n');
    const counts = new Map<string, number>();
    let maxCount = 0;
    let mostActiveCookies: string[] = [];

    for (let line of lines) {
        if (line.trim() === '') {
            continue;
        }

        const [cookie, timestamp] = line.split(',');
        const entryDate = timestamp.split('T')[0];

        if (entryDate === date) {
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
}

export const loadDataAndCountCookies = (
    filePath: string, date: string,
): string[] => {
    const data = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    return countCookies(data, date);
}