#!/usr/bin/env node
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { loadDataAndCountCookies } from './core';

interface Args {
    f: string; // filename
    d: string; // date
}

const log = console.log;

const argv = yargs(hideBin(process.argv)).options({
    f: {
        type: 'string', demandOption: true, alias: 'file', describe: 'File path to the cookie log CSV',
    },
    d: {
        type: 'string', demandOption: true, alias: 'date', describe: 'Date to filter the cookies use format YYYY-MM-DD',
    },
}).argv as Args;


const main = async () => {
    // node index.js -f cookie_log.csv -d 2018-12-09

    const filePath = argv.f;
    const date = argv.d;
    const fullPath = path.resolve(__dirname, '..', filePath);
    const mostActiveCookies = loadDataAndCountCookies(fullPath, date);
    mostActiveCookies.forEach((cookie) => log(cookie));
};

main();
