import { parseISO } from 'date-fns';  // Importing a helper function from date-fns for parsing

const data = [

// "AtY0laUfhglK3lC7,2018-12-09T14:19:00+00:00",
// "SAZuXPGUrfbcn5UA,2018-12-09T10:13:00+00:00",
// "5UAVanZf6UtGyKVS,2018-12-09T07:25:00+00:00",
// "AtY0laUfhglK3lC7,2018-12-09T06:19:00+00:00",
// "SAZuXPGUrfbcn5UA,2018-12-08T22:03:00+00:00",
// "4sMM2LxV07bPJzwf,2018-12-08T21:30:00+00:00",
// "fbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00",
//  "4sMM2LxV07bPJzwf,2018-12-07T23:30:00+00:00"   


///

// "5UAVanZf6UtGyKVS,2018-12-01T07:25:00+01:00",
// "SAZuXPGUrfbcn5UA,2018-12-01T10:13:00+00:00",
// "SAZuXPGUrfbcn5UA,2018-12-08T03:03:00+03:00",
// "fbcn5UAVanZf6UtG,2018-12-08T09:30:00+05:00",
// "4sMM2LxV07bPJzwf,2018-12-09T03:30:00+00:00",
// "AtY0laUfhglK3lC7,2018-12-09T06:19:00+02:00",
// "4sMM2LxV07bPJzwf,2018-12-08T23:30:03-06:00",
// "4sMM2LxV07bPJzwf,2018-12-08T23:30:04-06:00",
// "AtY0laUfhglK3lC7,2018-12-09T14:19:00+01:00",
// "AtY0laUfhglK3lC7,2018-12-09T14:19:00+01:00",
// "AtY0laUfhglK3lC7,2018-12-09T14:19:00+01:00",
// "AtY0laUfhglK3lC7,2018-12-09T14:19:00+00:00",
// "4sMM2LxV07bPJzwf,2018-12-10T03:30:01+06:00",
// "4sMM2LxV07bPJzwf,2018-12-10T03:30:02+06:00",


////

"AtY0laUfhglK3lC7,2018-12-09T14:19:00+00:00",
"SAZuXPGUrfbcn5UA,2018-12-09T10:13:00+00:00",
"5UAVanZf6UtGyKVS,2018-12-09T07:25:00+00:00",
"5UAVanZf6UtGyKVS,2018-12-09T07:25:00+00:00",
"AtY0laUfhglK3lC7,2018-12-09T06:19:00+00:00",
"SAZuXPGUrfbcn5UA,2018-12-08T22:03:00+00:00",
"4sMM2LxV07bPJzwf,2018-12-08T21:30:00+00:00",
"fbcn5UAVanZf6UtG,2018-12-08T09:30:00+00:00",
"4sMM2LxV07bPJzwf,2018-12-07T23:30:00+00:00",
];

// Function to parse the date and sort by it
const sortByTimestamp = (a: string, b: string): number => {
    const timestampA = parseISO(a.split(',')[1]);
    const timestampB = parseISO(b.split(',')[1]);
    return timestampB.getTime() - timestampA.getTime() ;
};

// Sort the data
const sortedData = data.sort(sortByTimestamp);

console.log(sortedData);