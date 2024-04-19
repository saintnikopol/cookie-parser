# Cookie Parser

## Introduction
Cookie Parser is a command-line tool designed to identify the most active cookie from a log file based on a specified date.

## Features
- Parses any CSV file following the specified format.
- Filters cookies by date with high accuracy including handling time zones.
- [todo] Efficiently handles large datasets.


Example cookie log:

cookie,timestamp
AtY0laUfhglK3lC7,2018-12-09T14:19:00+00:00
SAZuXPGUrfbcn5UA,2018-12-09T10:13:00+00:00


## Installation

npm install
npm run build

## Usage: 

To run the cookie parser:

    dist/index.js -f <path-to-cookie-file-log>.csv -d YYYY-MM-DD

## Usage example:

    dist/index.js -f ./test_files/original1.csv -d 2018-12-09

Expected output:

    AtY0laUfhglK3lC7

## Configuration

No additional configuration required.

## Testing

Run the following command to execute the tests:    

    npm test


# Project structure:

#### src/
Contains all the source code for the application.

#### src/core.ts
Handles the main logic for parsing the cookie CSV files and identifying the most active cookie. It includes functions such as `countCookies` and `loadDataAndCountCookies`.

#### src/date.ts
Includes utilities for handling date parsing and formatting, which are crucial for filtering the cookies based on the provided dates.

#### src/index.ts
The entry point for the application. It parses command-line arguments and invokes the core parsing functions.

#### dist/index.js
Compiled and executable script

#### tests/
Contains all unit and integration tests for the application.

#### src/__tests__/
Includes unit tests for individual components. Files here match the names of source files for clarity, such as `core.countCookies.test.ts` and `date.test.ts`.

#### integration/
Holds integration tests that run the entire application with various input configurations to ensure all parts work together seamlessly.

#### test_files/
Sample CSV files used in testing to provide various scenarios of cookie logs.


## Support utils.
Sever supportive utilities has been created:

// verify date order of tested file
node dist/utils/validate_date_order.js <filename>


// generate new data file
node dist/utils/generate_test_data.js <filename>