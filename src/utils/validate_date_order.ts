import * as fs from 'fs';
import { parseISO } from 'date-fns';
import * as readline from 'readline';

function validateDateOrder(filePath: string): void {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let previousTimestamp = Infinity;  // Assume timestamps are in milliseconds
    let valid = true;
    let lineNumber = 0;

    rl.on('line', (line: string) => {
        lineNumber++;
        if (lineNumber === 1) return;  // Skip header line

        const parts = line.split(',');
        if (parts.length < 2) {
            console.error(`Malformed line ${lineNumber}: ${line}`);
            valid = false;
            rl.close();
        } else {
            const timestamp = parseISO(parts[1]).getTime();
            if (timestamp > previousTimestamp) {
                console.error(`Order violation at line ${lineNumber}: ${line}`);
                valid = false;
                rl.close();
            }
            previousTimestamp = timestamp;
        }
    });

    rl.on('close', () => {
        if (valid) {
            console.log('File is in strict descending order.');
        } else {
            console.log('File is NOT in strict descending order.');
        }
    });
}

const args = process.argv.slice(2); // Remove the first two elements
if (args.length < 1) {
    console.log("Usage: ts-node validate_data.ts <filename>");
} else {
    const filePath = args[0];
    validateDateOrder(filePath);
}
