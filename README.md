Implementation of the cookie parser script, which finds most active cookie

Example cookie log:

cookie,timestamp
AtY0laUfhglK3lC7,2018-12-09T14:19:00+00:00
SAZuXPGUrfbcn5UA,2018-12-09T10:13:00+00:00

Build:
npm install && npm run build

Usage: 
dist/index.js -f ./test_files/original1.csv -d 2018-12-09

Expected output:

AtY0laUfhglK3lC7