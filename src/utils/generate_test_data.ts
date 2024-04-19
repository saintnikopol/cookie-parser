import * as fs from 'fs';
import { format, subDays } from 'date-fns';

const totalEntries: number = 100000;
const totalDates: number = 100;
const cookiesPerDate: number = 10;
const entriesPerDate: number = totalEntries / totalDates;

// Generates a list of dates in descending order
function generateDates(): string[] {
    let dates: string[] = [];
    let startDate: Date = new Date(); // Start from today
    for (let i = 0; i < totalDates; i++) {
        let newDate: Date = subDays(startDate, i);
        dates.push(format(newDate, 'yyyy-MM-dd'));
    }
    return dates; // They are already in descending order
}

// Generates a list of unique cookies
function generateCookies(): string[] {
    let cookies: string[] = [];
    for (let i = 0; i < cookiesPerDate; i++) {
        cookies.push(`cookie_${i + 1}`);
    }
    return cookies;
}

// Generates data ensuring each date's times are in descending order
function generateData(): string[] {
    const dates: string[] = generateDates();
    const cookies: string[] = generateCookies();
    let data: string[] = [];

    dates.forEach(date => {
        let dailyEntries: string[] = [];
        for (let i = 0; i < entriesPerDate; i++) {
            let hour = 23 - (i % 24); // Ensure descending order within a day
            let minute = 59 - (i % 60);
            let second = 59 - (i % 60);
            let cookie = cookies[Math.floor(Math.random() * cookies.length)];
            let timestamp = `${date}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}+00:00`;
            dailyEntries.push(`${cookie},${timestamp}`);
        }
        // Sort daily entries to ensure strict descending order by time
        dailyEntries.sort((a, b) => b.split(',')[1].localeCompare(a.split(',')[1]));
        data.push(...dailyEntries);
    });

    return data;
}

// Writes the generated data to a CSV file
function writeDataToFile(filePath: string, data: string[]): void {
    const stream: fs.WriteStream = fs.createWriteStream(filePath);
    stream.write("cookie,timestamp\n");  // Write header
    data.forEach(line => stream.write(line + "\n"));
    stream.end();
}

// Main function to orchestrate the data generation and file writing
function main(filePath: string): void {
    const data: string[] = generateData();
    writeDataToFile(filePath, data);
    console.log('Data has been written to cookie_data.csv');
}

const args = process.argv.slice(2); // Remove the first two elements
if (args.length < 1) {
    console.log("Usage: ts-node validate_data.ts <filename>");
} else {
    const filePath = args[0];
    main(filePath);
}
