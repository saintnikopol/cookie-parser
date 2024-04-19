import * as fs from 'fs';
import * as path from 'path';
import { formatDate, toUTCDate } from './date';

export const countCookies = (data: string, date: Date): string[] => {
    const lines = data.split('\n');
    const counts = new Map<string, number>();
    let maxCount = 0;
    let mostActiveCookies: string[] = [];

    const dateYYYYMMDD = formatDate(date);

    for (let i = 1; i < lines.length; i++) { // Start from 1 to skip the header

        const line = lines[i].trim();
        if (line === '') {
            continue;
        }
        const [cookie, timestamp] = line.split(',');
        const entryDate = toUTCDate(timestamp);

        if (entryDate !== dateYYYYMMDD) {
            // Take into account condition:
            // Cookies in the log file are sorted by timestamp (most recent occurrence is the first line of the file).
            if (entryDate < dateYYYYMMDD) {
                break;  // Correctly stops processing since data is strictly ordered
            }
            continue;
        }


        const currentCount = (counts.get(cookie) ?? 0) + 1; // Increment first
        counts.set(cookie, currentCount); // Update the map after incrementing

        if (currentCount > maxCount) {
            maxCount = currentCount;
            mostActiveCookies = [cookie]; // Resets and updates the list with the current highest count
        } else if (currentCount === maxCount) {
            if (!mostActiveCookies.includes(cookie)) {
                mostActiveCookies.push(cookie); // Add to the list if this cookie reaches the max count
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
